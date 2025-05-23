import { motion } from "framer-motion";
import { FiUsers, FiAward, FiCalendar, FiHeart } from "react-icons/fi";

const About = () => {
  const stats = [
    { icon: FiUsers, value: "1000+", label: "Khách hàng hài lòng" },
    { icon: FiAward, value: "50+", label: "Giải thưởng" },
    { icon: FiCalendar, value: "500+", label: "Sự kiện thành công" },
    { icon: FiHeart, value: "100%", label: "Sự hài lòng" },
  ];

  const team = [
    {
      name: "Nguyễn Văn A",
      position: "CEO & Founder",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=256&q=80",
    },
    {
      name: "Trần Thị B",
      position: "Creative Director",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=256&q=80",
    },
    {
      name: "Lê Văn C",
      position: "Event Manager",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=256&q=80",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">
      {/* Hero Section */}
      <div className="relative h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-black/50 z-10" />
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&q=80"
            alt="Event Background"
            className="w-full h-full object-cover"
          />
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-20 text-center text-white px-4"
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Về Chúng Tôi</h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto">
            Chúng tôi là những người đam mê sáng tạo, mang đến những trải nghiệm sự kiện tuyệt vời
          </p>
        </motion.div>
      </div>

      {/* Stats Section */}
      <div className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 text-center text-white"
              >
                <stat.icon className="w-12 h-12 mx-auto mb-4" />
                <div className="text-3xl font-bold mb-2">{stat.value}</div>
                <div className="text-white/80">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Story Section */}
      <div className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 md:p-12 text-white"
          >
            <h2 className="text-3xl font-bold mb-8 text-center">Câu Chuyện Của Chúng Tôi</h2>
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <p className="text-lg mb-4">
                  EventTop được thành lập với tình yêu và đam mê dành cho việc tổ chức sự kiện.
                  Chúng tôi tin rằng mỗi sự kiện đều là một câu chuyện độc đáo, và chúng tôi ở đây
                  để giúp bạn kể câu chuyện đó một cách hoàn hảo nhất.
                </p>
                <p className="text-lg">
                  Với đội ngũ chuyên nghiệp và giàu kinh nghiệm, chúng tôi cam kết mang đến
                  những trải nghiệm sự kiện đáng nhớ, từ những chi tiết nhỏ nhất đến những
                  khoảnh khắc lớn lao.
                </p>
              </div>
              <div className="relative h-64 md:h-96 rounded-xl overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80"
                  alt="Our Story"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Team Section */}
      <div className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-3xl font-bold mb-12 text-center text-white"
          >
            Đội Ngũ Của Chúng Tôi
          </motion.h2>
          <div className="grid md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
                className="bg-white/10 backdrop-blur-lg rounded-2xl overflow-hidden"
              >
                <div className="relative h-64">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6 text-white text-center">
                  <h3 className="text-xl font-bold mb-2">{member.name}</h3>
                  <p className="text-white/80">{member.position}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Mission Section */}
      <div className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 md:p-12 text-white text-center"
          >
            <h2 className="text-3xl font-bold mb-6">Sứ Mệnh Của Chúng Tôi</h2>
            <p className="text-lg max-w-3xl mx-auto">
              Chúng tôi cam kết mang đến những trải nghiệm sự kiện độc đáo và đáng nhớ,
              kết hợp sự sáng tạo với chuyên môn để biến mọi sự kiện thành một câu chuyện
              đặc biệt của riêng bạn.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default About;
