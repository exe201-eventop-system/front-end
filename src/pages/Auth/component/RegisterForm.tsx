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
import { RegisterRequest, Address, RegisterRequestInput } from "../../../types/Register.type";
import type { AppDispatch, RootState } from "../../../features/store";
import EmailSentNotice from "./EmailSentNotice";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { registerSchema } from "../../../features/Auth/validation/registerSchema";

function mapAddressToString(
  province?: string,
  district?: string,
  ward?: string,
  hamlet?: string
): string {
  return [hamlet, ward, district, province].filter(Boolean).join(", ");
}

const RegisterForm = ({ onSwitch }: { onSwitch: () => void }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [showPassword, setShowPassword] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [sentEmail, setSentEmail] = useState("");

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
    const fullAddress = mapAddressToString(
      provinces.find((p) => p.code.toString() === address.province)?.name,
      districts.find((d) => d.code.toString() === address.district)?.name,
      wards.find((w) => w.code.toString() === address.ward)?.name,
      address.hamlet
    );

    const payload: RegisterRequest = {
      user_name: data.user_name,
      email: data.email,
      password: data.password,
      address: fullAddress,
    };

    try {
      const result = await dispatch(signUp(payload));
      setSentEmail(result.payload as string);
      setEmailSent(true);
    } catch (error) {
      console.error("Register failed:", error);
    }
  };

  if (emailSent) {
    return <EmailSentNotice email={sentEmail} />;
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

        <input
          {...registerField("user_name")}
          type="text"
          placeholder="Tên đăng nhập"
          className="w-full text-black bg-white p-2 mb-4 rounded-lg border border-white/20"
        />
        {errors.user_name && (
          <p className="text-red-400 text-sm mb-2">
            {errors.user_name.message}
          </p>
        )}

        <input
          {...registerField("email")}
          type="email"
          placeholder="Email"
          className="w-full text-black bg-white p-2 mb-4 rounded-lg border border-white/20"
        />
        {errors.email && (
          <p className="text-red-400 text-sm mb-2">
            {errors.email.message}
          </p>
        )}

        <div className="relative mb-4">
          <input
            {...registerField("password")}
            type={showPassword ? "text" : "password"}
            placeholder="Mật khẩu"
            className="w-full text-black bg-white p-2 rounded-lg border border-white/20"
          />
          {errors.password && (
            <p className="text-red-400 text-sm mt-2">
              {errors.password.message}
            </p>
          )}
          <div
            className="absolute right-3 top-1/2 -translate-y-1/2 text-black cursor-pointer select-none"
            onClick={() => setShowPassword((prev) => !prev)}
            aria-label={showPassword ? "Hide password" : "Show password"}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                setShowPassword((prev) => !prev);
              }
            }}
          >
            {showPassword ? <FiEyeOff /> : <FiEye />}
          </div>
        </div>

        <div className="relative mb-4">
          <input
            {...registerField("confirm_password")}
            type="password"
            placeholder="Xác nhận mật khẩu"
            className="w-full text-black bg-white p-2 rounded-lg border border-white/20"
          />
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
                  className="w-full text-black bg-white p-3 rounded-lg border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-200 appearance-none"
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
                  <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>

              <div className="relative">
                <select
                  name="district"
                  value={address.district}
                  onChange={handleDistrictChange}
                  className="w-full text-black bg-white p-3 rounded-lg border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-200 appearance-none disabled:bg-gray-100 disabled:cursor-not-allowed"
                  disabled={!districts.length}
                  required
                >
                  <option value="">Chọn Quận/Huyện</option>
                  {districts.map((d) => (
                    <option key={d.code} value={d.code}>
                      {d.name}
                    </option>
                  ))}
                </select>
                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                  <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>

              <div className="relative">
                <select
                  name="ward"
                  value={address.ward}
                  onChange={handleWardChange}
                  className="w-full text-black bg-white p-3 rounded-lg border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-200 appearance-none disabled:bg-gray-100 disabled:cursor-not-allowed"
                  disabled={!wards.length}
                  required
                >
                  <option value="">Chọn Xã/Phường</option>
                  {wards.map((w) => (
                    <option key={w.code} value={w.code}>
                      {w.name}
                    </option>
                  ))}
                </select>
                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                  <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>

              <div className="relative">
                <input
                  name="hamlet"
                  placeholder="Nhập địa chỉ chi tiết (số nhà, tên đường, ấp...)"
                  value={address.hamlet}
                  onChange={(e) => setAddress(prev => ({ ...prev, hamlet: e.target.value }))}
                  className="w-full text-black bg-white p-3 rounded-lg border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-200 resize-none "
                  required
                />
              </div>
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-fuchsia-500 to-cyan-400 py-3 rounded-lg font-semibold hover:brightness-110 transition"
        >
          Đăng ký
        </button>

        <p className="mt-4 text-sm text-black/60 text-center">
          Bạn đã có tài khoản?{" "}
          <button type="button" onClick={onSwitch} className="underline">
            Đăng nhập
          </button>
        </p>
      </div>
    </form>
  );
};

export default RegisterForm;
