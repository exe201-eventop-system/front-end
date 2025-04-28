import { useState } from "react";
import NavButton from "../components/NavButton";
import CartIcon from "../components/CartIcon";
import { User } from 'lucide-react';
import { Link, useLocation } from "react-router-dom";

const isAuthenticated = false;

const Header = () => {
  const location = useLocation();
  const activeTab = location.pathname;
  const [showAuthOptions, setShowAuthOptions] = useState(false);

  const toggleAuthOptions = () => setShowAuthOptions(prev => !prev);
 // const handleMouseEnter = () => setShowAuthOptions(true);
 // const handleMouseLeave = () => setShowAuthOptions(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-20 m-2 px-8 flex items-center justify-between
      text-white bg-black/20 rounded-xl border border-white/20 shadow-md">
      
      <div className="text-xl font-bold flex items-center space-x-2">
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3DuUXG2ue_bB3rkt_3mFVm_ofkL1jyq_tRw&s" alt="logo" className="h-6" />
        <span>Event Top</span>
      </div>

      <nav className="flex items-center space-x-6 relative group">
        <NavButton to="/" isActive={activeTab === "/"} >Home</NavButton>
        <NavButton to="/about" isActive={activeTab === "/about"} >About</NavButton>
        <NavButton to="/services" isActive={activeTab.includes("service")}>Services</NavButton>
        <NavButton to="/agenda" isActive={activeTab === "/agenda"} >Agenda*</NavButton>
        <NavButton to="/blogs" isActive={activeTab.includes("blog")} >Blogs</NavButton>
        <NavButton to="/contact" isActive={activeTab === "/contact"}>Contact</NavButton>
        
        {!isAuthenticated ? (
          <div className="relative"              
         // onMouseEnter={handleMouseEnter} 
         // onMouseLeave={handleMouseLeave}
         >
            <User
              className="h-6 w-6 text-white cursor-pointer"
              onClick={toggleAuthOptions}
            />
            {showAuthOptions && (
              <div className="absolute top-8 right-0 bg-slate-900 text-white p-3 rounded-lg shadow-lg  w-auto"  >
                  <NavButton to="/auth" >Login</NavButton>
                  <NavButton to="/auth" >Register</NavButton>
                  <Link to={`profile`}>profile</Link>
              </div>
            )}
          </div>
        ) : (
          <CartIcon count={0} />
        )}
      </nav>
    </header>
  );
};

export default Header;
