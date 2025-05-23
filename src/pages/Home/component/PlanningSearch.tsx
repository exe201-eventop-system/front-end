import { useState } from "react";
import NavButton from "../../../components/Button";

const PlaningSearch = ({
  onSearch,
}: {
  onSearch?: (value: string) => void;
}) => {
  const [searchText, setSearchText] = useState("");

  const handleSearch = () => {
    if (onSearch) onSearch(searchText);
  };

  return (
    <div className="text-center space-y-6 bg-black/30 backdrop-blur-sm p-10 rounded-2xl max-w-4xl mx-auto shadow-2xl mt-10">
      <h2 className="text-white text-2xl md:text-3xl font-semibold uppercase tracking-wider">
        Chào mừng đến với
      </h2>
      <h1 className="text-6xl md:text-7xl font-extrabold text-white drop-shadow-md">
        EVEN TOP
      </h1>
      <p className="text-white text-lg md:text-xl font-medium tracking-wide">
        Plan Smarter, Party Harder
      </p>
      <div className="text-lg md:text-xl font-medium tracking-wide">
        <NavButton to="/service" isActive={true}>
          Trở thành nhà cung cấp
        </NavButton>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-center gap-4 mt-8">
        <input
          type="text"
          placeholder="Tìm dịch vụ sự kiện..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="px-6 py-3 rounded-full w-full md:w-96 focus:outline-none text-gray-800 shadow-inner text-base font-medium 
          focus:ring-2 focus:ring-blue-400 transition-all duration-300"
        />
        <NavButton to="/service" isActive={true}>
          Lên kế hoạch cùng AI
        </NavButton>
      </div>
    </div>
  );
};

export default PlaningSearch;
