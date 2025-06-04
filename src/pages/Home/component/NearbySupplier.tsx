import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FiMapPin, FiStar, FiNavigation, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default marker icons in Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface Vendor {
    id: number;
    name: string;
    rating: number;
    distance: string;
    services: string[];
    image: string;
    location: { lat: number; lng: number };
    description: string;
}

// Component to handle map center updates
function ChangeView({ center }: { center: [number, number] }) {
    const map = useMap();
    map.setView(center, map.getZoom());
    return null;
}

const NearbySupplier = () => {
    const [showMap, setShowMap] = useState(false);
    const [locationError, setLocationError] = useState<string | null>(null);
    const [isLoadingLocation, setIsLoadingLocation] = useState(true);
    const [currentSlide, setCurrentSlide] = useState(0);
    const [userLocation, setUserLocation] = useState<[number, number] | null>(null);

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setUserLocation([position.coords.latitude, position.coords.longitude]);
                    setIsLoadingLocation(false);
                },
                (error) => {
                    console.log(error)
                    setLocationError("Không thể lấy vị trí của bạn. Vui lòng kiểm tra quyền truy cập vị trí.");
                    setIsLoadingLocation(false);
                }
            );
        } else {
            setLocationError("Trình duyệt của bạn không hỗ trợ định vị.");
            setIsLoadingLocation(false);
        }
    }, []);

    // Enhanced vendor data with locations in Thu Duc City
    const vendors: Vendor[] = [
        {
            id: 1,
            name: "Event Pro Solutions",
            rating: 4.8,
            distance: "0.5 km",
            services: ["Trang trí", "Âm thanh", "Catering"],
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROh0pevv0Hvdmw5oEzYEZ0aN8V2Yq77QlqUg&s",
            location: { lat: 10.8497, lng: 106.7537 }, // Khu vực Linh Trung
            description: "Chuyên cung cấp dịch vụ tổ chức sự kiện cao cấp tại Thủ Đức"
        },
        {
            id: 2,
            name: "Dream Events",
            rating: 4.6,
            distance: "1.2 km",
            services: ["MC", "Trang trí", "Quay phim"],
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRNKQTg42ZVCNU6pulEj-L30k7oYpO3O6ErQ&s",
            location: { lat: 10.8612, lng: 106.7598 }, // Khu vực Linh Xuân
            description: "Biến ước mơ của bạn thành hiện thực với dịch vụ chuyên nghiệp"
        },
        {
            id: 3,
            name: "Perfect Moments",
            rating: 4.9,
            distance: "2.0 km",
            services: ["Catering", "Trang trí", "Âm thanh"],
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQXyBsT-EmQCfVMYCQQiGCrGkB9L_c-mWFFOA&s",
            location: { lat: 10.8556, lng: 106.7634 }, // Khu vực Linh Chiểu
            description: "Tạo nên những khoảnh khắc hoàn hảo cho sự kiện của bạn"
        },
        {
            id: 4,
            name: "Elite Events",
            rating: 4.7,
            distance: "1.5 km",
            services: ["Trang trí", "Catering", "MC"],
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9wq2qbmOQyl2yD2d_M7Dz3vsUJTJ9jNddLQ&s",
            location: { lat: 10.8589, lng: 106.7572 }, // Khu vực Linh Tây
            description: "Dịch vụ tổ chức sự kiện cao cấp tại Thủ Đức"
        },
        {
            id: 5,
            name: "Royal Events",
            rating: 4.9,
            distance: "2.5 km",
            services: ["Quay phim", "Âm thanh", "Trang trí"],
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ19EnPucGYWVphlQ0OvzYG4b10V-aU6B8Wxw&s",
            location: { lat: 10.8625, lng: 106.7556 }, // Khu vực Linh Đông
            description: "Mang đến trải nghiệm hoàng gia "
        },
        {
            id: 6,
            name: "Sunrise Events",
            rating: 4.8,
            distance: "1.8 km",
            services: ["Trang trí", "Catering", "Quay phim"],
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTAIc5sGJ2Kkkaoo1dDdZLUsSZyATKCr0XWsA&s",
            location: { lat: 10.8578, lng: 106.7612 }, // Khu vực Linh Trung
            description: "Tổ chức sự kiện chuyên nghiệp với giá cả hợp lý"
        },
        {
            id: 7,
            name: "Golden Events",
            rating: 4.7,
            distance: "2.2 km",
            services: ["MC", "Âm thanh", "Trang trí"],
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8VcXrHVPQtrR0q1R13xzBxv4cGrBnXqwXXA&s",
            location: { lat: 10.8601, lng: 106.7589 }, // Khu vực Linh Xuân
            description: "Dịch vụ tổ chức sự kiện chất lượng cao"
        },
        {
            id: 8,
            name: "Diamond Events",
            rating: 4.9,
            distance: "1.7 km",
            services: ["Catering", "Trang trí", "MC"],
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmJ3bTHUtmWnrMUUICiB-mJ0flS1FBcOeiDQ&s",
            location: { lat: 10.8567, lng: 106.7623 }, // Khu vực Linh Chiểu
            description: "Tổ chức sự kiện sang trọng và đẳng cấp"
        },

    ];

    // Update center to Thu Duc City
    const center = userLocation || [10.8497, 106.7537]; // Center of Thu Duc City

    const getDirections = (vendor: Vendor) => {
        if (!userLocation) {
            setLocationError("Vui lòng cho phép truy cập vị trí của bạn để xem chỉ đường.");
            return;
        }
        // Open in new tab with OpenStreetMap directions
        const url = `https://www.openstreetmap.org/directions?from=${userLocation[0]},${userLocation[1]}&to=${vendor.location.lat},${vendor.location.lng}`;
        window.open(url, '_blank');
    };

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % Math.ceil(vendors.length / 3));
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + Math.ceil(vendors.length / 3)) % Math.ceil(vendors.length / 3));
    };

    {isLoadingLocation && <p className="text-gray-500">Đang lấy vị trí của bạn...</p>}
    {locationError && <p className="text-red-500">{locationError}</p>}
    
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
                        <h2 className="text-3xl font-bold text-gray-900 mb-2">Nhà Cung Cấp Gần Đây</h2>
                        <p className="text-gray-600">Tìm kiếm nhà cung cấp dịch vụ sự kiện gần bạn</p>
                    </div>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setShowMap(!showMap)}
                        className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-4 py-2 rounded-lg flex items-center gap-2"
                    >
                        <FiMapPin />
                        <span>{showMap ? "Ẩn bản đồ" : "Xem trên bản đồ"}</span>
                    </motion.button>
                </motion.div>

                {showMap && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "400px" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.5 }}
                        className="mb-8 rounded-2xl overflow-hidden shadow-lg"
                    >
                        <div className="w-full h-full">
                            <MapContainer
                                center={center as [number, number]}
                                zoom={13}
                                style={{ height: "100%", width: "100%" }}
                            >
                                <TileLayer
                                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                />
                                <ChangeView center={center as [number, number]} />

                                {vendors.map((vendor) => (
                                    <Marker
                                        key={vendor.id}
                                        position={[vendor.location.lat, vendor.location.lng]}
                                    >
                                        <Popup>
                                            <div className="p-2">
                                                <h3 className="font-semibold">{vendor.name}</h3>
                                                <p className="text-sm text-gray-600">{vendor.description}</p>
                                            </div>
                                        </Popup>
                                    </Marker>
                                ))}

                                {userLocation && (
                                    <Marker
                                        position={userLocation}
                                        icon={L.divIcon({
                                            className: 'custom-div-icon',
                                            html: `<div style="background-color: #4F46E5; width: 20px; height: 20px; border-radius: 50%; border: 2px solid white;"></div>`,
                                            iconSize: [20, 20],
                                            iconAnchor: [10, 10]
                                        })}
                                    >
                                        <Popup>
                                            <div className="p-2">
                                                <p className="font-semibold">Vị trí của bạn</p>
                                            </div>
                                        </Popup>
                                    </Marker>
                                )}
                            </MapContainer>
                        </div>
                    </motion.div>
                )}

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
                                                src={vendor.image}
                                                alt={vendor.name}
                                                className="w-full h-full object-cover"
                                            />
                                            <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm px-3 py-1 rounded-full text-purple-600 font-medium flex items-center gap-1 shadow-lg">
                                                <FiStar className="text-yellow-400" />
                                                <span>{vendor.rating}</span>
                                            </div>
                                        </div>
                                        <div className="p-6">
                                            <h3 className="text-xl font-semibold text-gray-900 mb-2">{vendor.name}</h3>
                                            <p className="text-gray-600 text-sm mb-4">{vendor.description}</p>
                                            <div className="flex items-center gap-4 text-gray-600 mb-4">
                                                <span className="flex items-center gap-1">
                                                    <FiMapPin />
                                                    {vendor.distance}
                                                </span>
                                                <button
                                                    onClick={() => getDirections(vendor)}
                                                    className="flex items-center gap-1 text-purple-600 hover:text-purple-700 transition-colors"
                                                >
                                                    <FiNavigation />
                                                    <span>Chỉ đường</span>
                                                </button>
                                            </div>
                                            <div className="flex flex-wrap gap-2">
                                                {vendor.services.map((service, idx) => (
                                                    <span
                                                        key={idx}
                                                        className="px-3 py-1 bg-purple-100 text-purple-600 rounded-full text-sm"
                                                    >
                                                        {service}
                                                    </span>
                                                ))}
                                            </div>
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