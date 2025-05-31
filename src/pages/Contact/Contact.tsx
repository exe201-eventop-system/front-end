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
    <div className="min-h-screen bg-gradient-to-br from-white via-purple-50 to-purple-100 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-purple-200/30 to-purple-100/30 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [90, 0, 90],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-tr from-purple-100/30 to-pink-100/30 rounded-full blur-3xl"
        />
      </div>

      <div className="max-w-7xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold mt-10 mb-4 text-gray-800">
            Liên Hệ Với Chúng Tôi
          </h1>
          <p className="text-lg text-gray-600">
            Hãy để lại thông tin, chúng tôi sẽ liên hệ với bạn trong thời gian sớm nhất
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Thông tin liên hệ */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-white/80 backdrop-blur-xl rounded-2xl p-8 shadow-xl border border-purple-200 hover:border-purple-300 transition-all duration-500"
          >
            <h2 className="text-2xl font-semibold mb-6 text-gray-800">
              Thông Tin Liên Hệ
            </h2>

            <div className="space-y-6">
              <motion.div
                whileHover={{ scale: 1.02, y: -2 }}
                className="flex items-center space-x-4 text-gray-700 bg-white p-4 rounded-xl transition-all duration-300 border border-purple-200 hover:border-purple-300 hover:shadow-lg hover:shadow-purple-100"
              >
                <div className="bg-gradient-to-br from-purple-500 to-purple-400 p-3 rounded-full shadow-lg shadow-purple-100">
                  <FiPhone className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-800">Điện thoại</h3>
                  <p className="text-gray-600">+84 123 456 789</p>
                </div>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.02, y: -2 }}
                className="flex items-center space-x-4 text-gray-700 bg-white p-4 rounded-xl transition-all duration-300 border border-purple-200 hover:border-purple-300 hover:shadow-lg hover:shadow-purple-100"
              >
                <div className="bg-gradient-to-br from-purple-500 to-purple-400 p-3 rounded-full shadow-lg shadow-purple-100">
                  <FiMail className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-800">Email</h3>
                  <p className="text-gray-600">contact@eventtop.com</p>
                </div>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.02, y: -2 }}
                className="flex items-center space-x-4 text-gray-700 bg-white p-4 rounded-xl transition-all duration-300 border border-purple-200 hover:border-purple-300 hover:shadow-lg hover:shadow-purple-100"
              >
                <div className="bg-gradient-to-br from-purple-500 to-purple-400 p-3 rounded-full shadow-lg shadow-purple-100">
                  <FiMapPin className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-800">Địa chỉ</h3>
                  <p className="text-gray-600">
                    123 Đường ABC, Quận XYZ<br />
                    TP. Hồ Chí Minh, Việt Nam
                  </p>
                </div>
              </motion.div>
            </div>

            {/* Bản đồ */}
            <div className="mt-8 rounded-xl overflow-hidden h-64 bg-white border border-purple-200 shadow-lg shadow-purple-100">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.4241679834777!2d106.6981!3d10.7757!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTDCsDQ2JzMyLjUiTiAxMDbCsDQxJzUzLjMiRQ!5e0!3m2!1svi!2s!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </motion.div>

          {/* Form liên hệ */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="bg-white/80 backdrop-blur-xl rounded-2xl p-8 shadow-xl border border-purple-200 hover:border-purple-300 transition-all duration-500"
          >
            <h2 className="text-2xl font-semibold mb-6 text-gray-800">
              Gửi Tin Nhắn
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Họ và tên
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg bg-white border border-purple-200 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-300 focus:border-purple-300 transition-all duration-300"
                  placeholder="Nhập họ và tên của bạn"
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg bg-white border border-purple-200 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-300 focus:border-purple-300 transition-all duration-300"
                  placeholder="Nhập email của bạn"
                  required
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                  Chủ đề
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg bg-white border border-purple-200 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-300 focus:border-purple-300 transition-all duration-300"
                  placeholder="Nhập chủ đề"
                  required
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  Tin nhắn
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-3 rounded-lg bg-white border border-purple-200 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-300 focus:border-purple-300 transition-all duration-300 resize-none"
                  placeholder="Nhập tin nhắn của bạn"
                  required
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full bg-gradient-to-r from-purple-500 to-purple-400 text-white py-3 px-6 rounded-lg font-medium flex items-center justify-center space-x-2 hover:shadow-lg hover:shadow-purple-200 transition-all duration-300"
              >
                <FiSend className="w-5 h-5" />
                <span>Gửi tin nhắn</span>
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
