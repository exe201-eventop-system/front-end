import { useState } from "react";
import Button from "./Button";
import CartIcon from "./CartIcon";
import ScheduleIcon from "./ScheduleIcon";
import { User } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "./../assets/logo.png";
import ProfilePicture from "../assets/avatar.svg";
import { FiShoppingCart } from "react-icons/fi";

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const activeTab = location.pathname;

  const [showAuthOptions, setShowAuthOptions] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const token = localStorage.getItem("access_token");
  const isAuthenticated = !!token;

  const toggleAuthOptions = () => setShowAuthOptions((prev) => !prev);
  const toggleProfileMenu = () => setShowProfileMenu((prev) => !prev);

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    setShowProfileMenu(false);
    navigate("/auth");
  };

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 h-20 m-5 px-8 flex items-center justify-between
      text-white bg-black/20 rounded-xl border border-white/20 shadow-md"
    >
      <div className="text-xl font-bold flex items-center space-x-2">
        <img src={logo} alt="logo" className="h-6" />
        <span>Event Top</span>
      </div>

      <nav className="flex items-center space-x-6 relative group">
        <Button to="/" isActive={activeTab === "/"}>
          Trang chủ
        </Button>
        <Button to="/about" isActive={activeTab === "/about"}>
          Về chúng tôi
        </Button>
        <Button to="/services" isActive={activeTab.includes("service")}>
          Dịch vụ
        </Button>
        <Button to="/blogs" isActive={activeTab.includes("blog")}>
          Bài viết
        </Button>
        <Button to="/contact" isActive={activeTab === "/contact"}>
          Liên hệ
        </Button>

        {!isAuthenticated ? (
          <div className="relative">
            <User
              className="h-6 w-6 text-white cursor-pointer"
              onClick={toggleAuthOptions}
            />
            {showAuthOptions && (
              <div className="absolute top-8 right-0 bg-slate-900 text-white p-3 rounded-lg shadow-lg w-40">
                <Button to="/auth" stateAuth={{ authType: `login` }}>
                  Đăng nhập
                </Button>
                <Button to="/auth" stateAuth={{ authType: `register` }}>
                  Đăng ký
                </Button>
              </div>
            )}
          </div>
        ) : (
          <>
            <Link to="/planning" className="text-white hover:text-gray-300">
              <ScheduleIcon className="text-white hover:text-gray-300" />
            </Link>
            <Link to="/cart" className="text-white hover:text-gray-300">
              <CartIcon />
            </Link>



            <div className="relative">
              <button
                className="w-12 h-12 rounded-full overflow-hidden border-2 border-white focus:outline-none"
                onClick={toggleProfileMenu}
              >
                <img src={ProfilePicture} alt="Profile" />
              </button>
              {showProfileMenu && (
                <div className="absolute right-0 mt-2 w-40 bg-slate-900 text-white rounded shadow-lg z-50">
                  <Link
                    to="/history"
                    className="block px-4 py-2 hover:bg-gray-700"
                    onClick={() => setShowProfileMenu(false)}
                  >
                    Lịch sử
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 hover:bg-gray-700"
                  >
                    Đăng xuất
                  </button>
                </div>
              )}
            </div>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
