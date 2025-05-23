import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {sentOTP  } from "../../../features/Auth/authThunks";
import type { AppDispatch } from "../../../features/store";
interface OtpPopupProps {
  onClose: () => void;
  onVerified: () => void;
}

const OtpPopup: React.FC<OtpPopupProps> = ({ onClose, onVerified }) => {
      const dispatch = useDispatch<AppDispatch>();
  const [step, setStep] = useState<"phone" | "otp">("phone");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Gửi số điện thoại lên backend để gửi OTP
  const sendPhoneNumber = async () => {
    setLoading(true);
    setError("");
    try {
      await dispatch(sentOTP({ phone_number: phoneNumber }))
      setStep("otp"); 
    } catch (err: unknown) {
        console.log(err);
      setError( "Lỗi không xác định");
    } finally {
      setLoading(false);
    }
  };

  // Gửi mã OTP để xác thực
  const verifyOtp = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phoneNumber, otp }),
      });
      if (!res.ok) throw new Error("Mã OTP không đúng hoặc đã hết hạn");
      onVerified(); // Xác thực thành công
      onClose();    // Đóng popup
    } catch (err: unknown) {
        console.log(err)
      setError( "Lỗi không xác định");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded p-6 w-80">
        <button
          className="float-right text-gray-500"
          onClick={onClose}
          aria-label="Close"
        >
          ×
        </button>

        {step === "phone" && (
          <>
            <h2 className="text-lg font-bold mb-4">Nhập số điện thoại</h2>
            <input
              type="tel"
              className="border p-2 w-full mb-4"
              placeholder="Số điện thoại"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
            <button
              className="bg-blue-600 text-white py-2 px-4 rounded w-full"
              onClick={sendPhoneNumber}
              disabled={loading || phoneNumber.trim() === ""}
            >
              {loading ? "Đang gửi..." : "Gửi mã OTP"}
            </button>
          </>
        )}

        {step === "otp" && (
          <>
            <h2 className="text-lg font-bold mb-4">Nhập mã OTP</h2>
            <input
              type="text"
              className="border p-2 w-full mb-4"
              placeholder="Mã OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
            <button
              className="bg-green-600 text-white py-2 px-4 rounded w-full"
              onClick={verifyOtp}
              disabled={loading || otp.trim() === ""}
            >
              {loading ? "Đang xác thực..." : "Xác nhận"}
            </button>
          </>
        )}

        {error && <p className="text-red-600 mt-3">{error}</p>}
      </div>
    </div>
  );
};

export default OtpPopup;
