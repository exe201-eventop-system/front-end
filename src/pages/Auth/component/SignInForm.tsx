import { FiEye, FiEyeOff } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate, Link, useLocation } from "react-router-dom";

import logo from "../../../assets/logo.png";
import { signIn } from "../../../features/Auth/authThunks";
import { loginSchema } from "../../../features/Auth/validation/loginSchema";
import type { LoginRequest } from "../../../types/Auth/Login.type";
import type { AppDispatch } from "../../../features/store";
import { getUserRole, handleTokenStorage } from "../../../utils/jwt/JwtHelper";
import { UserRole } from "../../../types/Auth/User.type";

const LoginForm = ({ onSwitch, onSwitchToSupplier }: { onSwitch: () => void; onSwitchToSupplier?: () => void }) => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const location = useLocation();

  const [showPassword, setShowPassword] = useState(false);
  const [status, setStatus] = useState<
    "pending" | "success" | "error" | "idle"
  >("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginRequest>({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = async (data: LoginRequest) => {
    setStatus("pending");
    setErrorMessage(null);

    const result = await dispatch(signIn(data));

    if (signIn.fulfilled.match(result)) {
      handleTokenStorage(result.payload.data?.access_token ?? "");
      setStatus("success");
      const role = getUserRole();

      // Kiểm tra xem có redirect URL không
      const urlParams = new URLSearchParams(location.search);
      const redirectUrl = urlParams.get("redirect");

      if (redirectUrl) {
        // Nếu có redirect URL, chuyển đến đó
        navigate(redirectUrl, { replace: true });
      } else {
        // Nếu không có, chuyển theo role như cũ
        if (role === UserRole.Customer) {
          navigate("/", { replace: true });
        } else if (role === UserRole.Supplier) {
          navigate("/supplier/dashboard", { replace: true });
        } else if (role === UserRole.Admin) {
          navigate("/dashboard", { replace: true });
        } else if (role === UserRole.Demo) {
          navigate("/transaction", { replace: true });
        } else if (role === UserRole.Inspector) {
          navigate("/management-supplier", { replace: true });
        }
      }
    } else {
      setStatus("error");
      const message = result.payload || "Đăng nhập thất bại. Vui lòng thử lại.";
      setErrorMessage(message);
      // XÓA: logic OTP
    }
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
        {/* Email/Phone */}
        <div className="relative mb-2">
          <input
            {...register("phone_number")}
            type="text"
            placeholder="Email hoặc số điện thoại"
            className="w-full text-black bg-[#fdfdfd] p-2 mb-1 rounded-lg border border-white/20 focus:outline-none focus:border-none focus:ring-0"
          />
          {errors.phone_number && (
            <p className="text-red-400 text-sm mb-4">
              {errors.phone_number.message}
            </p>
          )}
        </div>

        {/* Password */}
        <div className="relative mb-1">
          <input
            {...register("password")}
            type={showPassword ? "text" : "password"}
            placeholder="Nhập mật khẩu"
            className="w-full bg-[#ffffff] p-2 text-black pr-10 rounded-lg border border-white/20 focus:outline-none focus:border-none focus:ring-0"
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
        <div className="flex justify-between text-sm text-black/35 mb-2">
          <label>
            <input type="checkbox" className="mr-1" />
            Lưu mật khẩu
          </label>
          <a href="#" className="underline">
            Quên mật khẩu?
          </a>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-fuchsia-500 to-cyan-400 py-3 rounded-lg font-semibold hover:opacity-90 transition"
        >
          {status === "pending" ? "Đang đăng nhập..." : "Đăng nhập"}
        </button>

        {status === "error" && (
          <div className="mt-2">
            <p className="text-red-400 text-sm text-center mb-2">
              {errorMessage}
            </p>
          </div>
        )}
      </form>

      {/* Switch to Register */}
      <div className="mt-4 space-y-2">
        <p className="text-sm text-black/35 text-center">
          Bạn chưa có tài khoản?{" "}
          <button onClick={onSwitch} className="underline">
            Đăng ký
          </button>
        </p>

        <div className="text-center">
          <span className="text-sm text-black/35">Hoặc </span>
          <button
            onClick={onSwitchToSupplier ? onSwitchToSupplier : onSwitch}
            className="text-sm underline text-blue-400 hover:text-blue-300"
          >
            Đăng ký nhà cung cấp
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
