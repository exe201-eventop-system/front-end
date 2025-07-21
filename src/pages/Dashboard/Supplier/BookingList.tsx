import React from "react";
import { FaListUl, FaInbox } from "react-icons/fa";
import BookingCard from "./BookingCard";
import { format } from "date-fns";

interface BookingListProps {
    bookings: any[];
    calendarView: string;
    calendarDate: Date;
    viewTitle: string;
}

const BookingList: React.FC<BookingListProps> = ({ bookings, calendarView, calendarDate, viewTitle }) => {
    return (
        <div className="h-[600px] overflow-y-auto flex flex-col">
            <div className="font-bold text-lg md:text-xl mb-4 text-blue-700 flex items-center gap-2">
                <FaListUl className="text-blue-500" />
                Danh sách đặt ({
                    calendarView === 'day' ? `Ngày ${format(calendarDate, 'dd/MM/yyyy')}` :
                        calendarView === 'week' ? viewTitle :
                            `Tháng ${format(calendarDate, 'MM/yyyy')}`
                })
            </div>
            {bookings.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-gray-400">
                    <FaInbox className="text-4xl mb-2" />
                    <span className="italic">Không có lịch đặt nào.</span>
                </div>
            ) : (
                <ul className="space-y-4">
                    {bookings.map((event, idx) => (
                        <BookingCard key={idx} event={event} />
                    ))}
                </ul>
            )}
        </div>
    );
};

export default BookingList; 