import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import { useLocation } from "react-router-dom";
import Button from "../../components/ui/Button";
import CreateEventModal from "./component/CreateEventModal";
import EventTabs from "./component/EventTabs";
import BackgroundSession from "./component/BackgroundSession";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../features/store";
import { closePlanningModal, openPlanningModal } from "../../features/Planning/planningSlice";
import { getPlanning, getNumberPlaning, acceptAIPlanning } from "../../features/Planning/planningThunks";
import { Dialog } from '@headlessui/react';
import { generatePlanning } from "../../features/Cart/cartThunk";
import { toast } from "react-toastify";

const Planning = () => {
  const dispatch = useDispatch<AppDispatch>();
  const location = useLocation();
  const { isPlanningModalOpen, totalOfPlannings } = useSelector((state: RootState) => state.planning);
  const [isAIModalOpen, setAIModalOpen] = useState(false);
  const [aiPrompt, setAIPrompt] = useState('');
  const [aiResult, setAIResult] = useState<any>(null);
  const [aiLoading, setAILoading] = useState(false);
  const [acceptingPlanning, setAcceptingPlanning] = useState(false);

  useEffect(() => {
    dispatch(getPlanning({}));
    dispatch(getNumberPlaning());
  }, [dispatch]);

  // Kiểm tra URL parameters để mở modal AI
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const openAI = urlParams.get('openAI');

    if (openAI === 'true') {
      setAIModalOpen(true);
      // Xóa parameter khỏi URL để tránh mở lại khi refresh
      const newUrl = new URL(window.location.href);
      newUrl.searchParams.delete('openAI');
      window.history.replaceState({}, '', newUrl.toString());
    }
  }, [location.search]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-purple-50 to-purple-100">
      {/* Hero Section */}
      <div className="relative h-[35vh] overflow-hidden">
        <BackgroundSession />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/40 backdrop-blur-sm">
          <div className="container mx-auto px-4 h-full flex flex-col justify-center ">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 mt-10">
                Lập Kế Hoạch Sự Kiện
              </h1>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 -mt-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-10"
        >
          {/* Event List Section */}
          <div className="bg-gray-50 rounded-xl p-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
              <div className="flex items-center gap-3">
                <h2 className="text-xl font-bold text-gray-800">Danh sách sự kiện</h2>
                <span className="bg-purple-100 text-purple-600 px-3 py-1 rounded-full text-sm font-medium">
                  {totalOfPlannings} sự kiện
                </span>
              </div>
              <div className="flex gap-5">
                <Button
                  color="purple-white"
                  isActive={true}
                  onClick={() => dispatch(openPlanningModal())}
                >
                  <div className="flex items-center gap-2">
                    <Plus className="w-5 h-5" />
                    Tạo Sự Kiện Mới
                  </div>
                </Button>
                <Button
                  color="purple-white"
                  isActive={true}
                  onClick={() => setAIModalOpen(true)}
                >
                  <div className="flex items-center gap-2">
                    <span role="img" aria-label="ai">🤖</span>
                    Tạo kế hoạch AI
                  </div>
                </Button>
              </div>
            </div>
            {/* Danh sách planning và thao tác CRUD */}
            <EventTabs />
          </div>
        </motion.div>
      </div>

      {/* Create/Edit Event Modal */}
      <CreateEventModal
        isOpen={isPlanningModalOpen}
        onClose={() => dispatch(closePlanningModal())}
      />

      {/* Modal AI Generate Planning */}
      <Dialog open={isAIModalOpen} onClose={() => setAIModalOpen(false)} className="fixed z-50 inset-0 overflow-y-auto">
        <div className="flex items-center justify-center min-h-screen px-4">
          <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
          <div className="relative bg-white rounded-2xl shadow-xl max-w-lg w-full mx-auto p-6 z-10">
            <Dialog.Title className="text-xl font-bold mb-2 text-purple-700 flex items-center gap-2">
              <span role="img" aria-label="ai">🤖</span> Tạo kế hoạch AI
            </Dialog.Title>
            {!aiResult ? (
              <>
                <p className="mb-4 text-gray-600">Nhập mô tả sự kiện bạn muốn AI lập kế hoạch (ví dụ: "Tổ chức tiệc cưới 200 khách ngoài trời...")</p>
                <textarea
                  className="w-full border border-gray-300 rounded-lg p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-purple-400"
                  rows={3}
                  value={aiPrompt}
                  onChange={e => setAIPrompt(e.target.value)}
                  placeholder="Nhập yêu cầu cho AI..."
                  disabled={aiLoading}
                />
                <div className="flex justify-end gap-2">
                  <Button color="purple-white" onClick={() => setAIModalOpen(false)} disabled={aiLoading}>Huỷ</Button>
                  <Button
                    color="purple-white"
                    isActive={true}
                    onClick={async () => {
                      setAILoading(true);
                      try {
                        const result = await dispatch(generatePlanning(aiPrompt)).unwrap();
                        setAIResult(result.data || result);
                      } catch (err) {
                        console.error("Lỗi khi tạo kế hoạch AI:", err);
                      }
                      setAILoading(false);
                    }}
                    disabled={aiLoading || !aiPrompt.trim()}
                  >
                    {aiLoading ? 'Đang tạo...' : 'Tạo kế hoạch'}
                  </Button>
                </div>
              </>
            ) : (
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-purple-700 flex items-center gap-2 mb-2">
                  <span role="img" aria-label="plan">📝</span>
                  {aiResult.name || "Kế hoạch AI"}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
                  {aiResult.location && (
                    <div className="flex items-center gap-2">
                      <span role="img" aria-label="location">📍</span>
                      <span><b>Địa điểm:</b> {aiResult.location}</span>
                    </div>
                  )}
                  {aiResult.dateOfEvent && (
                    <div className="flex items-center gap-2">
                      <span role="img" aria-label="calendar">📅</span>
                      <span><b>Ngày tổ chức:</b> {aiResult.dateOfEvent.slice(0, 10)}</span>
                    </div>
                  )}
                  {aiResult.budget > 0 && (
                    <div className="flex items-center gap-2">
                      <span role="img" aria-label="budget">💰</span>
                      <span><b>Ngân sách:</b> {aiResult.budget.toLocaleString()} VND</span>
                    </div>
                  )}
                  {aiResult.mainColor && (
                    <div className="flex items-center gap-2">
                      <span role="img" aria-label="color">🎨</span>
                      <span><b>Màu chủ đạo:</b> {aiResult.mainColor}</span>
                    </div>
                  )}
                  {typeof aiResult.aboutNumberPeople === 'number' && aiResult.aboutNumberPeople > 0 && (
                    <div className="flex items-center gap-2">
                      <span role="img" aria-label="people">👥</span>
                      <span><b>Số lượng khách:</b> {aiResult.aboutNumberPeople}</span>
                    </div>
                  )}
                  {aiResult.typeOfEvent && (
                    <div className="flex items-center gap-2">
                      <span role="img" aria-label="event">🎊</span>
                      <span><b>Loại sự kiện:</b> {aiResult.typeOfEvent}</span>
                    </div>
                  )}
                  {typeof aiResult.status !== 'undefined' && (
                    <div className="flex items-center gap-2">
                      <span role="img" aria-label="status">📌</span>
                      <span><b>Trạng thái:</b> {aiResult.status === 0 ? 'Chờ xác nhận' : aiResult.status === 1 ? 'Đang diễn ra' : 'Hoàn thành'}</span>
                    </div>
                  )}
                </div>
                {aiResult.description && (
                  <div>
                    <div className="font-semibold text-gray-800 mb-1 flex items-center gap-2">
                      <span role="img" aria-label="desc">📝</span> Mô tả kế hoạch
                    </div>
                    <div className="bg-gray-50 rounded-lg p-3 whitespace-pre-line border border-purple-100 text-gray-700">
                      {aiResult.description}
                    </div>
                  </div>
                )}
                <div className="flex justify-end gap-2 mt-4">
                  <Button color="purple-white" onClick={() => { setAIModalOpen(false); setAIResult(null); setAIPrompt(''); }}>Đóng</Button>
                  <Button
                    color="purple-white"
                    isActive={true}
                    onClick={async () => {
                      if (!aiResult?.id) {
                        console.error("Không có ID planning để accept");
                        return;
                      }
                      setAcceptingPlanning(true);
                      try {
                        await dispatch(acceptAIPlanning({ planningId: aiResult.id })).unwrap();
                        toast.success("Đã thêm kế hoạch AI vào danh sách thành công!");
                        setAIModalOpen(false);
                        setAIResult(null);
                        setAIPrompt('');
                        // Refresh danh sách planning
                        dispatch(getPlanning({}));
                        dispatch(getNumberPlaning());
                      } catch (err) {
                        console.error("Lỗi khi accept planning:", err);
                        toast.error("Thêm kế hoạch thất bại!");
                      } finally {
                        setAcceptingPlanning(false);
                      }
                    }}
                    disabled={acceptingPlanning}
                  >
                    {acceptingPlanning ? 'Đang thêm...' : 'Thêm vào danh sách kế hoạch'}
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default Planning;

