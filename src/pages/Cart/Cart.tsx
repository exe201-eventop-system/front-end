import { useState, useEffect, useCallback, useRef } from "react";
import { itemCart, rentalOption } from "../../types/Cart/Cart.type";
import { FiTrash2, FiShoppingBag, FiCalendar, FiClock, FiAlertTriangle } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../features/store";
import { deleteCartItem, getAllCart, checkoutCart } from "../../features/Cart/cartThunk";
import Loading from "../../components/common/Loading";
import ErrorMessage from "../../components/common/ErrorMessage";
import { rentalTypeMap } from "../../types/Package/PackageType.type";
import BookingSchedule from "./Component/BookingSchedule";
import dayjs from "dayjs";
import { UsedService } from "../../types/Transaction/Payment.types";
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getUserPayload } from "../../utils/jwt/JwtHelper";
dayjs.extend(utc);
dayjs.extend(timezone);

// Interface cho dịch vụ đã được gom nhóm
interface GroupedService {
    serviceId: string;
    supplierId: string;
    supplierName: string;
    serviceName: string;
    category: string;
    thumbnail: string;
    rentalOptions: rentalOption[];
    items: itemCart[];
    selectedPackages: { [cartItemId: string]: string };
    durations: { [cartItemId: string]: number };
    schedules: {
        [cartItemId: string]: {
            start: string | null,
            end: string | null,
            selectedDate: string | null
        }
    };
    timeConflicts: { [cartItemId: string]: string[] };
    isExpanded?: boolean;
}

