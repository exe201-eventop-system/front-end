import { useState } from "react";
import { RegisterRequest } from "../../../types/Register.type";
import { register } from "../../../features/Auth/authThunks";
import { useDispatch } from 'react-redux';
import type { AppDispatch } from '../../../features/store';
const RegisterForm = ({ onSwitch }: { onSwitch: () => void }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [form,setForm]= useState<RegisterRequest>({
    full_name: "",
    email: "",
    password: "",
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      const result = await dispatch(register(form));
      console.log("Register success:", result);
    } catch (error) {
      console.error("Register failed:", error);
    }
  };
  return (
    <div className="text-white">
      <h2 className="text-3xl font-bold mb-6">Create an account</h2>

      <input
        name="full_name"
        type="text"
        placeholder="Full name"
        value={form.full_name}
        onChange={handleChange}
        className="w-full bg-[#2a273d] p-3 mb-4 rounded-lg border border-white/20 focus:outline-none"
      />

      <input
        name="email"
        placeholder="Email"
        type="email"
        value={form.email}
        onChange={handleChange}
        className="w-full bg-[#2a273d] p-3 mb-4 rounded-lg border border-white/20 focus:outline-none"
      />


      <input
        name="password"
        type="password"
        placeholder="Password"
        value={form.password}
        onChange={handleChange}
        className="w-full bg-[#2a273d] p-3 mb-4 rounded-lg border border-white/20 focus:outline-none"
      />
      <input
        placeholder="Confirm Password"
        type="password"
      //  value={confirmEmail}
      // onChange={(e) => setConfirmEmail(e.target.value)}
        className="w-full bg-[#2a273d] p-3 mb-4 rounded-lg border border-white/20 focus:outline-none"
      />
      <button
        onClick={handleSubmit}
        className="w-full bg-purple-600 py-3 rounded-lg font-semibold hover:bg-purple-700 transition"
      >
        Register
      </button>

      <p className="mt-4 text-sm text-white/60 text-center">
        Already have an account?{" "}
        <button onClick={onSwitch} className="underline">
          Log in
        </button>
      </p>
    </div>
  );
};

export default RegisterForm;
