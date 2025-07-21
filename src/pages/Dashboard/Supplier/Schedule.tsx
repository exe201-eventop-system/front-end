import React, { useEffect, useState } from "react";
import { Calendar, dateFnsLocalizer, Event, View } from "react-big-calendar";
import {
  format,
  parse,
  startOfWeek,
  getDay,
  isSameDay,
  isSameWeek,
  isSameMonth,
  addDays,
  subDays,
  addWeeks,
  subWeeks,
  addMonths,
  subMonths,
} from "date-fns";
import { vi } from "date-fns/locale/vi";
import "react-big-calendar/lib/css/react-big-calendar.css";
import {
  FaCalendarAlt,
  FaChevronLeft,
  FaChevronRight,
  FaRegCalendar,
  FaRegCalendarAlt,
  FaRegCalendarCheck,
} from "react-icons/fa";
import CustomToolbar from "./CustomToolbar";
import BookingList from "./BookingList";
import { AppDispatch, RootState } from "../../../features/store";
import { useDispatch, useSelector } from "react-redux";
import { getScheduleSupplier } from "../../../features/Supplier/supplierThunks";
import Loading from "../../../components/common/Loading";

const locales = {
  vi: vi,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek: () => startOfWeek(new Date(), { weekStartsOn: 1 }),
  getDay,
  locales,
});

// ===== MOCK DATA LỊCH ĐẶT DỊCH VỤ (có đầy đủ thông tin) =====
// ===== HẾT MOCK DATA =====

const eventPropGetter = (event: Event) => {
  let bg = "#e5e7eb";
  if (event.resource.status === "Đã xác nhận") bg = "#bbf7d0";
  else if (event.resource.status === "Chờ xác nhận") bg = "#fef08a";
  else if (event.resource.status === "Đã huỷ") bg = "#fecaca";
  return {
    style: {
      backgroundColor: bg,
      color: "#222",
      borderRadius: "6px",
      border: "none",
      fontWeight: 600,
    },
  };
};

