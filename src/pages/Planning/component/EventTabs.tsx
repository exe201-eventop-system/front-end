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
  const dispatch = useDispatch<AppDispatch>();

  const fetchPlanningData = useCallback(
    async ({
      page,
      size,
    }: {
      page: number;
      size: number;
    }): Promise<PaginationResult<PlaningResponse>> => {
      const response = await dispatch(
        getPlanning({ page, size, status: activeTab })
      ).unwrap();

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
          >
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-lg font-semibold text-gray-800">{event.name}</h3>
                <p className="text-sm text-gray-500">Ngày tổ chức: {formatDate(event.dateOfEvent)}</p>
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
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-medium text-gray-700">Thông tin chi tiết</h4>
                      <p className="text-sm text-gray-600">Địa điểm: {expandedEventDetails.location || "Chưa có"}</p>
                      <p className="text-sm text-gray-600">Số lượng người tham gia: {expandedEventDetails.aboutNumberPeople || "Chưa có"}</p>
                      <p className="text-sm text-gray-600">Ngân sách: {formatCurrency(expandedEventDetails.budget)}</p>
                      <p className="text-sm text-gray-600">Loại sự kiện: {expandedEventDetails.typeOfEvent || "Chưa có"}</p>
                      <p className="text-sm text-gray-600">Màu chủ đạo: {expandedEventDetails.mainColor || "Chưa có"}</p>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-700">Trạng thái</h4>
                      <p className="text-sm text-gray-600">Trạng thái: {expandedEventDetails.status || "Chưa có"}</p>
                      <p className="text-sm text-gray-600">Mô tả: {expandedEventDetails.description || "Chưa có"}</p>
                      <p className="text-sm text-gray-600">Ngày tạo: {formatDate(expandedEventDetails.createAt)}</p>
                      <p className="text-sm text-gray-600">Cập nhật lần cuối: {formatDate(expandedEventDetails.updateDate)}</p>
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
