// scheduleThunk.ts
import { createGetThunk } from "../genericsCreateThunk";
import { ScheduleSupplier } from "../../types/Supplier/Supplier.type";
import { SupplierDetailDTO, SupplierRatingDetailDto, Suppliers, SuppliersRating } from "../../types/Supplier/Suppliers.type";
import { SupplierFilter } from "../../types/Supplier/SupplierFilter.type";
import { PaginationResult } from "../../types/Generict/PaginationResult.type";

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
