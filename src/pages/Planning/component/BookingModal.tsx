import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import BookingSchedule from '../../Cart/Component/BookingSchedule';
import { Service } from '../../../types/Services/Services.type';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../features/store';
import { getSheduleSupplier } from '../../../features/Schedule/scheduleThunk';

interface BookingModalProps {
    show: boolean;
    onClose: () => void;
    bookingData: {
        serviceId: string,
        name: string,
        packageType: "hour" | "date" | "recurring",
        minSlotCount: number,
        date?: string,
        start?: string,
        end?: string,
        selectedPackageName?: string
    }[];
    setBookingData: (data: {
        serviceId: string,
        name: string,
        packageType: "hour" | "date" | "recurring",
        minSlotCount: number,
        date?: string,
        start?: string,
        end?: string,
        selectedPackageName?: string
    }[]) => void;
    services: Service[];
    handleConfirmBooking: () => void;
}

const BookingModal: React.FC<BookingModalProps> = ({ show, onClose, bookingData, setBookingData, services, handleConfirmBooking }) => {
    const dispatch = useDispatch<AppDispatch>();
    const [expandedIdx, setExpandedIdx] = useState<number | null>(null);

    React.useEffect(() => {
        if (show) {
            const supplierIds = bookingData
                .map(item => {
                    const foundService = services.find(s => s.id === item.serviceId);
                    return foundService?.supplier?.id;
                })
                .filter((id, idx, arr) => id && arr.indexOf(id) === idx); // unique
            supplierIds.forEach(id => {
                if (id) dispatch(getSheduleSupplier({ id_supplier: id }));
            });
        }
    }, [show, bookingData, services, dispatch]);

    const isAllScheduled = bookingData.every(item => item.date && item.start && item.end);

    if (!show) return null;
    return createPortal(
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black bg-opacity-40">
            <div className="bg-white rounded-xl shadow-2xl p-8 max-w-lg w-full relative max-h-[90vh] overflow-y-auto">
                <button className="absolute top-3 right-3 text-gray-400 hover:text-gray-700" onClick={onClose}>
                    ×
                </button>
                <h2 className="text-xl font-bold mb-6 text-center">Đặt lịch cho dịch vụ</h2>
                <div className="space-y-6">
                    {bookingData.map((item, idx) => {
                        const foundService = services.find(s => s.id === item.serviceId);
                        if (!foundService || !foundService.supplier?.id) {
                            return (
                                <div key={item.serviceId} className="mb-4 text-red-500">
                                    Không tìm thấy thông tin dịch vụ hoặc supplier!
                                </div>
                            );
                        }
                        const firstPackageName = foundService.packages?.[0]?.package_name || "";
                        return (
                            <div key={item.serviceId} className="mb-4">
                                <div
                                    className={`font-semibold mb-1 cursor-pointer flex items-center justify-between ${expandedIdx === idx ? 'text-purple-700' : ''}`}
                                    onClick={() => setExpandedIdx(expandedIdx === idx ? null : idx)}
                                >
                                    {item.name}
                                    <span className="ml-2 text-xs">{item.date && item.start && item.end ? '✅ Đã chọn lịch' : '🕒 Chưa chọn lịch'}</span>
                                </div>
                                {/* Chọn gói dịch vụ */}
                                {expandedIdx === idx && foundService.packages && foundService.packages.length > 0 && (
                                    <div className="mb-2">
                                        <div className="font-medium text-sm mb-1">Chọn gói dịch vụ:</div>
                                        <div className="flex flex-wrap gap-2">
                                            {foundService.packages.map((pkg) => (
                                                <label key={pkg.package_name} className="flex items-center gap-1 cursor-pointer">
                                                    <input
                                                        type="radio"
                                                        name={`package-${item.serviceId}`}
                                                        value={pkg.package_name}
                                                        checked={(item.selectedPackageName ?? firstPackageName) === pkg.package_name}
                                                        onChange={() => {
                                                            const newData = [...bookingData];
                                                            newData[idx] = {
                                                                ...newData[idx],
                                                                selectedPackageName: pkg.package_name,
                                                                // reset lịch nếu đổi gói
                                                                date: "",
                                                                start: "",
                                                                end: ""
                                                            };
                                                            setBookingData(newData);
                                                        }}
                                                    />
                                                    <span className="text-xs">{pkg.package_name} ({pkg.price.toLocaleString('vi-VN')} VNĐ)</span>
                                                </label>
                                            ))}
                                        </div>
                                    </div>
                                )}
                                {expandedIdx === idx && (
                                    <>
                                        <BookingSchedule
                                            supplierId={foundService.supplier.id}
                                            packageLabel={(item.selectedPackageName ?? firstPackageName) || item.name}
                                            packageType={item.packageType}
                                            minSlotCount={item.minSlotCount}
                                            onScheduleChange={(start, end, selectedDate) => {
                                                const newData = [...bookingData];
                                                newData[idx] = { ...newData[idx], date: selectedDate, start: start.toString(), end: end?.toString() };
                                                setBookingData(newData);
                                            }}
                                        />
                                        {/* Hiển thị giá từng dịch vụ nếu đã chọn lịch */}
                                        {item.date && item.start && item.end && (
                                            <div className="mt-2 text-right text-purple-700 font-semibold">
                                                Giá: {(() => {
                                                    const selectedPackage = foundService.packages?.find(pkg => pkg.package_name === (item.selectedPackageName ?? firstPackageName)) || foundService.packages?.[0];
                                                    if (!selectedPackage) return 'Chưa có';
                                                    let itemTotal = 0;
                                                    if (item.packageType === 'hour') {
                                                        let duration = 1;
                                                        const startHour = parseInt(item.start);
                                                        const endHour = parseInt(item.end);
                                                        if (!isNaN(startHour) && !isNaN(endHour)) {
                                                            duration = Math.max(endHour - startHour, 1);
                                                        }
                                                        itemTotal = selectedPackage.price * duration;
                                                    } else {
                                                        itemTotal = selectedPackage.price;
                                                    }
                                                    return itemTotal.toLocaleString('vi-VN') + ' VNĐ';
                                                })()}
                                            </div>
                                        )}
                                    </>
                                )}
                            </div>
                        );
                    })}
                </div>
                {/* Tổng tiền động: hiện khi có ít nhất 1 dịch vụ đã chọn lịch */}
                {bookingData.some(item => item.date && item.start && item.end) && (
                    <div className="flex justify-between items-center mt-6">
                        <span className="font-semibold text-lg">Tổng tiền:</span>
                        <span className="font-bold text-xl text-purple-700">{
                            (() => {
                                let total = 0;
                                bookingData.forEach(item => {
                                    const foundService = services.find(s => s.id === item.serviceId);
                                    if (!foundService) return;
                                    const firstPackageName = foundService.packages?.[0]?.package_name || "";
                                    const selectedPackage = foundService.packages?.find(pkg => pkg.package_name === (item.selectedPackageName ?? firstPackageName)) || foundService.packages?.[0];
                                    if (!selectedPackage) return;
                                    let itemTotal = 0;
                                    if (item.date && item.start && item.end) {
                                        if (item.packageType === 'hour') {
                                            let duration = 1;
                                            const startHour = parseInt(item.start);
                                            const endHour = parseInt(item.end);
                                            if (!isNaN(startHour) && !isNaN(endHour)) {
                                                duration = Math.max(endHour - startHour, 1);
                                            }
                                            itemTotal = selectedPackage.price * duration;
                                        } else {
                                            itemTotal = selectedPackage.price;
                                        }
                                        total += itemTotal;
                                    }
                                });
                                return total.toLocaleString('vi-VN') + ' VNĐ';
                            })()
                        }</span>
                    </div>
                )}
                {/* Nút thanh toán chỉ hiện khi đã chọn đủ lịch */}
                {isAllScheduled && (
                    <>
                        <button
                            className="w-full mt-4 py-3 rounded-lg bg-gradient-to-r from-fuchsia-500 to-cyan-400 text-white font-semibold hover:opacity-90 transition"
                            onClick={() => {
                                handleConfirmBooking();
                                onClose();
                            }}
                        >
                            Thanh toán
                        </button>
                    </>
                )}
            </div>
        </div>,
        document.body
    );
};

export default BookingModal; 