import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  Mail,
  MapPin,
  LogOut,
  History,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AppDispatch, RootState } from "../../features/store";
import defaultAvatar from "../../assets/avatar.svg";
import { getProfile, updateProfile } from "../../features/Auth/authThunks";
import Loading from "../../components/common/Loading";
import { logout } from "../../features/Auth/authSlice";
import HistoryComponent from "../History/History";
import { getUserRole } from "../../utils/jwt/JwtHelper";
import { UserRole } from "../../types/Auth/User.type";

interface UserProfile {
  email: string;
  user_name: string;
  address: string;
  avatar: string;
  phone_number: string;
}

const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.auth);
  const [activeTab, setActiveTab] = useState("profile");
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState<UserProfile>({
    email: "",
    user_name: "",
    address: "",
    avatar: "",
    phone_number: "",
  });
  var userRole = getUserRole();
  useEffect(() => {
    dispatch(getProfile());
  }, [dispatch]);

  useEffect(() => {
    if (!user) {
      navigate("/auth");
      return;
    }
    setFormData({
      email: user.email || "",
      user_name: user.user_name || "",
      address: user.address || "",
      avatar: user.avatar || "",
      phone_number: user.phone_number || "",
    });
    setLoading(false);
  }, [user, navigate]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload = {
        email: formData.email,
        user_name: formData.user_name,
        address: formData.address,
        avatar: formData.avatar,
        phone_number: formData.phone_number,
      };
      const result = await dispatch(updateProfile(payload));
      if (updateProfile.fulfilled.match(result)) {
        toast.success("Cập nhật thông tin thành công!");
        setIsEditing(false);
        dispatch(getProfile());
      } else {
        toast.error("Cập nhật thông tin thất bại!");
      }
    } catch (error) {
      toast.error("Cập nhật thông tin thất bại!");
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    setTimeout(() => {
      navigate("/auth");
    }, 100); 
  };


  const tabs = [
    { id: "profile", label: "Thông tin cá nhân", icon: User },
    { id: "history", label: "Lịch sử", icon: History },
  ];

  // Thêm biến tabsToShow để điều kiện theo role
  const tabsToShow = user && userRole === UserRole.Customer
    ? tabs
    : [tabs[0]];

  if (loading) {
    return <Loading />;
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case "profile":
        return (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex items-center space-x-4">
              <div className="w-24 h-24 rounded-full overflow-hidden bg-purple-100 border-4 border-white shadow-lg">
                <img
                  src={formData.avatar || defaultAvatar}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-800">{formData.user_name}</h2>
                <p className="text-gray-600">{formData.email}</p>
                <p className="text-gray-600">{formData.phone_number}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="flex items-center text-gray-600">
                  <User className="w-5 h-5 mr-2 text-purple-600" />
                  Tên đăng nhập
                </label>
                <input
                  type="text"
                  name="user_name"
                  value={formData.user_name}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className="w-full px-4 py-2 bg-white border border-gray-200 rounded-lg text-gray-800 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200 disabled:opacity-50"
                />
              </div>

              <div className="space-y-2">
                <label className="flex items-center text-gray-600">
                  <Mail className="w-5 h-5 mr-2 text-purple-600" />
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className="w-full px-4 py-2 bg-white border border-gray-200 rounded-lg text-gray-800 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200 disabled:opacity-50"
                />
              </div>

              <div className="space-y-2">
                <label className="flex items-center text-gray-600">
                  <User className="w-5 h-5 mr-2 text-purple-600" />
                  Số điện thoại
                </label>
                <input
                  type="text"
                  name="phone_number"
                  value={formData.phone_number}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className="w-full px-4 py-2 bg-white border border-gray-200 rounded-lg text-gray-800 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200 disabled:opacity-50"
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <label className="flex items-center text-gray-600">
                  <MapPin className="w-5 h-5 mr-2 text-purple-600" />
                  Địa chỉ
                </label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className="w-full px-4 py-2 bg-white border border-gray-200 rounded-lg text-gray-800 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200 disabled:opacity-50"
                />
              </div>
            </div>

            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => setIsEditing(!isEditing)}
                className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors shadow-md"
              >
                {isEditing ? "Hủy" : "Chỉnh sửa"}
              </button>
              {isEditing && (
                <button
                  type="submit"
                  className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors shadow-md"
                >
                  Lưu thay đổi
                </button>
              )}
            </div>
          </form>
        );

      case "history":
        return <HistoryComponent />;

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-purple-50 to-purple-100 py-20 px-10 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white/80 backdrop-blur-lg rounded-2xl mt-10 shadow-xl overflow-hidden border border-purple-100">
          <div className="flex flex-col md:flex-row">
            {/* Sidebar */}
            <div className="w-full md:w-64 bg-white/90 p-6 border-r border-purple-100">
              <div className="space-y-2">
                {tabsToShow.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-300 ${activeTab === tab.id
                      ? "bg-gradient-to-r from-fuchsia-500 to-cyan-400 text-white shadow-lg scale-105"
                      : "text-gray-600 hover:bg-gradient-to-r hover:from-fuchsia-500 hover:to-cyan-400 hover:text-white hover:shadow-md hover:scale-105"
                      }`}
                  >
                    <tab.icon className="w-5 h-5" />
                    <span>{tab.label}</span>
                  </button>
                ))}
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-red-500 hover:bg-red-50 hover:text-red-600 transition-colors"
                >
                  <LogOut className="w-5 h-5" />
                  <span>Đăng xuất</span>
                </button>
              </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 p-8 bg-white/50">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                >
                  {renderTabContent()}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Profile;