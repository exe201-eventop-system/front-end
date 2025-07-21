import { useState } from "react";
import NavButton from "../../../components/ui/Button";
import { motion } from "framer-motion";
import BackGroundHome from "../../../assets/BackGroundHome.jpg";

type PlaningSearchProps = {
  onSearch?: (value: string) => void;
};

const PlaningSearch = ({ onSearch }: PlaningSearchProps) => {
  const [searchText, setSearchText] = useState("");

  const handleSearch = () => {
    if (onSearch) onSearch(searchText);
  };

  return (
    <div className="relative h-[80vh] flex items-center justify-center overflow-hidden">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/30 z-10" />
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={BackGroundHome}
          alt="Hero Background"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-20 text-center px-4 max-w-4xl mx-auto"
      >
        <div className="space-y-6 bg-black/30 backdrop-blur-sm p-7 rounded-2xl shadow-2xl mt-20">
          <h2 className="text-white text-xl md:text-3xl font-semibold tracking-wider">
            Chào mừng đến với
          </h2>
          <h1 className="text-5xl md:text-7xl font-extrabold text-white drop-shadow-md">
            EVENTOP
          </h1>
          <p className="text-white text-lg md:text-xl font-semibold tracking-wide">
            Plan Smarter, Party Harder
          </p>

          {/* Search Bar + Button */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 mt-8">
            <input
              type="text"
              placeholder="Tìm dịch vụ sự kiện..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className="px-6 py-3 rounded-full w-full md:w-96 focus:outline-none text-gray-800 shadow-inner text-base font-medium 
              focus:ring-2 focus:ring-blue-400 transition-all duration-300"
            />
            <NavButton
              color="purple-white"
              to="/home/component/AIPlanning"
              isActive={true}
              onClick={handleSearch}
            >
              Lên kế hoạch cùng AI
            </NavButton>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default PlaningSearch;
