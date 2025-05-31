import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { User, Mail, Phone, MapPin, Calendar, Edit2, Star, Share2, Heart, MessageCircle, Settings } from "lucide-react";

interface UserProfile {
    id: string;
    email: string;
    fullName: string;
    phone: string;
    address: string;
    dateOfBirth: string;
    avatar: string;
}

interface Event {
    id: string;
    title: string;
    date: string;
    status: string;
}

interface Review {
    id: string;
    eventName: string;
    rating: number;
    comment: string;
    date: string;
}

// Mock data
const mockProfile: UserProfile = {
    id: "USR001",
    email: "nguyenvana@gmail.com",
    fullName: "Nguyễn Văn A",
    phone: "0123456789",
    address: "123 Đường ABC, Quận XYZ, TP.HCM",
    dateOfBirth: "01/01/1990",
    avatar: "https://i.pravatar.cc/300"
};

const mockEvents: Event[] = [
    {
        id: "EVT001",
        title: "Hội thảo Công nghệ 2024",
        date: "15/03/2024",
        status: "Đã tham gia"
    },
    {
        id: "EVT002",
        title: "Workshop Marketing Digital",
        date: "20/03/2024",
        status: "Đã đăng ký"
    }
];

const mockCreatedEvents: Event[] = [
    {
        id: "EVT003",
        title: "Sự kiện Networking",
        date: "25/03/2024",
        status: "Đang diễn ra"
    }
];

const mockReviews: Review[] = [
    {
        id: "REV001",
        eventName: "Hội thảo Công nghệ 2024",
        rating: 5,
        comment: "Sự kiện rất bổ ích và chuyên nghiệp",
        date: "16/03/2024"
    }
];

