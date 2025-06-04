// components/CartIcon.tsx
import { FiShoppingBag } from "react-icons/fi";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../features/store";
import { useEffect } from "react";
import { getTotalCart } from "../features/Cart/cartThunk";

interface CartIconProps {
  className?: string;
}

const CartIcon = ({ className = "" }: CartIconProps) => {
  const location = useLocation();
  const isCartPage = location.pathname === "/cart";
  const { totalOfCart } = useSelector((state: RootState) => state.cart);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getTotalCart());
  }, [dispatch]);
  return (
    <div className="relative">
      <FiShoppingBag
        className={`text-2xl ${className} ${isCartPage
          ? "text-purple-500 border-2 border-purple-500 rounded-full p-1"
          : ""
          }`}
      />
      {totalOfCart > 0 && (
        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
          {totalOfCart}
        </span>
      )}
    </div>
  );
};

export default CartIcon;
