import { motion } from "framer-motion";
import { FiStar, FiMapPin, FiDollarSign, FiHeart } from "react-icons/fi";

const trendingServices = [
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

const TrendingServices = () => {
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="text-center mb-12"
            >
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Dịch Vụ Nổi Bật</h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                    Khám phá các dịch vụ sự kiện được yêu thích nhất hiện nay
                </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {trendingServices.map((service, index) => (
                    <motion.div
                        key={service.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        viewport={{ once: true }}
                        className="group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
                    >
                        <div className="relative h-48">
                            <img
                                src={service.image}
                                alt={service.name}
                                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                            />
                            <div className="absolute top-4 right-4">
                                <button className="p-2 bg-white rounded-full shadow-md hover:bg-purple-50 transition-colors">
                                    <FiHeart className="w-5 h-5 text-gray-600" />
                                </button>
                            </div>
                        </div>
                        <div className="p-6">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-sm font-medium text-purple-600 bg-purple-50 px-3 py-1 rounded-full">
                                    {service.category}
                                </span>
                                <div className="flex items-center">
                                    <FiStar className="text-yellow-400 w-4 h-4 mr-1" />
                                    <span className="text-sm font-medium">{service.rating}</span>
                                    <span className="text-sm text-gray-500 ml-1">({service.reviews})</span>
                                </div>
                            </div>
                            <h3 className="text-xl font-semibold mb-2">{service.name}</h3>
                            <p className="text-gray-600 text-sm mb-4">{service.description}</p>
                            <div className="flex items-center text-gray-500 text-sm mb-4">
                                <FiMapPin className="w-4 h-4 mr-1" />
                                <span>{service.location}</span>
                            </div>
                            <div className="flex items-center text-gray-500 text-sm mb-4">
                                <FiDollarSign className="w-4 h-4 mr-1" />
                                <span>{service.price}</span>
                            </div>
                            <div className="flex flex-wrap gap-2 mb-4">
                                {service.features.map((feature, idx) => (
                                    <span
                                        key={idx}
                                        className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full"
                                    >
                                        {feature}
                                    </span>
                                ))}
                            </div>
                            <button className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition-colors">
                                Xem Chi Tiết
                            </button>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default TrendingServices;