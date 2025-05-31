import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Clock, MapPin, Building2, CheckCircle2, XCircle, Clock as ClockIcon, ChevronRight, Search, Filter, ArrowUpDown } from 'lucide-react';

// Mock data for booking history
const mockBookingHistory = [
    {
        id: '1',
        serviceName: 'Tổ Chức Sự Kiện',
        supplierName: 'EventPro Solutions',
        date: '2024-03-15',
        startTime: '09:00',
        endTime: '11:00',
        status: 'completed',
        location: 'Hà Nội',
        price: 5000000,
        eventName: 'Họp nhóm dự án',
        description: 'Họp nhóm dự án tháng 3 với các thành viên từ các phòng ban khác nhau',
        image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
    },
    {
        id: '2',
        serviceName: 'Trang Trí Sân Khấu',
        supplierName: 'Decor Plus',
        date: '2024-03-20',
        startTime: '13:00',
        endTime: '15:00',
        status: 'upcoming',
        location: 'Hà Nội',
        price: 3000000,
        eventName: 'Tiệc sinh nhật',
        description: 'Tiệc sinh nhật cho nhân viên công ty với chủ đề Retro',
        image: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
    },
    {
        id: '3',
        serviceName: 'Âm Thanh Ánh Sáng',
        supplierName: 'Sound & Light Pro',
        date: '2024-02-28',
        startTime: '15:00',
        endTime: '17:00',
        status: 'cancelled',
        location: 'Hà Nội',
        price: 4000000,
        eventName: 'Hội thảo công nghệ',
        description: 'Hội thảo về công nghệ mới trong lĩnh vực phát triển phần mềm',
        image: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
    }
];

