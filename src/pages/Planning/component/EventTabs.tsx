import { useState, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../features/store";
import { getPlanning, getAPlanning, createPlanningStep2, deletePlanning } from "../../../features/Planning/planningThunks";
import { PlaningResponse, PlanningType, PlaningStep2Request } from "../../../types/Planning.type";
import { ChevronDown, ChevronUp, Plus, Minus, Calendar, MapPin, Users, DollarSign, Tag, Palette, ShoppingCart } from "lucide-react";
import { toast } from "react-toastify";
import BaseModal from "../../../components/BaseModal";
import { useNavigate } from "react-router-dom";

// Types
interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  avatar: string;
}

type TabKey = "Planning" | "Ongoing" | "Completed";

// Mock Data
const mockServices: Service[] = [
  {
    id: "1",
    name: "Trang trí sân khấu",
    description: "Trang trí sân khấu theo chủ đề",
    price: 5000000,
    category: "Trang trí",
    avatar: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=1000"
  },
  {
    id: "2",
    name: "Âm thanh ánh sáng",
    description: "Hệ thống âm thanh và ánh sáng chuyên nghiệp",
    price: 3000000,
    category: "Âm thanh",
    avatar: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?q=80&w=1000"
  },
  {
    id: "3",
    name: "MC chuyên nghiệp",
    description: "MC dẫn chương trình chuyên nghiệp",
    price: 2000000,
    category: "Nhân sự",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000"
  },
  {
    id: "4",
    name: "Catering",
    description: "Dịch vụ ăn uống cho 100 người",
    price: 10000000,
    category: "Ẩm thực",
    avatar: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=1000"
  },
  {
    id: "5",
    name: "Chụp ảnh",
    description: "Chụp ảnh và quay phim sự kiện",
    price: 4000000,
    category: "Media",
    avatar: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=1000"
  }
];

const tabs = [
  { key: "Planning", label: "Đang Lên Kế Hoạch" },
  { key: "Ongoing", label: "Đang Diễn Ra" },
  { key: "Completed", label: "Đã Hoàn Thành" },
] as const;

// Utility Functions
const formatDate = (dateString: string | null | undefined) => {
  if (!dateString) return "Chưa có";
  try {
    return new Date(dateString).toLocaleDateString('vi-VN');
  } catch {
    return "Định dạng không hợp lệ";
  }
};

const formatCurrency = (amount: number | null | undefined) => {
  if (amount === null || amount === undefined) return "Chưa có";
  return amount.toLocaleString('vi-VN') + " VNĐ";
};

// Function to determine text color based on background color
const getContrastColor = (hexColor: string) => {
  // Remove the hash if it exists
  const hex = hexColor.replace('#', '');

  // Convert to RGB
  const r = parseInt(hex.substr(0, 2), 16);
  const g = parseInt(hex.substr(2, 2), 16);
  const b = parseInt(hex.substr(4, 2), 16);

  // Calculate luminance
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

  // Return black or white based on luminance
  return luminance > 0.5 ? '#000000' : '#FFFFFF';
};

// Map PlanningType to Vietnamese labels
const planningTypeLabels: Record<PlanningType, string> = {
  [PlanningType.WEDDING]: "Đám cưới",
  [PlanningType.BIRTHDAY]: "Sinh nhật",
  [PlanningType.PARTY]: "Tiệc",
  [PlanningType.CONFERENCE]: "Hội nghị",
  [PlanningType.MEETING]: "Cuộc họp",
  [PlanningType.TRAINING]: "Đào tạo",
  [PlanningType.TEAM_BUILDING]: "Team Building",
  [PlanningType.OTHER]: "Khác"
};

const TabButton = ({ active, label, onClick }: { active: boolean; label: string; onClick: () => void }) => (
  <button
    onClick={onClick}
    className={`px-6 py-3 rounded-xl transition-all duration-200 ${active
      ? "bg-purple-600 text-white shadow-lg shadow-purple-200"
      : "bg-gray-50 text-gray-700 hover:bg-gray-100"
      }`}
  >
    {label}
  </button>
);

