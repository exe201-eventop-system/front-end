import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";

interface EmailSentNoticeProps {
    email?: string;
}

const EmailSentNotice = ({ email }: EmailSentNoticeProps) => {
    return (
        <motion.div
            className="flex flex-col items-center justify-center bg-white/10 text-white rounded-2xl p-6 shadow-xl backdrop-blur-md border border-white/10 w-full max-w-md mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
        >
            <CheckCircle size={48} className="text-green-400 mb-4" />
            <h2 className="text-xl font-semibold mb-2">Email đã được gửi</h2>
            <p className="text-center text-sm text-gray-200">
                Vui lòng kiểm tra hộp thư của bạn{email ? ` tại ${email}` : ""} và xác nhận địa chỉ email để tiếp tục.
            </p>
            <Link
                to="/"
                className="mt-6 px-4 py-2 bg-green-500 hover:bg-green-600 text-white font-medium rounded-lg transition duration-300 text-center"
            >
                Đã hiểu
            </Link>
        </motion.div>
    );
};

export default EmailSentNotice;