const History: React.FC = () => {
    const [filter, setFilter] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedBooking, setSelectedBooking] = useState<string | null>(null);
    const [sortBy, setSortBy] = useState<'date' | 'price'>('date');
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

    const filteredBookings = mockBookingHistory
        .filter(booking => {
            const matchesFilter = filter === 'all' || booking.status === filter;
            const matchesSearch = booking.eventName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                booking.serviceName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                booking.supplierName.toLowerCase().includes(searchQuery.toLowerCase());
            return matchesFilter && matchesSearch;
        })
        .sort((a, b) => {
            if (sortBy === 'date') {
                return sortOrder === 'asc'
                    ? new Date(a.date).getTime() - new Date(b.date).getTime()
                    : new Date(b.date).getTime() - new Date(a.date).getTime();
            } else {
                return sortOrder === 'asc'
                    ? a.price - b.price
                    : b.price - a.price;
            }
        });

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'completed':
                return 'bg-gradient-to-r from-emerald-400 to-green-500';
            case 'upcoming':
                return 'bg-gradient-to-r from-blue-400 to-indigo-500';
            case 'cancelled':
                return 'bg-gradient-to-r from-red-400 to-pink-500';
            default:
                return 'bg-gradient-to-r from-gray-400 to-gray-500';
        }
    };

    const getStatusText = (status: string) => {
        switch (status) {
            case 'completed':
                return 'Đã hoàn thành';
            case 'upcoming':
                return 'Sắp tới';
            case 'cancelled':
                return 'Đã hủy';
            default:
                return status;
        }
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.5
            }
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-white via-purple-50 to-purple-100 pt-24 pb-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-xl p-8 border border-purple-100"
                >
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
                        <div>
                            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
                                Lịch sử đặt lịch
                            </h1>
                            <p className="text-gray-500">Quản lý và theo dõi các lịch đặt dịch vụ của bạn</p>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 mt-4 md:mt-0">
                            {/* Search Bar */}
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Tìm kiếm lịch đặt..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full md:w-64 px-4 py-2 pl-10 rounded-xl border border-purple-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all bg-white/50 backdrop-blur-sm"
                                />
                                <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
                            </div>

                            {/* Sort Button */}
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => {
                                    setSortBy(sortBy === 'date' ? 'price' : 'date');
                                    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
                                }}
                                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-purple-50 text-purple-600 hover:bg-purple-100 transition-colors"
                            >
                                <ArrowUpDown size={20} />
                                <span>Sắp xếp theo {sortBy === 'date' ? 'ngày' : 'giá'}</span>
                            </motion.button>
                        </div>
                    </div>

                    {/* Filter Buttons */}
                    <div className="flex flex-wrap gap-4 mb-8">
                        {['all', 'upcoming', 'completed', 'cancelled'].map((status) => (
                            <motion.button
                                key={status}
                                onClick={() => setFilter(status)}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className={`px-6 py-2.5 rounded-xl text-sm font-medium transition-all ${filter === status
                                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                                    : 'bg-purple-50 text-purple-600 hover:bg-purple-100'
                                    }`}
                            >
                                {status === 'all' ? 'Tất cả' : getStatusText(status)}
                            </motion.button>
                        ))}
                    </div>

                    {/* Booking List */}
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="space-y-6"
                    >
                        <AnimatePresence>
                            {filteredBookings.map((booking) => (
                                <motion.div
                                    key={booking.id}
                                    variants={itemVariants}
                                    layout
                                    className="group relative bg-white/50 backdrop-blur-sm rounded-2xl border border-purple-100 hover:border-purple-300 transition-all duration-300 overflow-hidden"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />

                                    <div className="flex flex-col md:flex-row">
                                        {/* Image Section */}
                                        <div className="w-full md:w-48 h-48 md:h-auto relative overflow-hidden">
                                            <img
                                                src={booking.image}
                                                alt={booking.serviceName}
                                                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                        </div>

                                        {/* Content Section */}
                                        <div className="flex-1 p-6">
                                            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
                                                <div>
                                                    <h3 className="text-xl font-semibold text-purple-800 group-hover:text-purple-600 transition-colors">
                                                        {booking.serviceName}
                                                    </h3>
                                                    <div className="flex items-center gap-2 text-gray-600 mt-1">
                                                        <Building2 size={16} className="text-purple-500" />
                                                        <span>{booking.supplierName}</span>
                                                    </div>
                                                </div>
                                                <div className={`px-4 py-1.5 rounded-full text-sm font-medium text-white ${getStatusColor(booking.status)}`}>
                                                    {getStatusText(booking.status)}
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                                                <div className="flex items-center gap-2 text-gray-600">
                                                    <Calendar size={16} className="text-purple-500" />
                                                    <span>{new Date(booking.date).toLocaleDateString('vi-VN')}</span>
                                                </div>
                                                <div className="flex items-center gap-2 text-gray-600">
                                                    <Clock size={16} className="text-purple-500" />
                                                    <span>{booking.startTime} - {booking.endTime}</span>
                                                </div>
                                                <div className="flex items-center gap-2 text-gray-600">
                                                    <MapPin size={16} className="text-purple-500" />
                                                    <span>{booking.location}</span>
                                                </div>
                                                <div className="text-purple-600 font-semibold">
                                                    {booking.price.toLocaleString()} VNĐ
                                                </div>
                                            </div>

                                            <div className="mt-4 pt-4 border-t border-purple-100">
                                                <div className="text-sm text-gray-600">
                                                    <span className="font-medium">Tên sự kiện:</span> {booking.eventName}
                                                </div>
                                                <p className="text-sm text-gray-500 mt-2">{booking.description}</p>
                                            </div>

                                            <div className="mt-4 flex justify-end gap-4">
                                                <motion.button
                                                    whileHover={{ scale: 1.05 }}
                                                    whileTap={{ scale: 0.95 }}
                                                    onClick={() => setSelectedBooking(booking.id)}
                                                    className="flex items-center gap-2 text-purple-600 hover:text-purple-800 font-medium text-sm transition-colors"
                                                >
                                                    Xem chi tiết
                                                    <ChevronRight size={16} />
                                                </motion.button>
                                                {booking.status === 'upcoming' && (
                                                    <motion.button
                                                        whileHover={{ scale: 1.05 }}
                                                        whileTap={{ scale: 0.95 }}
                                                        className="text-red-600 hover:text-red-800 font-medium text-sm transition-colors"
                                                    >
                                                        Hủy lịch
                                                    </motion.button>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </motion.div>

                    {/* Empty State */}
                    {filteredBookings.length === 0 && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-center py-12"
                        >
                            <div className="text-gray-400 mb-4">
                                <Calendar size={48} className="mx-auto" />
                            </div>
                            <h3 className="text-lg font-medium text-gray-900 mb-2">Không tìm thấy lịch đặt nào</h3>
                            <p className="text-gray-500">Hãy thử tìm kiếm với từ khóa khác hoặc thay đổi bộ lọc</p>
                        </motion.div>
                    )}
                </motion.div>
            </div>
        </div>
    );
};

export default History;