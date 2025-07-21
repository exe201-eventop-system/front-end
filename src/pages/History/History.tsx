import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Clock, Building2, } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { BookingHistoryDTO } from '../../types/History/bookingHitstory';
import StarRating from "../../components/ui/StarRating";
import { AppDispatch, RootState } from '../../features/store';
import { getBookingHistory } from '../../features/Booking/bookingThunks';
import dayjs from 'dayjs';
import { UsedServiceStatus } from '../../types/Services/Services.type';
import BaseModal from '../../components/ui/BaseModal';
import { feedbackServiceSupplier } from '../../features/Services/serviceThunks';
import { getQuestionSystem, createQuestionSystem } from '../../features/Booking/bookingThunks';
import { toast } from 'react-toastify';
import { getUserPayload } from '../../utils/jwt/JwtHelper';


const History: React.FC = () => {
    const [searchQuery] = useState('');
    const [sortBy] = useState<'date' | 'price'>('date');
    const [sortOrder] = useState<'asc' | 'desc'>('desc');
    const [tab, setTab] = useState<UsedServiceStatus>(UsedServiceStatus.Registered);
    const [openReview, setOpenReview] = useState<null | BookingHistoryDTO>(null);
    const [feedback, setFeedback] = useState({
        service_rating: 5,
        service_feedback: '',
        supplier_rating: 5,
        supplier_feedback: ''
    });
    const [questionList, setQuestionList] = useState<any[]>([]);
    const [questionAnswers, setQuestionAnswers] = useState<{ [id: string]: string }>({});
    const [showQuestionModal, setShowQuestionModal] = useState(false);

    const dispatch = useDispatch<AppDispatch>();
    const { bookingHistory } = useSelector((state: RootState) => state.booking);

    useEffect(() => {
        dispatch(getBookingHistory({ status: tab }));
    }, [dispatch, tab]);

    const filteredBookings = (bookingHistory as BookingHistoryDTO[])
        .filter((booking) => {
            const matchesSearch = booking.serviceName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                booking.supllierName.toLowerCase().includes(searchQuery.toLowerCase());
            return matchesSearch;
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

    const handleSubmitFeedback = async () => {
        if (!openReview) return;
        await dispatch(feedbackServiceSupplier({ id: openReview.id, feedback: feedback }));
        // Sau khi gửi feedback, lấy câu hỏi hệ thống
        const res = await dispatch(getQuestionSystem());
        if (res.payload && typeof res.payload === 'object' && 'data' in res.payload && res.payload.data) {
            setQuestionList(res.payload.data);
            setShowQuestionModal(true);
        }
        setOpenReview(null);
    };
    // Gửi câu trả lời hệ thống
    const handleSubmitQuestions = async () => {
        const user = getUserPayload();
        const userAnswerSystem = {
            user_name: user?.UserName || '',
            user_answers: Object.entries(questionAnswers).map(([question_id, answer]) => ({ question_id, answer }))
        };
        try {
            await dispatch(createQuestionSystem(userAnswerSystem)).unwrap();
            toast.success('Gửi câu trả lời thành công!');
            setShowQuestionModal(false);
            setQuestionAnswers({});
            window.location.reload();
        } catch (error) {
            toast.error('Gửi câu trả lời thất bại. Vui lòng thử lại!');
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
                    </div>

                    {/* Tabs */}
                    <div className="flex gap-4 mb-8">
                        <button
                            className={`px-4 py-2 rounded-lg font-semibold transition-colors ${tab === UsedServiceStatus.Registered ? 'bg-purple-600 text-white' : 'bg-gray-100 text-gray-700'}`}
                            onClick={() => setTab(UsedServiceStatus.Registered)}
                        >
                            Đã đặt
                        </button>
                        <button
                            className={`px-4 py-2 rounded-lg font-semibold transition-colors ${tab === UsedServiceStatus.Returned ? 'bg-purple-600 text-white' : 'bg-gray-100 text-gray-700'}`}
                            onClick={() => setTab(UsedServiceStatus.Returned)}
                        >
                            Đã hoàn thành
                        </button>
                    </div>

                    {/* Booking List */}
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        className="space-y-6"
                    >
                        <AnimatePresence>
                            {filteredBookings.map((booking) => {
                                const isRegisteredTab = tab === UsedServiceStatus.Registered;
                                const isPastEndTime = isRegisteredTab && dayjs(booking.endTime).isBefore(dayjs());
                                return (
                                    <motion.div
                                        key={booking.serviceId + booking.date + booking.startTime}
                                        initial={{ y: 20, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        exit={{ y: 20, opacity: 0 }}
                                        className="group relative bg-white/50 backdrop-blur-sm rounded-2xl border border-purple-100 hover:border-purple-300 transition-all duration-300 overflow-hidden"
                                    >
                                        <div className="flex flex-col md:flex-row">
                                            {/* Thumbnail Section */}
                                            <div className="w-full md:w-48 h-48 md:h-auto relative overflow-hidden flex-shrink-0">
                                                <img
                                                    src={booking.thumbnail}
                                                    alt={booking.serviceName}
                                                    className="w-full h-full object-cover rounded-l-2xl"
                                                />
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
                                                            <span>{booking.supllierName}</span>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                                                    <div className="flex items-center gap-2 text-gray-600">
                                                        <Calendar size={16} className="text-purple-500" />
                                                        <span>{new Date(booking.date).toLocaleDateString('vi-VN')}</span>
                                                    </div>
                                                    <div className="flex items-center gap-2 text-gray-600">
                                                        <Clock size={16} className="text-purple-500" />
                                                        <span>{dayjs(booking.startTime).format('HH:mm')} - {dayjs(booking.endTime).format('HH:mm')}</span>
                                                    </div>
                                                    <div className="text-purple-600 font-semibold">
                                                        {booking.price.toLocaleString()} VNĐ
                                                    </div>
                                                    {/* Nút đánh giá */}
                                                    {isPastEndTime && (
                                                        <button
                                                            className="px-4 py-2 bg-gradient-to-r from-fuchsia-500 to-purple-600 hover:from-fuchsia-600 hover:to-purple-700 text-white font-semibold py-2 rounded-lg transition-colors"
                                                            onClick={() => {
                                                                setOpenReview(booking);
                                                                setFeedback({
                                                                    service_rating: 5,
                                                                    service_feedback: '',
                                                                    supplier_rating: 5,
                                                                    supplier_feedback: ''
                                                                });
                                                            }}
                                                        >
                                                            Đánh giá
                                                        </button>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                );
                            })}
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

            {/* Modal đánh giá dịch vụ */}
            <BaseModal
                isOpen={!!openReview}
                onClose={() => setOpenReview(null)}
                title="Đánh giá dịch vụ"
                message="Hãy để lại đánh giá của bạn về dịch vụ và nhà cung cấp."
            >
                <div className="space-y-4">
                    <div>
                        <label className="block font-medium mb-1">Số sao dịch vụ:</label>
                        <StarRating
                            value={feedback.service_rating}
                            onChange={(val) =>
                                setFeedback((f) => ({ ...f, service_rating: val }))
                            }
                        />
                    </div>

                    <div>
                        <label className="block font-medium mb-1">Nhận xét dịch vụ:</label>
                        <textarea
                            value={feedback.service_feedback}
                            onChange={(e) =>
                                setFeedback((f) => ({ ...f, service_feedback: e.target.value }))
                            }
                            className="border rounded px-2 py-1 w-full"
                        />
                    </div>

                    <div>
                        <label className="block font-medium mb-1">Số sao nhà cung cấp:</label>
                        <StarRating
                            value={feedback.supplier_rating}
                            onChange={(val) =>
                                setFeedback((f) => ({ ...f, supplier_rating: val }))
                            }
                        />
                    </div>

                    <div>
                        <label className="block font-medium mb-1">Nhận xét nhà cung cấp:</label>
                        <textarea
                            value={feedback.supplier_feedback}
                            onChange={(e) =>
                                setFeedback((f) => ({ ...f, supplier_feedback: e.target.value }))
                            }
                            className="border rounded px-2 py-1 w-full"
                        />
                    </div>

                    <button
                        className="w-full bg-gradient-to-r from-fuchsia-500 to-purple-600 text-white py-2 rounded-lg font-semibold mt-4"
                        onClick={handleSubmitFeedback}
                    >
                        Gửi đánh giá
                    </button>
                </div>

            </BaseModal>
            {/* Modal câu hỏi hệ thống */}
            <BaseModal
                isOpen={showQuestionModal}
                onClose={() => setShowQuestionModal(false)}
                title="Đánh giá hệ thống"
                message=""
            >
                <div className="space-y-4">
                    {questionList.map((q: any) => (
                        <div key={q.id}>
                            <label className="block font-medium mb-1">{q.text}</label>
                            <input
                                type="text"
                                className="border rounded px-2 py-1 w-full"
                                value={questionAnswers[q.id] || ''}
                                onChange={e => setQuestionAnswers(ans => ({ ...ans, [q.id]: e.target.value }))}
                            />
                        </div>
                    ))}
                    <button className="w-full bg-gradient-to-r from-fuchsia-500 to-purple-600 text-white py-2 rounded-lg font-semibold mt-4" onClick={handleSubmitQuestions}>
                        Gửi trả lời
                    </button>
                </div>
            </BaseModal>
        </div>
    );
};

export default History;