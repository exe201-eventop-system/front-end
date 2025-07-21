import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import logo from "../../../assets/logo.png";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  fetchProvinces,
  fetchDistricts,
  fetchWards,
  signUp,
} from "../../../features/Auth/authThunks";
import {
  RegisterRequest,
  Address,
  RegisterRequestInput,
} from "../../../types/Auth/Register.type";
import type { AppDispatch, RootState } from "../../../features/store";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { registerSchema } from "../../../features/Auth/validation/registerSchema";
import EmailSentNotice from "./EmailSentNotice";

function mapAddressToString(
  province?: string,
  district?: string,
  ward?: string,
  hamlet?: string
): string {
  return [hamlet, ward, district, province].filter(Boolean).join(", ");
}

const RegisterForm = ({
  onSwitch,
  onSuccess,
  forceSuccessNotice,
}: {
  onSwitch: () => void;
  onSuccess?: (email: string) => void;
  forceSuccessNotice?: boolean;
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [status, setStatus] = useState<
    "idle" | "pending" | "success" | "error"
  >("idle");
  const [showSuccessNotice, setShowSuccessNotice] = useState(false);
  const [userEmail, setUserEmail] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const [address, setAddress] = useState<Address>({
    province: "",
    district: "",
    ward: "",
    hamlet: "",
  });

  const provinces = useSelector((state: RootState) => state.auth.provinces);
  const districts = useSelector((state: RootState) => state.auth.districts);
  const wards = useSelector((state: RootState) => state.auth.wards);

  const {
    register: registerField,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterRequestInput>({
    resolver: yupResolver(registerSchema),
  });

  useEffect(() => {
    dispatch(fetchProvinces());
  }, [dispatch]);

  const handleProvinceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const provinceCode = e.target.value;
    const code = +provinceCode;
    const province = provinces.find((p) => p.code === code);
    if (province) {
      setAddress({
        province: provinceCode,
        district: "",
        ward: "",
        hamlet: "",
      });
      dispatch(fetchDistricts(code));
    } else {
      setAddress({
        province: "",
        district: "",
        ward: "",
        hamlet: "",
      });
    }
  };

  const handleDistrictChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const districtCode = e.target.value;
    const code = +districtCode;
    const district = districts.find((d) => d.code === code);
    if (district) {
      setAddress((prev) => ({
        ...prev,
        district: districtCode,
        ward: "",
        hamlet: "",
      }));
      dispatch(fetchWards(code));
    } else {
      setAddress((prev) => ({
        ...prev,
        district: "",
        ward: "",
        hamlet: "",
      }));
    }
  };

  const handleWardChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const wardCode = e.target.value;
    const code = +wardCode;
    const ward = wards.find((w) => w.code === code);
    if (ward) {
      setAddress((prev) => ({
        ...prev,
        ward: wardCode,
        hamlet: "",
      }));
    } else {
      setAddress((prev) => ({
        ...prev,
        ward: "",
        hamlet: "",
      }));
    }
  };

  const onSubmit = async (data: RegisterRequestInput) => {
    setStatus("pending");
    setErrorMessage(""); // Reset error message

    try {
      const fullAddress = mapAddressToString(
        provinces.find((p) => p.code.toString() === address.province)?.name,
        districts.find((d) => d.code.toString() === address.district)?.name,
        wards.find((w) => w.code.toString() === address.ward)?.name,
        address.hamlet
      );

      const payload: RegisterRequest = {
        ...data,
        address: fullAddress,
      };

      console.log("Sending signup payload:", payload);
      console.log("Base URL:", import.meta.env.VITE_BASE_URL);

      const result = await dispatch(signUp(payload));

      if (signUp.fulfilled.match(result)) {
        console.log("Signup successful:", result.payload);
        setStatus("success");
        setUserEmail(data.email);
        setShowSuccessNotice(true);
        if (onSuccess) onSuccess(data.email);
      } else {
        console.error("Signup failed:", result.error);
        console.log(
          "Full error object:",
          JSON.stringify(result.error, null, 2)
        );
        console.log("Result payload:", result.payload);
        setStatus("error");

        const errorMessage = result.payload || "Đăng ký thất bại";
        console.log("Final error message:", errorMessage);
        setErrorMessage(errorMessage);
      }
    } catch (error) {
      console.error("Registration error:", error);
      setStatus("error");
      setErrorMessage(
        "Lỗi kết nối: " + (error as Error).message || "Không thể kết nối đến server"
      );
    }
  };

  if (showSuccessNotice || forceSuccessNotice) {
    return (
      <div>
        <EmailSentNotice email={userEmail} />
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="text-white max-w-md mx-auto border-none">
        <Link to="/" className="flex justify-center">
          <div className="text-xl font-bold flex items-center space-x-2">
            <img src={logo} alt="logo" className="h-6" />
            <span>EvenTop</span>
          </div>
        </Link>

        <h2 className="text-2xl font-bold mb-4 text-center">Chào mừng bạn</h2>

        <div className="flex gap-4 mb-4">
          <div className="flex-1">
            <input
              {...registerField("user_name")}
              type="text"
              placeholder="Tên đăng nhập"
              className="w-full text-black bg-white p-2 rounded-lg border border-white/20 focus:outline-none focus:border-none focus:ring-0"
            />
            {errors.user_name && (
              <p className="text-red-400 text-sm mt-2">
                {errors.user_name.message}
              </p>
            )}
          </div>
          <div className="flex-1">
            <input
              {...registerField("phone_number")}
              type="tel"
              placeholder="Số điện thoại"
              className="w-full text-black bg-white p-2 rounded-lg border border-white/20 focus:outline-none focus:border-none focus:ring-0"
            />
            {errors.phone_number && (
              <p className="text-red-400 text-sm mt-2">
                {errors.phone_number.message}
              </p>
            )}
          </div>
        </div>

        <div className="mb-4">
          <input
            {...registerField("email")}
            type="email"
            placeholder="Email"
            className="w-full text-black bg-white p-2 rounded-lg border border-white/20 focus:outline-none focus:border-none focus:ring-0"
          />
          {errors.email && (
            <p className="text-red-400 text-sm mt-2">{errors.email.message}</p>
          )}
        </div>

        <div className="relative mb-4">
          <input
            {...registerField("password")}
            type={showPassword ? "text" : "password"}
            placeholder="Mật khẩu"
            className="w-full text-black bg-white p-2 rounded-lg border border-white/20 focus:outline-none focus:border-none focus:ring-0 pr-10"
          />
          <div
            className="absolute right-3 top-1/2 -translate-y-1/2 text-black cursor-pointer select-none"
            onClick={() => setShowPassword((prev) => !prev)}
          >
            {showPassword ? <FiEyeOff /> : <FiEye />}
          </div>
          {errors.password && (
            <p className="text-red-400 text-sm mt-2">
              {errors.password.message}
            </p>
          )}
        </div>

        <div className="relative mb-4">
          <input
            {...registerField("confirm_password")}
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Xác nhận mật khẩu"
            className="w-full text-black bg-white p-2 rounded-lg border border-white/20 focus:outline-none focus:border-none focus:ring-0 pr-10"
          />
          <div
            className="absolute right-3 top-1/2 -translate-y-1/2 text-black cursor-pointer select-none"
            onClick={() => setShowConfirmPassword((prev) => !prev)}
          >
            {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
          </div>
          {errors.confirm_password && (
            <p className="text-red-400 text-sm mt-2">
              {errors.confirm_password.message}
            </p>
          )}
        </div>

        <div className="mb-6">
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="relative">
                <select
                  name="province"
                  value={address.province}
                  onChange={handleProvinceChange}
                  className="w-full text-black bg-white p-3 rounded-lg border border-gray-200 focus:outline-none focus:border-none focus:ring-0 transition-all duration-200 appearance-none"
                  required
                >
                  <option value="">Chọn Tỉnh/Thành</option>
                  {provinces.map((p) => (
                    <option key={p.code} value={p.code}>
                      {p.name}
                    </option>
                  ))}
                </select>
                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                  <svg
                    className="w-4 h-4 text-gray-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </div>

              <div className="relative">
                <select
                  name="district"
                  value={address.district}
                  onChange={handleDistrictChange}
                  className="w-full text-black bg-white p-3 rounded-lg border border-gray-200 focus:outline-none focus:border-none focus:ring-0 transition-all duration-200 appearance-none"
                  required
                  disabled={!address.province}
                >
                  <option value="">Chọn Quận/Huyện</option>
                  {districts.map((d) => (
                    <option key={d.code} value={d.code}>
                      {d.name}
                    </option>
                  ))}
                </select>
                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                  <svg
                    className="w-4 h-4 text-gray-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="relative">
                <select
                  name="ward"
                  value={address.ward}
                  onChange={handleWardChange}
                  className="w-full text-black bg-white p-3 rounded-lg border border-gray-200 focus:outline-none focus:border-none focus:ring-0 transition-all duration-200 appearance-none"
                  required
                  disabled={!address.district}
                >
                  <option value="">Chọn Xã/Phường</option>
                  {wards.map((w) => (
                    <option key={w.code} value={w.code}>
                      {w.name}
                    </option>
                  ))}
                </select>
                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                  <svg
                    className="w-4 h-4 text-gray-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </div>

              <div>
                <input
                  type="text"
                  placeholder="Thôn/Xóm (tùy chọn)"
                  value={address.hamlet}
                  onChange={(e) =>
                    setAddress((prev) => ({ ...prev, hamlet: e.target.value }))
                  }
                  className="w-full text-black bg-white p-3 rounded-lg border border-gray-200 focus:outline-none focus:border-none focus:ring-0 transition-all duration-200"
                />
              </div>
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-fuchsia-500 to-cyan-400 py-3 rounded-lg font-semibold hover:opacity-90 transition"
          disabled={status === "pending"}
        >
          {status === "pending" ? "Đang đăng ký..." : "Đăng ký"}
        </button>

        {errorMessage && (
          <div className="text-center text-red-500 text-sm mt-2">
            {errorMessage}
          </div>
        )}
      </div>

      <p className="mt-4 text-sm text-black/35 text-center">
        Bạn đã có tài khoản?{" "}
        <button onClick={onSwitch} className="underline">
          Đăng nhập
        </button>
      </p>
    </form>
  );
};

export default RegisterForm;
