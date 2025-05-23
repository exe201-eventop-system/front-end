interface NavButtonProps<T = unknown> {
  children: React.ReactNode;
  isActive?: boolean;
  onClick?: () => void;
  stateAuth?: T;
}

const Tabs = ({ children, isActive = false, onClick }: NavButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`relative z-10 px-4 py-1.5 rounded-sm font-medium transition-all duration-300 ease-in-out
        ${
          isActive
            ? "bg-gradient-to-r from-purple-600 to-pink-500 text-white scale-105"
            : "hover:bg-gradient-to-r hover:from-purple-600 hover:to-pink-500 hover:text-white hover:scale-105"
        }
        active:scale-95`}
    >
      {children}
    </button>
  );
};

export default Tabs;
