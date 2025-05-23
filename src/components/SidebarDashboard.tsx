import { useState } from "react";
import { NavLink } from "react-router-dom";
import NavbarDashBoard from "./NavbarDashBoard";
import logo from "./../assets/logo.png"
const SidebarDashboard = () => {
  const [showSidebar, setShowSidebar] = useState("-left-64");

  const linkClass =
    "flex items-center gap-4 text-sm text-gray-700 font-light px-4 py-3 rounded-lg";
  const activeClass =
    "bg-gradient-to-r from-fuchsia-500 to-cyan-400 scale-105 text-white shadow-md";

  return (
    <>
      <NavbarDashBoard showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
      <div
        className={`h-screen fixed top-0 md:left-0 ${showSidebar} overflow-y-auto flex-col shadow-xl bg-white w-64 z-10 py-4 px-6 transition-all duration-300`}
      >
        <div className="flex flex-col min-h-full relative">
<a
  href="https://material-tailwind.com?ref=mtd"
  target="_blank"
  rel="noreferrer"
  className="flex items-center justify-center gap-2 w-full mt-2 text-lg font-semibold text-black transition-colors duration-200"
>
  <img src={logo} alt="logo" className="h-8 w-auto" />
  <span>Event Top</span>
</a>


          <hr className="my-4" />

          <ul className="flex flex-col space-y-2 ">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `${linkClass} ${isActive ? activeClass : ""}`
                }
              >
                <span className="material-icons"></span>
               <div className="font-medium">Dashboard</div> 
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/settings"
                className={({ isActive }) =>
                  `${linkClass} ${isActive ? activeClass : ""}`
                }
              >
                <span className="material-icons"></span>
                 <div className="font-medium">Settings</div>                
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/tables"
                className={({ isActive }) =>
                  `${linkClass} ${isActive ? activeClass : ""}`
                }
              >
                <span className="material-icons"></span>
                 <div className="font-medium">Tables</div> 
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/maps"
                className={({ isActive }) =>
                  `${linkClass} ${isActive ? activeClass : ""}`
                }
              >
                <span className="material-icons"></span>
                Maps
              </NavLink>
            </li>          
            <li>
              <a
                href="https://demos.creative-tim.com/material-tailwind-kit-react/#/profile"
                target="_blank"
                rel="noreferrer"
                className={linkClass}
              >
                <span className="material-icons"></span>
                Profile Page
              </a>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
export default SidebarDashboard;