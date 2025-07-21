import { useState } from "react";
import { motion } from "framer-motion";
import { FiMail, FiPhone, FiMapPin, FiSend } from "react-icons/fi";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Xử lý gửi form ở đây
    console.log(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="relative mt-20 min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-50 via-white to-purple-100 py-16 px-4">
      {/* Hiệu ứng nền */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -top-1/3 -left-1/3 w-2/3 h-2/3 bg-gradient-to-br from-purple-200/30 to-purple-100/30 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ scale: [1.2, 1, 1.2], rotate: [90, 0, 90] }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-1/3 -right-1/3 w-2/3 h-2/3 bg-gradient-to-tr from-purple-100/30 to-pink-100/30 rounded-full blur-3xl"
        />
      </div>

      <div className="w-full max-w-2xl z-10 flex flex-col items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-10"
        >
          <h1 className="text-4xl font-bold mb-4 text-center">
            Liên Hệ Với Chúng Tôi
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            Hãy để lại thông tin, chúng tôi sẽ liên hệ với bạn trong thời gian sớm nhất.
          </p>
        </motion.div>

        {/* Form liên hệ */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
          className="w-full bg-white/95 rounded-2xl shadow-2xl border border-purple-100 p-8 md:p-10 mb-10"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex flex-col gap-2">
              <label htmlFor="name" className="text-sm font-medium text-gray-700">Họ và tên</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg bg-white border border-purple-200 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-300 focus:border-purple-300 transition-all"
                placeholder="Nhập họ và tên của bạn"
                required
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg bg-white border border-purple-200 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-300 focus:border-purple-300 transition-all"
                placeholder="Nhập email của bạn"
                required
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="subject" className="text-sm font-medium text-gray-700">Chủ đề</label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg bg-white border border-purple-200 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-300 focus:border-purple-300 transition-all"
                placeholder="Nhập chủ đề"
                required
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="message" className="text-sm font-medium text-gray-700">Tin nhắn</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-3 rounded-lg bg-white border border-purple-200 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-300 focus:border-purple-300 transition-all resize-none"
                placeholder="Nhập tin nhắn của bạn"
                required
              />
            </div>
            <motion.button
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full bg-gradient-to-r from-purple-500 to-purple-400 text-white py-3 px-6 rounded-lg font-semibold flex items-center justify-center gap-2 shadow hover:shadow-lg hover:shadow-purple-200 transition-all text-lg"
            >
              <FiSend className="w-5 h-5" />
              <span>Gửi tin nhắn</span>
            </motion.button>
          </form>
        </motion.div>

        {/* Thông tin liên hệ dạng 3 box nhỏ */}
        <div className="w-full flex flex-col md:flex-row gap-6 md:gap-8 justify-center items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
            className="flex-1 min-w-[220px] max-w-xs bg-gradient-to-br from-purple-100 to-white rounded-2xl p-6 flex flex-col items-center shadow-lg border border-purple-100"
          >
            <div className="bg-gradient-to-br from-purple-500 to-purple-400 p-4 rounded-full shadow-lg mb-3">
              <FiPhone className="w-7 h-7 text-white" />
            </div>
            <h3 className="font-semibold text-gray-800 mb-1">Điện thoại</h3>
            <p className="text-gray-600 text-center">+84 123 456 789</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5, ease: "easeOut" }}
            className="flex-1 min-w-[220px] max-w-xs bg-gradient-to-br from-purple-100 to-white rounded-2xl p-6 flex flex-col items-center shadow-lg border border-purple-100"
          >
            <div className="bg-gradient-to-br from-purple-500 to-purple-400 p-4 rounded-full shadow-lg mb-3">
              <FiMapPin className="w-7 h-7 text-white" />
            </div>
            <h3 className="font-semibold text-gray-800 mb-1">Địa chỉ</h3>
            <p className="text-gray-600 text-center">123 Đường ABC, Quận XYZ<br />TP. Hồ Chí Minh, Việt Nam</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4, ease: "easeOut" }}
            className="flex-1 min-w-[220px] max-w-xs bg-gradient-to-br from-purple-100 to-white rounded-2xl p-6 flex flex-col items-center shadow-lg border border-purple-100"
          >
            <div className="bg-gradient-to-br from-purple-500 to-purple-400 p-4 rounded-full shadow-lg mb-3">
              <FiMail className="w-7 h-7 text-white" />
            </div>
            <h3 className="font-semibold text-gray-800 mb-1">Email</h3>
            <p className="text-gray-600 text-center">contact@eventtop.com</p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
