import { FcGoogle } from "react-icons/fc";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate, Link } from "react-router-dom";

import logo from "../../../assets/logo.png";
import {  signUpWithGoogle, signIn } from "../../../features/Auth/authThunks";
import { loginSchema } from "../../../features/Auth/validation/loginSchema";
import type { LoginRequest } from "../../../types/Login.type";
import type { AppDispatch } from "../../../features/store";
import { UserRole } from "../../../types/User.type";
const LoginForm = ({ onSwitch }: { onSwitch: () => void }) => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [status, setStatus] = useState<
    "pending" | "success" | "error" | "idle"
  >("idle");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginRequest>({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = async (data: LoginRequest) => {
    setStatus("pending");
    try {
      const action = await dispatch(signIn(data));
      if (signIn.fulfilled.match(action)) {
        setStatus("success");
        let role = localStorage.getItem("user_role");
        if (role == UserRole.Customer) {
          navigate("/", { replace: true });
        } else {
          navigate("/dashboard", { replace: true });
        }

      } else {
        setStatus("error");
        console.error("Login failed:", action.payload);
      }
    } catch (err) {
      setStatus("error");
      console.error("Unexpected error:", err);
    }
  };
  const handleGoogleLogin = async () => {
    await dispatch(signUpWithGoogle());
  };
  return (
    <div className="text-white">
      <Link to="/">
        <div className="text-xl font-bold flex items-center space-x-2 justify-center">
          <img src={logo} alt="logo" className="h-6" />
          <span>Event Top</span>
        </div>
      </Link>

      <h2 className="text-2xl font-bold mb-6 justify-center items-center flex">
        Chào mừng trở lại
      </h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Email */}
        <div></div>
        <input
          {...register("email")}
          type="text"
          placeholder="Email hoặc Tên đăng nhập"
          className="w-full text-black bg-[#fdfdfd] p-2 mb-4 rounded-lg border border-white/20 focus:outline-none"
        />
        {errors.email && (
          <p className="text-red-400 text-sm mb-2">{errors.email.message}</p>
        )}

        {/* Password */}
        <div className="relative mb-1">
          <input
            {...register("password")}
            type={showPassword ? "text" : "password"}
            placeholder="Mật khẩu"
            className="w-full bg-[#ffffff] p-2 text-black pr-10 rounded-lg border border-white/20 focus:outline-none"
          />
          <div
            className="absolute right-3 top-1/2 -translate-y-1/2 text-black hover:text-black cursor-pointer"
            onClick={() => setShowPassword((prev) => !prev)}
          >
            {showPassword ? <FiEyeOff /> : <FiEye />}
          </div>
        </div>
        {errors.password && (
          <p className="text-red-400 text-sm mb-4">{errors.password.message}</p>
        )}

        {/* Options */}
        <div className="flex justify-between text-sm text-black/35 mb-4">
          <label>
            <input type="checkbox" className="mr-1" />
            Lưu mật khẩu
          </label>
          <a href="#" className="underline">
            Quên mật khẩu?
          </a>
        </div>

        {/* Social login */}
        <div className="flex justify-center items-center gap-2 m-5">
          <div className="text-black/35 text-sm font-medium">Đăng nhập với</div>
          <button
            type="button"
            onClick={() => handleGoogleLogin()}
            className="flex items-center gap-2 bg-white text-black px-4 py-2 rounded-full shadow hover:shadow-md transition"
          >
            <FcGoogle className="text-xl" />
            <span className="text-sm font-medium">Google</span>
          </button>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-fuchsia-500 to-cyan-400 py-3 rounded-lg font-semibold hover:opacity-90 transition"
        >
          {status === "pending" ? "Đang đăng nhập..." : "Đăng nhập"}
        </button>

        {status === "error" && (
          <p className="text-red-400 text-sm text-center mt-2">
            Đăng nhập thất bại. Vui lòng thử lại.
          </p>
        )}
      </form>

      {/* Switch to Register */}
      <p className="mt-4 text-sm text-black/35 text-center">
        Bạn chưa có tài khoản?{" "}
        <button onClick={onSwitch} className="underline">
          Đăng ký
        </button>
      </p>
    </div>
  );
};

export default LoginForm;
