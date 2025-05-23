import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import { Dispatch, SetStateAction } from 'react';
import ProfilePicture from '../assets/homeSlider2.png';
interface NavbarDashboardProps {
  showSidebar: string;
  setShowSidebar: Dispatch<SetStateAction<string>>;
}
const NavbarDashnoard = ({ showSidebar, setShowSidebar }: NavbarDashboardProps) => {
  const location = useLocation().pathname;
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleSidebar = () => setShowSidebar('left-0');
  const closeSidebar = () => setShowSidebar('-left-64');

  const getPageTitle = () =>
    location === '/' ? 'DASHBOARD' : location.slice(1).toUpperCase();

  return (
    <nav className="sticky top-0 left-0 right-0 z-50 bg-black/20 md:ml-64 py-3 px-3 shadow-md backdrop-blur">
      <div className="container max-w-full mx-auto flex items-center justify-between md:pr-8 md:pl-10 relative">
        {/* Sidebar toggle (mobile) */}
        <div className="md:hidden">
          <button
            onClick={toggleSidebar}
            className="text-white focus:outline-none"
          >
            <span className="material-icons text-3xl">menu</span>
          </button>
          <div
            className={`absolute top-2 transition-all duration-300 ${
              showSidebar === 'left-0' ? 'left-64' : '-left-64'
            } z-50`}
          >
            <button
              onClick={closeSidebar}
              className="text-white focus:outline-none"
            >
              <span className="material-icons text-3xl">close</span>
            </button>
          </div>
        </div>

        {/* Page title & Search */}
        <div className="flex justify-between items-center w-full">
          <h4 className="uppercase text-white text-sm tracking-wider mt-1">
            {getPageTitle()}
          </h4>

          <div className="flex items-center">
            {/* Search Input */}
            <input
              type="text"
              placeholder="Search"
              className="px-4 py-2 rounded-lg text-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-white bg-white text-gray-700"
            />

            {/* Profile dropdown */}
            <div className="relative ml-6">
              <button
                className="w-12 h-12 rounded-full overflow-hidden border-2 border-white focus:outline-none"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                <img src={ProfilePicture} alt="Profile" />
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                  <button
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => setDropdownOpen(false)}
                  >
                    Action
                  </button>
                  <button
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => setDropdownOpen(false)}
                  >
                    Another Action
                  </button>
                  <button
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => setDropdownOpen(false)}
                  >
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
export default NavbarDashnoard;