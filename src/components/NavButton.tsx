import { Link } from "react-router-dom";

interface NavButtonProps {
  to: string;
  children: React.ReactNode;
  isActive?: boolean;
  onClick?: () => void;
}

const NavButton = ({ to, children, isActive = false, onClick }: NavButtonProps) => {
  return (
    <Link to={to} onClick={onClick}>
      <button
        className={`relative z-10 px-4 py-1.5 rounded-sm text-white font-medium
          transition-all duration-300 ease-in-out
          ${isActive 
            ? "bg-gradient-to-r from-fuchsia-500 to-cyan-400 scale-105" 
            : "bg-transparent hover:bg-gradient-to-r hover:from-fuchsia-500 hover:to-cyan-400 hover:scale-105"} 
          active:scale-95`}
      >
        {children}
      </button>
    </Link>
  );
};

export default NavButton;
