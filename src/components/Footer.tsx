import { motion } from "framer-motion";
import {
  FaFacebookF,
  FaTiktok,
  FaYoutube,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  const socialLinks = [
    { icon: FaFacebookF, href: "#", label: "Facebook" },
    { icon: FaTiktok, href: "#", label: "Tiktok" },
    { icon: FaYoutube, href: "#", label: "YouTube" },
  ];

  const quickLinks = [
    { name: "Trang chủ", path: "/" },
    { name: "Về chúng tôi", path: "/about" },
    { name: "Dịch vụ", path: "/services" },
    { name: "Liên hệ", path: "/contact" },
  ];

  const services = [
    "Tổ chức sự kiện",
    "Trang trí sân khấu",
    "Âm thanh ánh sáng",
    "Catering",
    "MC chuyên nghiệp",
  ];

  return (
    <footer className="relative bg-gray-900 text-white">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/30 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-fuchsia-500/30 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-violet-500/30 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <Link to="/" className="inline-block">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="text-3xl font-bold bg-gradient-to-r from-purple-400 via-violet-400 to-fuchsia-400 bg-clip-text text-transparent"
              >
                EventTop
              </motion.div>
            </Link>
            <p className="text-gray-300 text-sm">
              Chúng tôi cam kết mang đến những trải nghiệm sự kiện độc đáo và đáng nhớ cho mọi khách hàng.
            </p>
            <div className="space-y-2">
              <div className="flex items-center space-x-3 text-gray-300">
                <FaPhoneAlt className="w-4 h-4" />
                <span>+84 123 456 789</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-300">
                <FaEnvelope className="w-4 h-4" />
                <span>contact@eventtop.com</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-300">
                <FaMapMarkerAlt className="w-4 h-4" />
                <span>123 Đường ABC, TP.HCM</span>
              </div>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h3 className="text-lg font-semibold mb-4 text-purple-200">Liên Kết Nhanh</h3>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <motion.li
                  key={index}
                  whileHover={{ x: 5 }}
                  className="text-gray-300 hover:text-purple-200 transition-colors"
                >
                  <Link to={link.path}>{link.name}</Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Services */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="text-lg font-semibold mb-4 text-purple-200">Dịch Vụ</h3>
            <ul className="space-y-2">
              {services.map((service, index) => (
                <motion.li
                  key={index}
                  whileHover={{ x: 5 }}
                  className="text-gray-300 hover:text-purple-200 transition-colors"
                >
                  {service}
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Newsletter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <h3 className="text-lg font-semibold text-purple-200">Đăng Ký Nhận Tin</h3>
            <p className="text-gray-300 text-sm">
              Nhận thông tin về các sự kiện và ưu đãi đặc biệt
            </p>
            <form className="space-y-2">
              <input
                type="email"
                placeholder="Email của bạn"
                className="w-full px-4 py-2 rounded-lg bg-white/5 border border-purple-500/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full bg-gradient-to-r from-purple-600 via-violet-600 to-fuchsia-600 text-white py-2 rounded-lg font-medium hover:from-purple-700 hover:via-violet-700 hover:to-fuchsia-700 transition"
              >
                Đăng Ký
              </motion.button>
            </form>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-purple-500/20">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-gray-400">
              © 2024 EventTop. Tất cả quyền được bảo lưu.
            </p>
            <div className="flex space-x-6">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  whileHover={{ y: -3 }}
                  className="text-gray-400 hover:text-purple-300 transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
