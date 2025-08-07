import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import NavbarDashBoard from "./NavbarDashBoard";
import logo from "./../../assets/logo.png";
import {
  Calendar,
  ShoppingCart,
  Users,
  CircleGauge,
  CreditCard,
  UserRoundCog,
  MessageSquareText,
  LogOut,
} from "lucide-react";
import { getUserRole } from "../../utils/jwt/JwtHelper";
import { UserRole } from "../../types/Auth/User.type";

const SidebarDashboard = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("user_info");
    navigate("/auth");
  };
  const role = getUserRole();
  console.log(role);
  const [showSidebar, setShowSidebar] = useState("-left-64");

  const linkClass =
    "flex items-center gap-4 text-sm text-gray-600 font-medium px-4 py-3 rounded-lg transition-all duration-200 hover:bg-gray-50";
  const activeClass =
    "bg-gradient-to-r from-fuchsia-500 to-cyan-400 scale-105 text-white shadow-md ";

  const menuItems = [
    {
      path: "/dashboard",
      label: "Tổng quan",
      icon: <CircleGauge size={20} />,
      roles: [UserRole.Admin],
    },
    {
      path: "/transaction",
      label: "Tài chính",
      icon: <CreditCard size={20} />,
      roles: [UserRole.Admin, UserRole.Demo],
    },
    {
      path: "/customer-feedback",
      label: "Phản hồi khách hàng",
      icon: <MessageSquareText size={20} />,
      roles: [UserRole.Admin],
    },
    {
      path: "/management-user",
      label: "Người dùng",
      icon: <UserRoundCog size={20} />,
      roles: [UserRole.Admin],
    },
    {
      path: "/supplier/dashboard",
      label: "Tổng quan",
      icon: <CircleGauge size={20} />,
      roles: [UserRole.Supplier],
    },
    {
      path: "/supplier/schedule",
      label: "Lịch đặt",
      icon: <Calendar size={20} />,
      roles: [UserRole.Supplier],
    },
    {
      path: "/dashboard/orders",
      label: "Đơn hàng",
      icon: <ShoppingCart size={20} />,
    },
    {
      path: "/dashboard/customers",
      label: "Khách hàng",
      icon: <Users size={20} />,
    },
    {
      path: "/management-supplier",
      label: "Nhà cung cấp",
      icon: <UserRoundCog size={20} />,
      roles: [UserRole.Inspector],
    },
    {
      path: "/service-management",
      label: "Dịch vụ",
      icon: <CircleGauge size={20} />,
      roles: [UserRole.Supplier],
    },
  ];

  return (
    <>
      <NavbarDashBoard setShowSidebar={setShowSidebar} />
      <div
        className={`h-screen fixed top-0 md:left-0 ${showSidebar} overflow-y-auto flex-col shadow-xl bg-white w-64 z-10 py-4 px-6 transition-all duration-300`}
      >
        <div className="flex flex-col min-h-full">
          <Link to={"/dashboard"}>
            <div className="flex items-center justify-center gap-2 w-full mt-2 mb-8">
              <img src={logo} alt="logo" className="h-8 w-auto" />
              <span className="text-xl font-bold">Event Top</span>
            </div>
          </Link>

          {/* Navigation */}
          <nav className="flex-1">
            <ul className="space-y-2">
              {menuItems
                .filter((item) => item.roles?.includes(role))
                .map((item) => (
                  <li key={item.path}>
                    <NavLink
                      to={item.path}
                      className={({ isActive }) =>
                        `${linkClass} ${isActive ? activeClass : ""}`
                      }
                    >
                      {item.icon}
                      <span>{item.label}</span>
                    </NavLink>
                  </li>
                ))}
            </ul>
          </nav>

          {/* User Profile Section */}
          <div className="mt-auto pt-4 border-t border-gray-200">
            <div className="flex items-center gap-3 px-4 py-3">
              <button
                onClick={() => {
                  handleLogout();
                }}
                className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
              >
                <LogOut className="h-5 w-5 mr-2" />
                Đăng xuất
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SidebarDashboard;
