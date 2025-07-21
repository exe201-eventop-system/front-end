import React from "react";
import { FiX } from "react-icons/fi";

interface BaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  message: string;
  icon?: React.ReactNode;
  buttonText?: string;
  onButtonClick?: () => void;
  type?: "success" | "error" | "info";
}

const BaseModal: React.FC<BaseModalProps & { children?: React.ReactNode }> = ({
  isOpen,
  onClose,
  title,
  message,
  icon,
  buttonText = "Đã hiểu",
  onButtonClick,
  type = "info",
  children
}) => {
  if (!isOpen) return null;

  const getIconColor = () => {
    switch (type) {
      case "success":
        return "text-green-500";
      case "error":
        return "text-red-500";
      default:
        return "text-blue-500";
    }
  };

  const getButtonColor = () => {
    switch (type) {
      case "success":
        return "bg-green-500 hover:bg-green-600";
      case "error":
        return "bg-red-500 hover:bg-red-600";
      default:
        return "bg-blue-500 hover:bg-blue-600";
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md flex flex-col items-center relative">
        <button
          className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 text-2xl"
          onClick={onClose}
          aria-label="Đóng"
        >
          <FiX />
        </button>

        {icon && (
          <div className={`mb-4 ${getIconColor()}`}>
            {icon}
          </div>
        )}

        <h2 className="text-xl font-semibold mb-2 text-gray-700">{title}</h2>
        {/* Nếu có children thì render children, nếu không thì render message */}
        {typeof children !== "undefined" ? (
          <div className="w-full">{children}</div>
        ) : (
          <p className="text-center text-sm text-gray-500 mb-4">
            {message}
          </p>
        )}

        {/* Nếu không có children thì mới render button */}
        {typeof children === "undefined" && (
          <button
            onClick={onButtonClick || onClose}
            className={`${getButtonColor()} text-white font-medium rounded-lg py-2 px-6 transition`}
          >
            {buttonText}
          </button>
        )}
      </div>
    </div>
  );
};

export default BaseModal;
