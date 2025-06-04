import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiChevronLeft, FiChevronRight, FiStar, FiMapPin, FiDollarSign, FiHeart, FiPause, FiPlay } from "react-icons/fi";

interface Service {
    id: number;
    name: string;
    category: string;
    image: string;
    rating: number;
    reviews: number;
    price: string;
    location: string;
    description: string;
    features: string[];
}

const services: Service[] = [
    {
        id: 1,
        name: "Trang Trí Sự Kiện",
        category: "Decoration",
        image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
        rating: 4.8,
        reviews: 128,
        price: "2,000,000 - 5,000,000",
        location: "Hà Nội",
        description: "Dịch vụ trang trí sự kiện chuyên nghiệp với đội ngũ thiết kế giàu kinh nghiệm",
        features: ["Trang trí theo chủ đề", "Thiết kế độc quyền", "Setup nhanh chóng"]
    },
    {
        id: 2,
        name: "Catering Premium",
        category: "Food & Beverage",
        image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
        rating: 4.9,
        reviews: 256,
        price: "150,000 - 300,000/suất",
        location: "TP.HCM",
        description: "Dịch vụ ẩm thực cao cấp với menu đa dạng và phong cách phục vụ chuyên nghiệp",
        features: ["Menu đa dạng", "Đầu bếp 5 sao", "Dịch vụ trọn gói"]
    },
    {
        id: 3,
        name: "MC Chuyên Nghiệp",
        category: "Entertainment",
        image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
        rating: 4.7,
        reviews: 89,
        price: "3,000,000 - 8,000,000",
        location: "Toàn quốc",
        description: "Đội ngũ MC chuyên nghiệp với kinh nghiệm dẫn dắt nhiều sự kiện lớn",
        features: ["MC đa năng", "Kịch bản sáng tạo", "Hỗ trợ âm thanh"]
    },
    {
        id: 4,
        name: "Photography Studio",
        category: "Photography",
        image: "https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
        rating: 4.9,
        reviews: 167,
        price: "5,000,000 - 15,000,000",
        location: "Hà Nội, TP.HCM",
        description: "Dịch vụ chụp ảnh chuyên nghiệp với trang thiết bị hiện đại",
        features: ["Chụp ảnh sự kiện", "Album kỹ thuật số", "Chỉnh sửa chuyên nghiệp"]
    },
    {
        id: 5,
        name: "Âm Thanh & Ánh Sáng",
        category: "Technical",
        image: "https://images.unsplash.com/photo-1579547945413-497e1b99dac0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
        rating: 4.8,
        reviews: 145,
        price: "4,000,000 - 10,000,000",
        location: "Toàn quốc",
        description: "Cung cấp giải pháp âm thanh và ánh sáng chuyên nghiệp cho mọi loại sự kiện",
        features: ["Thiết bị cao cấp", "Kỹ thuật viên chuyên nghiệp", "Setup nhanh chóng"]
    },
    {
        id: 6,
        name: "Team Building",
        category: "Activities",
        image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
        rating: 4.7,
        reviews: 98,
        price: "500,000 - 1,500,000/người",
        location: "Toàn quốc",
        description: "Tổ chức các hoạt động team building sáng tạo và thú vị",
        features: ["Hoạt động đa dạng", "Huấn luyện viên chuyên nghiệp", "Trang thiết bị đầy đủ"]
    }
];

const CarouselComponent = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);
    const [likedServices, setLikedServices] = useState<number[]>([]);

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

    const toggleLike = (serviceId: number) => {
        setLikedServices(prev =>
            prev.includes(serviceId)
                ? prev.filter(id => id !== serviceId)
                : [...prev, serviceId]
        );
    };

    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (isAutoPlaying) {
            interval = setInterval(() => {
                nextSlide();
            }, 5000);
        }
        return () => clearInterval(interval);
    }, [isAutoPlaying, currentIndex]);

    return (
        <section className="py-16 bg-gradient-to-b from-white to-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl font-bold text-gray-900 mb-6">Dịch Vụ Nổi Bật</h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Khám phá các dịch vụ sự kiện được yêu thích nhất hiện nay
                    </p>
                </motion.div>

                <div className="relative w-full h-[700px] overflow-hidden rounded-3xl bg-white shadow-2xl">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentIndex}
                            initial={{ opacity: 0, x: 100 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -100 }}
                            transition={{ duration: 0.5 }}
                            className="absolute inset-0"
                        >
                            <div className="grid grid-cols-1 md:grid-cols-2 h-full">
                                {/* Image Section */}
                                <div className="relative h-full group">
                                    <img
                                        src={services[currentIndex].image}
                                        alt={services[currentIndex].name}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                                    <motion.button
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.9 }}
                                        onClick={() => toggleLike(services[currentIndex].id)}
                                        className="absolute top-6 right-6 p-3 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-all duration-300"
                                    >
                                        <FiHeart
                                            className={`w-6 h-6 ${likedServices.includes(services[currentIndex].id)
                                                ? "text-red-500 fill-current"
                                                : "text-gray-600"
                                                }`}
                                        />
                                    </motion.button>
                                </div>

                                {/* Content Section */}
                                <div className="p-12 flex flex-col justify-center bg-white">
                                    <div className="flex items-center justify-between mb-6">
                                        <span className="text-sm font-semibold text-purple-600 bg-purple-50 px-4 py-2 rounded-full">
                                            {services[currentIndex].category}
                                        </span>
                                        <div className="flex items-center bg-gray-50 px-4 py-2 rounded-full">
                                            <FiStar className="text-yellow-400 w-5 h-5 mr-2" />
                                            <span className="text-sm font-semibold">{services[currentIndex].rating}</span>
                                            <span className="text-sm text-gray-500 ml-1">({services[currentIndex].reviews} đánh giá)</span>
                                        </div>
                                    </div>

                                    <h2 className="text-4xl font-bold mb-6 text-gray-900">{services[currentIndex].name}</h2>
                                    <p className="text-lg text-gray-600 mb-8 leading-relaxed">{services[currentIndex].description}</p>

                                    <div className="space-y-4 mb-8">
                                        <div className="flex items-center text-gray-700 bg-gray-50 p-4 rounded-xl">
                                            <FiMapPin className="w-6 h-6 mr-3 text-purple-600" />
                                            <span className="text-lg">{services[currentIndex].location}</span>
                                        </div>
                                        <div className="flex items-center text-gray-700 bg-gray-50 p-4 rounded-xl">
                                            <FiDollarSign className="w-6 h-6 mr-3 text-purple-600" />
                                            <span className="text-lg font-semibold">{services[currentIndex].price}</span>
                                        </div>
                                    </div>

                                    <div className="flex flex-wrap gap-3 mb-8">
                                        {services[currentIndex].features.map((feature, idx) => (
                                            <span
                                                key={idx}
                                                className="text-sm bg-purple-50 text-purple-600 px-4 py-2 rounded-full font-medium"
                                            >
                                                {feature}
                                            </span>
                                        ))}
                                    </div>

                                    <motion.button
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        className="w-full bg-purple-600 text-white py-4 rounded-xl text-lg font-semibold hover:bg-purple-700 transition-colors shadow-lg hover:shadow-xl"
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
                        className="absolute left-6 top-1/2 -translate-y-1/2 w-14 h-14 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-800 shadow-lg hover:bg-white transition-all duration-300"
                    >
                        <FiChevronLeft className="w-7 h-7" />
                    </motion.button>
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={nextSlide}
                        className="absolute right-6 top-1/2 -translate-y-1/2 w-14 h-14 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-800 shadow-lg hover:bg-white transition-all duration-300"
                    >
                        <FiChevronRight className="w-7 h-7" />
                    </motion.button>

                    {/* Dots Navigation */}
                    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-3">
                        {services.map((_, index) => (
                            <motion.button
                                key={index}
                                whileHover={{ scale: 1.2 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => goToSlide(index)}
                                className={`h-3 rounded-full transition-all duration-300 ${index === currentIndex
                                    ? "bg-purple-600 w-12"
                                    : "bg-gray-300 w-3 hover:bg-gray-400"
                                    }`}
                            />
                        ))}
                    </div>

                    {/* Auto Play Toggle */}
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                        className="absolute top-6 left-6 px-5 py-2.5 bg-white/90 backdrop-blur-sm rounded-full text-gray-800 text-sm font-medium shadow-lg hover:bg-white transition-all duration-300 flex items-center gap-2"
                    >
                        {isAutoPlaying ? (
                            <>
                                <FiPause className="w-4 h-4" />
                                Tạm dừng
                            </>
                        ) : (
                            <>
                                <FiPlay className="w-4 h-4" />
                                Tự động
                            </>
                        )}
                    </motion.button>
                </div>
            </div>
        </section>
    );
};

export default CarouselComponent; 