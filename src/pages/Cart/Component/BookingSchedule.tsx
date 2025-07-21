import { useState, useEffect, useCallback } from "react";
import dayjs from "dayjs";
import isoWeek from "dayjs/plugin/isoWeek";
import { useDispatch, useSelector } from "react-redux";

import { AppDispatch, RootState } from "../../../features/store";
import { getSheduleSupplier } from "../../../features/Schedule/scheduleThunk";

dayjs.extend(isoWeek);

const generateTimeSlots = (): string[] => {
    const slots: string[] = [];
    let t = dayjs("2023-01-01 06:00");
    const end = dayjs("2023-01-01 22:00");
    while (t.isBefore(end)) {
        slots.push(t.format("HH:mm"));
        t = t.add(30, "minute");
    }
    return slots;
};

const timeSlots = generateTimeSlots();

type Props = {
    packageLabel: string;
    packageType: "hour" | "date" | "recurring";
    supplierId: string;
    minSlotCount?: number;
    onScheduleChange: (duration: number, start?: string, end?: string, selectedDate?: string) => void;
    isTimeSlotOccupied?: (date: string, startTime: string, endTime: string) => boolean;
    disabled?: boolean;
    isSelecting?: boolean;
    onSelectionStart?: () => void;
    onSelectionEnd?: () => void;
};