// Tooltip hiển thị chi tiết event
const EventComponent: React.FC<{ event: Event }> = ({ event }) => {
  const [showTooltip, setShowTooltip] = useState(false);
  // event.resource có thể là ServiceDto
  const resource = event.resource as any; // ServiceDto
  return (
    <div
      className="relative flex flex-col gap-0.5 cursor-pointer px-1 py-1"
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      <div className="flex items-center gap-2">
        <img
          src={resource.image}
          alt={resource.serviceName}
          className="w-6 h-6 object-cover rounded-full border border-gray-300"
        />
        <div className="flex-1">
          <div className="font-semibold text-sm leading-tight">
            {resource.serviceName}
          </div>
          <div className="text-xs text-blue-600 font-medium leading-tight truncate">
            {resource.location}
          </div>
          <div className="text-xs text-gray-500 leading-tight">
            {resource.customerName}
          </div>
        </div>
        <span
          className={
            resource.status === "Đã xác nhận"
              ? "w-2 h-2 rounded-full bg-green-500 inline-block ml-1"
              : resource.status === "Chờ xác nhận"
                ? "w-2 h-2 rounded-full bg-yellow-400 inline-block ml-1"
                : "w-2 h-2 rounded-full bg-red-400 inline-block ml-1"
          }
          title={resource.status}
        ></span>
      </div>
      {showTooltip && (
        <div className="absolute z-50 left-1/2 top-10 -translate-x-1/2 w-64 bg-white border border-gray-300 rounded-lg shadow-lg p-3 text-xs animate-fade-in">
          <div className="flex items-center gap-2 mb-2">
            <img
              src={resource.image}
              alt={resource.serviceName}
              className="w-10 h-10 object-cover rounded-full border"
            />
            <div>
              <div className="font-bold text-base mb-1">
                {resource.serviceName}
              </div>
              <div className="text-gray-600">
                Khách: {resource.customerName}
              </div>
              <div className="text-gray-600">SĐT: {resource.phone}</div>
            </div>
          </div>
          <div>
            <span className="font-semibold">Thời gian:</span>{" "}
            {event.start && event.end
              ? `${format(event.start as Date, "dd/MM/yyyy HH:mm")} - ${format(
                event.end as Date,
                "HH:mm"
              )}`
              : ""}
          </div>
          <div>
            <span className="font-semibold">Địa điểm:</span> {resource.location}
          </div>
          <div>
            <span className="font-semibold">Trạng thái:</span>{" "}
            <span
              className={
                resource.status === "Đã xác nhận"
                  ? "text-green-600 font-semibold"
                  : resource.status === "Chờ xác nhận"
                    ? "text-yellow-600 font-semibold"
                    : "text-red-600 font-semibold"
              }
            >
              {resource.status}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

function filterEventsByView(events: Event[], view: View, date: Date) {
  if (view === "day") {
    return events.filter((e) => isSameDay(e.start as Date, date));
  }
  if (view === "week") {
    return events.filter((e) =>
      isSameWeek(e.start as Date, date, { weekStartsOn: 1 })
    );
  }
  // default: month
  return events.filter((e) => isSameMonth(e.start as Date, date));
}

const viewOptions = [
  { key: "day", label: "Ngày", icon: <FaRegCalendarCheck /> },
  { key: "week", label: "Tuần", icon: <FaRegCalendarAlt /> },
  { key: "month", label: "Tháng", icon: <FaRegCalendar /> },
];

const SupplierSchedule: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { scheduleSupplier, scheduleLoading } = useSelector(
    (state: RootState) => state.supplier
  );
  const [calendarView, setCalendarView] = useState<View>("month");
  const [calendarDate, setCalendarDate] = useState<Date>(new Date());

  useEffect(() => {
    dispatch(getScheduleSupplier());
  }, [dispatch]);

  // Map dữ liệu từ API sang Event[] cho Calendar
  const events: Event[] = scheduleSupplier.map((item) => ({
    ...item,
    start: new Date(item.start),
    end: new Date(item.end),
    title: item.title,
    resource: item.resource,
  }));

  // Lọc sự kiện theo view (ngày, tuần, tháng)
  const filteredEvents = filterEventsByView(events, calendarView, calendarDate);

  // Điều hướng ngày/tuần/tháng
  const handleNavigate = (type: "prev" | "today" | "next") => {
    if (calendarView === "day") {
      if (type === "prev") setCalendarDate((prev) => subDays(prev, 1));
      else if (type === "next") setCalendarDate((prev) => addDays(prev, 1));
      else setCalendarDate(new Date());
    } else if (calendarView === "week") {
      if (type === "prev") setCalendarDate((prev) => subWeeks(prev, 1));
      else if (type === "next") setCalendarDate((prev) => addWeeks(prev, 1));
      else setCalendarDate(new Date());
    } else {
      if (type === "prev") setCalendarDate((prev) => subMonths(prev, 1));
      else if (type === "next") setCalendarDate((prev) => addMonths(prev, 1));
      else setCalendarDate(new Date());
    }
  };

  let viewTitle = "";
  if (calendarView === "day") viewTitle = format(calendarDate, "dd/MM/yyyy");
  else if (calendarView === "week") {
    const start = startOfWeek(calendarDate, { weekStartsOn: 1 });
    const end = addDays(start, 6);
    viewTitle = `Tuần ${format(start, "dd/MM")} - ${format(end, "dd/MM/yyyy")}`;
  } else viewTitle = format(calendarDate, "MM/yyyy");

  if (scheduleLoading) return <Loading />;

  return (
    <div className="p-4 md:p-6 bg-gradient-to-br from-blue-50 to-white rounded-2xl shadow-xl">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-2">
        <div>
          <h2 className="text-2xl md:text-3xl font-extrabold text-blue-700 mb-1 flex items-center gap-2">
            <FaCalendarAlt className="text-blue-500" /> Lịch đặt dịch vụ
          </h2>
        </div>
        {/* Header điều hướng calendar */}
        <div className="flex items-center gap-2 mt-2 md:mt-0">
          <button
            onClick={() => handleNavigate("prev")}
            className="p-2 rounded hover:bg-blue-100 text-blue-600 border border-blue-100"
          >
            <FaChevronLeft />
          </button>
          <button
            onClick={() => handleNavigate("today")}
            className="px-3 py-2 rounded bg-blue-600 text-white font-semibold hover:bg-blue-700"
          >
            Hôm nay
          </button>
          <button
            onClick={() => handleNavigate("next")}
            className="p-2 rounded hover:bg-blue-100 text-blue-600 border border-blue-100"
          >
            <FaChevronRight />
          </button>
          <span className="ml-4 font-bold text-blue-700 text-lg">
            {viewTitle}
          </span>
          <div className="ml-4 flex gap-1">
            {viewOptions.map((opt) => (
              <button
                key={opt.key}
                className={`flex items-center gap-1 px-3 py-2 rounded border font-semibold transition-colors ${calendarView === opt.key
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-white text-blue-600 border-blue-200 hover:bg-blue-50"
                  }`}
                onClick={() => setCalendarView(opt.key as View)}
              >
                {opt.icon} {opt.label}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-3/5 w-full min-w-0 bg-white rounded-xl shadow p-4">
          <Calendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            style={{ height: 600 }}
            eventPropGetter={eventPropGetter}
            components={{ event: EventComponent, toolbar: CustomToolbar }}
            messages={{
              next: "Sau",
              previous: "Trước",
              today: "Hôm nay",
              month: "Tháng",
              week: "Tuần",
              day: "Ngày",
              agenda: "Danh sách",
            }}
            view={calendarView}
            onView={setCalendarView}
            date={calendarDate}
            onNavigate={setCalendarDate}
          />
        </div>
        {/* Danh sách booking bên phải */}
        <div className="lg:w-2/5 w-full bg-white rounded-xl shadow p-4 h-[600px] overflow-y-auto flex flex-col">
          <BookingList
            bookings={filteredEvents}
            calendarView={calendarView}
            calendarDate={calendarDate}
            viewTitle={viewTitle}
          />
        </div>
      </div>
    </div>
  );
};

export default SupplierSchedule;
