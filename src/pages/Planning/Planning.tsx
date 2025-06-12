import { useState } from "react";
import { motion } from "framer-motion";
import {
  Plus,
  Clock,
  Users,
  Tag,
} from "lucide-react";
import Button from "../../components/Button";
import CreateEventModal from "./component/CreateEventModal";
import EventTabs from "./component/EventTabs";
import BackgroundSession from "./component/BackgroundSession";
import { useSelector } from "react-redux";
import { RootState } from "../../features/store";

const Planning = () => {
  const [showModal, setShowModal] = useState(false);
  const { totalOfPlannings } = useSelector((state: RootState) => state.planning);

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-purple-50 to-purple-100">
      {/* Hero Section */}
      <div className="relative h-[35vh] overflow-hidden">
        <BackgroundSession />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/40 backdrop-blur-sm">
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
      <div className="container mx-auto px-4 -mt-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-10"
        >
          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-5 hover:shadow-lg transition-all duration-300 cursor-pointer group">
              <div className="flex items-center gap-4">
                <div className="bg-white p-3 rounded-lg shadow-sm group-hover:scale-110 transition-transform duration-300">
                  <Clock className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-blue-600">Sự kiện sắp tới</p>
                  <p className="text-2xl font-bold text-blue-800">3 ngày</p>
                  <p className="text-xs text-blue-500">Tiệc cưới - 15/4</p>
                </div>
              </div>
            </div>

            {/* Nhà cung cấp */}
            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-5 hover:shadow-lg transition-all duration-300 cursor-pointer group">
              <div className="flex items-center gap-4">
                <div className="bg-white p-3 rounded-lg shadow-sm group-hover:scale-110 transition-transform duration-300">
                  <Tag className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-green-600">Nhà cung cấp</p>
                  <p className="text-2xl font-bold text-green-800">5</p>
                </div>
              </div>
            </div>

            {/* Danh sách khách */}
            <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-5 hover:shadow-lg transition-all duration-300 cursor-pointer group">
              <div className="flex items-center gap-4">
                <div className="bg-white p-3 rounded-lg shadow-sm group-hover:scale-110 transition-transform duration-300">
                  <Users className="w-6 h-6 text-orange-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-orange-600">Khách mời</p>
                  <p className="text-2xl font-bold text-orange-800">120</p>
                </div>
              </div>
            </div>
          </div>

          {/* Event List Section */}
          <div className="bg-gray-50 rounded-xl p-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
              <div className="flex items-center gap-3">
                <h2 className="text-xl font-bold text-gray-800">Danh sách sự kiện</h2>
                <span className="bg-purple-100 text-purple-600 px-3 py-1 rounded-full text-sm font-medium">
                  {totalOfPlannings} sự kiện
                </span>
              </div>

              <Button
                color="purple-white"
                isActive={true}
                onClick={() => setShowModal(true)}
              >
                <div className="flex items-center gap-2">
                  <Plus className="w-5 h-5" />
                  Tạo Sự Kiện Mới
                </div>
              </Button>
            </div>
            <EventTabs />
          </div>
        </motion.div>
      </div>

      {/* Create Event Modal */}
      <CreateEventModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
      />
    </div>
  );
};

export default Planning;

