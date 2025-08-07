import { Link } from "react-router-dom";
import logo from "../../../assets/logo.png";

interface SupplierSuccessNoticeProps {
    onSwitch: () => void;
}

const SupplierSuccessNotice = ({ onSwitch }: SupplierSuccessNoticeProps) => {
    return (
        <div className="text-white max-w-md mx-auto border-none text-center">
            <Link to="/" className="flex justify-center">
                <div className="text-xl font-bold flex items-center space-x-2">
                    <img src={logo} alt="logo" className="h-6" />
                    <span>EvenTop</span>
                </div>
            </Link>

            <div className="mt-8">
                <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg
                        className="w-8 h-8 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 13l4 4L19 7"
                        />
                    </svg>
                </div>

                <h2 className="text-2xl font-bold mb-4">Đăng ký thành công!</h2>
                <p className="text-gray-300 mb-6">
                    Chúng tôi đã nhận được thông tin đăng ký của bạn. Hệ thống sẽ xem xét và phê duyệt trong thời gian sớm nhất.
                </p>

                <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-4 mb-6">
                    <h3 className="font-semibold mb-2">Những bước tiếp theo:</h3>
                    <ul className="text-sm text-gray-300 space-y-1 text-left">
                        <li>• Hệ thống sẽ xem xét thông tin của bạn</li>
                        <li>• Bạn sẽ nhận được cuộc gọi sơm nhất từ chúng tôi</li>
                        <li>• Sau khi được phê duyệt, bạn có thể đăng nhập</li>
                    </ul>
                </div>

                <button
                    onClick={onSwitch}
                    className="w-full bg-gradient-to-r from-fuchsia-500 to-cyan-400 py-3 rounded-lg font-semibold hover:opacity-90 transition mb-4"
                >
                    Quay lại đăng nhập
                </button>

                <Link
                    to="/"
                    className="block text-sm text-gray-300 hover:text-white transition"
                >
                    Về trang chủ
                </Link>
            </div>
        </div>
    );
};

export default SupplierSuccessNotice;
