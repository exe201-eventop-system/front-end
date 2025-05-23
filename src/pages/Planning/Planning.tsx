import BackgroundSession from "./component/BackgroundSession";
import EventTabs from "../Planning/component/EventTabs";
import Button from "../../components/Button";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import CreateEventModal from "./component/CreateEventModal";
const Planning = () => {
  const location = useLocation();
  const activeTab = location.pathname;
  const [showModal, setShowModal] = useState(false);
  return (
    <div>
      <div className="h-[50vh]">
        <BackgroundSession />
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="relative mb-6 h-10 flex items-center justify-center">
          <h2 className="text-xl font-bold">Lập Kế Hoạch Sự Kiện</h2>
          <div className="absolute right-0">
            <Button
              isActive={activeTab.includes("planning")}
              onClick={() => {
                console.log("Open modal");
                setShowModal(true);
              }}
            >
              Thêm sự kiện
            </Button>

            <CreateEventModal
              isOpen={showModal}
              onClose={() => setShowModal(false)}
            />
          </div>
        </div>

        <EventTabs />
      </div>
    </div>
  );
};

export default Planning;