const Cart = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { carts, loading, error } = useSelector((state: RootState) => state.cart);

    const [cartItems, setCartItems] = useState<itemCart[]>([]);
    const [groupedServices, setGroupedServices] = useState<GroupedService[]>([]);
    const [selectingServiceId, setSelectingServiceId] = useState<string | null>(null);
    const [selectingCartItemId, setSelectingCartItemId] = useState<string | null>(null);

    const handleCheckout = () => {
        const usedServices: UsedService = {
            price: 0,
            services: []
        };

        const customerProfile = getUserPayload();
        const customerPhone = customerProfile?.PhoneNumber || ""
        const customer_name = customerProfile?.UserName || ""
        const customer_address = customerProfile?.Address || ""
        groupedServices.forEach(service => {
            service.items.forEach(item => {
                const selectedPackage = service.selectedPackages[item.cartItem];
                const selectedOption = service.rentalOptions?.find(opt => opt.package_name === selectedPackage);
                const schedule = service.schedules[item.cartItem];

                if (!selectedOption || !schedule?.start || !schedule?.end || !schedule?.selectedDate) return;

                const rentStartTime = `${schedule.selectedDate}T${schedule.start}:00`;
                const rentEndTime = `${schedule.selectedDate}T${schedule.end}:00`;

                const durationInHours = (dayjs(rentEndTime).diff(dayjs(rentStartTime), 'minute')) / 60;

                const totalPrice = selectedOption.price * durationInHours;
                usedServices.price += totalPrice;
                usedServices.services.push({
                    service_id: service.serviceId,
                    supplier_name: item.supllierName,
                    customer_name: customer_name,
                    supplier_id: service.supplierId,
                    service_name: service.serviceName,
                    phone: customerPhone,
                    thumbnail_service: service.thumbnail,
                    location: customer_address,
                    price: totalPrice,
                    rent_start_time: rentStartTime,
                    rent_end_time: rentEndTime,
                });
            });
        });

        dispatch(checkoutCart(usedServices));
    };

    const groupedServicesRef = useRef<GroupedService[]>([]);

    useEffect(() => {
        groupedServicesRef.current = groupedServices;
    }, [groupedServices]);

    useEffect(() => {
        dispatch(getAllCart());
    }, [dispatch]);

    useEffect(() => {
        if (carts) {
            setCartItems(carts.content);
        }
    }, [carts]);

    useEffect(() => {
        const grouped = cartItems.reduce((acc, item) => {
            const existingGroup = acc.find(group =>
                group.serviceId === item.serviceId &&
                group.serviceName === item.serviceName
            );

            if (existingGroup) {
                existingGroup.items.push(item);
            } else {
                acc.push({
                    serviceId: item.serviceId,
                    supplierId: item.supllierId, // Lưu supplierId
                    serviceName: item.serviceName,
                    supplierName: item.supllierName,
                    category: item.category,
                    thumbnail: item.thumbnail,
                    rentalOptions: item.rentalOptions || [],
                    items: [item],
                    selectedPackages: {},
                    durations: {},
                    schedules: {},
                    timeConflicts: {},
                    isExpanded: false, // Mặc định đóng
                });
            }
            return acc;
        }, [] as GroupedService[]);

        setGroupedServices(grouped);
    }, [cartItems]);


    // Memoize the isTimeSlotOccupied function
    const isTimeSlotOccupied = useCallback((
        date: string,
        startTime: string,
        endTime: string,
        currentItemId: string
    ): boolean => {
        console.log(date, startTime, endTime, currentItemId);
        return false;
    }, []);

    // Đã có khai báo checkTimeConflict trả về [] ở phía trên, không cần khai báo lại ở bất kỳ vị trí nào khác trong file này.
    // Nếu có khai báo checkTimeConflict nào khác ngoài đoạn sau, hãy xoá đi:
    const checkTimeConflict = useCallback((
        currentItemId: string,
        selectedDate: string,
        startTime: string,
        endTime: string,
        currentSupplierId: string
    ): string[] => {
        console.log(currentItemId, selectedDate, startTime, endTime, currentSupplierId);
        return [];
    }, []);



    const handleScheduleChange = useCallback((
        serviceId: string,
        cartItemId: string,
        duration: number,
        start: string | undefined,
        end: string | undefined,
        selectedDate: string | undefined
    ) => {
        setGroupedServices(prev => prev.map(service => {
            if (service.serviceId === serviceId) {
                const currentSchedule = service.schedules[cartItemId] || { start: null, end: null, selectedDate: null };
                const currentDuration = service.durations[cartItemId] || 0;
                let conflicts: string[] = [];

                // Chỉ tính xung đột nếu có đủ thông tin và giá trị thay đổi
                if (
                    start && end && selectedDate &&
                    (start !== currentSchedule.start || end !== currentSchedule.end || selectedDate !== currentSchedule.selectedDate)
                ) {
                    conflicts = checkTimeConflict(cartItemId, selectedDate, start, end, service.supplierId);
                } else if (!start || !end || !selectedDate) {
                    conflicts = []; // Xóa xung đột nếu không có lịch
                } else {
                    conflicts = service.timeConflicts[cartItemId] || []; // Giữ nguyên xung đột cũ
                }

                // Chỉ cập nhật nếu có thay đổi
                if (
                    duration !== currentDuration ||
                    start !== currentSchedule.start ||
                    end !== currentSchedule.end ||
                    selectedDate !== currentSchedule.selectedDate ||
                    JSON.stringify(conflicts) !== JSON.stringify(service.timeConflicts[cartItemId] || [])
                ) {
                    const updatedService = {
                        ...service,
                        durations: { ...service.durations, [cartItemId]: duration },
                        schedules: {
                            ...service.schedules,
                            [cartItemId]: {
                                start: start || null,
                                end: end || null,
                                selectedDate: selectedDate || null
                            }
                        },
                        timeConflicts: { ...service.timeConflicts, [cartItemId]: conflicts }
                    };

                    // Đã loại bỏ logic đồng bộ lịch giữa các dịch vụ cùng supplier
                    return updatedService;
                }
            }
            return service;
        }));
    }, [checkTimeConflict]);

    const handleSelectPackage = useCallback((serviceId: string, cartItemId: string, packageName: string) => {
        setGroupedServices(prev => prev.map(service => {
            if (service.serviceId === serviceId) {
                return {
                    ...service,
                    selectedPackages: { ...service.selectedPackages, [cartItemId]: packageName },
                    // Reset duration và schedule khi đổi package
                    durations: { ...service.durations, [cartItemId]: 0 },
                    schedules: {
                        ...service.schedules,
                        [cartItemId]: {
                            start: null,
                            end: null,
                            selectedDate: null
                        }
                    },
                    timeConflicts: { ...service.timeConflicts, [cartItemId]: [] }
                };
            }
            return service;
        }));
    }, []);
    // Xóa toàn bộ dịch vụ
    const removeService = async (serviceId: string) => {
        const service = groupedServices.find(s => s.serviceId === serviceId);
        if (service) {
            try {
                // Xóa từng item trong service
                for (const item of service.items) {
                    await dispatch(deleteCartItem({ id_cart_item: item.cartItem })).unwrap();
                }

                // Cập nhật state
                setCartItems((prev) => prev.filter((item) => !service.items.some(si => si.cartItem === item.cartItem)));
                setGroupedServices(prev => prev.filter(service => service.serviceId !== serviceId));
            } catch (error) {
                console.error('Lỗi khi xóa service:', error);
            }
        }
    };

    const getPackageType = (packageName: string): "hour" | "date" | "recurring" => {
        if (packageName === "Theo giờ") return "hour";
        if (packageName === "Theo ngày") return "date";
        return "recurring";
    };

    const calculateServiceTotal = (service: GroupedService) => {
        return service.items.reduce((total, item) => {
            const selectedPackage = service.selectedPackages[item.cartItem];
            const selectedOption = service.rentalOptions?.find((opt) => opt.package_name === selectedPackage);
            const duration = service.durations[item.cartItem] || 0;

            if (!selectedOption || duration === 0) return total;

            const packageType = getPackageType(selectedPackage);

            let itemTotal = 0;
            if (packageType === "hour") {
                const minimumHours = selectedOption.minimum_hours || 1;
                const actualHours = Math.max(duration, minimumHours);

                itemTotal = selectedOption.price * actualHours;

            } else if (packageType === "date" || packageType === "recurring") {
                itemTotal = selectedOption.price;
            }

            return total + itemTotal;
        }, 0);
    };

    // Thêm hàm kiểm tra dịch vụ đã đủ schedule
    const isServiceReady = (service: GroupedService) => {
        return service.items.every(item => {
            const schedule = service.schedules[item.cartItem];
            return schedule && schedule.selectedDate && schedule.start && schedule.end;
        });
    };

    const calculateTotal = () => {
        return groupedServices.filter(isServiceReady).reduce((total, service) => {
            return total + calculateServiceTotal(service);
        }, 0);
    };

    const getDurationText = (packageType: "hour" | "date" | "recurring", duration: number, selectedOption?: rentalOption) => {
        switch (packageType) {
            case "hour":
                const minimumHours = selectedOption?.minimum_hours || 1;
                if (duration < minimumHours) {
                    return `${duration} giờ (tối thiểu ${minimumHours} giờ)`;
                }
                return `${duration} giờ`;
            case "date":
                return duration > 0 ? `${duration} giờ sử dụng` : "1 ngày";
            case "recurring":
                return "1 tuần";
            default:
                return "";
        }
    };

    const getPriceText = (packageType: "hour" | "date" | "recurring", price: number, selectedOption?: rentalOption) => {
        switch (packageType) {
            case "hour":
                const overtimePrice = selectedOption?.overtime_price || 0;
                let priceText = `${price.toLocaleString("vi-VN")}đ/giờ`;
                if (overtimePrice > 0) {
                    priceText += ` ,  ${overtimePrice.toLocaleString("vi-VN")}đ phụ phí/giờ`;
                }
                return priceText;
            case "date":
                return `${price.toLocaleString("vi-VN")}đ/ngày`;
            case "recurring":
                return `${price.toLocaleString("vi-VN")}đ/tuần`;
            default:
                return `${price.toLocaleString("vi-VN")}đ`;
        }
    };

    // Hàm kiểm tra xem service có đang được chọn không
    const isServiceSelecting = (serviceId: string, cartItemId: string) => {
        return selectingServiceId === serviceId && selectingCartItemId === cartItemId;
    };

    // Hàm kiểm tra xem service có bị disable không
    const isServiceDisabled = (serviceId: string, cartItemId: string) => {
        // Nếu có service đang được chọn và không phải là service hiện tại
        if (selectingServiceId && selectingCartItemId) {
            return !(selectingServiceId === serviceId && selectingCartItemId === cartItemId);
        }
        return false;
    };

    // Hàm xử lý khi bắt đầu chọn lịch
    const handleSelectionStart = (serviceId: string, cartItemId: string) => {
        setSelectingServiceId(serviceId);
        setSelectingCartItemId(cartItemId);
    };

    // Hàm xử lý khi kết thúc chọn lịch
    const handleSelectionEnd = () => {
        setSelectingServiceId(null);
        setSelectingCartItemId(null);
    };



    if (loading) return <Loading />;
    if (error) return <ErrorMessage />;

    return (
        <>
            <div className="container mx-auto px-4 py-8 mt-20">
                <h1 className="text-3xl font-bold mb-8">Giỏ hàng của bạn</h1>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2">
                        {groupedServices.length === 0 ? (
                            <div className="text-center py-12">
                                <FiShoppingBag className="mx-auto text-6xl text-gray-300 mb-4" />
                                <p className="text-gray-500 text-lg">Giỏ hàng trống.</p>
                            </div>
                        ) : (
                            groupedServices.map((service) => (
                                <div key={service.serviceId} className="border rounded-lg p-6 mb-6 bg-white shadow-sm">
                                    {/* Header của dịch vụ với dropdown */}
                                    <div className="flex items-start gap-4 p-4 border rounded-lg bg-white shadow-sm mb-4">
                                        {/* Hình ảnh dịch vụ */}
                                        <img
                                            src={service.thumbnail}
                                            alt={service.serviceName}
                                            className="w-28 h-28 object-cover rounded-lg flex-shrink-0"
                                        />

                                        {/* Thông tin dịch vụ */}
                                        <div className="flex-grow space-y-3">
                                            {/* Tên dịch vụ + nút mở rộng */}
                                            <div className="flex items-center justify-between">
                                                <h3 className="text-lg font-semibold text-gray-800">{service.serviceName}</h3>
                                            </div>

                                            {/* Phân loại và nhà cung cấp */}
                                            <div className="text-sm text-gray-500 space-y-1">
                                                <p>{service.category}</p>
                                                <p className="text-xs">Nhà cung cấp: {service.supplierName}</p>
                                            </div>

                                            {/* Gói cho thuê theo ngày/giờ - HIỂN THỊ GIÁ */}
                                            <div className="space-y-2 mt-2">
                                                {service.rentalOptions
                                                    .filter((option) => {
                                                        const type = getPackageType(option.package_name);
                                                        return type === "date" || type === "hour";
                                                    })
                                                    .map((option, index) => {
                                                        const type = getPackageType(option.package_name);
                                                        return (
                                                            <div
                                                                key={index}
                                                                className="flex justify-between items-center bg-gray-50 border rounded-md px-3 py-2"
                                                            >
                                                                <span className="text-sm font-medium text-gray-700">
                                                                    {(type === "date" && "🗓️ Theo ngày") || (type === "hour" && "⏰ Theo giờ")}
                                                                </span>
                                                                <span className="text-sm font-semibold text-blue-600">
                                                                    {getPriceText(type, option.price, option)}
                                                                </span>
                                                            </div>
                                                        );
                                                    })}
                                            </div>

                                            {/* Chọn gói cho thuê */}
                                            {service.rentalOptions?.length > 0 && (
                                                <div className="space-y-2">
                                                    <p className="text-sm font-medium text-gray-700">Chọn gói dịch vụ:</p>
                                                    <div className="flex flex-wrap gap-2">
                                                        {service.rentalOptions.map((option, optionIndex) => {
                                                            const isSelected = service.items.some(item =>
                                                                service.selectedPackages[item.cartItem] === option.package_name
                                                            );
                                                            return (
                                                                <button
                                                                    key={optionIndex}
                                                                    type="button"
                                                                    onClick={() => {
                                                                        // Chọn package cho tất cả items trong service
                                                                        service.items.forEach(item => {
                                                                            handleSelectPackage(service.serviceId, item.cartItem, option.package_name);
                                                                        });
                                                                    }}
                                                                    className={`px-4 py-2 border rounded-lg text-sm font-medium transition-colors ${isSelected
                                                                        ? "bg-blue-100 text-blue-700 border-blue-300"
                                                                        : "bg-white text-gray-700 hover:bg-gray-100 border-gray-300"
                                                                        }`}
                                                                >
                                                                    {option.package_name}
                                                                </button>
                                                            );
                                                        })}
                                                    </div>
                                                </div>
                                            )}
                                        </div>

                                        {/* Nút xóa dịch vụ */}
                                        <div className="flex items-start">
                                            <button
                                                onClick={() => removeService(service.serviceId)}
                                                title="Xóa tất cả dịch vụ này"
                                                className="text-red-600 hover:text-red-700 p-2 hover:bg-red-50 rounded-full transition-colors"
                                            >
                                                <FiTrash2 size={20} />
                                            </button>
                                        </div>
                                    </div>

                                    {/* Hiển thị lịch ngay khi có package được chọn */}
                                    {service.items.some(item => service.selectedPackages[item.cartItem]) && (
                                        <div className="mb-4 p-4 bg-gray-50 rounded-lg">
                                            <h4 className="font-medium text-gray-800 mb-3">Lịch đặt dịch vụ:</h4>
                                            <div className="space-y-4">
                                                {service.items.map((item) => {
                                                    const selectedPackage = service.selectedPackages[item.cartItem];
                                                    const packageType = selectedPackage !== undefined ? getPackageType(selectedPackage) : "hour";
                                                    const conflicts = service.timeConflicts[item.cartItem] || [];

                                                    if (!selectedPackage) return null;

                                                    return (
                                                        <div key={item.cartItem} className="bg-white rounded-lg p-4 border">

                                                            {/* Hiển thị cảnh báo xung đột thời gian */}
                                                            {conflicts.length > 0 && (
                                                                <div className="mb-3 p-3 bg-red-50 border border-red-200 rounded-lg">
                                                                    <div className="flex items-start gap-2">
                                                                        <FiAlertTriangle className="text-red-500 mt-0.5 flex-shrink-0" size={16} />
                                                                        <div>
                                                                            <p className="text-sm font-medium text-red-700 mb-1">
                                                                                Xung đột thời gian!
                                                                            </p>
                                                                            <p className="text-xs text-red-600 mb-2">
                                                                                Thời gian này đã được chọn bởi:
                                                                            </p>
                                                                            <ul className="text-xs text-red-600 space-y-1">
                                                                                {conflicts.map((conflict, idx) => (
                                                                                    <li key={idx}>• {conflict}</li>
                                                                                ))}
                                                                            </ul>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            )}

                                                            {/* Booking schedule cho item này */}
                                                            <BookingSchedule
                                                                supplierId={service.supplierId}
                                                                packageLabel={
                                                                    rentalTypeMap[Number(selectedPackage)] ||
                                                                    selectedPackage.toString()
                                                                }
                                                                packageType={packageType}
                                                                minSlotCount={(() => {
                                                                    const selectedOption = service.rentalOptions?.find((opt) => {
                                                                        const isMatch = opt.package_name === selectedPackage;
                                                                        return isMatch;
                                                                    });

                                                                    return selectedOption?.minimum_hours ? selectedOption.minimum_hours * 2 : 3;
                                                                })()}

                                                                onScheduleChange={(duration, start, end, selectedDate) =>
                                                                    handleScheduleChange(service.serviceId, item.cartItem, duration, start, end, selectedDate)
                                                                }
                                                                // Truyền thêm props để disable time slots
                                                                isTimeSlotOccupied={(date, startTime, endTime) =>
                                                                    isTimeSlotOccupied(date, startTime, endTime, item.cartItem)
                                                                }
                                                                disabled={isServiceDisabled(service.serviceId, item.cartItem)}
                                                                isSelecting={isServiceSelecting(service.serviceId, item.cartItem)}
                                                                onSelectionStart={() => handleSelectionStart(service.serviceId, item.cartItem)}
                                                                onSelectionEnd={handleSelectionEnd}
                                                            />
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    )}


                                </div>
                            ))
                        )}
                    </div>

                    <div className="lg:col-span-1">
                        <div className="border rounded-lg p-6 bg-white shadow-sm sticky top-4">
                            <h2 className="text-xl font-semibold mb-6 text-gray-800">Tổng đơn hàng</h2>

                            {groupedServices.filter(isServiceReady).length === 0 ? (
                                <p className="text-gray-500 text-center py-8">Chưa có sản phẩm nào</p>
                            ) : (
                                <div className="space-y-4">
                                    {groupedServices.filter(isServiceReady).map((service) => {
                                        const serviceTotal = calculateServiceTotal(service);

                                        return (
                                            <div key={service.serviceId} className="border-b border-gray-200 pb-4 last:border-b-0">
                                                <div className="flex items-start gap-3 mb-3">
                                                    <img
                                                        src={service.thumbnail}
                                                        alt={service.serviceName}
                                                        className="w-12 h-12 object-cover rounded"
                                                    />
                                                    <div className="flex-grow">
                                                        <h4 className="font-semibold text-gray-800 text-sm">{service.serviceName}</h4>
                                                        <p className="text-xs text-gray-500">{service.category}</p>
                                                        <p className="text-xs text-blue-600">{service.items.length} dịch vụ</p>
                                                    </div>
                                                </div>

                                                <div className="space-y-2 text-sm">
                                                    {service.items.map((item, index) => {
                                                        const selectedPackage = service.selectedPackages[item.cartItem];
                                                        const selectedOption = service.rentalOptions?.find((opt) => opt.package_name === selectedPackage);
                                                        const duration = service.durations[item.cartItem] || 0;
                                                        const schedule = service.schedules[item.cartItem];
                                                        const packageType = selectedPackage !== undefined ? getPackageType(selectedPackage) : "hour";
                                                        const conflicts = service.timeConflicts[item.cartItem] || [];

                                                        if (!selectedOption || duration === 0) return null;

                                                        let itemSubtotal = 0;
                                                        if (packageType === "hour") {
                                                            // Áp dụng minimum_hours và overtime_price
                                                            const minimumHours = selectedOption.minimum_hours || 1;
                                                            const overtimePrice = selectedOption.overtime_price || 0;

                                                            // Nếu thời gian ít hơn minimum_hours, tính theo minimum_hours
                                                            const actualHours = Math.max(duration, minimumHours);
                                                            itemSubtotal = selectedOption.price * actualHours;

                                                            // Thêm phụ phí theo giờ nếu có
                                                            if (overtimePrice > 0) {
                                                                itemSubtotal += overtimePrice * actualHours;
                                                            }
                                                        } else if (packageType === "date" || packageType === "recurring") {
                                                            itemSubtotal = selectedOption.price;
                                                        }

                                                        return (
                                                            <div key={item.cartItem} className="border-l-2 border-gray-200 pl-3 ml-2">
                                                                <div className="flex justify-between text-xs">
                                                                    <span className="text-gray-600">Dịch vụ #{index + 1}:</span>
                                                                    <span className="font-medium">
                                                                        {rentalTypeMap[Number(selectedPackage)] ?? selectedPackage}
                                                                    </span>
                                                                </div>

                                                                <div className="flex justify-between text-xs">
                                                                    <span className="text-gray-600">Đơn giá:</span>
                                                                    <span className="font-medium">
                                                                        {getPriceText(packageType, selectedOption.price, selectedOption)}
                                                                    </span>
                                                                </div>

                                                                <div className="flex justify-between text-xs">
                                                                    <span className="text-gray-600">Thời lượng:</span>
                                                                    <span className="font-medium">
                                                                        {getDurationText(packageType, duration, selectedOption)}
                                                                    </span>
                                                                </div>

                                                                {/* Hiển thị thông tin chi tiết cho gói theo giờ */}


                                                                {schedule?.selectedDate && (
                                                                    <div className="flex items-center gap-1 text-gray-600 text-xs">
                                                                        <FiCalendar size={10} />
                                                                        <span>
                                                                            {dayjs(schedule.selectedDate).format("DD/MM/YYYY")}
                                                                        </span>
                                                                    </div>
                                                                )}

                                                                {schedule?.start && (packageType === "hour" || packageType === "date") && (
                                                                    <div className="flex items-center gap-1 text-gray-600 text-xs">
                                                                        <FiClock size={10} />
                                                                        <span>
                                                                            {schedule.start} - {schedule.end}
                                                                        </span>
                                                                    </div>
                                                                )}

                                                                {conflicts.length > 0 && (
                                                                    <div className="flex items-center gap-1 text-red-500 text-xs">
                                                                        <FiAlertTriangle size={10} />
                                                                        <span>Xung đột thời gian</span>
                                                                    </div>
                                                                )}


                                                            </div>
                                                        );
                                                    })}

                                                    <div className="flex justify-between pt-2 border-t border-gray-200">
                                                        <span className="text-gray-600 font-semibold">Thành tiền:</span>
                                                        <span className="font-bold text-blue-600">
                                                            {serviceTotal.toLocaleString("vi-VN")}đ
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}

                                    <div className="border-t border-gray-200 pt-4">
                                        <div className="flex justify-between items-center">
                                            <span className="text-lg font-semibold text-gray-800">Tổng cộng</span>
                                            <span className="text-xl font-bold text-blue-600">
                                                {calculateTotal().toLocaleString("vi-VN")}đ
                                            </span>
                                        </div>
                                    </div>

                                    <button onClick={handleCheckout} className="w-full bg-gradient-to-r from-fuchsia-500 to-purple-600 px-4 py-3 text-white rounded-lg mt-6 hover:bg-blue-700 transition-colors font-medium flex items-center justify-center gap-2">
                                        <FiShoppingBag size={18} />
                                        Thanh toán
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </>
    );
};

export default Cart;