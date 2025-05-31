import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { RefreshCw, Home, AlertTriangle } from "lucide-react";

const ServerError = () => {
    const navigate = useNavigate();

    const handleRefresh = () => {
        window.location.reload();
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-red-100 flex items-center justify-center px-4">
            <div className="max-w-2xl w-full text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="relative"
                >
                    <div className="absolute -top-20 left-1/2 transform -translate-x-1/2">
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                        >
                            <AlertTriangle className="w-32 h-32 text-red-500 opacity-20" />
                        </motion.div>
                    </div>
                    <h1 className="text-9xl font-bold text-red-600 mb-4">500</h1>
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-red-200"></div>
                        </div>
                        <div className="relative flex justify-center">
                            <span className="px-4 bg-gradient-to-br from-red-50 via-white to-red-100 text-lg text-red-600">
                                Internal Server Error
                            </span>
                        </div>
                    </div>
                    <p className="mt-6 text-gray-600 text-lg">
                        Oops! Something went wrong on our end. We're working to fix it.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                    className="mt-10 space-y-4"
                >
                    <button
                        onClick={handleRefresh}
                        className="inline-flex items-center px-6 py-3 border border-red-600 text-red-600 rounded-lg hover:bg-red-50 transition-colors duration-200 mr-4"
                    >
                        <RefreshCw className="w-5 h-5 mr-2" />
                        Try Again
                    </button>
                    <button
                        onClick={() => navigate("/")}
                        className="inline-flex items-center px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200"
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
                            <div className="w-full border-t border-red-200"></div>
                        </div>
                        <div className="relative flex justify-center">
                            <span className="px-4 bg-gradient-to-br from-red-50 via-white to-red-100 text-sm text-gray-500">
                                If the problem persists, please contact our support team
                            </span>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default ServerError; 