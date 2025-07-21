import React from "react";
import { ToolbarProps } from "react-big-calendar";

const CustomToolbar: React.FC<ToolbarProps> = ({ label, onView, view, views }) => {
    // Lấy các view hợp lệ từ object views
    const availableViews = Array.isArray(views)
        ? views
        : Object.keys(views).filter((v) => (views as any)[v]);

    return (
        <div className="rbc-toolbar flex items-center justify-between py-2">
            {/* Chỉ giữ lại tiêu đề (label) */}
            <span className="text-lg font-semibold text-gray-800">{label}</span>

            {/* View selector: Tháng, Tuần, Ngày, Danh sách */}
            <div className="flex gap-1">
                {availableViews.map((v) => (
                    <button
                        key={v}
                        onClick={() => onView(v as any)}
                        className={`px-3 py-1.5 rounded border text-sm font-medium ${view === v
                            ? "bg-gray-300 text-black"
                            : "bg-white text-gray-600 border-gray-300 hover:bg-gray-100"
                            }`}
                    >
                        {v === "month" && "Tháng"}
                        {v === "week" && "Tuần"}
                        {v === "day" && "Ngày"}
                        {v === "agenda" && "Danh sách"}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default CustomToolbar; 