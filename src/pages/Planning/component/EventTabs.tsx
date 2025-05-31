import { useState, useCallback } from "react";
import Tabs from "../../../components/Tabs";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../features/store";
import { getPlanning, getAPlanning } from "../../../features/Planning/planningThunks";
import { PlaningResponse } from "../../../types/Planning.type";
import { PaginatedList } from "../../../components/PaginatedList";
import { PaginationResult } from "../../../types/PaginationResult.type";
import { ChevronDown, ChevronUp, Plus, Minus } from "lucide-react";

interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
}

// Dữ liệu mẫu cho các dịch vụ
const mockServices: Service[] = [
  {
    id: "1",
    name: "Trang trí sân khấu",
    description: "Trang trí sân khấu theo chủ đề",
    price: 5000000,
    category: "Trang trí"
  },
  {
    id: "2",
    name: "Âm thanh ánh sáng",
    description: "Hệ thống âm thanh và ánh sáng chuyên nghiệp",
    price: 3000000,
    category: "Âm thanh"
  },
  {
    id: "3",
    name: "MC chuyên nghiệp",
    description: "MC dẫn chương trình chuyên nghiệp",
    price: 2000000,
    category: "Nhân sự"
  },
  {
    id: "4",
    name: "Catering",
    description: "Dịch vụ ăn uống cho 100 người",
    price: 10000000,
    category: "Ẩm thực"
  },
  {
    id: "5",
    name: "Chụp ảnh",
    description: "Chụp ảnh và quay phim sự kiện",
    price: 4000000,
    category: "Media"
  }
];

const tabs = [
  { key: "Planning", label: "Đang Lên Kế Hoạch" },
  { key: "Ongoing", label: "Đang Diễn Ra" },
  { key: "Completed", label: "Đã Hoàn Thành" },
] as const;

type TabKey = typeof tabs[number]["key"];

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

