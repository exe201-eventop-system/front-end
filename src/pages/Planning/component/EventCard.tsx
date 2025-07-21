import React, { ReactNode } from 'react';
import { Calendar, ChevronDown, ChevronUp } from 'lucide-react';
import { PlaningResponse } from '../../../types/Planning/Planning.type';

const formatDate = (dateString: string | null | undefined) => {
    if (!dateString) return "Chưa có";
    try {
        return new Date(dateString).toLocaleDateString('vi-VN');
    } catch {
        return "Định dạng không hợp lệ";
    }
};

interface EventCardProps {
    event: PlaningResponse;
    isExpanded: boolean;
    onToggle: () => void;
    children?: ReactNode;
}

const EventCard: React.FC<EventCardProps> = ({ event, isExpanded, onToggle, children }) => (
    <div className="p-6 border rounded-2xl bg-white shadow-sm hover:shadow-md transition-all duration-200">
        <div className="flex justify-between items-center">
            <div className="space-y-1">
                <h3 className="text-xl font-semibold text-gray-800">{event.name}</h3>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Calendar className="w-4 h-4" />
                    <span>{formatDate(event.dateOfEvent)}</span>
                </div>
            </div>
            <button
                onClick={onToggle}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
                {isExpanded ? (
                    <ChevronUp className="h-6 w-6 text-gray-600" />
                ) : (
                    <ChevronDown className="h-6 w-6 text-gray-600" />
                )}
            </button>
        </div>
        {isExpanded && children}
    </div>
);

export default EventCard; 