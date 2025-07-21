import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { ServiceRating } from "../../../types/Services/ServiceRating.type";
import { getServiceRating } from "../../../features/Services/serviceThunks";
import { useNavigate } from "react-router-dom";

const CarouselComponent = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);
    const [services, setServices] = useState<ServiceRating[]>([]);
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(() => {
        const fetchServices = async () => {
            setLoading(true);
            try {
                const action: any = await (dispatch as any)(getServiceRating());
                if (Array.isArray(action.payload)) {
                    setServices(action.payload);
                } else if (action.payload && Array.isArray(action.payload.data)) {
                    setServices(action.payload.data);
                }
            } catch (error) {
                setServices([]);
            } finally {
                setLoading(false);
            }
        };
        fetchServices();
    }, [dispatch]);

    const nextSlide = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === services.length - 1 ? 0 : prevIndex + 1
        );
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? services.length - 1 : prevIndex - 1
        );
    };

    const goToSlide = (index: number) => {
        setCurrentIndex(index);
    };

    // Reset currentIndex về 0 khi services thay đổi
    useEffect(() => {
        if (services.length > 1) {
            setCurrentIndex(0);
        }
    }, [services.length]);

    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (isAutoPlaying && services.length > 1) {
            interval = setInterval(() => {
                nextSlide();
            }, 5000);
        }
        return () => clearInterval(interval);
    }, [isAutoPlaying, currentIndex, services.length]);

    if (loading) {
        return <div className="w-full h-64 flex items-center justify-center">Đang tải dịch vụ...</div>;
    }
    if (!services.length) {
        return <div className="w-full h-64 flex items-center justify-center">Không có dịch vụ nào!</div>;
    }
    const handleViewDetails = (vendorId: string) => {
        navigate(`/service/${vendorId}`);
    };
    return (
        <section className="py-8 bg-gradient-to-b from-white to-gray-50">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-center mb-8"
                >
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Dịch Vụ Nổi Bật</h2>
                    <p className="text-gray-600 text-sm">Khám phá những dịch vụ chất lượng cao được khách hàng tin tưởng lựa chọn</p>
                </motion.div>

                <div className="relative w-full h-[400px] overflow-hidden rounded-xl bg-white shadow-lg">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentIndex}
                            initial={{ opacity: 0, x: 100 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -100 }}
                            transition={{ duration: 0.5 }}
                            className="absolute inset-0"
                        >
                            <div className="grid grid-cols-1 lg:grid-cols-2 h-full">
                                {/* Image Section */}
                                <div className="relative h-full group">
                                    <img
                                        src={services[currentIndex].thumbnail}
                                        alt={services[currentIndex].name}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

                                    {/* Overlay Content */}
                                    <div className="absolute bottom-4 left-4 right-4 text-white">
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-xs font-semibold bg-white/20 backdrop-blur-sm px-2 py-1 rounded-full">
                                                {services[currentIndex].category}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Content Section */}
                                <div className="p-6 flex flex-col justify-center bg-white">
                                    <div className="mb-4">
                                        <h2 className="text-xl font-bold mb-2 text-gray-900 line-clamp-2">{services[currentIndex].name}</h2>
                                        <p className="text-sm text-gray-600 mb-4 leading-relaxed line-clamp-3">{services[currentIndex].description}</p>
                                    </div>
                                    <motion.button
                                        whileHover={{ scale: 1.02 }}
                                        onClick={() => handleViewDetails(services[currentIndex].id)}
                                        whileTap={{ scale: 0.98 }}
                                        className="w-full bg-gradient-to-r from-fuchsia-500 to-purple-600 hover:from-fuchsia-600 hover:to-purple-700 text-white py-2 rounded-lg text-sm font-semibold hover:bg-purple-700 transition-colors shadow-md hover:shadow-lg"
                                    >
                                        Xem Chi Tiết
                                    </motion.button>
                                </div>
                            </div>
                        </motion.div>
                    </AnimatePresence>

                    {/* Navigation Buttons */}
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={prevSlide}
                        className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-800 shadow-lg hover:bg-white transition-all duration-300"
                    >
                        <FiChevronLeft className="w-5 h-5" />
                    </motion.button>
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={nextSlide}
                        className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-800 shadow-lg hover:bg-white transition-all duration-300"
                    >
                        <FiChevronRight className="w-5 h-5" />
                    </motion.button>

                    {/* Dots Navigation */}
                    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5">
                        {services.map((_, index) => (
                            <motion.button
                                key={index}
                                whileHover={{ scale: 1.2 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => goToSlide(index)}
                                className={`h-1.5 rounded-full transition-all duration-300 ${index === currentIndex
                                    ? "bg-purple-600 w-6"
                                    : "bg-gray-300 w-1.5 hover:bg-gray-400"
                                    }`}
                            />
                        ))}
                    </div>

                    {/* Auto Play Toggle */}
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                        className="absolute top-3 left-3 px-3 py-1.5 bg-white/90 backdrop-blur-sm rounded-full text-gray-800 text-xs font-medium shadow-lg hover:bg-white transition-all duration-300 flex items-center gap-1.5"
                    >
                        {isAutoPlaying ? "Tự động" : "Dừng"}
                    </motion.button>
                </div>
            </div>
        </section>
    );
};

export default CarouselComponent; 