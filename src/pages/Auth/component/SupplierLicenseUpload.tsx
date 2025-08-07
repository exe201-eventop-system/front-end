import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import logo from "../../../assets/logo.png";
import { UploadLicenseSupplier } from "../../../features/Supplier/supplierThunks";
import { SignUpLicenseSupplierDTO } from "../../../types/Supplier/Supplier.type";
import type { AppDispatch } from "../../../features/store";

interface SupplierLicenseUploadProps {
    supplierId: string;
    onSwitch: () => void;
    onComplete: () => void;
}

const SupplierLicenseUpload = ({ supplierId, onSwitch, onComplete }: SupplierLicenseUploadProps) => {
    const dispatch = useDispatch<AppDispatch>();
    const [status, setStatus] = useState<"idle" | "pending" | "success" | "error">("idle");
    const [errorMessage, setErrorMessage] = useState<string>("");

    const [businessLicense, setBusinessLicense] = useState<File | null>(null);
    const [thumbnail, setThumbnail] = useState<File | null>(null);
    const [formFiles, setFormFiles] = useState<File[]>([]);

    const handleBusinessLicenseChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setBusinessLicense(file);
        }
    };

    const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setThumbnail(file);
        }
    };

    const handleFormFilesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);
        setFormFiles(files);
    };

    const onSubmit = async () => {
        if (!businessLicense || !thumbnail) {
            setErrorMessage("Vui lòng chọn đầy đủ các file bắt buộc");
            return;
        }

        setStatus("pending");
        setErrorMessage("");

        try {
            const payload: SignUpLicenseSupplierDTO = {
                id: supplierId,
                businessLicense,
                thumnnail: thumbnail,
                formFiles,
            };

            console.log("Sending license upload payload:", payload);

            const result = await dispatch(UploadLicenseSupplier(payload));

            if (UploadLicenseSupplier.fulfilled.match(result)) {
                console.log("License upload successful:", result.payload);
                setStatus("success");
                onComplete();
            } else {
                console.error("License upload failed:", result.error);
                setStatus("error");
                const errorMessage = result.payload || "Upload license thất bại";
                setErrorMessage(errorMessage);
            }
        } catch (error) {
            console.error("License upload error:", error);
            setStatus("error");
            setErrorMessage(
                "Lỗi kết nối: " + (error as Error).message || "Không thể kết nối đến server"
            );
        }
    };

    return (
        <div className="text-white max-w-md mx-auto border-none">
            <Link to="/" className="flex justify-center">
                <div className="text-xl font-bold flex items-center space-x-2">
                    <img src={logo} alt="logo" className="h-6" />
                    <span>EvenTop</span>
                </div>
            </Link>

            <h2 className="text-2xl font-bold mb-4 text-center">Đăng ký thông tin nhà cung cấp</h2>
            <div className="space-y-6">
                {/* Business License */}
                <div>
                    <label className="block text-sm font-medium mb-2">
                        Giấy phép kinh doanh <span className="text-red-400">*</span>
                    </label>
                    <input
                        type="file"
                        accept="image/*,.pdf"
                        onChange={handleBusinessLicenseChange}
                        className="w-full text-black bg-white p-2 rounded-lg border border-white/20 focus:outline-none focus:border-none focus:ring-0 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-fuchsia-500 file:text-white hover:file:bg-fuchsia-600"
                    />
                    {businessLicense && (
                        <p className="text-sm text-green-400 mt-1">
                            Đã chọn: {businessLicense.name}
                        </p>
                    )}
                </div>

                {/* Thumbnail */}
                <div>
                    <label className="block text-sm font-medium mb-2">
                        Ảnh đại diện tổ chức <span className="text-red-400">*</span>
                    </label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleThumbnailChange}
                        className="w-full text-black bg-white p-2 rounded-lg border border-white/20 focus:outline-none focus:border-none focus:ring-0 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-fuchsia-500 file:text-white hover:file:bg-fuchsia-600"
                    />
                    {thumbnail && (
                        <p className="text-sm text-green-400 mt-1">
                            Đã chọn: {thumbnail.name}
                        </p>
                    )}
                </div>

                {/* Form Files */}
                <div>
                    <label className="block text-sm font-medium mb-2">
                        Câc hình ảnh về tổ chức
                    </label>
                    <input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleFormFilesChange}
                        className="w-full text-black bg-white p-2 rounded-lg border border-white/20 focus:outline-none focus:border-none focus:ring-0 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-fuchsia-500 file:text-white hover:file:bg-fuchsia-600"
                    />
                    {formFiles.length > 0 && (
                        <div className="mt-2">
                            <p className="text-sm text-green-400 mb-1">
                                Đã chọn {formFiles.length} file:
                            </p>
                            <ul className="text-xs text-gray-300 space-y-1">
                                {formFiles.map((file, index) => (
                                    <li key={index}>{file.name}</li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            </div>

            <button
                onClick={onSubmit}
                className="w-full bg-gradient-to-r from-fuchsia-500 to-cyan-400 py-3 rounded-lg font-semibold hover:opacity-90 transition mt-6"
                disabled={status === "pending" || !businessLicense || !thumbnail}
            >
                {status === "pending" ? "Đang upload..." : "Hoàn tất đăng ký"}
            </button>

            {errorMessage && (
                <div className="text-center text-red-500 text-sm mt-2">
                    {errorMessage}
                </div>
            )}

            <p className="mt-4 text-sm text-black/35 text-center">
                Bạn đã có tài khoản?{" "}
                <button onClick={onSwitch} className="underline">
                    Đăng nhập
                </button>
            </p>
        </div>
    );
};

export default SupplierLicenseUpload;
