import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Star, MapPin, SlidersHorizontal } from "lucide-react";
import NavButton from "../../components/Button";
import { suppliers } from "../../data/suppliers";
import FilterSidebar from "./Component/FilterSidebar";
import { Link } from "react-router-dom";

const Suppliers = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("Tất cả");
    const [sortBy, setSortBy] = useState("rating");
    const [showFilters, setShowFilters] = useState(false);

    const resetFilters = () => {
        setSelectedCategory("Tất cả");
        setSearchTerm("");
        setSortBy("rating");
    };

    const filteredSuppliers = suppliers
        .filter(supplier =>
            (selectedCategory === "Tất cả" || supplier.category === selectedCategory) &&
            supplier.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .sort((a, b) => {
            if (sortBy === "rating") return b.rating - a.rating;
            if (sortBy === "reviews") return b.reviews - a.reviews;
            return 0;
        });

    return (
        <div className="p-6 mt-20 min-h-screen bg-gradient-to-br from-white via-purple-50 to-purple-100">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-6">
                    <h1 className="text-4xl font-bold mb-4 text-center ">
                        Nhà cung cấp sự kiện
                    </h1>
                    <p className="text-lg  text-gray-600">
                        Tìm kiếm nhà cung cấp sự kiện lý tưởng cho sự kiện của bạn
                    </p>
                </div>

                <div className="flex flex-col lg:flex-row gap-6">
                    {/* Filter Sidebar */}
                    <FilterSidebar
                        showFilters={showFilters}
                        setShowFilters={setShowFilters}
                        selectedCategory={selectedCategory}
                        setSelectedCategory={setSelectedCategory}
                        resetFilters={resetFilters}
                    />

                    {/* Main Content */}
                    <div className="flex-1">
                        {/* Search and Sort Bar */}
                        <div className="flex justify-end mb-4">
                            <NavButton
                                color="purple-white"
                                to="/"
                                isActive={true}
                            >
                                Trở thành nhà cung cấp
                            </NavButton>
                        </div>

                        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">

                            <div className="flex flex-col md:flex-row gap-4">

                                <div className="relative flex-1">
                                    <input
                                        type="text"
                                        placeholder="Tìm kiếm nhà cung cấp..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-purple-100 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all"
                                    />
                                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-purple-500" size={20} />
                                </div>
                                <div className="flex gap-2">

                                    <select
                                        value={sortBy}
                                        onChange={(e) => setSortBy(e.target.value)}
                                        className="px-4 py-2 rounded-xl border-2 border-purple-100 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all"
                                    >
                                        <option value="rating">Đánh giá cao nhất</option>
                                        <option value="reviews">Nhiều đánh giá nhất</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/* Mobile Filter Toggle */}
                        <button
                            onClick={() => setShowFilters(!showFilters)}
                            className="lg:hidden w-full mb-6 flex items-center justify-center gap-2 bg-white text-purple-700 py-3 rounded-xl shadow-lg"
                        >
                            <SlidersHorizontal size={20} />
                            <span className="font-semibold">Bộ lọc</span>
                        </button>

                        {/* Results Count */}
                        <div className="mb-6">
                            Tìm thấy <span className="font-bold text-purple-700">{filteredSuppliers.length}</span> nhà cung cấp
                        </div>

                        {/* Suppliers Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {filteredSuppliers.map((supplier) => (
                                <motion.div
                                    key={supplier.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5 }}
                                    className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                                >
                                    <div className="relative h-48">
                                        <img
                                            src={supplier.image}
                                            alt={supplier.name}
                                            className="w-full h-full object-cover"
                                        />
                                        <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full text-sm font-semibold text-purple-600">
                                            {supplier.category}
                                        </div>
                                    </div>

                                    <div className="p-6">
                                        <div className="flex items-center justify-between mb-4">
                                            <h3 className="text-xl font-semibold text-gray-900">
                                                {supplier.name}
                                            </h3>
                                            <div className="flex items-center">
                                                <Star className="h-5 w-5 text-yellow-400 fill-current" />
                                                <span className="ml-1 text-gray-600">{supplier.rating}</span>
                                                <span className="ml-1 text-gray-400">({supplier.reviews})</span>
                                            </div>
                                        </div>

                                        <p className="text-gray-600 mb-4">{supplier.description}</p>

                                        <div className="space-y-2 mb-4">
                                            <div className="flex items-center text-gray-500">
                                                <MapPin className="h-5 w-5 mr-2" />
                                                {supplier.location}
                                            </div>
                                        </div>

                                        <div className="flex flex-wrap gap-2 mb-4">
                                            {supplier.services.map((service, index) => (
                                                <span
                                                    key={index}
                                                    className="px-3 py-1 bg-purple-100 text-purple-600 rounded-full text-sm"
                                                >
                                                    {service}
                                                </span>
                                            ))}
                                        </div>
                                        <Link to={`/supplier/${supplier.id}`}>
                                            <button className="w-full bg-gradient-to-r from-fuchsia-500 to-purple-600 hover:from-fuchsia-600 hover:to-purple-700 text-white font-semibold text-white py-2 rounded-lg hover:bg-purple-700 transition-colors duration-200">
                                                Xem chi tiết
                                            </button>
                                        </Link>

                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {/* No Results Message */}
                        {filteredSuppliers.length === 0 && (
                            <div className="text-center py-12">
                                <p className="text-purple-700 text-lg">Không tìm thấy nhà cung cấp phù hợp với bộ lọc của bạn.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Suppliers; 