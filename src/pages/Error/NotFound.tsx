import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Home, ArrowLeft } from "lucide-react";

const NotFound = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-100 flex items-center justify-center px-4">
            <div className="max-w-2xl w-full text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <h1 className="text-9xl font-bold text-purple-600 mb-4">404</h1>
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-purple-200"></div>
                        </div>
                        <div className="relative flex justify-center">
                            <span className="px-4 bg-gradient-to-br from-purple-50 via-white to-purple-100 text-lg text-purple-600">
                                Oops! Page Not Found
                            </span>
                        </div>
                    </div>
                    <p className="mt-6 text-gray-600 text-lg">
                        The page you're looking for doesn't exist or has been moved.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                    className="mt-10 space-y-4"
                >
                    <button
                        onClick={() => navigate(-1)}
                        className="inline-flex items-center px-6 py-3 border border-purple-600 text-purple-600 rounded-lg hover:bg-purple-50 transition-colors duration-200 mr-4"
                    >
                        <ArrowLeft className="w-5 h-5 mr-2" />
                        Go Back
                    </button>
                    <button
                        onClick={() => navigate("/")}
                        className="inline-flex items-center px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-200"
                    >
                        <Home className="w-5 h-5 mr-2" />
                        Back to Home
                    </button>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.7, duration: 0.5 }}
                    className="mt-16"
                >
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-purple-200"></div>
                        </div>
                        <div className="relative flex justify-center">
                            <span className="px-4 bg-gradient-to-br from-purple-50 via-white to-purple-100 text-sm text-gray-500">
                                Need help? Contact our support team
                            </span>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default NotFound; 