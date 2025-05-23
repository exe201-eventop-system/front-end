// components/CartIcon.tsx
import { FiCalendar } from "react-icons/fi";
import { useSelector } from "react-redux";
import { RootState } from "../features/store";

interface ScheduleIconProps {
  className?: string;
}

const ScheduleIcon = ({ className = "" }: ScheduleIconProps) => {
  const { plannings } = useSelector((state: RootState) => state.planning);

  return (
    <div className="relative">
      <FiCalendar className={`text-2xl ${className}`} />
      {plannings.length > 0 && (
        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
          {plannings.length}
        </span>
      )}
    </div>
  );
};

export default ScheduleIcon;