const Profile = () => {
    const navigate = useNavigate();
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [activeTab, setActiveTab] = useState("events");

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const token = localStorage.getItem("access_token");
                if (!token) {
                    navigate("/auth");
                    return;
                }

                await new Promise(resolve => setTimeout(resolve, 1000));
                setProfile(mockProfile);
            } catch (err) {
                setError("Không thể tải thông tin profile");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, [navigate]);

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-white via-purple-50 to-purple-100 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-white via-purple-50 to-purple-100 flex items-center justify-center">
                <div className="text-red-500">{error}</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-white via-purple-50 to-purple-100 py-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto">
                {/* Profile Header */}
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-8 transform hover:scale-[1.01] transition-transform duration-300">
                    <div className="relative h-64 bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700">
                        <div className="absolute inset-0 bg-black/10 backdrop-blur-sm"></div>
                        <div className="absolute -bottom-20 left-8 flex items-end space-x-6">
                            <div className="relative group">
                                <img
                                    src={profile?.avatar || "https://via.placeholder.com/150"}
                                    alt="Profile"
                                    className="w-40 h-40 rounded-2xl border-4 border-white shadow-xl object-cover transform group-hover:scale-105 transition-transform duration-300"
                                />
                                <button className="absolute bottom-2 right-2 bg-purple-500 p-3 rounded-xl hover:bg-purple-600 transition-colors shadow-lg transform hover:scale-110">
                                    <Edit2 className="w-5 h-5 text-white" />
                                </button>
                            </div>
                            <div className="mb-4">
                                <h1 className="text-4xl font-bold text-white mb-2 drop-shadow-lg">
                                    {profile?.fullName}
                                </h1>
                                <p className="text-purple-100">ID: {profile?.id}</p>
                            </div>
                        </div>
                        <div className="absolute top-4 right-4 flex space-x-2">
                            <button className="bg-white/10 hover:bg-white/20 p-3 rounded-xl backdrop-blur-sm transition-colors">
                                <Share2 className="w-5 h-5 text-white" />
                            </button>
                            <button className="bg-white/10 hover:bg-white/20 p-3 rounded-xl backdrop-blur-sm transition-colors">
                                <Settings className="w-5 h-5 text-white" />
                            </button>
                        </div>
                    </div>

                    {/* Profile Stats */}
                    <div className="pt-24 pb-8 px-8">
                        <div className="grid grid-cols-3 gap-6 mb-8">
                            <div className="bg-purple-50 rounded-xl p-6 border border-purple-100 hover:border-purple-200 transition-colors">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-gray-500 text-sm">Sự kiện đã tham gia</p>
                                        <p className="text-2xl font-bold text-gray-800">{mockEvents.length}</p>
                                    </div>
                                    <div className="bg-purple-100 p-3 rounded-lg">
                                        <Calendar className="w-6 h-6 text-purple-500" />
                                    </div>
                                </div>
                            </div>
                            <div className="bg-purple-50 rounded-xl p-6 border border-purple-100 hover:border-purple-200 transition-colors">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-gray-500 text-sm">Sự kiện đã tạo</p>
                                        <p className="text-2xl font-bold text-gray-800">{mockCreatedEvents.length}</p>
                                    </div>
                                    <div className="bg-purple-100 p-3 rounded-lg">
                                        <User className="w-6 h-6 text-purple-500" />
                                    </div>
                                </div>
                            </div>
                            <div className="bg-purple-50 rounded-xl p-6 border border-purple-100 hover:border-purple-200 transition-colors">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-gray-500 text-sm">Đánh giá</p>
                                        <p className="text-2xl font-bold text-gray-800">{mockReviews.length}</p>
                                    </div>
                                    <div className="bg-purple-100 p-3 rounded-lg">
                                        <Star className="w-6 h-6 text-purple-500" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Profile Details */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="bg-purple-50 rounded-xl p-6 border border-purple-100 hover:border-purple-200 transition-colors">
                                <h3 className="text-lg font-semibold text-gray-800 mb-4">Thông tin liên hệ</h3>
                                <div className="space-y-4">
                                    <div className="flex items-center space-x-3 group">
                                        <div className="bg-purple-100 p-3 rounded-lg group-hover:bg-purple-200 transition-colors">
                                            <Mail className="w-5 h-5 text-purple-500" />
                                        </div>
                                        <div>
                                            <p className="text-gray-500 text-sm">Email</p>
                                            <p className="text-gray-800">{profile?.email}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-3 group">
                                        <div className="bg-purple-100 p-3 rounded-lg group-hover:bg-purple-200 transition-colors">
                                            <Phone className="w-5 h-5 text-purple-500" />
                                        </div>
                                        <div>
                                            <p className="text-gray-500 text-sm">Số điện thoại</p>
                                            <p className="text-gray-800">{profile?.phone || "Chưa cập nhật"}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-purple-50 rounded-xl p-6 border border-purple-100 hover:border-purple-200 transition-colors">
                                <h3 className="text-lg font-semibold text-gray-800 mb-4">Thông tin cá nhân</h3>
                                <div className="space-y-4">
                                    <div className="flex items-center space-x-3 group">
                                        <div className="bg-purple-100 p-3 rounded-lg group-hover:bg-purple-200 transition-colors">
                                            <MapPin className="w-5 h-5 text-purple-500" />
                                        </div>
                                        <div>
                                            <p className="text-gray-500 text-sm">Địa chỉ</p>
                                            <p className="text-gray-800">{profile?.address || "Chưa cập nhật"}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-3 group">
                                        <div className="bg-purple-100 p-3 rounded-lg group-hover:bg-purple-200 transition-colors">
                                            <Calendar className="w-5 h-5 text-purple-500" />
                                        </div>
                                        <div>
                                            <p className="text-gray-500 text-sm">Ngày sinh</p>
                                            <p className="text-gray-800">{profile?.dateOfBirth || "Chưa cập nhật"}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Tabs and Content */}
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                    <div className="border-b border-gray-200">
                        <nav className="flex space-x-8 px-8" aria-label="Tabs">
                            <button
                                onClick={() => setActiveTab("events")}
                                className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === "events"
                                    ? "border-purple-500 text-purple-600"
                                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                                    }`}
                            >
                                Sự kiện đã tham gia
                            </button>
                            <button
                                onClick={() => setActiveTab("created")}
                                className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === "created"
                                    ? "border-purple-500 text-purple-600"
                                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                                    }`}
                            >
                                Sự kiện đã tạo
                            </button>
                            <button
                                onClick={() => setActiveTab("reviews")}
                                className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === "reviews"
                                    ? "border-purple-500 text-purple-600"
                                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                                    }`}
                            >
                                Đánh giá
                            </button>
                        </nav>
                    </div>

                    <div className="p-8">
                        {activeTab === "events" && (
                            <div className="space-y-4">
                                {mockEvents.map(event => (
                                    <div key={event.id} className="bg-purple-50 rounded-xl p-6 border border-purple-100 hover:border-purple-200 transition-all duration-300 hover:shadow-md">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h4 className="text-lg font-semibold text-gray-800 mb-2">{event.title}</h4>
                                                <p className="text-gray-500 text-sm">{event.date}</p>
                                            </div>
                                            <span className="px-3 py-1 bg-green-100 text-green-600 rounded-full text-sm font-medium">
                                                {event.status}
                                            </span>
                                        </div>
                                        <div className="mt-4 flex items-center space-x-4">
                                            <button className="flex items-center space-x-2 text-gray-500 hover:text-purple-500 transition-colors">
                                                <Heart className="w-5 h-5" />
                                                <span>Thích</span>
                                            </button>
                                            <button className="flex items-center space-x-2 text-gray-500 hover:text-purple-500 transition-colors">
                                                <MessageCircle className="w-5 h-5" />
                                                <span>Bình luận</span>
                                            </button>
                                            <button className="flex items-center space-x-2 text-gray-500 hover:text-purple-500 transition-colors">
                                                <Share2 className="w-5 h-5" />
                                                <span>Chia sẻ</span>
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {activeTab === "created" && (
                            <div className="space-y-4">
                                {mockCreatedEvents.map(event => (
                                    <div key={event.id} className="bg-purple-50 rounded-xl p-6 border border-purple-100 hover:border-purple-200 transition-all duration-300 hover:shadow-md">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h4 className="text-lg font-semibold text-gray-800 mb-2">{event.title}</h4>
                                                <p className="text-gray-500 text-sm">{event.date}</p>
                                            </div>
                                            <span className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm font-medium">
                                                {event.status}
                                            </span>
                                        </div>
                                        <div className="mt-4 flex items-center space-x-4">
                                            <button className="flex items-center space-x-2 text-gray-500 hover:text-purple-500 transition-colors">
                                                <Edit2 className="w-5 h-5" />
                                                <span>Chỉnh sửa</span>
                                            </button>
                                            <button className="flex items-center space-x-2 text-gray-500 hover:text-purple-500 transition-colors">
                                                <Share2 className="w-5 h-5" />
                                                <span>Chia sẻ</span>
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {activeTab === "reviews" && (
                            <div className="space-y-4">
                                {mockReviews.map(review => (
                                    <div key={review.id} className="bg-purple-50 rounded-xl p-6 border border-purple-100 hover:border-purple-200 transition-all duration-300 hover:shadow-md">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h4 className="text-lg font-semibold text-gray-800 mb-2">{review.eventName}</h4>
                                                <div className="flex items-center space-x-1 text-yellow-400 mb-2">
                                                    {[...Array(review.rating)].map((_, i) => (
                                                        <Star key={i} className="w-5 h-5 fill-current" />
                                                    ))}
                                                </div>
                                                <p className="text-gray-600">{review.comment}</p>
                                                <p className="text-gray-500 text-sm mt-2">{review.date}</p>
                                            </div>
                                        </div>
                                        <div className="mt-4 flex items-center space-x-4">
                                            <button className="flex items-center space-x-2 text-gray-500 hover:text-purple-500 transition-colors">
                                                <Heart className="w-5 h-5" />
                                                <span>Thích</span>
                                            </button>
                                            <button className="flex items-center space-x-2 text-gray-500 hover:text-purple-500 transition-colors">
                                                <MessageCircle className="w-5 h-5" />
                                                <span>Phản hồi</span>
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile; 