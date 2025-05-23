import { useDispatch, useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import LoginForm from "./component/LoginForm";
import { useEffect } from "react";
import RegisterForm from "./component/RegisterForm";
import backgroundAuth from "../../assets/backgroundAuth.jpg";
import { RootState } from "../../features/store";
import { switchAuthType } from "../../features/Auth/authSlice";
import bannerLogin from "../../assets/bannerLogin.jpg";
import bannerRegister from "../../assets/BanerRegister.jpg";
import { useLocation } from "react-router-dom";
const Auth = () => {
  const authType = useSelector((state: RootState) => state.auth.authType);
  const location = useLocation();
  const state = location.state as { authType?: "login" | "register" };
  const isLogin = authType === "login";
  const dispatch = useDispatch();

  const toggleForm = () => {
    dispatch(switchAuthType());
  };
  useEffect(() => {
    if (state?.authType) {
      dispatch(switchAuthType(state.authType));
    }
  }, [state?.authType, dispatch]);
  const Testimonial = ({ type }: { type: "login" | "register" }) => {
    const backgroundImage =
      type === "login" ? `url(${bannerLogin})` : `url(${bannerRegister})`;

    // const textContent =
    //   type === "login"
    //     ? {
    //         title: "Welcome Back!*",
    //         desc: "Log in to continue your journey.",
    //       }
    //     : {
    //         title: "Join Us!*",
    //         desc: "Create an account to get started.",
    //       };

    return (
      <div className="flex items-center justify-center w-full h-full">
        <div
          className="w-[80%] h-[80%] text-white flex items-center justify-center rounded-xl bg-cover bg-center"
          style={{ backgroundImage }}
        >
          {/* <div className="bg-black/50 backdrop-blur-md p-6 rounded-xl text-white">
            <h2 className="text-4xl font-extrabold mb-2 tracking-tight">
              {textContent.title}
            </h2>
            <p className="text-sm text-gray-200">{textContent.desc}</p>
          </div> */}
        </div>
      </div>
    );
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 bg-cover bg-center"
      style={{
        backgroundImage: `url(${backgroundAuth})`,
        backgroundPosition: "center",
      }}
    >
      <div className="relative max-w-6xl w-[60%] rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row bg-white/5 backdrop-blur-2xl border border-white/10">
        <AnimatePresence mode="wait">
          {isLogin ? (
            <>
              <motion.div
                key="login-form"
                className="w-full md:w-1/2 p-6 sm:p-10 z-10 text-white"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 50 }}
                transition={{ duration: 0.5 }}
              >
                <LoginForm onSwitch={toggleForm} />
              </motion.div>

              <motion.div
                key="testimonial-login"
                className="hidden md:block w-full md:w-1/2"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5 }}
              >
                <Testimonial type="login" />
              </motion.div>
            </>
          ) : (
            <>
              <motion.div
                key="testimonial-register"
                className="hidden md:block w-full md:w-1/2"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 50 }}
                transition={{ duration: 0.5 }}
              >
                <Testimonial type="register" />
              </motion.div>

              <motion.div
                key="register-form"
                className="w-full md:w-1/2 sm:p-10 z-10 text-white "
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.4 }}
              >
                <RegisterForm onSwitch={toggleForm} />
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Auth;
