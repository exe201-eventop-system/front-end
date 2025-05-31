import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { FiSearch, FiMapPin, FiStar, FiClock, FiUsers } from "react-icons/fi";
import { FaRobot, FaMagic } from "react-icons/fa";
import AIChatbox from "./component/AIChatbox";

// Mock data for nearby vendors
const nearbyVendors = [
  {
    id: 1,
    name: "Event Pro Solutions",
    rating: 4.8,
    distance: "0.5 km",
    services: ["Trang trí", "Âm thanh", "Catering"],
    image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
    location: { lat: 21.0285, lng: 105.8542 }
  },
  {
    id: 2,
    name: "Dream Events",
    rating: 4.6,
    distance: "1.2 km",
    services: ["MC", "Trang trí", "Quay phim"],
    image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
    location: { lat: 21.0285, lng: 105.8542 }
  },
  {
    id: 3,
    name: "Perfect Moments",
    rating: 4.9,
    distance: "2.0 km",
    services: ["Catering", "Trang trí", "Âm thanh"],
    image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
    location: { lat: 21.0285, lng: 105.8542 }
  }
];

// Mock data for upcoming events
const upcomingEvents = [
  {
    id: 1,
    title: "Hội Nghị Công Nghệ 2024",
    date: "15/03/2024",
    location: "Hà Nội",
    attendees: 500,
    image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 2,
    title: "Triển Lãm Nghệ Thuật",
    date: "20/03/2024",
    location: "TP.HCM",
    attendees: 300,
    image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80"
  }
];