const EventTabs = () => {
  const [activeTab, setActiveTab] = useState<TabKey>("Planning");
  const [expandedEventId, setExpandedEventId] = useState<string | null>(null);
  const [expandedEventDetails, setExpandedEventDetails] = useState<PlaningResponse | null>(null);
  const [selectedServices, setSelectedServices] = useState<{ [key: string]: Service[] }>({});
  const [isEditing, setIsEditing] = useState(false);
  const [editFields, setEditFields] = useState({
    location: "",
    aboutNumberPeople: "",
    budget: "",
    typeOfEvent: "",
    mainColor: "",
    status: "Planning",
    description: ""
  });
  const dispatch = useDispatch<AppDispatch>();

  const fetchPlanningData = useCallback(
    async ({
      page,
      size,
    }: {
      page: number;
      size: number;
    }): Promise<PaginationResult<PlaningResponse>> => {
      console.log("🔹 [EventTabs] Fetching planning data with:", { page, size, activeTab });
      const response = await dispatch(
        getPlanning({ page, size, status: activeTab })
      ).unwrap();
      console.log("🔹 [EventTabs] Received planning data:", response);

      return (
        response.data ?? {
          content: [],
          itemAmount: 0,
          pageSize: size,
          pageCount: 0,
          currentPage: page,
        }
      );
    },
    [dispatch, activeTab]
  );

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

  const isServiceSelected = (eventId: string, serviceId: string) => {
    return (selectedServices[eventId] || []).some(s => s.id === serviceId);
  };

  const getTotalPrice = (eventId: string) => {
    return (selectedServices[eventId] || []).reduce((total, service) => total + service.price, 0);
  };

  const handleSave = () => {
    // Implement the logic to save the edited event details
    console.log("Saving event details:", editFields);
    setIsEditing(false);
  };

  const handleCancel = () => {
    // Implement the logic to cancel the editing
    setIsEditing(false);
  };

  return (
    <div className="mt-8">
      <div className="flex gap-4 mb-4">
        {tabs.map((tab) => (
          <Tabs
            key={tab.key}
            isActive={activeTab === tab.key}
            onClick={() => setActiveTab(tab.key)}
          >
            {tab.label}
          </Tabs>
        ))}
      </div>

      <PaginatedList<PlaningResponse>
        fetchData={fetchPlanningData}
        renderItem={(event) => (
          <li
            key={event.id}
            className="p-4 border rounded-lg bg-white shadow hover:shadow-md transition"
            style={{ listStyle: 'none' }}
          >
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-lg font-semibold text-gray-800">{event.name}</h3>
                <p className="text-sm text-gray-500 mt-1">{formatDate(event.dateOfEvent)}</p>
              </div>
              <button
                onClick={() => toggleEventDetails(event.id)}
                className="p-2 hover:bg-gray-100 rounded-full transition"
              >
                {expandedEventId === event.id ? (
                  <ChevronUp className="h-5 w-5 text-gray-600" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-gray-600" />
                )}
              </button>
            </div>

            {expandedEventId === event.id && expandedEventDetails && (
              <div className="mt-4 space-y-6">
                <div className="p-6 bg-gray-50 rounded-xl border border-gray-200 shadow-sm">
                  <div className="flex justify-between items-center mb-4">
                    <h4 className="font-semibold text-lg text-gray-700 flex items-center gap-2">
                      Thông tin chi tiết
                    </h4>
                    {!isEditing ? (
                      <button
                        onClick={() => setIsEditing(true)}
                        className="px-4 py-1 rounded-md bg-blue-500 text-white hover:bg-blue-600 transition"
                      >
                        Chỉnh sửa
                      </button>
                    ) : (
                      <div className="flex gap-2">
                        <button
                          onClick={handleSave}
                          className="px-4 py-1 rounded-md bg-green-500 text-white hover:bg-green-600 transition"
                        >
                          Lưu
                        </button>
                        <button
                          onClick={handleCancel}
                          className="px-4 py-1 rounded-md bg-gray-300 text-gray-700 hover:bg-gray-400 transition"
                        >
                          Hủy
                        </button>
                      </div>
                    )}
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <label className="block text-xs font-medium text-gray-500 mb-1">Địa điểm</label>
                        {!isEditing ? (
                          <p className="text-base text-gray-700">{expandedEventDetails.location || "Chưa có"}</p>
                        ) : (
                          <input
                            type="text"
                            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
                            value={editFields.location}
                            onChange={e => setEditFields({ ...editFields, location: e.target.value })}
                          />
                        )}
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-500 mb-1">Số lượng người tham gia</label>
                        {!isEditing ? (
                          <p className="text-base text-gray-700">{expandedEventDetails.aboutNumberPeople || "Chưa có"}</p>
                        ) : (
                          <input
                            type="number"
                            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
                            value={editFields.aboutNumberPeople}
                            onChange={e => setEditFields({ ...editFields, aboutNumberPeople: e.target.value })}
                          />
                        )}
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-500 mb-1">Ngân sách</label>
                        {!isEditing ? (
                          <p className="text-base text-gray-700">{formatCurrency(expandedEventDetails.budget)}</p>
                        ) : (
                          <input
                            type="number"
                            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
                            value={editFields.budget}
                            onChange={e => setEditFields({ ...editFields, budget: e.target.value })}
                          />
                        )}
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-500 mb-1">Loại sự kiện</label>
                        {!isEditing ? (
                          <p className="text-base text-gray-700">{expandedEventDetails.typeOfEvent || "Chưa có"}</p>
                        ) : (
                          <input
                            type="text"
                            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
                            value={editFields.typeOfEvent}
                            onChange={e => setEditFields({ ...editFields, typeOfEvent: e.target.value })}
                          />
                        )}
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-500 mb-1">Màu chủ đạo</label>
                        {!isEditing ? (
                          <span className="inline-block w-6 h-6 rounded-full border" style={{ background: expandedEventDetails.mainColor || '#ccc' }} />
                        ) : (
                          <input
                            type="color"
                            className="w-10 h-10 p-0 border-none bg-transparent"
                            value={editFields.mainColor}
                            onChange={e => setEditFields({ ...editFields, mainColor: e.target.value })}
                          />
                        )}
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-xs font-medium text-gray-500 mb-1">Trạng thái</label>
                        {!isEditing ? (
                          <p className="text-base text-gray-700">{expandedEventDetails.status || "Chưa có"}</p>
                        ) : (
                          <select
                            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
                            value={editFields.status}
                            onChange={e => setEditFields({ ...editFields, status: e.target.value })}
                          >
                            <option value="Planning">Đang Lên Kế Hoạch</option>
                            <option value="Ongoing">Đang Diễn Ra</option>
                            <option value="Completed">Đã Hoàn Thành</option>
                          </select>
                        )}
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-500 mb-1">Mô tả</label>
                        {!isEditing ? (
                          <p className="text-base text-gray-700">{expandedEventDetails.description || "Chưa có"}</p>
                        ) : (
                          <textarea
                            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 min-h-[60px]"
                            value={editFields.description}
                            onChange={e => setEditFields({ ...editFields, description: e.target.value })}
                          />
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-medium text-gray-700 mb-4">Dịch vụ đã chọn</h4>
                  {selectedServices[event.id]?.length > 0 ? (
                    <div className="space-y-2">
                      {selectedServices[event.id].map(service => (
                        <div key={service.id} className="flex justify-between items-center p-2 bg-white rounded">
                          <div>
                            <p className="font-medium">{service.name}</p>
                            <p className="text-sm text-gray-600">{service.description}</p>
                          </div>
                          <div className="flex items-center gap-4">
                            <p className="font-medium">{formatCurrency(service.price)}</p>
                            <button
                              onClick={() => toggleService(event.id, service)}
                              className="p-1 hover:bg-red-100 rounded-full text-red-500"
                            >
                              <Minus className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      ))}
                      <div className="flex justify-between items-center pt-2 border-t">
                        <p className="font-medium">Tổng cộng:</p>
                        <p className="font-medium text-lg">{formatCurrency(getTotalPrice(event.id))}</p>
                      </div>
                    </div>
                  ) : (
                    <p className="text-gray-500">Chưa có dịch vụ nào được chọn</p>
                  )}
                </div>

                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-medium text-gray-700 mb-4">Dịch vụ có sẵn</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {mockServices.map(service => (
                      <div
                        key={service.id}
                        className={`p-4 rounded-lg border ${isServiceSelected(event.id, service.id)
                          ? "border-blue-500 bg-blue-50"
                          : "border-gray-200 bg-white"
                          }`}
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <h5 className="font-medium">{service.name}</h5>
                            <p className="text-sm text-gray-600">{service.description}</p>
                            <p className="text-sm font-medium mt-2">{formatCurrency(service.price)}</p>
                          </div>
                          <button
                            onClick={() => toggleService(event.id, service)}
                            className={`p-2 rounded-full ${isServiceSelected(event.id, service.id)
                              ? "bg-blue-500 text-white"
                              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                              }`}
                          >
                            {isServiceSelected(event.id, service.id) ? (
                              <Minus className="h-4 w-4" />
                            ) : (
                              <Plus className="h-4 w-4" />
                            )}
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </li>
        )}
        pageSize={5}
      />
    </div>
  );
};

export default EventTabs;
