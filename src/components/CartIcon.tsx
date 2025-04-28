// components/CartIcon.tsx
import { FiShoppingBag } from "react-icons/fi";

const CartIcon = ({ count = 0 }: { count?: number }) => (
  <div className="relative z-10 cursor-pointer">
    <FiShoppingBag
      size={22}
      className="text-white hover:text-purple-300 transition-all duration-200 active:text-purple-500 active:scale-95"
    />
    <span className="absolute -top-2 -right-2 text-xs w-4 h-4 bg-white text-black rounded-full flex items-center justify-center">
      {count}
    </span>
  </div>
);

export default CartIcon;
