import BackgroundSession from "./component/BackgroundSession";
import EventTabs from "../Planning/component/EventTabs";
import Button from "../../components/Button";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import CreateEventModal from "./component/CreateEventModal";
import { motion } from "framer-motion";

const Planning = () => {
  const location = useLocation();
  const activeTab = location.pathname;
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <div className="relative h-[60vh] overflow-hidden">
        <BackgroundSession />
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm ">
          <div className="container mx-auto px-4 h-full flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Lập Kế Hoạch Sự Kiện
              </h1>
              <p className="text-lg text-gray-200 max-w-2xl mx-auto">
                Tạo và quản lý các sự kiện của bạn một cách dễ dàng và hiệu quả
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 -mt-16 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-10"
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 md:mb-0">
              Danh Sách Sự Kiện
            </h2>
            <Button 
            color="purple-white"
              isActive={activeTab.includes("planning")}
              onClick={() => setShowModal(true)}
            >
              <span className="flex items-center">
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4v16m8-8H4"
                  />
                </svg>
                Thêm sự kiện
              </span>
            </Button>
          </div>

          <div className="bg-gray-50 rounded-xl p-4">
            <EventTabs />
          </div>
        </motion.div>
      </div>

      <CreateEventModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
      />
    </div>
  );
};

export default Planning;