const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [showMap, setShowMap] = useState(false);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [isLoadingLocation, setIsLoadingLocation] = useState(true);

  // Get user's location
  useEffect(() => {
    if ("geolocation" in navigator) {
      setIsLoadingLocation(true);
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
          setLocationError(null);
          setIsLoadingLocation(false);
        },
        (error) => {
          console.error("Error getting location:", error);
          setLocationError(
            error.code === 1
              ? "Vui lòng cho phép truy cập vị trí để tìm nhà cung cấp gần bạn"
              : "Không thể lấy vị trí của bạn. Vui lòng thử lại sau."
          );
          setIsLoadingLocation(false);
        },
        {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0
        }
      );
    } else {
      setLocationError("Trình duyệt của bạn không hỗ trợ định vị");
      setIsLoadingLocation(false);
    }
  }, []);

  // Calculate distance between two points
  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 6371; // Radius of the earth in km
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c; // Distance in km
    return d.toFixed(1);
  };

  const deg2rad = (deg: number) => {
    return deg * (Math.PI / 180);
  };

  // Sort vendors by distance if user location is available
  const sortedVendors = userLocation
    ? [...nearbyVendors].sort((a, b) => {
      const distA = calculateDistance(
        userLocation.lat,
        userLocation.lng,
        a.location.lat,
        a.location.lng
      );
      const distB = calculateDistance(
        userLocation.lat,
        userLocation.lng,
        b.location.lat,
        b.location.lng
      );
      return parseFloat(distA) - parseFloat(distB);
    })
    : nearbyVendors;

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-purple-50 to-purple-100">
      {/* AI Chatbox */}
      <AIChatbox />

      {/* Hero Section with AI Assistant */}
      <div className="relative h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-black/20 z-10" />
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&q=80"
            alt="Hero Background"
            className="w-full h-full object-cover"
          />
        </div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            ease: "easeOut"
          }}
          className="relative z-20 text-center px-4 max-w-4xl mx-auto"
        >
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-5xl md:text-6xl font-bold mb-6 text-gray-900"
          >
            Tạo Sự Kiện Hoàn Hảo Với AI
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-xl md:text-2xl mb-8 text-gray-700"
          >
            Trợ lý AI thông minh giúp bạn lên kế hoạch sự kiện một cách dễ dàng
          </motion.p>
        </motion.div>
      </div>

      {/* Search Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-30">
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{
            duration: 0.5,
            delay: 0.6,
            ease: "easeOut"
          }}
          className="bg-white/90 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-purple-200 hover:shadow-2xl hover:shadow-purple-100/50 transition-all duration-300"
        >
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500" />
                <input
                  type="text"
                  placeholder="Tìm kiếm sự kiện, nhà cung cấp..."
                  className="w-full pl-12 pr-4 py-3 rounded-lg bg-white border border-purple-200 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-300 focus:border-purple-300 transition-all duration-300"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            <motion.button
              whileHover={{ scale: 1.02, boxShadow: "0 10px 25px -5px rgba(139, 92, 246, 0.3)" }}
              whileTap={{ scale: 0.98 }}
              className="bg-gradient-to-r from-purple-500 to-purple-400 text-white px-8 py-3 rounded-lg font-medium transition-all duration-300"
            >
              Tìm Kiếm
            </motion.button>
          </div>
        </motion.div>
      </div>

      {/* Nearby Vendors Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="flex items-center justify-between mb-8"
        >
          <h2 className="text-3xl font-bold text-gray-900">Nhà Cung Cấp Gần Đây</h2>
          <div className="flex items-center gap-4">
            {isLoadingLocation && (
              <div className="text-purple-600 flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-purple-600 border-t-transparent rounded-full animate-spin" />
                <span>Đang tìm vị trí...</span>
              </div>
            )}
            {locationError && (
              <div className="text-yellow-600 flex items-center gap-2">
                <FiMapPin />
                <span>{locationError}</span>
              </div>
            )}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowMap(!showMap)}
              className="text-purple-600 hover:text-purple-700 transition-colors flex items-center gap-2"
            >
              <FiMapPin />
              <span>{showMap ? "Ẩn bản đồ" : "Xem trên bản đồ"}</span>
            </motion.button>
          </div>
        </motion.div>

        {showMap && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "400px" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8 rounded-2xl overflow-hidden"
          >
            <div className="w-full h-full bg-white/90 backdrop-blur-xl border border-purple-200 flex items-center justify-center text-gray-900">
              {locationError ? (
                <div className="text-center">
                  <p className="mb-4">{locationError}</p>
                  <motion.button
                    whileHover={{ scale: 1.05, boxShadow: "0 10px 25px -5px rgba(139, 92, 246, 0.3)" }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => window.location.reload()}
                    className="bg-gradient-to-r from-purple-500 to-purple-400 text-white px-6 py-2 rounded-lg font-medium transition-all duration-300"
                  >
                    Thử Lại
                  </motion.button>
                </div>
              ) : (
                "Bản đồ sẽ được hiển thị ở đây"
              )}
            </div>
          </motion.div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedVendors.map((vendor, index) => (
            <motion.div
              key={vendor.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
                ease: "easeOut"
              }}
              viewport={{ once: true }}
              className="bg-white/90 backdrop-blur-xl rounded-2xl overflow-hidden border border-purple-200 hover:border-purple-300 hover:shadow-xl hover:shadow-purple-100/50 transition-all duration-300"
            >
              <div className="relative h-48">
                <img
                  src={vendor.image}
                  alt={vendor.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm px-3 py-1 rounded-full text-purple-600 font-medium flex items-center gap-1 shadow-lg shadow-purple-100/50">
                  <FiStar className="text-yellow-400" />
                  {vendor.rating}
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{vendor.name}</h3>
                <p className="text-purple-600 mb-4 flex items-center gap-2">
                  <FiMapPin />
                  {vendor.distance}
                </p>
                <div className="flex flex-wrap gap-2">
                  {vendor.services.map((service, idx) => (
                    <span
                      key={idx}
                      className="bg-purple-100 text-purple-600 px-3 py-1 rounded-full text-sm"
                    >
                      {service}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* AI Features Section */}
      <div className="bg-white/5 backdrop-blur-lg py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Tính Năng AI Thông Minh
            </h2>
            <p className="text-gray-700 max-w-2xl mx-auto">
              Khám phá sức mạnh của AI trong việc tạo nên những sự kiện hoàn hảo
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <FaRobot className="text-4xl text-purple-500" />,
                title: "Trợ Lý Ảo",
                description: "Tư vấn và hỗ trợ 24/7 cho mọi thắc mắc về sự kiện"
              },
              {
                icon: <FaMagic className="text-4xl text-purple-500" />,
                title: "Đề Xuất Thông Minh",
                description: "Gợi ý nhà cung cấp và dịch vụ phù hợp với nhu cầu"
              },
              {
                icon: <FiUsers className="text-4xl text-purple-500" />,
                title: "Quản Lý Khách",
                description: "Tự động theo dõi và quản lý danh sách khách mời"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                  ease: "easeOut"
                }}
                viewport={{ once: true }}
                className="bg-white/90 backdrop-blur-xl rounded-2xl p-6 text-center border border-purple-200 hover:border-purple-300 hover:shadow-xl hover:shadow-purple-100/50 transition-all duration-300"
              >
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-700">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Upcoming Events Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-3xl font-bold text-gray-900 mb-8"
        >
          Sự Kiện Sắp Tới
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {upcomingEvents.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
                ease: "easeOut"
              }}
              viewport={{ once: true }}
              className="bg-white/90 backdrop-blur-xl rounded-2xl overflow-hidden border border-purple-200 hover:border-purple-300 hover:shadow-xl hover:shadow-purple-100/50 transition-all duration-300"
            >
              <div className="relative h-64">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="text-2xl font-bold mb-2">{event.title}</h3>
                  <div className="flex items-center gap-4 text-sm">
                    <span className="flex items-center gap-1">
                      <FiClock />
                      {event.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <FiMapPin />
                      {event.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <FiUsers />
                      {event.attendees} người
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
