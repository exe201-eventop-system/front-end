// scheduleThunk.ts
import { createAsyncThunk } from "@reduxjs/toolkit";
import { createGetThunk, createPostThunk } from "../genericsCreateThunk";
import { ProcessRequestInspectorDTO, ScheduleSupplier, SignUpLicenseSupplierDTO, SignUpSupplierDTO, SupplierProfileDTO } from "../../types/Supplier/Supplier.type";
import { SupplierDetailDTO, SupplierRatingDetailDto, Suppliers, SuppliersRating } from "../../types/Supplier/Suppliers.type";
import { SupplierFilter } from "../../types/Supplier/SupplierFilter.type";
import { PaginationResult } from "../../types/Generict/PaginationResult.type";
import { GenericResponse } from "../../types/Generict/GenerictResponse";
import axiosInstance from "../../utils/api/axiosInstance";

// Lấy danh sách schedule của supplier
export const getScheduleSupplier = createGetThunk<ScheduleSupplier[], void>(
    "schedule/supplier", // action name
    "used-service/schedule-supplier",
);

// Nếu bạn muốn thêm 1 API để lấy chi tiết 1 schedule
export const getScheduleDetail = createGetThunk<ScheduleSupplier, { scheduleId: string }>(
    "schedule/detail",
    "schedule",
    {
        buildUrl: (payload) => `schedule/${payload.scheduleId}`,
    }
);
export const getSupplier = createGetThunk<Suppliers[], void>(
    "supplier/supplier", // action name
    "auth/supplier",
);
export const getSuppliersRating = createGetThunk<SuppliersRating[], void>(
    "supplier/supplier-rating",
    "suppliers/by-rating",
);
export const getSuppliersDetail = createGetThunk<SupplierDetailDTO, { id: string }>(
    "supplier/detail",
    "supplier/detail",
    {
        buildUrl: (payload) => `suppliers/detail/${payload.id}`,
    }
);
export const getSuppliersDetailRating = createGetThunk<SupplierRatingDetailDto, { supplier_id: string }>(
    "supplier/detail-rating",
    "supplier/detail-rating",
    {
        buildUrl: (payload) => `feedback/supplier/${payload.supplier_id}`,
    }
);
export const getSuppliers = createGetThunk<PaginationResult<Suppliers>, SupplierFilter>(
    "supplier/supplier",
    "auth/suppliers",
    {
        buildUrl: (params) => {
            const query = new URLSearchParams();

            query.append("page", (params.page_number ?? 1).toString());
            query.append("page_size", (params.page_size ?? 12).toString());

            if (params.search_key) query.append("search", params.search_key);
            if (params.address) query.append("address", params.address);

            return `suppliers?${query.toString()}`;
        },
    }
);
export const SignUpSupplier = createPostThunk<string, SignUpSupplierDTO>(
    "supplier/sign-up",
    "suppliers/sign-up",
);
// Custom thunk for upload license with FormData
export const UploadLicenseSupplier = createAsyncThunk<
    GenericResponse<boolean>,
    SignUpLicenseSupplierDTO,
    { rejectValue: string }
>(
    "suppliers/sign-up/update-license",
    async (payload, { rejectWithValue }) => {
        try {
            const formData = new FormData();
            formData.append("id", payload.id);
            formData.append("businessLicense", payload.businessLicense);
            formData.append("thumnnail", payload.thumnnail);

            // Append multiple files
            payload.formFiles.forEach((file) => {
                formData.append("formFiles", file);
            });

            const config = {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            };

            const res = await axiosInstance.post<GenericResponse<boolean>>(
                "suppliers/sign-up/update-license",
                formData,
                config
            );

            return res.data;
        } catch (err) {
            const error = err as unknown as {
                response?: { data?: { message?: string } };
            };
            const message = error.response?.data?.message || "Upload license failed";
            console.error(message);
            return rejectWithValue(message);
        }
    }
);
export const GetListSupplierNotAccept = createGetThunk<SupplierProfileDTO[], void>(
    "supplier/process-request",
    "suppliers/process-request",
);
// Custom thunk for process supplier with FormData
export const ProcessSupplier = createAsyncThunk<
    GenericResponse<boolean>,
    ProcessRequestInspectorDTO,
    { rejectValue: string }
>(
    "suppliers/process-request/1",
    async (payload, { rejectWithValue }) => {
        try {
            const formData = new FormData();
            formData.append("id", payload.id);
            formData.append("isAccept", payload.isAccept.toString());

            // Only append contract if accepting
            if (payload.isAccept && payload.contract) {
                formData.append("contract", payload.contract);
            }

            const config = {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            };

            const res = await axiosInstance.post<GenericResponse<boolean>>(
                "suppliers/process-request",
                formData,
                config
            );

            return res.data;
        } catch (err) {
            const error = err as unknown as {
                response?: { data?: { message?: string } };
            };
            const message = error.response?.data?.message || "Process supplier failed";
            console.error(message);
            return rejectWithValue(message);
        }
    }
);