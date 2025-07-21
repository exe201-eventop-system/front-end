import React from 'react';
import { PlaningResponse, PlanningType } from '../../../types/Planning/Planning.type';
import { Palette, Tag, MapPin, Calendar, Users, DollarSign } from 'lucide-react';

const getContrastColor = (hexColor: string) => {
    const hex = hexColor.replace('#', '');
    const r = parseInt(hex.substr(0, 2), 16);
    const g = parseInt(hex.substr(2, 2), 16);
    const b = parseInt(hex.substr(4, 2), 16);
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    return luminance > 0.5 ? '#000000' : '#FFFFFF';
};

const planningTypeLabels: Record<PlanningType, string> = {
    WEDDING: "Đám cưới",
    BIRTHDAY: "Sinh nhật",
    PARTY: "Tiệc",
    CONFERENCE: "Hội nghị",
    MEETING: "Cuộc họp",
    TRAINING: "Đào tạo",
    TEAM_BUILDING: "Team Building",
    OTHER: "Khác"
};

const DetailField = ({ label, icon, value }: { label: string; icon: React.ReactNode; value: React.ReactNode }) => (
    <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200">
        <label className="flex items-center gap-2 text-sm font-medium text-gray-600 mb-2">
            {icon}
            {label}
        </label>
        <div className="text-base text-gray-800">{value}</div>
    </div>
);

interface Props {
    event: PlaningResponse;
    isEditing: boolean;
    editFields: any;
    onEdit: () => void;
    onSave: () => void;
    onCancel: () => void;
    onFieldChange: (field: string, value: string) => void;
    onDelete: (event: PlaningResponse) => void;
}