const BookingSchedule = ({
    packageLabel,
    packageType,
    supplierId,
    minSlotCount = 1,
    onScheduleChange,
    isTimeSlotOccupied,
    disabled,
    isSelecting,
    onSelectionStart,
    onSelectionEnd,
}: Props) => {
    const [selectedDate, setDate] = useState("");
    const [startSlot, setStartSlot] = useState<string | undefined>();
    const [endSlot, setEndSlot] = useState<string | undefined>();
    const [allowedEndSlots, setAllowedEndSlots] = useState<string[]>([]);
    const [isSelectingStart, setIsSelectingStart] = useState(true);
    const [lastSchedule, setLastSchedule] = useState<{
        duration: number;
        start?: string;
        end?: string;
        selectedDate?: string;
    }>({ duration: 0 });

    const getMinSlotCount = () => {
        if (packageType === "date") return 24;
        if (packageType === "hour") return minSlotCount;
        return 1;
    };

    const dispatch = useDispatch<AppDispatch>();
    const { schedule_supplier } = useSelector((state: RootState) => state.schedule);
    useEffect(() => {
        if (supplierId) {
            dispatch(getSheduleSupplier({ id_supplier: supplierId }));
        }
    }, [supplierId, dispatch]);


    const actualMinSlotCount = getMinSlotCount();

    const isSlotBusy = (date: string, slotStart: string, slotEnd: string): boolean => {
        const day = schedule_supplier.find((d) => d.date === date);
        if (day) {
            const s = dayjs(`${date} ${slotStart}`);
            const e = dayjs(`${date} ${slotEnd}`);
            const hasMockConflict = day.busy.some(({ start, end }) => {
                const bs = dayjs(`${date} ${start}`);
                const be = dayjs(`${date} ${end}`);
                return s.isBefore(be) && e.isAfter(bs);
            });
            if (hasMockConflict) return true;
        }

        if (isTimeSlotOccupied) {
            return isTimeSlotOccupied(date, slotStart, slotEnd);
        }

        return false;
    };

    const memoizedOnScheduleChange = useCallback(
        (duration: number, start?: string, end?: string, selectedDate?: string) => {
            if (
                duration !== lastSchedule.duration ||
                start !== lastSchedule.start ||
                end !== lastSchedule.end ||
                selectedDate !== lastSchedule.selectedDate
            ) {
                onScheduleChange(duration, start, end, selectedDate);
                setLastSchedule({ duration, start, end, selectedDate });
            }
        },
        [onScheduleChange, lastSchedule]
    );

    useEffect(() => {
        setStartSlot(undefined);
        setEndSlot(undefined);
        setIsSelectingStart(true);
        setAllowedEndSlots([]);
    }, [selectedDate]);

    useEffect(() => {
        setEndSlot(undefined);
        if (selectedDate && startSlot && (packageType === "hour" || packageType === "date")) {
            const startIdx = timeSlots.indexOf(startSlot);
            const options: string[] = [];

            const minSlots = packageType === "date" ? 24 : actualMinSlotCount;

            for (let i = startIdx + minSlots; i < timeSlots.length; i++) {
                const end = timeSlots[i];
                const noBusyInside = timeSlots
                    .slice(startIdx, i)
                    .every((slot, idx) => {
                        const next = timeSlots[startIdx + idx + 1];
                        return next ? !isSlotBusy(selectedDate, slot, next) : false;
                    });
                if (noBusyInside) options.push(end);
                else break;
            }
            setAllowedEndSlots(options);
        } else {
            setAllowedEndSlots([]);
        }
    }, [selectedDate, startSlot, packageType, actualMinSlotCount]);

    useEffect(() => {
        if ((packageType === "hour" || packageType === "date") && startSlot && endSlot) {
            const start = dayjs(`2023-01-01 ${startSlot}`);
            const end = dayjs(`2023-01-01 ${endSlot}`);
            const duration = end.diff(start, "hour", true);
            memoizedOnScheduleChange(duration, startSlot, endSlot, selectedDate);
        } else if (packageType === "recurring" && selectedDate) {
            memoizedOnScheduleChange(1, undefined, undefined, selectedDate);
        } else {
            memoizedOnScheduleChange(0);
        }
    }, [startSlot, endSlot, selectedDate, packageType, memoizedOnScheduleChange]);

    const handleSlotClick = (slot: string) => {
        if (disabled) return;

        if (packageType === "hour" || packageType === "date") {
            if (isSelectingStart) {
                setStartSlot(slot);
                setIsSelectingStart(false);
                onSelectionStart?.();
            } else if (allowedEndSlots.includes(slot)) {
                setEndSlot(slot);
                onSelectionEnd?.();
            }
        } else {
            setStartSlot(slot);
            onSelectionStart?.();
            onSelectionEnd?.();
        }
    };

    const resetSelection = () => {
        setStartSlot(undefined);
        setEndSlot(undefined);
        setIsSelectingStart(true);
    };

    const getMinDurationText = () => {
        if (packageType === "date") return "12 tiếng";
        if (packageType === "hour") {
            const hours = minSlotCount / 2;
            return `${hours} giờ`;
        }
        return "";
    };

    return (
        <div className={`border p-4 rounded-lg ${disabled ? 'bg-gray-100 opacity-60' : 'bg-gray-50'}`}>
            <p className="mb-3 text-sm text-gray-600 font-medium">
                Lịch cho: <span className="text-purple-700">{packageLabel}</span>
                {disabled && <span className="ml-2 text-xs text-red-600">(Đang chọn lịch khác)</span>}
                {isSelecting && <span className="ml-2 text-xs text-blue-600">(Đang chọn...)</span>}
            </p>

            <div className="mb-3">
                <label className="block text-sm font-medium mb-1">Chọn ngày:</label>
                <input
                    type="date"
                    className={`border px-3 py-2 rounded w-full ${disabled ? 'bg-gray-100 cursor-not-allowed' : ''}`}
                    value={selectedDate}
                    onChange={(e) => !disabled && setDate(e.target.value)}
                    min={dayjs().format("YYYY-MM-DD")}
                    disabled={disabled}
                />
            </div>

            {selectedDate && (
                <>
                    {(packageType === "hour" || packageType === "date") && (
                        <div className="mb-3">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-sm font-medium">
                                    {isSelectingStart ? "Chọn giờ bắt đầu:" : "Chọn giờ kết thúc:"}
                                </span>
                                {!isSelectingStart && (
                                    <button
                                        onClick={resetSelection}
                                        className="text-xs text-blue-600 hover:text-blue-800 underline"
                                    >
                                        Chọn lại giờ bắt đầu
                                    </button>
                                )}
                            </div>

                            {packageType === "date" && (
                                <div className="mb-2 p-2 bg-blue-50 rounded text-xs text-blue-700">
                                    <p>💡 Gói theo ngày: Chọn thời gian sử dụng (tối thiểu {getMinDurationText()})</p>
                                </div>
                            )}

                            {packageType === "hour" && minSlotCount > 2 && (
                                <div className="mb-2 p-2 bg-orange-50 rounded text-xs text-orange-700">
                                    <p>⏰ Gói theo giờ: Thời gian tối thiểu {getMinDurationText()}</p>
                                </div>
                            )}

                            <div className="grid grid-cols-6 gap-1">
                                {timeSlots.map((slot, idx) => {
                                    const next = timeSlots[idx + 1];
                                    if (!next) return null;

                                    const busy = isSlotBusy(selectedDate, slot, next);
                                    const isStart = slot === startSlot;
                                    const isEnd = slot === endSlot;
                                    const isSelectable = isSelectingStart
                                        ? !busy
                                        : allowedEndSlots.includes(slot);

                                    return (
                                        <button
                                            key={slot}
                                            className={`p-2 text-xs rounded transition-colors ${busy
                                                ? "bg-red-200 text-red-700 cursor-not-allowed"
                                                : isStart
                                                    ? "bg-blue-600 text-white"
                                                    : isEnd
                                                        ? "bg-blue-400 text-white"
                                                        : isSelectable
                                                            ? "bg-green-200 text-green-800 hover:bg-green-300"
                                                            : "bg-gray-100 text-gray-400 cursor-not-allowed"
                                                }`}
                                            disabled={!isSelectable}
                                            onClick={() => handleSlotClick(slot)}
                                        >
                                            {slot}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    )}

                    {packageType === "recurring" && (
                        <div className="mb-3">
                            <p className="text-sm text-gray-600 mb-2">
                                Dịch vụ theo tuần - không cần chọn giờ cụ thể
                            </p>
                            <div className="bg-green-100 p-3 rounded">
                                <p className="text-sm text-green-800">
                                    Đã chọn ngày: {dayjs(selectedDate).format("DD/MM/YYYY")}
                                </p>
                            </div>
                        </div>
                    )}
                </>
            )}

            <div className="mt-3 text-sm space-y-1">
                {selectedDate && (
                    <p className="text-gray-700">
                        Ngày: {dayjs(selectedDate).format("DD/MM/YYYY")}
                    </p>
                )}
                {startSlot && (packageType === "hour" || packageType === "date") && (
                    <p className="text-gray-700">Bắt đầu: {startSlot}</p>
                )}
                {endSlot && (packageType === "hour" || packageType === "date") && (
                    <p className="text-gray-700">Kết thúc: {endSlot}</p>
                )}
                {!selectedDate && (
                    <p className="text-gray-500">Vui lòng chọn ngày</p>
                )}
                {selectedDate && (packageType === "hour" || packageType === "date") && !startSlot && (
                    <p className="text-gray-500">Vui lòng chọn giờ bắt đầu</p>
                )}
                {selectedDate && (packageType === "hour" || packageType === "date") && startSlot && !endSlot && (
                    <p className="text-gray-500">
                        Chọn giờ kết thúc (tối thiểu {getMinDurationText()} sau)
                    </p>
                )}
            </div>
        </div>
    );
};

export default BookingSchedule;