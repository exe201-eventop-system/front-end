import { useState } from 'react';
import { Star, MapPin, Phone, Mail, Globe, Users, Calendar, Award, Building2, Clock, CheckCircle2, ChevronLeft, ChevronRight } from 'lucide-react';

// Mock data for supplier details
const mockSupplierDetails = {
    id: '1',
    name: 'EventPro Solutions',
    description: 'Nhà cung cấp dịch vụ sự kiện hàng đầu với hơn 10 năm kinh nghiệm trong ngành. Chúng tôi cam kết mang đến những trải nghiệm đáng nhớ cho mọi sự kiện.',
    rating: 4.8,
    reviews: 156,
    location: 'Hà Nội',
    verified: true,
    establishedYear: 2013,
    employeeCount: 50,
    completedEvents: 500,
    contact: {
        phone: '0987654321',
        email: 'contact@eventpro.vn',
        website: 'www.eventpro.vn',
        address: '123 Đường ABC, Quận XYZ, Hà Nội'
    },
    services: [
        {
            id: '1',
            name: 'Tổ Chức Sự Kiện',
            description: 'Dịch vụ tổ chức sự kiện chuyên nghiệp từ A-Z',
            price: 5000000,
            category: 'Sự kiện',
            rating: 4.9
        },
        {
            id: '2',
            name: 'Trang Trí Sân Khấu',
            description: 'Thiết kế và trang trí sân khấu độc đáo',
            price: 3000000,
            category: 'Trang trí',
            rating: 4.7
        },
        {
            id: '3',
            name: 'Âm Thanh Ánh Sáng',
            description: 'Hệ thống âm thanh và ánh sáng chuyên nghiệp',
            price: 4000000,
            category: 'Âm thanh',
            rating: 4.8
        }
    ],
    achievements: [
        'Top 10 nhà cung cấp dịch vụ sự kiện uy tín 2023',
        'Chứng nhận ISO 9001:2015',
        'Giải thưởng "Nhà cung cấp dịch vụ xuất sắc" 2022',
        'Đối tác chiến lược của nhiều thương hiệu lớn'
    ],
    images: [
        'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80'
    ],
    recentReviews: [
        {
            id: '1',
            userName: 'Nguyễn Văn A',
            rating: 5,
            comment: 'Dịch vụ rất chuyên nghiệp, đội ngũ nhiệt tình và sáng tạo.',
            date: '2024-02-15'
        },
        {
            id: '2',
            userName: 'Trần Thị B',
            rating: 4,
            comment: 'Sự kiện được tổ chức rất tốt, chỉ có một vài điểm nhỏ cần cải thiện.',
            date: '2024-02-10'
        }
    ]
};

// Add new mock data for schedule
const mockScheduleData = {
    workingHours: {
        start: '08:00',
        end: '18:00'
    },
    bookedSlots: [
        {
            id: '1',
            startTime: '09:00',
            endTime: '11:00',
            customerName: 'Nguyễn Văn A',
            eventName: 'Họp nhóm dự án',
            status: 'confirmed'
        },
        {
            id: '2',
            startTime: '13:00',
            endTime: '15:00',
            customerName: 'Trần Thị B',
            eventName: 'Tiệc sinh nhật',
            status: 'pending'
        }
    ],
    availableSlots: [
        { startTime: '08:00', endTime: '09:00' },
        { startTime: '11:00', endTime: '13:00' },
        { startTime: '15:00', endTime: '18:00' }
    ]
};

// Add type for slot
interface TimeSlot {
    startTime: string;
    endTime: string;
}

// interface BookedSlot extends TimeSlot {
//     id: string;
//     customerName: string;
//     eventName: string;
//     status: 'confirmed' | 'pending';
// }

