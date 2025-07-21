import React from "react";
import { FaPhoneAlt, FaMapMarkerAlt, FaUser } from "react-icons/fa";
import { format } from "date-fns";
import { UsedServiceStatus } from "../../../types/Services/Services.type";

interface BookingCardProps {
    event: any;
}

const BookingCard: React.FC<BookingCardProps> = ({ event }) => {
    return (
        <li className="bg-gradient-to-r from-blue-50 to-white border border-blue-100 rounded-lg p-4 shadow-sm flex gap-4 items-center hover:shadow-lg transition-shadow">
            <img
                src={event.resource.image}
                alt={event.resource.serviceName}
                className="w-14 h-14 object-cover rounded-lg border"
            />
            <div className="flex-1 min-w-0">
                <div className="font-semibold text-base truncate">{event.resource.serviceName}</div>
                <div className="text-xs text-blue-600 font-medium truncate flex items-center gap-1"><FaMapMarkerAlt className="inline-block" /> {event.resource.location}</div>
                <div className="text-xs text-gray-700 mt-1">{format(event.start, 'dd/MM/yyyy HH:mm')} - {format(event.end, 'HH:mm')}</div>
                <div className="text-xs text-gray-500 truncate flex items-center gap-1"><FaUser className="inline-block" /> {event.resource.customerName} <span className="mx-1">|</span> <FaPhoneAlt className="inline-block" /> {event.resource.phone}</div>
                <div className={
                    event.resource.status === UsedServiceStatus.Registered
                        ? "text-yellow-600 font-semibold text-xs mt-1"
                        : event.resource.status === UsedServiceStatus.Returned
                            ? "text-green-600 font-semibold text-xs mt-1"
                            : "text-gray-600 font-semibold text-xs mt-1"
                }>
                    {event.resource.status === UsedServiceStatus.Registered
                        ? "Đã đăng ký"
                        : event.resource.status === UsedServiceStatus.Returned
                            ? "Đã hoàn thành"
                            : "Không xác định"}
                </div>
            </div>
        </li>
    );
};

export default BookingCard; 