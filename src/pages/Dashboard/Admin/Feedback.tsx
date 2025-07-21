import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../features/store";
import { useEffect, useState } from "react";
import { getFeedbackSystem } from "../../../features/Cart/cartThunk";
import { selectFeedbacks, selectFeedbackLoading, selectFeedbackError } from "../../../features/Cart/feedbackSlice";

const Feedback = () => {
    const dispatch = useDispatch<AppDispatch>();
    const feedbacks = useSelector(selectFeedbacks);
    const loading = useSelector(selectFeedbackLoading);
    const error = useSelector(selectFeedbackError);
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    useEffect(() => {
        dispatch(getFeedbackSystem());
    }, [dispatch]);

    const handleToggle = (idx: number) => {
        setOpenIndex(openIndex === idx ? null : idx);
    };

    return (
        <div className="w-full bg-white p-6 rounded-xl shadow-sm">
            <h2 className="text-xl font-bold mb-4">Phản hồi khách hàng</h2>
            {error && <div className="text-red-500 mb-2">{error}</div>}
            {loading && <div>Đang tải...</div>}
            <div className="space-y-4">
                {feedbacks.length === 0 && !loading && <div>Không có phản hồi nào.</div>}
                {feedbacks.map((q: any, idx: number) => (
                    <div key={q.question_id} className="border rounded-lg">
                        <button
                            className="w-full flex justify-between items-center px-4 py-3 text-left focus:outline-none focus:ring"
                            onClick={() => handleToggle(idx)}
                        >
                            <span className="font-semibold text-gray-800">{q.question_text}</span>
                            <span className="ml-2 text-gray-500">{openIndex === idx ? '▲' : '▼'}</span>
                        </button>
                        {openIndex === idx && (
                            <div className="px-6 pb-4">
                                {q.answers && q.answers.length > 0 ? (
                                    <ul className="space-y-2 mt-2">
                                        {q.answers.map((ans: any, ansIdx: number) => (
                                            <li key={ans.user_id + ansIdx} className="border-b last:border-b-0 pb-2">
                                                <span className="font-medium text-blue-700">{ans.username}:</span> <span className="text-gray-700">{ans.answer_text}</span>
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <div className="text-gray-400 italic">Chưa có phản hồi cho câu hỏi này.</div>
                                )}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
export default Feedback;