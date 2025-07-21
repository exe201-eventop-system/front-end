import { Link } from "react-router-dom";

interface NavButtonProps<T = unknown> {
  to?: string;
  color?: "deflaut" | "gradient" | "purple-white";
  typeButon?: "submit" | "button" | "reset";
  children: React.ReactNode;
  isActive?: boolean;
  onClick?: () => void;
  stateAuth?: T;
  disabled?: boolean;
}

const Button = ({
  to,
  children,
  isActive = false,
  onClick,
  stateAuth,
  typeButon,
  color = "deflaut",
  disabled = false,
}: NavButtonProps) => {
  const getButtonStyle = () => {
    switch (color) {
      case "gradient":
        return isActive
          ? "bg-gradient-to-r from-fuchsia-500 to-cyan-400 scale-105 text-white"
          : "bg-transparent hover:bg-gradient-to-r hover:from-fuchsia-500 hover:to-cyan-400 hover:scale-105 text-white";
      case "purple-white":
        return isActive
          ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white scale-105"
          : "bg-white text-purple-600 hover:bg-purple-600 hover:text-white hover:scale-105";
      default:
        return isActive
          ? "bg-blue-600 scale-105"
          : "bg-transparent hover:bg-blue-600 hover:scale-105";
    }
  };

  const content = (
    <button
      onClick={onClick}
      type={typeButon}
      className={`relative z-10 px-4 py-1.5 rounded-sm font-medium
          transition-all duration-300 ease-in-out
          ${getButtonStyle()}
          active:scale-95`}
      disabled={disabled}
    >
      {children}
    </button>
  );
  return to ? (
    <Link to={to} onClick={onClick} state={stateAuth}>
      {content}
    </Link>
  ) : (
    content
  );
};

export default Button;
