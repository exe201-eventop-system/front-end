import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Lock,
  CreditCard,
  Bell,
  Settings,
  LogOut,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AppDispatch } from "../../features/store";
import { UserRole, User as UserType } from "../../types/User.type";
import axios from "axios";
import defaultAvatar from "../../assets/avatar.svg";
import { profile } from "../../features/Auth/authThunks";

interface UserProfile extends Omit<UserType, 'userName'> {
  fullName: string;
  phone: string;
  dateOfBirth: string;
}

// Mock data for service history
// const mockServiceHistory = [
//   {
//     id: '1',
//     serviceName: 'Tổ Chức Sự Kiện',
//     supplierName: 'EventPro Solutions',
//     date: '2024-03-15',
//     startTime: '09:00',
//     endTime: '11:00',
//     status: 'completed',
//     location: 'Hà Nội',
//     price: 5000000
//   },
//   {
//     id: '2',
//     serviceName: 'Trang Trí Sân Khấu',
//     supplierName: 'Decor Plus',
//     date: '2024-03-20',
//     startTime: '13:00',
//     endTime: '15:00',
//     status: 'upcoming',
//     location: 'Hà Nội',
//     price: 3000000
//   },
//   {
//     id: '3',
//     serviceName: 'Âm Thanh Ánh Sáng',
//     supplierName: 'Sound & Light Pro',
//     date: '2024-02-28',
//     startTime: '15:00',
//     endTime: '17:00',
//     status: 'completed',
//     location: 'Hà Nội',
//     price: 4000000
//   }
// ];

const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const [activeTab, setActiveTab] = useState("profile");
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState<UserProfile>({
    id: "",
    email: "",
    fullName: "",
    phone: "",
    address: "",
    dateOfBirth: "",
    avatar: "",
    role: UserRole.Customer
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await dispatch(profile()).unwrap();
        if (response && response.data) {
          const userData = response.data;
          setFormData({
            id: userData.id || "",
            email: userData.email || "",
            fullName: userData.userName || "", // Map userName to fullName
            phone: "", // Default empty as it's not in User type
            address: userData.address || "",
            dateOfBirth: "", // Default empty as it's not in User type
            avatar: userData.avatar || defaultAvatar,
            role: userData.role || 3, // Role.Customer
          });
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
        toast.error("Không thể tải thông tin profile");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [navigate, dispatch]);

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
      const token = localStorage.getItem("access_token");
      if (!token) {
        navigate("/auth");
        return;
      }

      // Convert formData back to User type for API
      const userData: UserType = {
        id: formData.id,
        email: formData.email,
        userName: formData.fullName, // Map fullName back to userName
        address: formData.address,
        avatar: formData.avatar,
        role: formData.role,
      };

      const response = await axios.put(
        "/api/auth/profile",
        userData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data) {
        toast.success("Cập nhật thông tin thành công!");
        setIsEditing(false);
        // Refresh profile data
        dispatch(profile());
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Cập nhật thông tin thất bại!");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    navigate("/auth");
  };

  const tabs = [
    { id: "profile", label: "Thông tin cá nhân", icon: User },
    { id: "security", label: "Bảo mật", icon: Lock },
    { id: "payment", label: "Thanh toán", icon: CreditCard },
    { id: "notifications", label: "Thông báo", icon: Bell },
    { id: "settings", label: "Cài đặt", icon: Settings },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-white via-purple-50 to-purple-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
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
                <h2 className="text-xl font-semibold text-gray-800">{formData.fullName}</h2>
                <p className="text-gray-600">{formData.email}</p>
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
                  name="fullName"
                  value={formData.fullName}
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
                  <Phone className="w-5 h-5 mr-2 text-purple-600" />
                  Số điện thoại
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
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

      case "security":
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-lg p-6 shadow-md border border-purple-100">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Đổi mật khẩu</h3>
              <div className="space-y-4">
                <input
                  type="password"
                  placeholder="Mật khẩu hiện tại"
                  className="w-full px-4 py-2 bg-white border border-gray-200 rounded-lg text-gray-800 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200"
                />
                <input
                  type="password"
                  placeholder="Mật khẩu mới"
                  className="w-full px-4 py-2 bg-white border border-gray-200 rounded-lg text-gray-800 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200"
                />
                <input
                  type="password"
                  placeholder="Xác nhận mật khẩu mới"
                  className="w-full px-4 py-2 bg-white border border-gray-200 rounded-lg text-gray-800 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200"
                />
                <button className="w-full px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors shadow-md">
                  Cập nhật mật khẩu
                </button>
              </div>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-md border border-purple-100">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Xác thực hai yếu tố</h3>
              <p className="text-gray-600 mb-4">
                Bảo vệ tài khoản của bạn bằng xác thực hai yếu tố
              </p>
              <button className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors shadow-md">
                Bật xác thực hai yếu tố
              </button>
            </div>
          </div>
        );

      case "payment":
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-lg p-6 shadow-md border border-purple-100">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Phương thức thanh toán</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-purple-50 rounded-lg border border-purple-100">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-8 bg-purple-600 rounded"></div>
                    <span className="text-gray-800">**** **** **** 1234</span>
                  </div>
                  <button className="text-red-500 hover:text-red-600">Xóa</button>
                </div>
                <button className="w-full px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors shadow-md">
                  Thêm phương thức thanh toán
                </button>
              </div>
            </div>
          </div>
        );

      case "notifications":
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-lg p-6 shadow-md border border-purple-100">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Cài đặt thông báo</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-800">Thông báo email</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                  </label>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-800">Thông báo đẩy</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                  </label>
                </div>
              </div>
            </div>
          </div>
        );

      case "settings":
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-lg p-6 shadow-md border border-purple-100">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Cài đặt chung</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-800">Ngôn ngữ</span>
                  <select className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-gray-800 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200">
                    <option value="vi">Tiếng Việt</option>
                    <option value="en">English</option>
                  </select>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-800">Chế độ tối</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                  </label>
                </div>
              </div>
            </div>
          </div>
        );

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
                {tabs.map((tab) => (
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