import { PlaningResponse } from "../../../types/Planning.type";


const EventList = ({ events }: { events: PlaningResponse[] }) => {
  console.log("Eventssadsasadsa: ", events); // thêm dòng này trước khi render

  return (
    <ul className="space-y-3 mt-4">
      
      {events.map((event) => (
        <li
          key={event.id}
          className="p-4 border rounded-lg bg-white shadow hover:shadow-md transition"
        >
          <h3 className="text-lg font-semibold text-gray-800">{event.name}</h3>
          <p className="text-sm text-gray-500">
            Ngày tổ chức: {event.dateOfEvent}
          </p>
        </li>
      ))}
    </ul>
  );
};

export default EventList;
