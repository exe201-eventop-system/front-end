import { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { FiUsers, FiAward, FiCalendar, FiHeart, FiArrowRight } from "react-icons/fi";
import { IconType } from "react-icons";
import AboutUs from "../../assets/AboutUs.jpg"
import Tri from "../../assets/img/avatar/Tri.jpg"
import Phuc from "../../assets/img/avatar/Phuc.jpg"
import Duy from "../../assets/img/avatar/Duy.jpg"
import Huy from "../../assets/img/avatar/Huy.jpg"
import Giang from "../../assets/img/avatar/Giang.jpg"
import Minh from "../../assets/img/avatar/Minh.jpg"
import OurStory from "../../assets/OurStory.jpg"

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
  description: string;
  social: {
    linkedin?: string;
    facebook?: string;
    github?: string;
  };
}

interface Milestone {
  year: string;
  title: string;
  description: string;
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
  { icon: FiUsers, value: "50+", label: "Khách hàng tiềm năng" },
  { icon: FiAward, value: "5+", label: "Dự án đang thực hiện" },
  { icon: FiCalendar, value: "10+", label: "Sự kiện sắp tới" },
  { icon: FiHeart, value: "100%", label: "Nhiệt huyết" },
];

const MILESTONES: Milestone[] = [
  {
    year: "01/2025",
    title: "Khởi đầu",
    description: "EventTop được thành lập với tầm nhìn mang đến trải nghiệm độc đáo "
  },
  {
    year: "05/2025",
    title: "Phát triển",
    description: "Xây dựng đội ngũ trẻ, năng động và đầy sáng tạo"
  },
  {
    year: "01/2027",
    title: "Đổi mới",
    description: "Áp dụng công nghệ hiện đại vào quản lý và tổ chức sự kiện"
  },
  {
    year: "01/2030",
    title: "Vươn xa",
    description: "Hướng tới mục tiêu trở thành đơn vị tổ chức sự kiện hàng đầu cho giới trẻ"
  }
];

const TEAM: TeamMember[] = [
  {
    name: "Nguyễn Ngọc Duy",
    position: "Accounting Manager",
    image: Duy,
    description: "Chuyên gia tài chính với hơn 5 năm kinh nghiệm trong lĩnh vực quản lý tài chính sự kiện.",
    social: {
      linkedin: "#",
      facebook: "#"
    }
  },
  {
    name: "Nguyễn Thụy Hồng Phúc",
    position: "CEO",
    image: Phuc,
    description: "Người sáng lập với tầm nhìn chiến lược và đam mê sáng tạo trong lĩnh vực tổ chức sự kiện.",
    social: {
      linkedin: "#",
      facebook: "#"
    }
  },
  {
    name: "Bùi Hoàng Gia Minh",
    position: "Strategic Growth Manager",
    image: Minh,
    description: "Chuyên gia phát triển chiến lược với khả năng nhìn xa trông rộng và tư duy đổi mới.",
    social: {
      linkedin: "#",
      facebook: "#"
    }
  },
  {
    name: "Lê Minh Trí",
    position: "CTO",
    image: Tri,
    description: "Chuyên gia công nghệ với kinh nghiệm phát triển các giải pháp số hóa cho sự kiện.",
    social: {
      linkedin: "#",
      facebook: "#"
    }
  },
  {
    name: "Nguyễn Anh Huy",
    position: "Business Analysis Manager",
    image: Huy,
    description: "Chuyên gia phân tích kinh doanh với khả năng đánh giá và tối ưu hóa hiệu suất.",
    social: {
      linkedin: "#",
      facebook: "#"
    }
  },
  {
    name: "Plan Lê Giang",
    position: "Quality Assurance (QA) Manager",
    image: Giang,
    description: "Chuyên gia đảm bảo chất lượng với tiêu chuẩn cao trong mọi khía cạnh của sự kiện.",
    social: {
      linkedin: "#",
      facebook: "#"
    }
  },
];

// Components
const StatCard = ({ icon: Icon, value, label, index }: StatCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    viewport={{ once: true }}
    whileHover={{ scale: 1.05, y: -5 }}
    className="bg-white/90 backdrop-blur-xl rounded-2xl p-8 text-center border border-purple-200 hover:border-purple-300 hover:shadow-xl hover:shadow-purple-100/50 transition-all duration-300"
  >
    <div className="flex justify-center mb-4">
      <Icon className="w-12 h-12 text-purple-600" />
    </div>
    <div className="text-4xl font-bold mb-2 bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">{value}</div>
    <div className="text-gray-700 font-medium">{label}</div>
  </motion.div>
);

