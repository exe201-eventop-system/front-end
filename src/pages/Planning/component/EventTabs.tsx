import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../features/store";
import { getPlanning, createPlanningStep2, deletePlanning, addServiceToPlanning, deleteServiceFromPlanning } from "../../../features/Planning/planningThunks";
import { PlaningResponse, PlanningType } from "../../../types/Planning/Planning.type";

import { toast } from "react-toastify";
import BaseModal from "../../../components/ui/BaseModal";
import Loading from "../../../components/common/Loading";
import ErrorMessage from "../../../components/common/ErrorMessage";
import { Service } from '../../../types/Services/Services.type';
import { getServices } from '../../../features/Services/serviceThunks';
import { getSheduleSupplier } from '../../../features/Schedule/scheduleThunk';
import EventCard from './EventCard';
import EventDetails from './EventDetails';
import SelectedServices from './SelectedServices';
import AvailableServices from './AvailableServices';
import BookingModal from './BookingModal';
import { deleteCartItem } from '../../../features/Cart/cartThunk';


const formatCurrency = (amount: number | null | undefined) => {
  if (amount === null || amount === undefined) return "Chưa có";
  return amount.toLocaleString('vi-VN') + " VNĐ";
};

// Đặt hàm getMinPrice ở đầu file (sau import)
const getMinPrice = (service: Service) => {
  if (!service.packages || service.packages.length === 0) return undefined;
  return Math.min(...service.packages.map(pkg => pkg.price));
};