const EventCard = ({ event, isExpanded, onToggle, children }: {
  event: PlaningResponse;
  isExpanded: boolean;
  onToggle: () => void;
  children?: React.ReactNode;
}) => (
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

const DetailField = ({ label, icon, value }: { label: string; icon: React.ReactNode; value: React.ReactNode }) => (
  <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200">
    <label className="flex items-center gap-2 text-sm font-medium text-gray-600 mb-2">
      {icon}
      {label}
    </label>
    <div className="text-base text-gray-800">{value}</div>
  </div>
);

const EventDetails = ({
  event,
  isEditing,
  editFields,
  onEdit,
  onSave,
  onCancel,
  onFieldChange,
  onDelete
}: {
  event: PlaningResponse;
  isEditing: boolean;
  editFields: any;
  onEdit: () => void;
  onSave: () => void;
  onCancel: () => void;
  onFieldChange: (field: string, value: string) => void;
  onDelete: (event: PlaningResponse) => void;
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const textColor = getContrastColor(event.mainColor || '#ffffff');

  const handleSave = async () => {
    try {
      const updateData: PlaningStep2Request = {
        id: event.id,
        name: editFields.name,
        description: editFields.description,
        location: editFields.location,
        dateOfEvent: editFields.dateOfEvent,
        budget: Number(editFields.budget),
        aboutNumberPeople: editFields.aboutNumberPeople,
        mainColor: editFields.mainColor,
        typeOfEvent: editFields.typeOfEvent as PlanningType
      };

      const response = await dispatch(createPlanningStep2(updateData)).unwrap();

      if (response) {
        toast.success("Cập nhật thông tin sự kiện thành công!");
        onSave();
      }
    } catch (error) {
      console.error("Failed to update planning:", error);
      toast.error("Cập nhật thông tin sự kiện thất bại!");
    }
  };

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
                <button
                  onClick={onEdit}
                  className="px-6 py-2.5 rounded-xl bg-purple-600 text-white hover:bg-purple-700 transition-all duration-200 flex items-center gap-2 shadow-md hover:shadow-lg"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                  </svg>
                  Chỉnh sửa
                </button>
                <button
                  onClick={() => onDelete(event)}
                  className="px-6 py-2.5 rounded-xl bg-red-500 text-white hover:bg-red-600 transition-all duration-200 flex items-center gap-2 shadow-md hover:shadow-lg"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  Xóa
                </button>
              </div>
            ) : (
              <div className="flex gap-3">
                <button
                  onClick={handleSave}
                  className="px-6 py-2.5 rounded-xl bg-green-500 text-white hover:bg-green-600 transition-all duration-200 flex items-center gap-2 shadow-md hover:shadow-lg"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Lưu thay đổi
                </button>
                <button
                  onClick={onCancel}
                  className="px-6 py-2.5 rounded-xl bg-gray-100 text-gray-700 hover:bg-gray-200 transition-all duration-200 flex items-center gap-2"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                  Hủy
                </button>
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
                <h5 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-500" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
                  </svg>
                  Thông tin cơ bản
                </h5>
                <div className="space-y-4">
                  <DetailField
                    label="Tên sự kiện"
                    icon={<Tag className="w-5 h-5 text-purple-500" />}
                    value={isEditing ? (
                      <input
                        type="text"
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-200"
                        value={editFields.name}
                        onChange={(e) => onFieldChange('name', e.target.value)}
                        placeholder="Nhập tên sự kiện"
                      />
                    ) : (
                      <div className="text-lg font-medium">{event.name || "Chưa có"}</div>
                    )}
                  />
                  <DetailField
                    label="Mô tả"
                    icon={<Tag className="w-5 h-5 text-purple-500" />}
                    value={isEditing ? (
                      <textarea
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-200 min-h-[120px] resize-none"
                        value={editFields.description}
                        onChange={(e) => onFieldChange('description', e.target.value)}
                        placeholder="Nhập mô tả sự kiện"
                      />
                    ) : (
                      <div className="text-gray-700 whitespace-pre-wrap">{event.description || "Chưa có"}</div>
                    )}
                  />
                  <DetailField
                    label="Loại sự kiện"
                    icon={<Tag className="w-5 h-5 text-purple-500" />}
                    value={isEditing ? (
                      <select
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-200"
                        value={editFields.typeOfEvent}
                        onChange={(e) => onFieldChange('typeOfEvent', e.target.value)}
                      >
                        {Object.entries(planningTypeLabels).map(([value, label]) => (
                          <option key={value} value={value}>
                            {label}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <div className="text-gray-700">
                        {planningTypeLabels[event.typeOfEvent as PlanningType] || "Chưa có"}
                      </div>
                    )}
                  />
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                <h5 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-500" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                  Thông tin địa điểm
                </h5>
                <div className="space-y-4">
                  <DetailField
                    label="Địa điểm"
                    icon={<MapPin className="w-5 h-5 text-purple-500" />}
                    value={isEditing ? (
                      <input
                        type="text"
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-200"
                        value={editFields.location}
                        onChange={(e) => onFieldChange('location', e.target.value)}
                        placeholder="Nhập địa điểm"
                      />
                    ) : (
                      <div className="text-gray-700">{event.location || "Chưa có"}</div>
                    )}
                  />
                  <DetailField
                    label="Ngày diễn ra"
                    icon={<Calendar className="w-5 h-5 text-purple-500" />}
                    value={isEditing ? (
                      <input
                        type="datetime-local"
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-200"
                        value={editFields.dateOfEvent ? new Date(editFields.dateOfEvent).toISOString().slice(0, 16) : ''}
                        onChange={(e) => onFieldChange('dateOfEvent', e.target.value)}
                        min={new Date().toISOString().slice(0, 16)}
                      />
                    ) : (
                      <div className="text-gray-700">{formatDate(event.dateOfEvent)}</div>
                    )}
                  />
                </div>
              </div>
            </div>

            {/* Right Column - Additional Information */}
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                <h5 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-500" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 2a8 8 0 100 16 8 8 0 000-16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                  </svg>
                  Thông tin bổ sung
                </h5>
                <div className="space-y-4">
                  <DetailField
                    label="Số lượng người tham gia"
                    icon={<Users className="w-5 h-5 text-purple-500" />}
                    value={isEditing ? (
                      <input
                        type="number"
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-200"
                        value={editFields.aboutNumberPeople}
                        onChange={(e) => onFieldChange('aboutNumberPeople', e.target.value)}
                        placeholder="Nhập số lượng người"
                      />
                    ) : (
                      <div className="text-gray-700">{event.aboutNumberPeople || "Chưa có"}</div>
                    )}
                  />
                  <DetailField
                    label="Ngân sách"
                    icon={<DollarSign className="w-5 h-5 text-purple-500" />}
                    value={isEditing ? (
                      <input
                        type="number"
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-200"
                        value={editFields.budget}
                        onChange={(e) => onFieldChange('budget', e.target.value)}
                        placeholder="Nhập ngân sách"
                      />
                    ) : (
                      <div className="text-gray-700 font-medium">{formatCurrency(event.budget)}</div>
                    )}
                  />
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                <h5 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-500" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4 2a2 2 0 00-2 2v11a3 3 0 106 0V4a2 2 0 00-2-2H4zm1 14a1 1 0 100-2 1 1 0 000 2zm5-1.757l4.9-4.9a2 2 0 000-2.828L13.485 5.1a2 2 0 00-2.828 0L10 5.757v8.486zM16 18H9.071l6-6H16a2 2 0 012 2v2a2 2 0 01-2 2z" clipRule="evenodd" />
                  </svg>
                  Tùy chỉnh giao diện
                </h5>
                <div className="space-y-4">
                  <DetailField
                    label="Màu chủ đạo"
                    icon={<Palette className="w-5 h-5 text-purple-500" />}
                    value={isEditing ? (
                      <div className="flex items-center gap-4">
                        <input
                          type="color"
                          className="w-12 h-12 p-1 border border-gray-200 rounded-xl cursor-pointer"
                          value={editFields.mainColor}
                          onChange={(e) => onFieldChange('mainColor', e.target.value)}
                        />
                        <span className="text-sm text-gray-500">Chọn màu chủ đạo cho sự kiện</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-3">
                        <div
                          className="w-8 h-8 rounded-full border-2 border-gray-200 shadow-sm flex items-center justify-center"
                          style={{ background: event.mainColor || '#ccc' }}
                        >
                          <span
                            className="text-xs font-medium"
                            style={{ color: textColor }}
                          >
                            Aa
                          </span>
                        </div>
                        <span className="text-gray-700">{event.mainColor || "Chưa có"}</span>
                      </div>
                    )}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ServiceCard = ({
  service,
  isSelected,
  onToggle
}: {
  service: Service;
  isSelected: boolean;
  onToggle: () => void;
}) => (
  <div
    className={`p-4 rounded-xl border transition-all duration-200 ${isSelected
      ? "border-blue-500 bg-blue-50"
      : "border-gray-200 bg-white hover:border-gray-300"
      }`}
  >
    <div className="flex gap-4">
      {/* Avatar */}
      <div className="flex-shrink-0">
        <img
          src={service.avatar}
          alt={service.name}
          className="w-20 h-20 rounded-lg object-cover"
        />
      </div>

      {/* Content */}
      <div className="flex-grow">
        <div className="flex justify-between items-start">
          <div>
            <h5 className="font-medium text-gray-800">{service.name}</h5>
            <p className="text-sm text-gray-600 mt-1">{service.description}</p>
            <p className="text-sm font-medium text-blue-600 mt-2">{formatCurrency(service.price)}</p>
          </div>
          <button
            onClick={onToggle}
            className={`p-2 rounded-full transition-colors ${isSelected
              ? "bg-blue-500 text-white hover:bg-blue-600"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
          >
            {isSelected ? (
              <Minus className="h-4 w-4" />
            ) : (
              <Plus className="h-4 w-4" />
            )}
          </button>
        </div>
      </div>
    </div>
  </div>
);

// Add new types for filters
interface ServiceFilters {
  category: string;
  priceRange: string;
  searchQuery: string;
}

// Main Component
const EventTabs = () => {
  const [activeTab, setActiveTab] = useState<TabKey>("Planning");
  const [expandedEventId, setExpandedEventId] = useState<string | null>(null);
  const [expandedEventDetails, setExpandedEventDetails] = useState<PlaningResponse | null>(null);
  const [selectedServices, setSelectedServices] = useState<{ [key: string]: Service[] }>({});
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [eventToDelete, setEventToDelete] = useState<PlaningResponse | null>(null);
  const [editFields, setEditFields] = useState({
    name: "",
    description: "",
    location: "",
    aboutNumberPeople: "",
    budget: "",
    typeOfEvent: "",
    mainColor: "",
    dateOfEvent: "",
    status: "Planning"
  });
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;
  const [serviceFilters, setServiceFilters] = useState<ServiceFilters>({
    category: 'all',
    priceRange: 'all',
    searchQuery: ''
  });

  const dispatch = useDispatch<AppDispatch>();
  const planningData = useSelector((state: RootState) => state.planning.plannings);
  const loading = useSelector((state: RootState) => state.planning.loading);
  const navigate = useNavigate();

  // Get unique categories from services
  const categories = ['all', ...new Set(mockServices.map(service => service.category))];

  // Filter services based on selected filters
  const filteredServices = mockServices.filter(service => {
    const matchesCategory = serviceFilters.category === 'all' || service.category === serviceFilters.category;
    const matchesSearch = service.name.toLowerCase().includes(serviceFilters.searchQuery.toLowerCase()) ||
      service.description.toLowerCase().includes(serviceFilters.searchQuery.toLowerCase());

    let matchesPrice = true;
    if (serviceFilters.priceRange !== 'all') {
      const [min, max] = serviceFilters.priceRange.split('-').map(Number);
      matchesPrice = service.price >= min && service.price <= max;
    }

    return matchesCategory && matchesSearch && matchesPrice;
  });

  const fetchData = useCallback(async () => {
    try {
      const response = await dispatch(
        getPlanning({ page: currentPage, size: pageSize, status: activeTab })
      ).unwrap();
      console.log("🔹 [EventTabs] Fetched data:", response);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  }, [dispatch, currentPage, pageSize, activeTab]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const fetchEventDetails = useCallback(async (eventId: string) => {
    try {
      const response = await dispatch(getAPlanning({ planningId: eventId })).unwrap();
      if (response.data) {
        setExpandedEventDetails(response.data);
      }
    } catch (error) {
      console.error("Failed to fetch event details:", error);
    }
  }, [dispatch]);

  const toggleEventDetails = async (eventId: string) => {
    if (expandedEventId === eventId) {
      setExpandedEventId(null);
      setExpandedEventDetails(null);
    } else {
      setExpandedEventId(eventId);
      await fetchEventDetails(eventId);
    }
  };

  const toggleService = (eventId: string, service: Service) => {
    setSelectedServices(prev => {
      const currentServices = prev[eventId] || [];
      const isSelected = currentServices.some(s => s.id === service.id);

      if (isSelected) {
        return {
          ...prev,
          [eventId]: currentServices.filter(s => s.id !== service.id)
        };
      } else {
        return {
          ...prev,
          [eventId]: [...currentServices, service]
        };
      }
    });
  };

  const handleEdit = (event: PlaningResponse) => {
    setEditFields({
      name: event.name || "",
      description: event.description || "",
      location: event.location || "",
      aboutNumberPeople: event.aboutNumberPeople || "",
      budget: event.budget?.toString() || "",
      typeOfEvent: event.typeOfEvent || "",
      mainColor: event.mainColor || "",
      dateOfEvent: event.dateOfEvent || "",
      status: event.status || "Planning"
    });
    setIsEditing(true);
  };

  const handleFieldChange = (field: string, value: string) => {
    setEditFields(prev => ({ ...prev, [field]: value }));
  };

  const handleDeleteClick = (event: PlaningResponse) => {
    setEventToDelete(event);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    const deleteEvent = async () => {
      if (!eventToDelete) return;

      try {
        console.log("Event ID to delete:", eventToDelete.id);
        const response = await dispatch(deletePlanning({ planningId: eventToDelete.id })).unwrap();

        if (response) {
          toast.success('Xóa sự kiện thành công!');
          // Refresh the planning list
          dispatch(getPlanning({ page: currentPage, size: pageSize, status: activeTab }));
          setIsDeleteModalOpen(false);
          setEventToDelete(null);
        }
      } catch (error) {
        console.error('Failed to delete event:', error);
        toast.error('Xóa sự kiện thất bại!');
      }
    };

    deleteEvent();
  };

  const handleBookNow = (eventId: string) => {
    if (!selectedServices[eventId] || selectedServices[eventId].length === 0) {
      toast.warning('Vui lòng chọn ít nhất một dịch vụ!');
      return;
    }

    // TODO: Add selected services to cart
    // For now, just navigate to cart
    navigate('/cart');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Tabs */}
      <div className="flex gap-4 mb-8">
        {tabs.map((tab) => (
          <TabButton
            key={tab.key}
            active={activeTab === tab.key}
            label={tab.label}
            onClick={() => setActiveTab(tab.key as TabKey)}
          />
        ))}
      </div>

      {/* Loading State */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
        </div>
      ) : (
        <>
          {/* Event List */}
          <div className="space-y-6">
            {planningData.map((event) => (
              <EventCard
                key={event.id}
                event={event}
                isExpanded={expandedEventId === event.id}
                onToggle={() => toggleEventDetails(event.id)}
              >
                {expandedEventId === event.id && expandedEventDetails && (
                  <>
                    <EventDetails
                      event={expandedEventDetails}
                      isEditing={isEditing}
                      editFields={editFields}
                      onEdit={() => handleEdit(event)}
                      onSave={() => setIsEditing(false)}
                      onCancel={() => setIsEditing(false)}
                      onFieldChange={handleFieldChange}
                      onDelete={handleDeleteClick}
                    />

                    {/* Selected Services */}
                    <div className="mt-6 p-6 bg-gray-50 rounded-xl border border-gray-200">
                      <h4 className="text-lg font-semibold text-gray-700 mb-4">Dịch vụ đã chọn</h4>
                      {selectedServices[event.id]?.length > 0 ? (
                        <div className="space-y-3">
                          {selectedServices[event.id].map(service => (
                            <div key={service.id} className="flex justify-between items-center p-4 bg-white rounded-lg border border-gray-200">
                              <div>
                                <p className="font-medium text-gray-800">{service.name}</p>
                                <p className="text-sm text-gray-600">{service.description}</p>
                              </div>
                              <div className="flex items-center gap-4">
                                <p className="font-medium text-blue-600">{formatCurrency(service.price)}</p>
                                <button
                                  onClick={() => toggleService(event.id, service)}
                                  className="p-2 hover:bg-red-100 rounded-full text-red-500 transition-colors"
                                >
                                  <Minus className="h-4 w-4" />
                                </button>
                              </div>
                            </div>
                          ))}
                          <div className="flex justify-between items-center pt-4 mt-4 border-t border-gray-200">
                            <p className="font-medium text-gray-700">Tổng cộng:</p>
                            <p className="text-xl font-semibold text-blue-600">
                              {formatCurrency(selectedServices[event.id].reduce((total, service) => total + service.price, 0))}
                            </p>
                          </div>
                          <div className="flex justify-end mt-6">
                            <button
                              onClick={() => handleBookNow(event.id)}
                              className="px-6 py-3 rounded-xl bg-purple-600 text-white hover:bg-purple-700 transition-all duration-200 flex items-center gap-2 shadow-md hover:shadow-lg"
                            >
                              <ShoppingCart className="h-5 w-5" />
                              Đặt ngay
                            </button>
                          </div>
                        </div>
                      ) : (
                        <p className="text-gray-500 text-center py-4">Chưa có dịch vụ nào được chọn</p>
                      )}
                    </div>

                    {/* Available Services */}
                    <div className="mt-6 p-6 bg-gray-50 rounded-xl border border-gray-200">
                      <h4 className="text-lg font-semibold text-gray-700 mb-4">Dịch vụ có sẵn</h4>

                      {/* Filters */}
                      <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                        {/* Category Filter */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Danh mục</label>
                          <select
                            value={serviceFilters.category}
                            onChange={(e) => setServiceFilters(prev => ({ ...prev, category: e.target.value }))}
                            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-400 focus:border-transparent"
                          >
                            {categories.map(category => (
                              <option key={category} value={category}>
                                {category === 'all' ? 'Tất cả danh mục' : category}
                              </option>
                            ))}
                          </select>
                        </div>

                        {/* Price Range Filter */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Khoảng giá</label>
                          <select
                            value={serviceFilters.priceRange}
                            onChange={(e) => setServiceFilters(prev => ({ ...prev, priceRange: e.target.value }))}
                            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-400 focus:border-transparent"
                          >
                            <option value="all">Tất cả giá</option>
                            <option value="0-2000000">Dưới 2 triệu</option>
                            <option value="2000000-5000000">2 - 5 triệu</option>
                            <option value="5000000-10000000">5 - 10 triệu</option>
                            <option value="10000000-999999999">Trên 10 triệu</option>
                          </select>
                        </div>

                        {/* Search Filter */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Tìm kiếm</label>
                          <input
                            type="text"
                            value={serviceFilters.searchQuery}
                            onChange={(e) => setServiceFilters(prev => ({ ...prev, searchQuery: e.target.value }))}
                            placeholder="Tìm theo tên hoặc mô tả..."
                            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-400 focus:border-transparent"
                          />
                        </div>
                      </div>

                      {/* Services Grid */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {filteredServices.map(service => (
                          <ServiceCard
                            key={service.id}
                            service={service}
                            isSelected={selectedServices[event.id]?.some(s => s.id === service.id) || false}
                            onToggle={() => toggleService(event.id, service)}
                          />
                        ))}
                      </div>

                      {/* No Results Message */}
                      {filteredServices.length === 0 && (
                        <div className="text-center py-8 text-gray-500">
                          Không tìm thấy dịch vụ phù hợp với bộ lọc
                        </div>
                      )}
                    </div>
                  </>
                )}
              </EventCard>
            ))}
          </div>

          {/* Pagination */}
          <div className="mt-8 flex justify-center gap-3">
            <button
              onClick={() => setCurrentPage(prev => prev - 1)}
              disabled={currentPage === 1}
              className="px-6 py-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 disabled:opacity-50 transition-colors"
            >
              Trang trước
            </button>
            <span className="px-6 py-2 text-gray-700">Trang {currentPage}</span>
            <button
              onClick={() => setCurrentPage(prev => prev + 1)}
              disabled={planningData.length < pageSize}
              className="px-6 py-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 disabled:opacity-50 transition-colors"
            >
              Trang sau
            </button>
          </div>
        </>
      )}

      {/* Delete Confirmation Modal */}
      <BaseModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setEventToDelete(null);
        }}
        title="Xác nhận xóa"
      >
        <div className="p-6">
          <p className="text-gray-700 mb-6">
            Bạn có chắc chắn muốn xóa sự kiện "{eventToDelete?.name}"? Hành động này không thể hoàn tác.
          </p>
          <div className="flex justify-end gap-3">
            <button
              onClick={() => {
                setIsDeleteModalOpen(false);
                setEventToDelete(null);
              }}
              className="px-4 py-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
            >
              Hủy
            </button>
            <button
              onClick={handleConfirmDelete}
              className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition-colors"
            >
              Xóa
            </button>
          </div>
        </div>
      </BaseModal>
    </div>
  );
};

export default EventTabs;
