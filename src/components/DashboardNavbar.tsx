import { useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import ProfilePicture from '../assets/home-slider.jpg';

interface Props {
  showSidebar: string;
  setShowSidebar: (value: string) => void;
}

function DashboardNavbar({ showSidebar, setShowSidebar }: Props) {
  const location = useLocation().pathname;
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const pageTitle =
    location === '/'
      ? 'DASHBOARD'
      : location.replace('/', '').toUpperCase();

  return (
    <nav className="bg-blue-500 md:ml-64 py-6 px-3 shadow-md">
      <div className="max-w-full mx-auto flex items-center justify-between md:pr-8 md:pl-10">
        {/* Mobile menu button */}
        <div className="md:hidden relative z-50">
          <button
            onClick={() => setShowSidebar('left-0')}
            className="text-white p-2 rounded hover:bg-blue-600"
          >
            <Menu size={28} />
          </button>

          {showSidebar === 'left-0' && (
            <button
              onClick={() => setShowSidebar('-left-64')}
              className="absolute top-0 left-16 text-white p-2 rounded hover:bg-blue-600"
            >
              <X size={28} />
            </button>
          )}
        </div>

        {/* Title & search */}
        <div className="flex justify-between items-center w-full">
          <h4 className="uppercase text-white text-sm tracking-wider mt-1">
            {pageTitle}
          </h4>

          <div className="flex items-center gap-4">
            {/* Search Input */}
            <input
              type="text"
              placeholder="Search"
              className="px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />

            {/* Profile Dropdown */}
            <div className="relative group">
              <button
                onClick={() => setDropdownOpen((prev) => !prev)}
                className="w-10 h-10 rounded-full overflow-hidden border-2 border-white"
              >
                <img src={ProfilePicture} alt="Avatar" className="w-full h-full object-cover" />
              </button>

              {dropdownOpen && (
                <div
                  className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-50"
                  onMouseLeave={() => setDropdownOpen(false)}
                >
                  <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Action
                  </button>
                  <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Another Action
                  </button>
                  <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Something Else
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default DashboardNavbar;
