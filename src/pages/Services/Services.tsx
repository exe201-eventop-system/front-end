import { motion } from "framer-motion";
import { useState } from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

const services = [
    {
        id: 1,
        title: "Tổ Chức Sự Kiện",
        description: "Chúng tôi cung cấp dịch vụ tổ chức sự kiện chuyên nghiệp, từ concept đến thực hiện.",
        features: [
            "Lên kế hoạch chi tiết",
            "Quản lý ngân sách",
            "Điều phối nhân sự",
            "Xử lý hậu cần"
        ],
        image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 2,
        title: "Trang Trí Sân Khấu",
        description: "Thiết kế và trang trí sân khấu độc đáo, phù hợp với từng loại sự kiện.",
        features: [
            "Thiết kế concept",
            "Trang trí hoa tươi",
            "Backdrop chuyên nghiệp",
            "Ánh sáng sân khấu"
        ],
        image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 3,
        title: "Âm Thanh Ánh Sáng",
        description: "Hệ thống âm thanh và ánh sáng chuyên nghiệp cho mọi quy mô sự kiện.",
        features: [
            "Âm thanh đa vùng",
            "Ánh sáng sân khấu",
            "Hiệu ứng laser",
            "Màn hình LED"
        ],
        image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 4,
        title: "Catering",
        description: "Dịch vụ ăn uống cao cấp với thực đơn đa dạng, phù hợp mọi sự kiện.",
        features: [
            "Thực đơn đa dạng",
            "Phục vụ chuyên nghiệp",
            "Đồ uống cao cấp",
            "Trang trí bàn tiệc"
        ],
        image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 5,
        title: "MC Chuyên Nghiệp",
        description: "Đội ngũ MC chuyên nghiệp, giàu kinh nghiệm trong mọi loại sự kiện.",
        features: [
            "MC chuyên nghiệp",
            "Dẫn chương trình",
            "Tương tác khán giả",
            "Xử lý tình huống"
        ],
        image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80"
    }
];

const Services = () => {
    const [expandedService, setExpandedService] = useState<number | null>(null);

    const toggleService = (id: number) => {
        setExpandedService(expandedService === id ? null : id);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-900 via-violet-900 to-fuchsia-900">
            {/* Hero Section */}
            <div className="relative h-[50vh] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-black/50 z-10" />
                <div className="absolute inset-0">
                    <img
                        src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&q=80"
                        alt="Services Background"
                        className="w-full h-full object-cover"
                    />
                </div>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="relative z-20 text-center text-white px-4"
                >
                    <h1 className="text-5xl md:text-6xl font-bold mb-6">Dịch Vụ Của Chúng Tôi</h1>
                    <p className="text-xl md:text-2xl max-w-3xl mx-auto">
                        Mang đến những trải nghiệm sự kiện độc đáo và đáng nhớ
                    </p>
                </motion.div>
            </div>

            {/* Services Grid */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.map((service, index) => (
                        <motion.div
                            key={service.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="bg-white/10 backdrop-blur-lg rounded-2xl overflow-hidden"
                        >
                            <div className="relative h-48">
                                <img
                                    src={service.image}
                                    alt={service.title}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                <h3 className="absolute bottom-4 left-4 text-xl font-bold text-white">
                                    {service.title}
                                </h3>
                            </div>

                            <div className="p-6">
                                <p className="text-gray-300 mb-4">{service.description}</p>

                                <button
                                    onClick={() => toggleService(service.id)}
                                    className="flex items-center justify-between w-full text-left text-purple-200 hover:text-white transition-colors"
                                >
                                    <span className="font-medium">Xem chi tiết</span>
                                    {expandedService === service.id ? (
                                        <FiChevronUp className="w-5 h-5" />
                                    ) : (
                                        <FiChevronDown className="w-5 h-5" />
                                    )}
                                </button>

                                {expandedService === service.id && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: "auto" }}
                                        exit={{ opacity: 0, height: 0 }}
                                        transition={{ duration: 0.3 }}
                                        className="mt-4"
                                    >
                                        <ul className="space-y-2">
                                            {service.features.map((feature, idx) => (
                                                <motion.li
                                                    key={idx}
                                                    initial={{ opacity: 0, x: -20 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    transition={{ duration: 0.3, delay: idx * 0.1 }}
                                                    className="flex items-center text-gray-300"
                                                >
                                                    <span className="w-2 h-2 bg-purple-400 rounded-full mr-2" />
                                                    {feature}
                                                </motion.li>
                                            ))}
                                        </ul>
                                    </motion.div>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Call to Action */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                    className="mt-16 text-center"
                >
                    <h2 className="text-3xl font-bold text-white mb-4">
                        Sẵn Sàng Tạo Nên Sự Kiện Đặc Biệt?
                    </h2>
                    <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
                        Hãy liên hệ với chúng tôi để được tư vấn và báo giá chi tiết cho sự kiện của bạn
                    </p>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-gradient-to-r from-purple-600 via-violet-600 to-fuchsia-600 text-white px-8 py-3 rounded-lg font-medium hover:from-purple-700 hover:via-violet-700 hover:to-fuchsia-700 transition"
                    >
                        Liên Hệ Ngay
                    </motion.button>
                </motion.div>
            </div>
        </div>
    );
};

export default Services; 