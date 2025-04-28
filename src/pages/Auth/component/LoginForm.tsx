import { FcGoogle } from "react-icons/fc";
import { FaFacebookF } from "react-icons/fa";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useDispatch } from 'react-redux';
import type { AppDispatch } from '../../../features/store';
import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { login } from "../../../features/Auth/authThunks";
import { loginSchema } from "../../../features/Auth/validation/loginSchema";

type LoginFormValues = {
  email: string;
  password: string;
};

const LoginForm = ({ onSwitch }: { onSwitch: () => void }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormValues) => {
    try {
      const action = await dispatch(login(data));
      if (login.fulfilled.match(action)) {
        console.log('Login successful');
      } else {
        console.log(action.payload as string);
      }
    } catch (error) {
      console.error('Login failed', error);
    }
  };

  return (
    <div className="text-white">
      <h2 className="text-3xl font-bold mb-6">Welcome back</h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Email */}
        <input
          {...register("email")}
          type="email"
          placeholder="Email or UserName"
          className="w-full bg-[#2a273d] p-3 mb-1 rounded-lg border border-white/20 focus:outline-none"
        />
        {errors.email && <p className="text-red-400 text-sm mb-2">{errors.email.message}</p>}

        {/* Password */}
        <div className="relative mb-1">
          <input
            {...register("password")}
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className="w-full bg-[#2a273d] p-3 pr-10 rounded-lg border border-white/20 focus:outline-none text-white"
          />
          <div
            className="absolute right-3 top-1/2 -translate-y-1/2 text-white/60 hover:text-white cursor-pointer"
            onClick={() => setShowPassword((prev) => !prev)}
          >
            {showPassword ? <FiEyeOff /> : <FiEye />}
          </div>
        </div>
        {errors.password && <p className="text-red-400 text-sm mb-4">{errors.password.message}</p>}

        {/* Options */}
        <div className="flex justify-between text-sm text-white/60 mb-4">
          <label>
            <input type="checkbox" className="mr-1" />
            Remember Password
          </label>
          <a href="#" className="underline">
            Forgot Password?
          </a>
        </div>

        {/* Submit */}
        <button type="submit" className="w-full bg-gradient-to-r from-pink-400 to-orange-400 py-3 rounded-lg font-semibold hover:opacity-90 transition">
          Sign in
        </button>
      </form>

      {/* Social login */}
      <div className="flex justify-center gap-4 mt-6">
        <button className="flex items-center gap-2 bg-white text-black px-4 py-2 rounded-full shadow hover:shadow-md transition">
          <FcGoogle className="text-xl" />
          <span className="text-sm font-medium">Google</span>
        </button>
        <button className="flex items-center gap-2 bg-white text-blue-600 px-4 py-2 rounded-full shadow hover:shadow-md transition">
          <FaFacebookF className="text-lg" />
          <span className="text-sm font-medium">Facebook</span>
        </button>
      </div>

      {/* Switch to Register */}
      <p className="mt-4 text-sm text-white/60 text-center">
        Don’t have an account?{" "}
        <button onClick={onSwitch} className="underline">
          Register
        </button>
      </p>
    </div>
  );
};

export default LoginForm;
