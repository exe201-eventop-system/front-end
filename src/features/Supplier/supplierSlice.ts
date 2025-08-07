import { createSlice } from '@reduxjs/toolkit';
import { Suppliers } from '../../types/Supplier/Suppliers.type';
import { getSuppliers, getScheduleSupplier, GetListSupplierNotAccept, ProcessSupplier } from './supplierThunks';
import { ScheduleSupplier, SupplierProfileDTO } from '../../types/Supplier/Supplier.type';

interface SupplierState {
    suppliers: Suppliers[];
    loading: boolean;
    error: string | null;
    page: number;
    pageSize: number;
    total: number;
    scheduleSupplier: ScheduleSupplier[];
    scheduleLoading: boolean;
    scheduleError: string | null;
    pendingSuppliers: SupplierProfileDTO[];
    pendingLoading: boolean;
    pendingError: string | null;
    processLoading: boolean;
    processError: string | null;
}

const initialState: SupplierState = {
    suppliers: [],
    loading: false,
    error: null,
    page: 1,
    pageSize: 8,
    total: 0,
    scheduleSupplier: [],
    scheduleLoading: false,
    scheduleError: null,
    pendingSuppliers: [],
    pendingLoading: false,
    pendingError: null,
    processLoading: false,
    processError: null,
};

const supplierSlice = createSlice({
    name: 'supplier',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getSuppliers.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getSuppliers.fulfilled, (state, action) => {
                state.loading = false;
                state.suppliers = action.payload.data?.content ?? [];
                state.total = action.payload.data?.item_amount ?? 0;
                state.page = action.payload.data?.current_page ?? 1;
                state.pageSize = action.payload.data?.page_size ?? 8;
            })
            .addCase(getSuppliers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message ?? 'Đã xảy ra lỗi';
            })
            .addCase(getScheduleSupplier.pending, (state) => {
                state.scheduleLoading = true;
                state.scheduleError = null;
            })
            .addCase(getScheduleSupplier.fulfilled, (state, action) => {
                state.scheduleLoading = false;
                state.scheduleSupplier = action.payload.data ?? [];
            })
            .addCase(getScheduleSupplier.rejected, (state, action) => {
                state.scheduleLoading = false;
                state.scheduleError = action.error.message ?? 'Đã xảy ra lỗi khi lấy lịch';
            })
            // GetListSupplierNotAccept cases
            .addCase(GetListSupplierNotAccept.pending, (state) => {
                state.pendingLoading = true;
                state.pendingError = null;
            })
            .addCase(GetListSupplierNotAccept.fulfilled, (state, action) => {
                state.pendingLoading = false;
                state.pendingSuppliers = action.payload.data ?? [];
            })
            .addCase(GetListSupplierNotAccept.rejected, (state, action) => {
                state.pendingLoading = false;
                state.pendingError = action.error.message ?? 'Đã xảy ra lỗi khi lấy danh sách supplier';
            })
            // ProcessSupplier cases
            .addCase(ProcessSupplier.pending, (state) => {
                state.processLoading = true;
                state.processError = null;
            })
            .addCase(ProcessSupplier.fulfilled, (state) => {
                state.processLoading = false;
            })
            .addCase(ProcessSupplier.rejected, (state, action) => {
                state.processLoading = false;
                state.processError = action.error.message ?? 'Đã xảy ra lỗi khi xử lý supplier';
            });
    },
});

export default supplierSlice.reducer;
