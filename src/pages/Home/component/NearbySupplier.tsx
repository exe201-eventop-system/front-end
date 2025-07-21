import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { motion } from "framer-motion";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { ServiceRating } from "../../../types/Services/ServiceRating.type";
import { getSuppliersRating } from "../../../features/Supplier/supplierThunks";
import { useNavigate } from "react-router-dom";

const NearbySupplier = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [vendors, setVendors] = useState<ServiceRating[]>([]);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(() => {
        const loadSuppliersRating = async () => {
            try {
                const action: any = await (dispatch as any)(getSuppliersRating());
                if (Array.isArray(action.payload)) {
                    setVendors(action.payload);
                } else if (action.payload && Array.isArray(action.payload.data)) {
                    setVendors(action.payload.data);
                }
            } catch (error) {
                console.error("Error loading suppliers rating:", error);
            }
        };
        loadSuppliersRating();
    }, [dispatch]);

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % Math.ceil(vendors.length / 3));
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + Math.ceil(vendors.length / 3)) % Math.ceil(vendors.length / 3));
    };

    const handleViewDetails = (vendorId: string) => {
        navigate(`/supplier/${vendorId}`);
    };

    return (
        <section className="py-6 bg-purple-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="flex items-center justify-between mb-8"
                >
                    <div>
                        <h2 className="text-3xl font-bold text-gray-900 mb-2">Nhà Cung Cấp Nổi Bật</h2>
                    </div>
                </motion.div>

                <div className="relative">
                    <div className="overflow-hidden">
                        <motion.div
                            className="flex transition-transform duration-500 ease-in-out"
                            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                        >
                            {vendors.map((vendor, index) => (
                                <div key={vendor.id} className="w-1/3 flex-shrink-0 px-3">
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.5, delay: index * 0.1 }}
                                        viewport={{ once: true }}
                                        className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
                                    >
                                        <div className="relative h-48">
                                            <img
                                                src={vendor.thumbnail}
                                                alt={vendor.name}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        <div className="p-6">
                                            <h3 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-1">{vendor.name}</h3>
                                            <p className="text-gray-600 text-sm mb-4 line-clamp-2">{vendor.description}</p>
                                            <motion.button
                                                whileHover={{ scale: 1.02 }}
                                                whileTap={{ scale: 0.98 }}
                                                onClick={() => handleViewDetails(vendor.id)}
                                                className="w-full bg-gradient-to-r from-fuchsia-500 to-purple-600 hover:from-fuchsia-600 hover:to-purple-700 text-white font-semibold py-2 rounded-lg transition-colors transition-colors shadow-md hover:shadow-lg"
                                            >
                                                Xem Chi Tiết
                                            </motion.button>
                                        </div>
                                    </motion.div>
                                </div>
                            ))}
                        </motion.div>
                    </div>
                    <button
                        onClick={prevSlide}
                        className="absolute left-0 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm p-2 rounded-full shadow-lg hover:bg-white transition-colors"
                    >
                        <FiChevronLeft className="w-6 h-6 text-gray-600" />
                    </button>
                    <button
                        onClick={nextSlide}
                        className="absolute right-0 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm p-2 rounded-full shadow-lg hover:bg-white transition-colors"
                    >
                        <FiChevronRight className="w-6 h-6 text-gray-600" />
                    </button>
                </div>
            </div>
        </section>
    );
};

export default NearbySupplier; 