import { useState } from "react";
import Button from "./Button";
import CartIcon from "./CartIcon";
import ScheduleIcon from "./ScheduleIcon";
import { User, Menu, X } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "./../assets/logo.png";
import ProfilePicture from "../assets/avatar.svg";

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const activeTab = location.pathname;

  const [showAuthOptions, setShowAuthOptions] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const token = localStorage.getItem("access_token");
  const isAuthenticated = !!token;

  const toggleAuthOptions = () => setShowAuthOptions((prev) => !prev);
  const toggleProfileMenu = () => setShowProfileMenu((prev) => !prev);
  const toggleMobileMenu = () => setIsMobileMenuOpen((prev) => !prev);

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("user_role")
    setShowProfileMenu(false);
    navigate("/auth");
  };

  const mainMenuItems = [
    { path: "/", label: "Trang chủ" },
    { path: "/about", label: "Về chúng tôi" },
    { path: "/services", label: "Dịch vụ" },
    { path: "/suppliers", label: "Nhà cung cấp" },
    { path: "/blogs", label: "Bài viết" },
    { path: "/contact", label: "Liên hệ" },
  ];

  const isActive = (path: string) => {
    if (path === "/") {
      return activeTab === "/";
    }
    return activeTab.startsWith(path);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-md backdrop-filter border-b border-white/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <img src={logo} alt="logo" className="h-8 w-auto" />
              <span className="text-xl font-bold text-white">EvenTop</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-4">
            {mainMenuItems.map((item) => (
              <Button
                color="gradient"
                key={item.path}
                to={item.path}
                isActive={isActive(item.path)}
              >
                {item.label}
              </Button>
            ))}
          </nav>

          {/* Right Side Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {!isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={toggleAuthOptions}
                  className="flex items-center space-x-2 text-white hover:text-gray-300"
                >
                  <User className="h-6 w-6" />
                  <span>Tài khoản</span>
                </button>
                {showAuthOptions && (
                  <div className="absolute top-full right-0 mt-2 w-40 bg-white rounded-lg shadow-lg py-2">
                    <Link
                      to="/auth"
                      state={{ authType: "login" }}
                      className="block px-2 py-1 text-gray-800 hover:bg-gray-100"
                      onClick={() => setShowAuthOptions(false)}
                    >
                      Đăng nhập
                    </Link>
                    <Link
                      to="/auth"
                      state={{ authType: "register" }}
                      className="block px-2 py-1 text-gray-800 hover:bg-gray-100"
                      onClick={() => setShowAuthOptions(false)}
                    >
                      Đăng ký
                    </Link>
                  </div>
                )}
              </div>
            ) : (
              <>
              
                {/* <Link
                  to="/planning"
                  className="text-white hover:text-gray-300 transition-colors"
                >
                  <NotificationIcon className="h-6 w-6" />
                </Link> */}
                <Link
                  to="/planning"
                  className="text-white hover:text-gray-300 transition-colors"
                >
                  <ScheduleIcon className="h-6 w-6" />
                </Link>
                <Link
                  to="/cart"
                  className="text-white hover:text-gray-300 transition-colors"
                >
                  <CartIcon />
                </Link>
                <div className="relative">
                  <button
                    onClick={toggleProfileMenu}
                    className="flex items-center space-x-2 focus:outline-none"
                  >
                    <img
                      src={ProfilePicture}
                      alt="Profile"
                      className="h-8 w-8 rounded-full border-2 border-white"
                    />
                  </button>
                  {showProfileMenu && (
                    <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2">
                      <Link
                        to="/profile"
                        className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                        onClick={() => setShowProfileMenu(false)}
                      >
                        Thông tin cá nhân
                      </Link>
                      <Link
                        to="/history"
                        className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                        onClick={() => setShowProfileMenu(false)}
                      >
                        Lịch sử
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100"
                      >
                        Đăng xuất
                      </button>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={toggleMobileMenu}
              className="text-white hover:text-gray-300 focus:outline-none"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-black/95 backdrop-blur-md">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {mainMenuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`block px-3 py-2 rounded-md text-base font-medium ${isActive(item.path)
                  ? "text-white bg-gray-900"
                  : "text-gray-300 hover:text-white hover:bg-gray-700"
                  }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            {!isAuthenticated ? (
              <>
                <Link
                  to="/auth"
                  state={{ authType: "login" }}
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Đăng nhập
                </Link>
                <Link
                  to="/auth"
                  state={{ authType: "register" }}
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Đăng ký
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/planning"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Lịch trình
                </Link>
                <Link
                  to="/cart"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Giỏ hàng
                </Link>
                <Link
                  to="/profile"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Thông tin cá nhân
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700"
                >
                  Đăng xuất
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
