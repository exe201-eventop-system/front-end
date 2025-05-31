// components/CartIcon.tsx
import { FiShoppingBag } from "react-icons/fi";
import { useLocation } from "react-router-dom";

const CartIcon = ({ count = 0 }: { count?: number }) => {
  const location = useLocation();
  const isCartPage = location.pathname === "/cart";

  return (
    <div className="relative z-10 cursor-pointer">
      <FiShoppingBag
        size={22}
        className={`text-white hover:text-purple-300 transition-all duration-200 active:text-purple-500 active:scale-95 ${isCartPage
            ? "text-purple-500 border-2 border-purple-500 rounded-full p-1"
            : ""
          }`}
      />
      <span className="absolute -top-2 -right-2 text-xs w-4 h-4 bg-white text-black rounded-full flex items-center justify-center">
        {count}
      </span>
    </div>
  );
};

export default CartIcon;
