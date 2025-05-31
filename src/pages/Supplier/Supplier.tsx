import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Star, MapPin, Phone, Mail } from "lucide-react";

// Mock data
const suppliers = [
    {
        id: 1,
        name: "Event Solutions Pro",
        category: "Event Planning",
        rating: 4.8,
        reviews: 156,
        location: "Ho Chi Minh City",
        phone: "+84 123 456 789",
        email: "contact@eventsolutionspro.com",
        description: "Professional event planning and management services for corporate and private events.",
        services: ["Wedding Planning", "Corporate Events", "Conferences"],
        image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    },
    {
        id: 2,
        name: "Catering Excellence",
        category: "Catering",
        rating: 4.6,
        reviews: 98,
        location: "Hanoi",
        phone: "+84 987 654 321",
        email: "info@cateringexcellence.com",
        description: "Premium catering services for all types of events with customizable menus.",
        services: ["Wedding Catering", "Corporate Catering", "Buffet Services"],
        image: "https://images.unsplash.com/photo-1555244162-803834f70033?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    },
    {
        id: 3,
        name: "Venue Masters",
        category: "Venue Rental",
        rating: 4.9,
        reviews: 203,
        location: "Da Nang",
        phone: "+84 456 789 123",
        email: "bookings@venuemasters.com",
        description: "Luxurious venues for weddings, corporate events, and special occasions.",
        services: ["Wedding Venues", "Conference Halls", "Outdoor Spaces"],
        image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    },
    {
        id: 4,
        name: "Entertainment Plus",
        category: "Entertainment",
        rating: 4.7,
        reviews: 145,
        location: "Ho Chi Minh City",
        phone: "+84 789 123 456",
        email: "contact@entertainmentplus.com",
        description: "Professional entertainment services including live bands, DJs, and performers.",
        services: ["Live Music", "DJ Services", "Performance Artists"],
        image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    }
];

const categories = [
    "All",
    "Event Planning",
    "Catering",
    "Venue Rental",
    "Entertainment",
    "Decoration",
    "Photography"
];

const Supplier = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [sortBy, setSortBy] = useState("rating");

    const filteredSuppliers = suppliers
        .filter(supplier =>
            (selectedCategory === "All" || supplier.category === selectedCategory) &&
            supplier.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .sort((a, b) => {
            if (sortBy === "rating") return b.rating - a.rating;
            if (sortBy === "reviews") return b.reviews - a.reviews;
            return 0;
        });

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold mt-10 text-gray-900 mb-4">
                        Nhà cung cấp sự kiện
                    </h1>
                    <p className="text-lg text-gray-600">
                        Tìm kiếm nhà cung cấp sự kiện lý tưởng cho sự kiện của bạn
                    </p>
                </div>

                {/* Search and Filter Section */}
                <div className="mb-8 flex flex-col md:flex-row gap-4 items-center justify-between">
                    <div className="relative w-full md:w-96">
                        <input
                            type="text"
                            placeholder="Search suppliers..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        />
                        <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                    </div>

                    <div className="flex gap-4">
                        <select
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        >
                            {categories.map(category => (
                                <option key={category} value={category}>
                                    {category}
                                </option>
                            ))}
                        </select>

                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        >
                            <option value="rating">Sort by Rating</option>
                            <option value="reviews">Sort by Reviews</option>
                        </select>
                    </div>
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
                                    <div className="flex items-center text-gray-500">
                                        <Phone className="h-5 w-5 mr-2" />
                                        {supplier.phone}
                                    </div>
                                    <div className="flex items-center text-gray-500">
                                        <Mail className="h-5 w-5 mr-2" />
                                        {supplier.email}
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

                                <button className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition-colors duration-200">
                                    Contact Supplier
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Supplier; 