const TeamMemberCard = ({ member, index }: TeamMemberCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    transition={{ delay: index * 0.2 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="bg-white/90 backdrop-blur-xl rounded-2xl overflow-hidden border border-purple-200 hover:border-purple-300 hover:shadow-xl hover:shadow-purple-100/50 transition-all duration-300"
  >
    <div className="relative h-80">
      <img
        src={member.image}
        alt={member.name}
        className="w-full h-full object-cover"
      />
    </div>
    <div className="p-6">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-xl font-bold text-gray-900">{member.name}</h3>
        <div className="flex gap-3">
          {member.social.linkedin && (
            <a href={member.social.linkedin} className="text-purple-600 hover:text-purple-700 transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
            </a>
          )}
          {member.social.facebook && (
            <a href={member.social.facebook} className="text-purple-600 hover:text-purple-700 transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </a>
          )}
        </div>
      </div>
      <p className="text-purple-600 font-medium mb-3">{member.position}</p>
      <p className="text-gray-600 text-sm">{member.description}</p>
    </div>
  </motion.div>
);

const MilestoneCard = ({ milestone, index }: { milestone: Milestone; index: number }) => (
  <motion.div

    initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
    whileInView={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    viewport={{ once: true }}
    className="relative"
  >
    <div className="bg-white/90 backdrop-blur-xl rounded-2xl p-6 border border-purple-200 hover:border-purple-300 hover:shadow-xl hover:shadow-purple-100/50 transition-all duration-300">
      <div className="text-2xl font-bold text-purple-600 mb-2">{milestone.year}</div>
      <h3 className="text-xl font-bold mb-2 text-gray-900">{milestone.title}</h3>
      <p className="text-gray-600">{milestone.description}</p>
    </div>

  </motion.div>
);

const About = () => {
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.8]);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-purple-50 to-purple-100">
      {/* Hero Section with Parallax */}
      <div className="relative h-screen flex items-center justify-center overflow-hidden">

        <motion.div
          animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
          style={{ opacity, scale }}
          className="absolute inset-0"
        >
          <img
            src={AboutUs}
            alt="Event Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/20" />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-20 text-center px-4 max-w-4xl mx-auto"
        >
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-6xl md:text-7xl font-bold mb-6 text-white"
          >
            Về Chúng Tôi
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl mb-8 text-white/90"
          >
            Chúng tôi là một start-up trẻ, đầy nhiệt huyết và sáng tạo,
            mang đến những trải nghiệm sự kiện mới mẻ cho thế hệ trẻ
          </motion.p>
        </motion.div>
      </div>

      {/* Stats Section */}
      <div className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
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
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white/90 backdrop-blur-xl rounded-2xl p-8 md:p-12 border border-purple-200 hover:border-purple-300 hover:shadow-xl hover:shadow-purple-100/50 transition-all duration-300"
          >
            <h2 className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
              Câu Chuyện Của Chúng Tôi
            </h2>
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <p className="text-lg text-gray-700 leading-relaxed">
                  EventTop được thành lập bởi những người trẻ đam mê sự kiện và công nghệ.
                  Chúng tôi tin rằng mỗi sự kiện đều là một cơ hội để tạo ra những trải nghiệm
                  độc đáo và đáng nhớ cho thế hệ trẻ.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed">
                  Mặc dù còn non trẻ, nhưng chúng tôi mang trong mình nhiệt huyết và sự sáng tạo
                  không giới hạn. Chúng tôi luôn sẵn sàng học hỏi và phát triển để mang đến
                  những dịch vụ tốt nhất cho khách hàng.
                </p>
                <button className="bg-purple-600 text-white px-6 py-3 rounded-full hover:bg-purple-700 transition-colors flex items-center gap-2">
                  Theo dõi hành trình của chúng tôi
                  <FiArrowRight />
                </button>
              </div>
              <div className="relative h-[400px] rounded-xl overflow-hidden group">
                <img
                  src={OurStory}
                  alt="Our Story"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Milestones Section */}
      <div className="py-20 px-4 bg-gradient-to-br from-purple-50 to-indigo-50">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-bold mb-12 text-center bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent"
          >
            Hành Trình Phát Triển
          </motion.h2>
          <div className="grid md:grid-cols-2 gap-8">
            {MILESTONES.map((milestone, index) => (
              <MilestoneCard key={index} milestone={milestone} index={index} />
            ))}
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-bold mb-12 text-center bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent"
          >
            Đội Ngũ Trẻ Của Chúng Tôi
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
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
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white/90 backdrop-blur-xl rounded-2xl p-8 md:p-12 text-center border border-purple-200 hover:border-purple-300 hover:shadow-xl hover:shadow-purple-100/50 transition-all duration-300"
          >
            <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
              Sứ Mệnh Của Chúng Tôi
            </h2>
            <p className="text-lg max-w-3xl mx-auto text-gray-700 leading-relaxed">
              Là một start-up trẻ, chúng tôi cam kết mang đến những trải nghiệm sự kiện mới mẻ và độc đáo,
              kết hợp sự sáng tạo của tuổi trẻ với công nghệ hiện đại để tạo nên những sự kiện
              đáng nhớ cho thế hệ trẻ.
            </p>
            <div className="mt-8 flex justify-center gap-4">
              <button className="bg-purple-600 text-white px-8 py-3 rounded-full hover:bg-purple-700 transition-colors">
                Tham gia cùng chúng tôi
              </button>
              <button className="bg-white text-purple-600 px-8 py-3 rounded-full border border-purple-600 hover:bg-purple-50 transition-colors">
                Xem dự án
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default About;
