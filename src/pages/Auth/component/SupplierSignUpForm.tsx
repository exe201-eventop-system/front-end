import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import logo from "../../../assets/logo.png";
import { SignUpSupplier } from "../../../features/Supplier/supplierThunks";
import { SignUpSupplierDTO } from "../../../types/Supplier/Supplier.type";
import { supplierSignUpSchema, SupplierSignUpFormData } from "../../../features/Auth/validation/supplierSignUpSchema";
import type { AppDispatch } from "../../../features/store";

interface SupplierSignUpFormProps {
    onSwitch: () => void;
    onStep1Success: (supplierId: string) => void;
}

const SupplierSignUpForm = ({ onSwitch, onStep1Success }: SupplierSignUpFormProps) => {
    const dispatch = useDispatch<AppDispatch>();
    const [status, setStatus] = useState<"idle" | "pending" | "success" | "error">("idle");
    const [errorMessage, setErrorMessage] = useState<string>("");

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(supplierSignUpSchema),
    });

    const onSubmit = async (data: SupplierSignUpFormData) => {
        setStatus("pending");
        setErrorMessage("");

        try {
            const payload: SignUpSupplierDTO = {
                email: data.email,
                phoneNumber: data.phoneNumber,
                location: data.location,
                nameOrganization: data.nameOrganization,
                taxCode: data.taxCode,
                description: data.description || undefined,
                about: data.about || undefined,
            };

            console.log("Sending supplier signup payload:", payload);

            const result = await dispatch(SignUpSupplier(payload));

            if (SignUpSupplier.fulfilled.match(result)) {
                console.log("Supplier signup successful:", result.payload);
                setStatus("success");
                // Extract the supplier ID from the response
                const supplierId = typeof result.payload === 'string' ? result.payload : result.payload.data || '';
                onStep1Success(supplierId);
            } else {
                console.error("Supplier signup failed:", result.error);
                setStatus("error");
                const errorMessage = result.payload || "Đăng ký supplier thất bại";
                setErrorMessage(errorMessage);
            }
        } catch (error) {
            console.error("Supplier registration error:", error);
            setStatus("error");
            setErrorMessage(
                "Lỗi kết nối: " + (error as Error).message || "Không thể kết nối đến server"
            );
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="text-white max-w-md mx-auto border-none">
                <Link to="/" className="flex justify-center">
                    <div className="text-xl font-bold flex items-center space-x-2">
                        <img src={logo} alt="logo" className="h-6" />
                        <span>EvenTop</span>
                    </div>
                </Link>

                <h2 className="text-2xl font-bold mb-4 text-center">Đăng ký thông tin nhà cung cấp</h2>

                <div className="mb-4">
                    <input
                        {...register("email")}
                        type="email"
                        placeholder="Email"
                        className="w-full text-black bg-white p-2 rounded-lg border border-white/20 focus:outline-none focus:border-none focus:ring-0"
                    />
                    {errors.email && (
                        <p className="text-red-400 text-sm mt-2">{errors.email.message}</p>
                    )}
                </div>

                <div className="mb-4">
                    <input
                        {...register("phoneNumber")}
                        type="tel"
                        placeholder="Số điện thoại"
                        className="w-full text-black bg-white p-2 rounded-lg border border-white/20 focus:outline-none focus:border-none focus:ring-0"
                    />
                    {errors.phoneNumber && (
                        <p className="text-red-400 text-sm mt-2">{errors.phoneNumber.message}</p>
                    )}
                </div>

                <div className="mb-4">
                    <input
                        {...register("nameOrganization")}
                        type="text"
                        placeholder="Tên tổ chức"
                        className="w-full text-black bg-white p-2 rounded-lg border border-white/20 focus:outline-none focus:border-none focus:ring-0"
                    />
                    {errors.nameOrganization && (
                        <p className="text-red-400 text-sm mt-2">{errors.nameOrganization.message}</p>
                    )}
                </div>

                <div className="mb-4">
                    <input
                        {...register("taxCode")}
                        type="text"
                        placeholder="Mã số thuế"
                        className="w-full text-black bg-white p-2 rounded-lg border border-white/20 focus:outline-none focus:border-none focus:ring-0"
                    />
                    {errors.taxCode && (
                        <p className="text-red-400 text-sm mt-2">{errors.taxCode.message}</p>
                    )}
                </div>

                <div className="mb-4">
                    <textarea
                        {...register("location")}
                        placeholder="Địa chỉ"
                        rows={3}
                        className="w-full text-black bg-white p-2 rounded-lg border border-white/20 focus:outline-none focus:border-none focus:ring-0 resize-none"
                    />
                    {errors.location && (
                        <p className="text-red-400 text-sm mt-2">{errors.location.message}</p>
                    )}
                </div>

                <div className="mb-4">
                    <textarea
                        {...register("description")}
                        placeholder="Mô tả (tùy chọn)"
                        rows={3}
                        className="w-full text-black bg-white p-2 rounded-lg border border-white/20 focus:outline-none focus:border-none focus:ring-0 resize-none"
                    />
                    {errors.description && (
                        <p className="text-red-400 text-sm mt-2">{errors.description.message}</p>
                    )}
                </div>

                <div className="mb-6">
                    <textarea
                        {...register("about")}
                        placeholder="Thông tin thêm (tùy chọn)"
                        rows={4}
                        className="w-full text-black bg-white p-2 rounded-lg border border-white/20 focus:outline-none focus:border-none focus:ring-0 resize-none"
                    />
                    {errors.about && (
                        <p className="text-red-400 text-sm mt-2">{errors.about.message}</p>
                    )}
                </div>

                <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-fuchsia-500 to-cyan-400 py-3 rounded-lg font-semibold hover:opacity-90 transition"
                    disabled={status === "pending"}
                >
                    {status === "pending" ? "Đang đăng ký..." : "Tiếp tục"}
                </button>

                {errorMessage && (
                    <div className="text-center text-red-500 text-sm mt-2">
                        {errorMessage}
                    </div>
                )}
            </div>

            <p className="mt-4 text-sm text-black/35 text-center">
                Bạn đã có tài khoản?{" "}
                <button onClick={onSwitch} className="underline">
                    Đăng nhập
                </button>
            </p>
        </form>
    );
};

export default SupplierSignUpForm;