// Add new component for Schedule
const ScheduleSection = () => {
    const [selectedDate, setSelectedDate] = useState<Date>(new Date());
    const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(null);

    const formatDate = (date: Date) => {
        return date.toLocaleDateString('vi-VN', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const handlePrevDay = () => {
        const newDate = new Date(selectedDate);
        newDate.setDate(newDate.getDate() - 1);
        setSelectedDate(newDate);
    };

    const handleNextDay = () => {
        const newDate = new Date(selectedDate);
        newDate.setDate(newDate.getDate() + 1);
        setSelectedDate(newDate);
    };

    // const isSlotBooked = (startTime: string) => {
    //     return mockScheduleData.bookedSlots.some(slot => slot.startTime === startTime);
    // };

    // const getBookedSlotInfo = (startTime: string) => {
    //     return mockScheduleData.bookedSlots.find(slot => slot.startTime === startTime);
    // };

    return (
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-purple-800 mb-6">Lịch đặt dịch vụ</h2>

            {/* Date Navigation */}
            <div className="flex items-center justify-between mb-6">
                <button
                    onClick={handlePrevDay}
                    className="p-2 hover:bg-purple-50 rounded-full transition-colors"
                >
                    <ChevronLeft className="text-purple-600" size={24} />
                </button>
                <div className="text-xl font-semibold text-purple-800">
                    {formatDate(selectedDate)}
                </div>
                <button
                    onClick={handleNextDay}
                    className="p-2 hover:bg-purple-50 rounded-full transition-colors"
                >
                    <ChevronRight className="text-purple-600" size={24} />
                </button>
            </div>

            {/* Time Slots Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Available Slots */}
                <div>
                    <h3 className="text-lg font-semibold text-purple-800 mb-4">Khung giờ trống</h3>
                    <div className="space-y-3">
                        {mockScheduleData.availableSlots.map((slot, index) => (
                            <button
                                key={index}
                                onClick={() => setSelectedSlot(slot)}
                                className={`w-full p-4 rounded-xl border-2 transition-all ${selectedSlot?.startTime === slot.startTime
                                    ? 'border-purple-500 bg-purple-50'
                                    : 'border-purple-100 hover:border-purple-300'
                                    }`}
                            >
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <Clock className="text-purple-500" size={20} />
                                        <span className="font-medium">
                                            {slot.startTime} - {slot.endTime}
                                        </span>
                                    </div>
                                    <span className="text-green-600 text-sm font-medium">Có sẵn</span>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Booked Slots */}
                <div>
                    <h3 className="text-lg font-semibold text-purple-800 mb-4">Đã đặt</h3>
                    <div className="space-y-3">
                        {mockScheduleData.bookedSlots.map((slot) => (
                            <div
                                key={slot.id}
                                className="p-4 rounded-xl border-2 border-purple-100 bg-purple-50"
                            >
                                <div className="flex items-center justify-between mb-2">
                                    <div className="flex items-center gap-2">
                                        <Clock className="text-purple-500" size={20} />
                                        <span className="font-medium">
                                            {slot.startTime} - {slot.endTime}
                                        </span>
                                    </div>
                                    <span className={`text-sm font-medium px-2 py-1 rounded-full ${slot.status === 'confirmed'
                                        ? 'bg-green-100 text-green-700'
                                        : 'bg-yellow-100 text-yellow-700'
                                        }`}>
                                        {slot.status === 'confirmed' ? 'Đã xác nhận' : 'Đang chờ'}
                                    </span>
                                </div>
                                <div className="text-sm text-gray-600">
                                    <p>Khách hàng: {slot.customerName}</p>
                                    <p>Sự kiện: {slot.eventName}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Booking Form */}
            {selectedSlot && (
                <div className="mt-8 p-6 bg-purple-50 rounded-xl">
                    <h3 className="text-lg font-semibold text-purple-800 mb-4">
                        Đặt lịch cho khung giờ {selectedSlot.startTime} - {selectedSlot.endTime}
                    </h3>
                    <form className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Tên khách hàng
                            </label>
                            <input
                                type="text"
                                className="w-full px-4 py-2 rounded-lg border border-purple-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none"
                                placeholder="Nhập tên khách hàng"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Tên sự kiện
                            </label>
                            <input
                                type="text"
                                className="w-full px-4 py-2 rounded-lg border border-purple-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none"
                                placeholder="Nhập tên sự kiện"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Ghi chú
                            </label>
                            <textarea
                                className="w-full px-4 py-2 rounded-lg border border-purple-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none"
                                rows={3}
                                placeholder="Nhập ghi chú (nếu có)"
                            />
                        </div>
                        <div className="flex gap-4">
                            <button
                                type="submit"
                                className="flex-1 bg-gradient-to-r from-purple-500 to-fuchsia-500 hover:from-purple-600 hover:to-fuchsia-600 text-white font-semibold py-3 rounded-xl transition"
                            >
                                Xác nhận đặt lịch
                            </button>
                            <button
                                type="button"
                                onClick={() => setSelectedSlot(null)}
                                className="flex-1 bg-white hover:bg-purple-50 text-purple-600 font-semibold py-3 rounded-xl transition border-2 border-purple-200"
                            >
                                Hủy
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
};

const SupplierDetail = () => {
    // Comment out unused id variable
    // const { id } = useParams<{ id: string }>();
    const [selectedImage, setSelectedImage] = useState<number>(0);

    return (
        <div className="min-h-screen bg-gradient-to-br from-white via-purple-50 to-purple-100 pt-24 pb-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Hero Section */}
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8">
                    <div className="relative h-[400px]">
                        <img
                            src={mockSupplierDetails.images[selectedImage]}
                            alt={mockSupplierDetails.name}
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                        <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                            <div className="flex items-center gap-3 mb-4">
                                <h1 className="text-4xl font-bold">{mockSupplierDetails.name}</h1>
                                {mockSupplierDetails.verified && (
                                    <span className="bg-green-500 text-white text-sm px-3 py-1 rounded-full flex items-center gap-1">
                                        <CheckCircle2 size={16} />
                                        Đã xác minh
                                    </span>
                                )}
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="flex items-center gap-1">
                                    <Star className="text-yellow-400" size={20} />
                                    <span className="font-semibold">{mockSupplierDetails.rating}</span>
                                    <span className="text-gray-300">({mockSupplierDetails.reviews} đánh giá)</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <MapPin className="text-purple-300" size={20} />
                                    <span>{mockSupplierDetails.location}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <Building2 className="text-purple-300" size={20} />
                                    <span>Thành lập {mockSupplierDetails.establishedYear}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Thumbnail Gallery */}
                    <div className="p-4 flex gap-4 overflow-x-auto">
                        {mockSupplierDetails.images.map((image, index) => (
                            <button
                                key={index}
                                onClick={() => setSelectedImage(index)}
                                className={`flex-shrink-0 w-24 h-24 rounded-lg overflow-hidden border-2 transition-all ${selectedImage === index ? 'border-purple-500' : 'border-transparent'
                                    }`}
                            >
                                <img src={image} alt={`Thumbnail ${index + 1}`} className="w-full h-full object-cover" />
                            </button>
                        ))}
                    </div>
                </div>

                {/* Content Section */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2">
                        {/* About Section */}
                        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
                            <h2 className="text-2xl font-bold text-purple-800 mb-4">Giới thiệu</h2>
                            <p className="text-gray-700 leading-relaxed mb-6">{mockSupplierDetails.description}</p>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                                <div className="bg-purple-50 rounded-xl p-4 text-center">
                                    <Users className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                                    <div className="text-2xl font-bold text-purple-800">{mockSupplierDetails.employeeCount}+</div>
                                    <div className="text-gray-600">Nhân viên</div>
                                </div>
                                <div className="bg-purple-50 rounded-xl p-4 text-center">
                                    <Calendar className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                                    <div className="text-2xl font-bold text-purple-800">{mockSupplierDetails.completedEvents}+</div>
                                    <div className="text-gray-600">Sự kiện đã tổ chức</div>
                                </div>
                                <div className="bg-purple-50 rounded-xl p-4 text-center">
                                    <Award className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                                    <div className="text-2xl font-bold text-purple-800">{mockSupplierDetails.achievements.length}</div>
                                    <div className="text-gray-600">Giải thưởng</div>
                                </div>
                            </div>

                            <h3 className="text-xl font-semibold text-purple-800 mb-4">Thành tựu nổi bật</h3>
                            <div className="space-y-3">
                                {mockSupplierDetails.achievements.map((achievement, index) => (
                                    <div key={index} className="flex items-center gap-2">
                                        <Award className="text-purple-500" size={20} />
                                        <span className="text-gray-700">{achievement}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Add Schedule Section */}
                        <ScheduleSection />

                        {/* Services Section */}
                        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
                            <h2 className="text-2xl font-bold text-purple-800 mb-6">Dịch vụ cung cấp</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {mockSupplierDetails.services.map((service) => (
                                    <div key={service.id} className="bg-purple-50 rounded-xl p-6">
                                        <div className="flex items-center justify-between mb-3">
                                            <h3 className="text-lg font-semibold text-purple-800">{service.name}</h3>
                                            <div className="flex items-center gap-1">
                                                <Star className="text-yellow-400" size={16} />
                                                <span className="text-sm font-medium">{service.rating}</span>
                                            </div>
                                        </div>
                                        <p className="text-gray-600 text-sm mb-3">{service.description}</p>
                                        <div className="flex items-center justify-between">
                                            <span className="text-purple-600 font-semibold">
                                                {service.price.toLocaleString()} VNĐ
                                            </span>
                                            <button className="text-purple-600 hover:text-purple-800 font-medium text-sm">
                                                Xem chi tiết →
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Reviews Section */}
                        <div className="bg-white rounded-2xl shadow-lg p-8">
                            <h2 className="text-2xl font-bold text-purple-800 mb-6">Đánh giá từ khách hàng</h2>
                            <div className="space-y-6">
                                {mockSupplierDetails.recentReviews.map((review) => (
                                    <div key={review.id} className="border-b border-purple-100 pb-6 last:border-0 last:pb-0">
                                        <div className="flex items-center justify-between mb-3">
                                            <div className="flex items-center gap-2">
                                                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                                                    <span className="text-purple-600 font-semibold">
                                                        {review.userName.charAt(0)}
                                                    </span>
                                                </div>
                                                <div>
                                                    <div className="font-semibold text-gray-800">{review.userName}</div>
                                                    <div className="text-sm text-gray-500">{review.date}</div>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <Star className="text-yellow-400" size={16} />
                                                <span className="font-medium">{review.rating}</span>
                                            </div>
                                        </div>
                                        <p className="text-gray-700">{review.comment}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24">
                            <h3 className="text-xl font-bold text-purple-800 mb-4">Thông tin liên hệ</h3>
                            <div className="space-y-4">
                                <div className="flex items-center gap-3 text-gray-700">
                                    <MapPin className="text-purple-500" size={20} />
                                    <span>{mockSupplierDetails.contact.address}</span>
                                </div>
                                <div className="flex items-center gap-3 text-gray-700">
                                    <Phone className="text-purple-500" size={20} />
                                    <span>{mockSupplierDetails.contact.phone}</span>
                                </div>
                                <div className="flex items-center gap-3 text-gray-700">
                                    <Mail className="text-purple-500" size={20} />
                                    <span>{mockSupplierDetails.contact.email}</span>
                                </div>
                                <div className="flex items-center gap-3 text-gray-700">
                                    <Globe className="text-purple-500" size={20} />
                                    <a
                                        href={`https://${mockSupplierDetails.contact.website}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-purple-600 hover:text-purple-800"
                                    >
                                        {mockSupplierDetails.contact.website}
                                    </a>
                                </div>
                            </div>

                            <div className="mt-6 pt-6 border-t border-purple-100">
                                <h4 className="font-semibold text-purple-800 mb-3">Thời gian làm việc</h4>
                                <div className="space-y-2">
                                    <div className="flex justify-between text-gray-700">
                                        <span>Thứ 2 - Thứ 6</span>
                                        <span>8:00 - 18:00</span>
                                    </div>
                                    <div className="flex justify-between text-gray-700">
                                        <span>Thứ 7</span>
                                        <span>8:00 - 12:00</span>
                                    </div>
                                    <div className="flex justify-between text-gray-700">
                                        <span>Chủ nhật</span>
                                        <span>Nghỉ</span>
                                    </div>
                                </div>
                            </div>

                            <button className="w-full mt-6 bg-gradient-to-r from-purple-500 to-fuchsia-500 hover:from-purple-600 hover:to-fuchsia-600 text-white font-semibold py-3 rounded-xl transition">
                                Liên hệ ngay
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SupplierDetail; 