// Main Component
const EventTabs = () => {
  const [expandedEventId, setExpandedEventId] = useState<string | null>(null);
  const [expandedEventDetails, setExpandedEventDetails] = useState<PlaningResponse | null>(null);
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
  const [addingServiceId, setAddingServiceId] = useState<string | null>(null);
  const [removingServiceId, setRemovingServiceId] = useState<string | null>(null);
  const [planningList, setPlanningList] = useState<PlaningResponse[]>([]);
  // 1. Khôi phục state bookingData, showBookingModal
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [bookingData, setBookingData] = useState<{ serviceId: string, name: string, packageType: "hour" | "date" | "recurring", minSlotCount: number, date?: string, start?: string, end?: string }[]>([]);

  const dispatch = useDispatch<AppDispatch>();
  const planningData = useSelector((state: RootState) => state.planning.plannings);
  const loading = useSelector((state: RootState) => state.planning.loading);

  // Lấy service thực tế từ store
  const { services: serviceData, loading: serviceLoading, error: serviceError } = useSelector((state: RootState) => state.service);
  let services: Service[] = [];
  if (Array.isArray(serviceData) && serviceData.length && 'id' in serviceData[0]) {
    services = serviceData as Service[];
  } else if (serviceData && Array.isArray((serviceData as any).content)) {
    services = (serviceData as any).content as Service[];
  }

  // Đặt useSelector lấy cartContent/carrServiceIds lên đầu, trước mọi return
  const cartContent = useSelector((state: RootState) => state.cart.carts.content || []);
  const cartServiceIds = cartContent.map(item => item.serviceId);

  const toggleEventDetails = (eventId: string) => {
    if (expandedEventId === eventId) {
      setExpandedEventId(null);
      setExpandedEventDetails(null);
    } else {
      setExpandedEventId(eventId);
      // Lấy chi tiết từ danh sách đã có
      const planning = planningData.find(p => p.id === eventId);
      setExpandedEventDetails(planning || null);
    }
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
  const handleRemoveService = async (sessionService: { id: string, serviceId?: string }) => {
    if (!expandedEventId || !expandedEventDetails) return;
    setRemovingServiceId(sessionService.id);
    try {
      await dispatch(deleteServiceFromPlanning({ sessionId: sessionService.id })).unwrap();
      // Xóa luôn khỏi cart
      await dispatch(deleteCartItem({ id_cart_item: sessionService.id }));
      // FE cập nhật expandedEventDetails.sesstionServices
      setExpandedEventDetails(prev => prev ? {
        ...prev,
        sesstionServices: prev.sesstionServices.filter((ss: any) => ss.id !== sessionService.id)
      } : prev);
    } catch (err) {
      console.error("Lỗi khi xóa dịch vụ:", err);
    } finally {
      setRemovingServiceId(null);
    }
  };

  const handleFieldChange = (field: string, value: string) => {
    setEditFields(prev => ({ ...prev, [field]: value }));
  };

  const handleDeleteClick = (event: PlaningResponse) => {
    setEventToDelete(event);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (eventToDelete) {
      // Xóa ngay trên FE
      setExpandedEventDetails(null);
      setExpandedEventId(null);
      setPlanningList(prev => prev.filter(p => p.id !== eventToDelete.id));
      try {
        await dispatch(deletePlanning({ planningId: eventToDelete.id })).unwrap();
        toast.success("Xóa sự kiện thành công!");
        setIsDeleteModalOpen(false);
        setEventToDelete(null);
      } catch (error) {
        console.error("Failed to delete planning:", error);
        toast.error("Xóa sự kiện thất bại!");
      }
    }
  };

  // 2. Khôi phục handleBookNow
  const handleBookNow = (eventId: string) => {
    console.log("dfdf", eventId);
    setBookingData(selectedServiceObjs.map(({ service }) => {
      const rentalOptions = service.packages || [];
      const firstOption = rentalOptions[0] || {};
      let packageType: "hour" | "date" | "recurring" = "hour";
      if (firstOption.package_name === "Theo ngày") packageType = "date";
      else if (firstOption.package_name === "Theo giờ") packageType = "hour";
      else if (firstOption.package_name === "Theo tuần") packageType = "recurring";
      const minSlotCount = ('minimum_hours' in firstOption && typeof firstOption.minimum_hours === 'number') ? firstOption.minimum_hours * 2 : 3;
      return {
        serviceId: service.id,
        name: service.name,
        packageType,
        minSlotCount,
        date: '',
        start: '',
        end: ''
      };
    }));
    selectedServiceObjs.forEach(({ service }) => {
      if (service.supplier?.id) {
        dispatch(getSheduleSupplier({ id_supplier: service.supplier.id }));
      }
    });
    setShowBookingModal(true);
  };

  const handleSave = async () => {
    if (!expandedEventDetails) return;
    try {
      const updated = await dispatch(createPlanningStep2({
        id: expandedEventDetails.id,
        name: editFields.name,
        description: editFields.description,
        location: editFields.location,
        date_of_event: editFields.dateOfEvent,
        budget: Number(editFields.budget),
        about_number_people: editFields.aboutNumberPeople,
        main_color: editFields.mainColor,
        type_of_event: editFields.typeOfEvent as PlanningType,
      })).unwrap();
      toast.success("Cập nhật sự kiện thành công!");
      setIsEditing(false);
      dispatch(getPlanning({}));
      if (updated && typeof updated === 'object' && 'data' in updated && updated.data) {
        setExpandedEventDetails(updated.data);
      } else if (
        updated &&
        typeof updated === 'object' &&
        'id' in updated &&
        'name' in updated &&
        'customerId' in updated &&
        'description' in updated &&
        'status' in updated &&
        'location' in updated &&
        'dateOfEvent' in updated &&
        'budget' in updated &&
        'aboutNumberPeople' in updated &&
        'mainColor' in updated &&
        'typeOfEvent' in updated &&
        'createAt' in updated &&
        'updateDate' in updated &&
        'sesstionServices' in updated
      ) {
        setExpandedEventDetails(updated as PlaningResponse);
      } else {
        setExpandedEventDetails(null);
      }
    } catch (err) {
      toast.error("Cập nhật sự kiện thất bại!");
    }
  };


  useEffect(() => {
    dispatch(getServices({}));
  }, [dispatch]);

  useEffect(() => {
    setPlanningList(planningData);
  }, [planningData]);

  if (serviceLoading) return <Loading />;
  if (serviceError) return <ErrorMessage />;

  const selectedSessionServices = expandedEventDetails?.sesstionServices || [];
  const selectedServiceObjs: { service: Service, sessionServiceId: string }[] = selectedSessionServices.map((ss: any) => {
    const service = services.find(s => s.id === ss.serviceId);
    return service ? { service, sessionServiceId: ss.id } : null;
  }).filter(Boolean) as { service: Service, sessionServiceId: string }[];

  const selectedServiceIds = expandedEventDetails?.sesstionServices?.map((ss: any) => ss.serviceId) || [];

  return (
    <div className="max-w-7xl mx-auto">
      {/* Loading State */}
      {loading ? (
        <Loading />
      ) : (
        <>
          {/* Event List */}
          <div className="space-y-6">
            {planningList.map((event) => (
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
                      onSave={handleSave}
                      onCancel={() => setIsEditing(false)}
                      onFieldChange={handleFieldChange}
                      onDelete={handleDeleteClick}
                    />

                    {/* Selected Services */}
                    <SelectedServices
                      selectedServiceObjs={selectedServiceObjs}
                      removingServiceId={removingServiceId}
                      handleRemoveService={handleRemoveService}
                      handleBookNow={() => handleBookNow(event.id)}
                      getMinPrice={getMinPrice}
                      formatCurrency={formatCurrency}
                    />

                    {/* Available Services */}
                    <AvailableServices
                      services={services}
                      expandedEventDetails={expandedEventDetails}
                      addingServiceId={addingServiceId}
                      handleAddService={async (service) => {
                        if (!expandedEventId || !expandedEventDetails || selectedServiceIds.includes(service.id)) return;
                        setAddingServiceId(service.id);
                        try {
                          // Gọi API và lấy về response object (id thực nằm trong response.data)
                          const response = await dispatch(
                            addServiceToPlanning({ planning_id: expandedEventId, service_id: service.id })
                          ).unwrap();
                          const sessionServiceId = typeof response === "string" ? response : String(response.data);
                          setExpandedEventDetails(prev => prev ? {
                            ...prev,
                            sesstionServices: [
                              ...prev.sesstionServices,
                              {
                                id: String(sessionServiceId), // luôn là string
                                planningId: expandedEventId,
                                serviceId: service.id,
                              }
                            ]
                          } : prev);
                        } catch (err) {
                          toast.error("Thêm dịch vụ thất bại!");
                        } finally {
                          setAddingServiceId(null);
                        }
                      }}
                      selectedServiceIds={selectedServiceIds}
                      cartServiceIds={cartServiceIds}
                      getMinPrice={getMinPrice}
                      formatCurrency={formatCurrency}
                    />
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
        message=""
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

      {/* Modal Booking */}
      <BookingModal
        show={showBookingModal}
        onClose={() => setShowBookingModal(false)}
        bookingData={bookingData}
        setBookingData={setBookingData}
        services={services}
        handleConfirmBooking={() => {
          if (bookingData.some(b => !b.date || !b.start || !b.end)) {
            alert('Vui lòng chọn đầy đủ ngày và giờ cho tất cả dịch vụ!');
            return;
          }
          // Logic tiếp theo: chuyển sang thanh toán hoặc gọi API
          console.log('Booking:', bookingData);
          setShowBookingModal(false);
        }}
      />
    </div>
  );
};

export default EventTabs;
