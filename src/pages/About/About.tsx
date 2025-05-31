import { motion } from "framer-motion";
import { FiUsers, FiAward, FiCalendar, FiHeart } from "react-icons/fi";
import { IconType } from "react-icons";

// Types
interface Stat {
  icon: IconType;
  value: string;
  label: string;
}

interface TeamMember {
  name: string;
  position: string;
  image: string;
}

interface StatCardProps extends Stat {
  index: number;
}

interface TeamMemberCardProps {
  member: TeamMember;
  index: number;
}

// Constants
const STATS: Stat[] = [
  { icon: FiUsers, value: "1000+", label: "Khách hàng hài lòng" },
  { icon: FiAward, value: "50+", label: "Giải thưởng" },
  { icon: FiCalendar, value: "500+", label: "Sự kiện thành công" },
  { icon: FiHeart, value: "100%", label: "Sự hài lòng" },
];

const TEAM: TeamMember[] = [
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

// Animation variants
const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

// Components
const StatCard = ({ icon: Icon, value, label, index }: StatCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    viewport={{ once: true }}
    whileHover={{ scale: 1.05 }}
    className="bg-white/90 backdrop-blur-xl rounded-2xl p-6 text-center border border-purple-200 hover:border-purple-300 hover:shadow-xl hover:shadow-purple-100/50 transition-all duration-300"
  >
    <Icon className="w-12 h-12 mx-auto mb-4 text-purple-500" />
    <div className="text-3xl font-bold mb-2 text-gray-900">{value}</div>
    <div className="text-gray-700">{label}</div>
  </motion.div>
);

const TeamMemberCard = ({ member, index }: TeamMemberCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    viewport={{ once: true }}
    whileHover={{ y: -10 }}
    className="bg-white/90 backdrop-blur-xl rounded-2xl overflow-hidden border border-purple-200 hover:border-purple-300 hover:shadow-xl hover:shadow-purple-100/50 transition-all duration-300"
  >
    <div className="relative h-64">
      <img
        src={member.image}
        alt={member.name}
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
    </div>
    <div className="p-6 text-center">
      <h3 className="text-xl font-bold mb-2 text-gray-900">{member.name}</h3>
      <p className="text-gray-700">{member.position}</p>
    </div>
  </motion.div>
);

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-purple-50 to-purple-100">
      {/* Hero Section */}
      <div className="relative h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-black/20 z-10" />
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&q=80"
            alt="Event Background"
            className="w-full h-full object-cover"
          />
        </div>
        <motion.div
          variants={fadeInUp}
          initial="initial"
          animate="animate"
          className="relative z-20 text-center px-4 max-w-4xl mx-auto"
        >
          <motion.h1
            variants={fadeInUp}
            className="text-5xl md:text-6xl font-bold mb-6 text-gray-900"
          >
            Về Chúng Tôi
          </motion.h1>
          <motion.p
            variants={fadeInUp}
            className="text-xl md:text-2xl mb-8 text-gray-700"
          >
            Chúng tôi là những người đam mê sáng tạo, mang đến những trải nghiệm sự kiện tuyệt vời
          </motion.p>
        </motion.div>
      </div>

      {/* Stats Section */}
      <div className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {STATS.map((stat, index) => (
              <StatCard key={index} {...stat} index={index} />
            ))}
          </motion.div>
        </div>
      </div>

      {/* Story Section */}
      <div className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            variants={fadeInUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="bg-white/90 backdrop-blur-xl rounded-2xl p-8 md:p-12 border border-purple-200 hover:border-purple-300 hover:shadow-xl hover:shadow-purple-100/50 transition-all duration-300"
          >
            <h2 className="text-3xl font-bold mb-8 text-center text-gray-900">Câu Chuyện Của Chúng Tôi</h2>
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <p className="text-lg mb-4 text-gray-700">
                  EventTop được thành lập với tình yêu và đam mê dành cho việc tổ chức sự kiện.
                  Chúng tôi tin rằng mỗi sự kiện đều là một câu chuyện độc đáo, và chúng tôi ở đây
                  để giúp bạn kể câu chuyện đó một cách hoàn hảo nhất.
                </p>
                <p className="text-lg text-gray-700">
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
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-transparent" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Team Section */}
      <div className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            variants={fadeInUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="text-3xl font-bold mb-12 text-center text-gray-900"
          >
            Đội Ngũ Của Chúng Tôi
          </motion.h2>
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-8"
          >
            {TEAM.map((member, index) => (
              <TeamMemberCard key={index} member={member} index={index} />
            ))}
          </motion.div>
        </div>
      </div>

      {/* Mission Section */}
      <div className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            variants={fadeInUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="bg-white/90 backdrop-blur-xl rounded-2xl p-8 md:p-12 text-center border border-purple-200 hover:border-purple-300 hover:shadow-xl hover:shadow-purple-100/50 transition-all duration-300"
          >
            <h2 className="text-3xl font-bold mb-6 text-gray-900">Sứ Mệnh Của Chúng Tôi</h2>
            <p className="text-lg max-w-3xl mx-auto text-gray-700">
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
