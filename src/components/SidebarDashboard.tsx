// import { useState } from "react";
// import { Link, NavLink } from "react-router-dom";
// import NavbarDashBoard from "./NavbarDashBoard";
// import logo from "./../assets/logo.png";
// import {
//   Home,
//   Settings,
//   User,
//   Calendar,
//   ShoppingCart,
//   Users,
//   BarChart2,
//   Bell
// } from "lucide-react";
// import { UserRole } from "../types/User.type";

// const SidebarDashboard = () => {
//   const [showSidebar, setShowSidebar] = useState("-left-64");
//   const role = localStorage.getItem("user_role");
//   const linkClass = "flex items-center gap-4 text-sm text-gray-600 font-medium px-4 py-3 rounded-lg transition-all duration-200 hover:bg-gray-50";
//   const activeClass = "bg-gradient-to-r from-fuchsia-500 to-cyan-400 scale-105 text-white shadow-md ";

//   const menuItems = [
//     { path: "/dashboard", label: "Dashboard", icon: <Home size={20} />, roles: [UserRole.Admin, "Customer", "Inspector", "Suplier"] },
//     { path: "/dashboard/events", label: "Sự kiện", icon: <Calendar size={20} />, roles: [UserRole.Admin, "Customer"] },
//     { path: "/dashboard/orders", label: "Đơn hàng", icon: <ShoppingCart size={20} />, roles: [UserRole.Admin, "Suplier"] },
//     { path: "/dashboard/customers", label: "Khách hàng", icon: <Users size={20} />, roles: [UserRole.Admin] },
//     { path: "/dashboard/analytics", label: "Thống kê", icon: <BarChart2 size={20} />, roles: [UserRole.Admin] },
//     { path: "/dashboard/notifications", label: "Thông báo", icon: <Bell size={20} />, roles: [UserRole.Admin, "Inspector"] },
//     { path: "/dashboard/settings", label: "Cài đặt", icon: <Settings size={20} />, roles: [UserRole.Admin, "Suplier", "Inspector"] },
//   ];


//   return (
//     <>
//       <NavbarDashBoard setShowSidebar={setShowSidebar} />
//       <div
//         className={`h-screen fixed top-0 md:left-0 ${showSidebar} overflow-y-auto flex-col shadow-xl bg-white w-64 z-10 py-4 px-6 transition-all duration-300`}
//       >
//         <div className="flex flex-col min-h-full">
//           <Link to={"/dashboard"} >
//             <div className="flex items-center justify-center gap-2 w-full mt-2 mb-8">
//               <img src={logo} alt="logo" className="h-8 w-auto" />
//               <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
//                 Event Top
//               </span>
//             </div>
//           </Link>
//           {/* Logo */}


//           {/* Navigation */}
//           <nav className="flex-1">
//             <ul className="space-y-2">
//               {menuItems
//                 .filter((item) => item.roles.includes(role as string))
//                 .map((item) => (
//                   <li key={item.path}>
//                     <NavLink
//                       to={item.path}
//                       className={({ isActive }) =>
//                         `${linkClass} ${isActive ? activeClass : ""}`
//                       }
//                     >
//                       {item.icon}
//                       <span>{item.label}</span>
//                     </NavLink>
//                   </li>
//                 ))}

//             </ul>
//           </nav>

//           {/* User Profile Section */}
//           <div className="mt-auto pt-4 border-t border-gray-200">
//             <div className="flex items-center gap-3 px-4 py-3">
//               <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 flex items-center justify-center text-white">
//                 <User size={20} />
//               </div>
//               <div>
//                 <p className="text-sm font-medium text-gray-900">Admin User</p>
//                 <p className="text-xs text-gray-500">admin@eventtop.com</p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default SidebarDashboard;
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import NavbarDashBoard from "./NavbarDashBoard";
import logo from "./../assets/logo.png";
import {
  Home,
  Settings,
  User,
  Calendar,
  ShoppingCart,
  Users,
  BarChart2,
  Bell
} from "lucide-react";

const SidebarDashboard = () => {
  const [showSidebar, setShowSidebar] = useState("-left-64");

  const linkClass = "flex items-center gap-4 text-sm text-gray-600 font-medium px-4 py-3 rounded-lg transition-all duration-200 hover:bg-gray-50";
  const activeClass = "bg-gradient-to-r from-fuchsia-500 to-cyan-400 scale-105 text-white shadow-md ";

  const menuItems = [
    { path: "/dashboard", label: "Dashboard", icon: <Home size={20} /> },
    { path: "/dashboard/events", label: "Sự kiện", icon: <Calendar size={20} /> },
    { path: "/dashboard/orders", label: "Đơn hàng", icon: <ShoppingCart size={20} /> },
    { path: "/dashboard/customers", label: "Khách hàng", icon: <Users size={20} /> },
    { path: "/dashboard/analytics", label: "Thống kê", icon: <BarChart2 size={20} /> },
    { path: "/dashboard/notifications", label: "Thông báo", icon: <Bell size={20} /> },
    { path: "/dashboard/settings", label: "Cài đặt", icon: <Settings size={20} /> },
  ];

  return (
    <>
      <NavbarDashBoard setShowSidebar={setShowSidebar} />
      <div
        className={`h-screen fixed top-0 md:left-0 ${showSidebar} overflow-y-auto flex-col shadow-xl bg-white w-64 z-10 py-4 px-6 transition-all duration-300`}
      >
        <div className="flex flex-col min-h-full">
          <Link to={"/dashboard"} >
            <div className="flex items-center justify-center gap-2 w-full mt-2 mb-8">
              <img src={logo} alt="logo" className="h-8 w-auto" />
              <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                Event Top
              </span>
            </div>
          </Link>

          {/* Navigation */}
          <nav className="flex-1">
            <ul className="space-y-2">
              {menuItems.map((item) => (
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
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 flex items-center justify-center text-white">
                <User size={20} />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">Admin User</p>
                <p className="text-xs text-gray-500">admin@eventtop.com</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SidebarDashboard;