const EventDetails: React.FC<Props> = ({ event, isEditing, editFields, onEdit, onSave, onCancel, onFieldChange, onDelete }) => {
    const textColor = getContrastColor(event.mainColor || '#ffffff');
    return (
        <div className="mt-6">
            <div className="bg-gradient-to-br from-purple-50 to-white rounded-2xl border border-purple-100 shadow-lg overflow-hidden">
                {/* Header Section */}
                <div className="bg-white border-b border-gray-100 p-6">
                    <div className="flex justify-between items-center">
                        <div>
                            <h4 className="text-2xl font-bold text-gray-800">Thông tin chi tiết</h4>
                            <p className="text-gray-500 mt-1">Quản lý thông tin cơ bản của sự kiện</p>
                        </div>
                        {!isEditing ? (
                            <div className="flex gap-3">
                                <button onClick={onEdit} className="px-6 py-2.5 rounded-xl bg-purple-600 text-white hover:bg-purple-700 transition-all duration-200 flex items-center gap-2 shadow-md hover:shadow-lg">Chỉnh sửa</button>
                                <button onClick={() => onDelete(event)} className="px-6 py-2.5 rounded-xl bg-red-500 text-white hover:bg-red-600 transition-all duration-200 flex items-center gap-2 shadow-md hover:shadow-lg">Xóa</button>
                            </div>
                        ) : (
                            <div className="flex gap-3">
                                <button onClick={onSave} className="px-6 py-2.5 rounded-xl bg-green-500 text-white hover:bg-green-600 transition-all duration-200 flex items-center gap-2 shadow-md hover:shadow-lg">Lưu thay đổi</button>
                                <button onClick={onCancel} className="px-6 py-2.5 rounded-xl bg-gray-100 text-gray-700 hover:bg-gray-200 transition-all duration-200 flex items-center gap-2">Hủy</button>
                            </div>
                        )}
                    </div>
                </div>
                {/* Content Section */}
                <div className="p-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Left Column - Basic Information */}
                        <div className="space-y-6">
                            <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                                <h5 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">Thông tin cơ bản</h5>
                                <div className="space-y-4">
                                    <DetailField label="Tên sự kiện" icon={<Tag className="w-5 h-5 text-purple-500" />} value={isEditing ? (<input type="text" className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-200" value={editFields.name} onChange={e => onFieldChange('name', e.target.value)} placeholder="Nhập tên sự kiện" />) : (<div className="text-lg font-medium">{event.name || "Chưa có"}</div>)} />
                                    <DetailField label="Mô tả" icon={<Tag className="w-5 h-5 text-purple-500" />} value={isEditing ? (<textarea className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-200 min-h-[120px] resize-none" value={editFields.description} onChange={e => onFieldChange('description', e.target.value)} placeholder="Nhập mô tả sự kiện" />) : (<div className="text-gray-700 whitespace-pre-wrap">{event.description || "Chưa có"}</div>)} />
                                    <DetailField label="Loại sự kiện" icon={<Tag className="w-5 h-5 text-purple-500" />} value={isEditing ? (<select className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-200" value={editFields.typeOfEvent} onChange={e => onFieldChange('typeOfEvent', e.target.value)}>{Object.entries(planningTypeLabels).map(([value, label]) => (<option key={value} value={value}>{label}</option>))}</select>) : (<div className="text-gray-700">{planningTypeLabels[event.typeOfEvent as PlanningType] || "Chưa có"}</div>)} />
                                </div>
                            </div>
                            <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                                <h5 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">Thông tin địa điểm</h5>
                                <div className="space-y-4">
                                    <DetailField label="Địa điểm" icon={<MapPin className="w-5 h-5 text-purple-500" />} value={isEditing ? (<input type="text" className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-200" value={editFields.location} onChange={e => onFieldChange('location', e.target.value)} placeholder="Nhập địa điểm" />) : (<div className="text-gray-700">{event.location || "Chưa có"}</div>)} />
                                    <DetailField label="Ngày diễn ra" icon={<Calendar className="w-5 h-5 text-purple-500" />} value={isEditing ? (<input type="datetime-local" className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-200" value={editFields.dateOfEvent ? new Date(editFields.dateOfEvent).toISOString().slice(0, 16) : ''} onChange={e => onFieldChange('dateOfEvent', e.target.value)} min={new Date().toISOString().slice(0, 16)} />) : (<div className="text-gray-700">{event.dateOfEvent}</div>)} />
                                </div>
                            </div>
                        </div>
                        {/* Right Column - Additional Information */}
                        <div className="space-y-6">
                            <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                                <h5 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">Thông tin bổ sung</h5>
                                <div className="space-y-4">
                                    <DetailField label="Số lượng người tham gia" icon={<Users className="w-5 h-5 text-purple-500" />} value={isEditing ? (<input type="number" className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-200" value={editFields.aboutNumberPeople} onChange={e => onFieldChange('aboutNumberPeople', e.target.value)} placeholder="Nhập số lượng người" />) : (<div className="text-gray-700">{event.aboutNumberPeople || "Chưa có"}</div>)} />
                                    <DetailField label="Ngân sách" icon={<DollarSign className="w-5 h-5 text-purple-500" />} value={isEditing ? (<input type="number" className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-200" value={editFields.budget} onChange={e => onFieldChange('budget', e.target.value)} placeholder="Nhập ngân sách" />) : (<div className="text-gray-700 font-medium">{event.budget}</div>)} />
                                </div>
                            </div>
                            <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                                <h5 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">Tùy chỉnh giao diện</h5>
                                <div className="space-y-4">
                                    <DetailField label="Màu chủ đạo" icon={<Palette className="w-5 h-5 text-purple-500" />} value={isEditing ? (<div className="flex items-center gap-4"><input type="color" className="w-12 h-12 p-1 border border-gray-200 rounded-xl cursor-pointer" value={editFields.mainColor} onChange={e => onFieldChange('mainColor', e.target.value)} /><span className="text-sm text-gray-500">Chọn màu chủ đạo cho sự kiện</span></div>) : (<div className="flex items-center gap-3"><div className="w-8 h-8 rounded-full border-2 border-gray-200 shadow-sm flex items-center justify-center" style={{ background: event.mainColor || '#ccc' }}><span className="text-xs font-medium" style={{ color: textColor }}>Aa</span></div><span className="text-gray-700">{event.mainColor || "Chưa có"}</span></div>)} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EventDetails; 