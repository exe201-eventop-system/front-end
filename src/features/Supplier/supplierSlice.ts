import { createSlice } from '@reduxjs/toolkit';
import { Suppliers } from '../../types/Supplier/Suppliers.type';
import { getSuppliers, getScheduleSupplier } from './supplierThunks';
import { ScheduleSupplier } from '../../types/Supplier/Supplier.type';

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
            });
    },
});

export default supplierSlice.reducer;
