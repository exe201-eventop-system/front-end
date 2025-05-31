import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import { Dispatch, SetStateAction } from 'react';
import { Search, Bell, Settings, LogOut, User } from 'lucide-react';
import ProfilePicture from '../assets/avatar.svg';

interface NavbarDashboardProps {
  showSidebar: string;
  setShowSidebar: Dispatch<SetStateAction<string>>;
}

const NavbarDashBoard = ({ showSidebar, setShowSidebar }: NavbarDashboardProps) => {
  const location = useLocation().pathname;
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleSidebar = () => setShowSidebar('left-0');
  const closeSidebar = () => setShowSidebar('-left-64');

  const getPageTitle = () => {
    const path = location.split('/').pop() || 'dashboard';
    return path.charAt(0).toUpperCase() + path.slice(1);
  };

  return (
    <nav className="sticky top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 md:ml-64">
      <div className="px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Left side - Menu button and title */}
          <div className="flex items-center">
            <button
              onClick={toggleSidebar}
              className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100 focus:outline-none"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <h1 className="ml-4 text-xl font-semibold text-gray-800">
              {getPageTitle()}
            </h1>
          </div>

          {/* Right side - Search and profile */}
          <div className="flex items-center space-x-4">
            {/* Search */}
            <div className="relative hidden md:block">
              <input
                type="text"
                placeholder="Tìm kiếm..."
                className="w-64 pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>

            {/* Notifications */}
            <button className="p-2 rounded-lg text-gray-600 hover:bg-gray-100 focus:outline-none relative">
              <Bell className="h-6 w-6" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>

            {/* Settings */}
            <button className="p-2 rounded-lg text-gray-600 hover:bg-gray-100 focus:outline-none">
              <Settings className="h-6 w-6" />
            </button>

            {/* Profile dropdown */}
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center space-x-3 focus:outline-none"
              >
                <img
                  src={ProfilePicture}
                  alt="Profile"
                  className="w-10 h-10 rounded-full border-2 border-purple-500"
                />
                <div className="hidden md:block text-left">
                  <p className="text-sm font-medium text-gray-700">Admin User</p>
                  <p className="text-xs text-gray-500">admin@eventtop.com</p>
                </div>
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50">
                  <a
                    href="#profile"
                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    <User className="h-5 w-5 mr-2" />
                    Thông tin cá nhân
                  </a>
                  <a
                    href="#settings"
                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    <Settings className="h-5 w-5 mr-2" />
                    Cài đặt
                  </a>
                  <hr className="my-2" />
                  <button
                    onClick={() => {
                      // Handle logout
                      setDropdownOpen(false);
                    }}
                    className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                  >
                    <LogOut className="h-5 w-5 mr-2" />
                    Đăng xuất
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavbarDashBoard;