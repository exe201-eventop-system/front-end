import { useDispatch, useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import LoginForm from "./component/SignInForm";
import { useEffect } from "react";
import RegisterForm from "./component/SignUpForm";
import SupplierSignUpFlow from "./component/SupplierSignUpFlow";
import backgroundAuth from "../../assets/backgroundAuth.jpg";
import { RootState } from "../../features/store";
import { switchAuthType } from "../../features/Auth/authSlice";
import { useLocation } from "react-router-dom";

const Auth = () => {
  const authType = useSelector((state: RootState) => state.auth.authType);
  const location = useLocation();
  const state = location.state as { authType?: "login" | "register" | "supplier" };
  const isLogin = authType === "login";
  const isSupplier = authType === "supplier";
  const dispatch = useDispatch();

  const toggleForm = () => {
    dispatch(switchAuthType());
  };

  const switchToSupplier = () => {
    dispatch(switchAuthType("supplier"));
  };

  useEffect(() => {
    if (state?.authType) {
      dispatch(switchAuthType(state.authType));
    }
  }, [state?.authType, dispatch]);

  return (
    <div
      className="border border-gray-300 min-h-screen flex items-center justify-center px-4 bg-cover bg-center"
      style={{
        backgroundImage: `url(${backgroundAuth})`,
        backgroundPosition: "center",
      }}
    >
      <div className="relative w-full max-w-md">
        <AnimatePresence mode="wait">
          <motion.div
            key={isLogin ? "login" : "register"}
            className="backdrop-blur-md rounded-2xl shadow-2xl p-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >

            {isLogin ? (
              <LoginForm onSwitch={toggleForm} onSwitchToSupplier={switchToSupplier} />
            ) : isSupplier ? (
              <SupplierSignUpFlow onSwitch={toggleForm} />
            ) : (
              <RegisterForm onSwitch={toggleForm} />
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Auth;