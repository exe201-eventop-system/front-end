// components/CartIcon.tsx
import { MdNotificationsNone } from "react-icons/md";
import { useSelector } from "react-redux";
import { RootState } from "../../features/store";
import { useLocation } from "react-router-dom";
import { AppDispatch } from "../../features/store";
import { getNumberPlaning } from "../../features/Planning/planningThunks";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
interface NotificationIconProps {
    className?: string;
}

const NotificationIcon = ({ className = "" }: NotificationIconProps) => {
    const { totalOfPlannings } = useSelector((state: RootState) => state.planning);
    const location = useLocation();
    const isPlanningPage = location.pathname === "/planning";
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        dispatch(getNumberPlaning());
    }, [dispatch]);

    return (
        <div className="relative">
            <MdNotificationsNone
                className={`text-2xl ${className} ${isPlanningPage
                    ? "text-purple-500 border-2 border-purple-500 rounded-full p-1"
                    : ""
                    }`}
            />
            {totalOfPlannings > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {totalOfPlannings}
                </span>
            )}
        </div>
    );
};

export default NotificationIcon;
