import { useState } from "react";

const TOPICS = ["Event", "Wedding", "Birthday", "Conference"];
const STYLES = ["Search", "Modern", "Classic", "Minimal"];

export default function AIPlanning() {
    const [form, setForm] = useState({
        title: "",
        topic: TOPICS[0],
        budget: "",
        style: STYLES[0],
        mainColor: "",
        time: "10:00",
        ampm: "AM",
        date: "",
        describe: ""
    });
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<any>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setResult(null);

        // Thay thế bằng Hugging Face API Token của bạn sau khi đăng ký tại huggingface.co
        // Cần giữ bí mật API Token này!
        const apiToken = "12341234";
        // Endpoint cho một mô hình text generation trên Hugging Face (có thể thay đổi model_id)
        // Ví dụ: gpt2, microsoft/DialoGPT-large, bigscience/bloom-560m...
        const modelId = "sshleifer/tiny-gpt2"; // Thử model nhỏ khác
        const apiUrl = `https://api-inference.huggingface.co/models/${modelId}`;

        const promptText = `Tạo một kế hoạch và gợi ý dịch vụ cho sự kiện sau:\nTiêu đề: ${form.title}\nChủ đề: ${form.topic}\nNgân sách: ${form.budget}\nPhong cách: ${form.style}\nMàu chủ đạo: ${form.mainColor}\nThời gian: ${form.time} ngày ${form.date}\nMô tả: ${form.describe}\n\nKế hoạch chi tiết:\n[PLAN_START]\n\n## Dịch vụ gợi ý:\n[SERVICES_START]\n- `; // Sử dụng dấu hiệu đặc biệt để tách Plan và Services

        try {
            const response = await fetch(apiUrl, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${apiToken}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    inputs: promptText,
                    // Các tùy chọn khác (tùy chọn model)
                    parameters: {
                        max_new_tokens: 500, // Giới hạn độ dài phản hồi
                        // temperature: 0.7, // Độ ngẫu nhiên (0-1)
                        // Add other parameters as needed by the model
                    }
                }),
            });

            const data = await response.json();

            // Hugging Face Inference API trả về mảng, kết quả là property 'generated_text' của object đầu tiên
            if (response.ok && data && Array.isArray(data) && data.length > 0 && data[0].generated_text) {
                const rawOutput = data[0].generated_text;
                const planEndIndex = rawOutput.indexOf("## Dịch vụ gợi ý:");

                let plan = rawOutput;
                let services: string[] = [];

                if (planEndIndex !== -1) {
                    plan = rawOutput.substring(0, planEndIndex).trim();
                    const servicesRaw = rawOutput.substring(planEndIndex + "## Dịch vụ gợi ý:".length).trim();
                    // Tách các dịch vụ theo dòng, giả định mỗi dịch vụ là một dòng hoặc bắt đầu bằng gạch đầu dòng
                    services = servicesRaw.split('\n').map((line: string) => line.trim()).filter((line: string) => line.length > 0);
                    // Loại bỏ ký tự gạch đầu dòng nếu có
                    services = services.map((s: string) => s.startsWith('- ') ? s.substring(2).trim() : s);
                } else {
                    // Nếu không tìm thấy dấu hiệu, coi toàn bộ là kế hoạch và thêm gợi ý dịch vụ chung chung
                    services = ["Kiểm tra lại thông tin form.", "Thêm mô tả chi tiết hơn.", "Hãy thử mô tả chi tiết hơn hoặc dùng model khác."];
                }
                // Loại bỏ dấu hiệu [PLAN_START] và [SERVICES_START] khỏi kế hoạch nếu còn sót
                plan = plan.replace('[PLAN_START]', '').replace('[SERVICES_START]', '').trim();

                setResult({ plan: plan, services: services });

            } else {
                // Xử lý các lỗi cụ thể từ Hugging Face API nếu có
                const errorMessage = data?.error || response.statusText;
                setResult({ plan: `Không nhận được phản hồi hợp lệ từ AI hoặc API lỗi: ${errorMessage}`, services: [] });
            }

        } catch (err) {
            console.error("Error calling Hugging Face API:", err);
            setResult({ plan: "Đã xảy ra lỗi khi gọi API AI.", services: [] });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-white flex flex-col items-center py-10 px-2">
            <h1 className="text-4xl font-bold mb-8 text-center">AI Planning</h1>
            <form onSubmit={handleSubmit} className="w-full max-w-4xl bg-white rounded-xl shadow-lg p-8 border border-gray-100">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                    <div>
                        <label className="block font-medium mb-1">Title</label>
                        <input name="title" value={form.title} onChange={handleChange} className="w-full border rounded px-3 py-2" placeholder="Enter your title" />
                    </div>
                    <div>
                        <label className="block font-medium mb-1">Topic</label>
                        <select name="topic" value={form.topic} onChange={handleChange} className="w-full border rounded px-3 py-2">
                            {TOPICS.map(t => <option key={t}>{t}</option>)}
                        </select>
                    </div>
                    <div>
                        <label className="block font-medium mb-1">Budget Limit</label>
                        <input name="budget" value={form.budget} onChange={handleChange} className="w-full border rounded px-3 py-2" placeholder="10.000.000" />
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                    <div>
                        <label className="block font-medium mb-1">Style</label>
                        <select name="style" value={form.style} onChange={handleChange} className="w-full border rounded px-3 py-2">
                            {STYLES.map(s => <option key={s}>{s}</option>)}
                        </select>
                    </div>
                    <div>
                        <label className="block font-medium mb-1">Main Color</label>
                        <input name="mainColor" value={form.mainColor} onChange={handleChange} className="w-full border rounded px-3 py-2" placeholder="Enter your main color" />
                    </div>
                    <div className="flex gap-2 items-end">
                        <div>
                            <label className="block font-medium mb-1">Time</label>
                            <input name="time" type="time" value={form.time} onChange={handleChange} className="border rounded px-3 py-2 w-full" />
                        </div>
                        <div>
                            <label className="block font-medium mb-1">Date</label>
                            <input name="date" type="date" value={form.date} onChange={handleChange} className="border rounded px-3 py-2 w-full" />
                        </div>
                    </div>
                </div>
                <div className="mb-6">
                    <label className="block font-medium mb-1">Describe</label>
                    <textarea name="describe" value={form.describe} onChange={handleChange} className="w-full border rounded px-3 py-2 min-h-[100px]" placeholder="Select any thing with ease of time" />
                </div>
                <button type="submit" className="bg-purple-600 text-white px-8 py-3 rounded hover:bg-purple-700 transition-colors" disabled={loading}>
                    {loading ? "Đang tạo kế hoạch..." : "Tạo kế hoạch với AI"}
                </button>
            </form>
            {result && (
                <div className="w-full max-w-4xl mt-8 bg-purple-50 rounded-xl shadow p-6 border border-purple-100">
                    <h2 className="text-2xl font-bold mb-4 text-purple-700">Kế hoạch AI đề xuất</h2>
                    <p className="mb-4">{result.plan}</p>
                    {result.services.length > 0 && (
                        <>
                            <h3 className="font-semibold mb-2">Gợi ý dịch vụ:</h3>
                            <ul className="list-disc pl-6">
                                {result.services.map((s: string, i: number) => <li key={i}>{s}</li>)}
                            </ul>
                        </>
                    )}
                </div>
            )}
        </div>
    );
} 