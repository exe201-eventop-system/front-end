import { createSlice } from '@reduxjs/toolkit';
import { getDashboard } from './dashboardThunk';
import { DashboardResponseDto } from '../../types/Dashboard/analysis';

interface DashboardState {
    data: DashboardResponseDto | null;
    loading: boolean;
    error: string | null;
}

const initialState: DashboardState = {
    data: null,
    loading: false,
    error: null,
};

const dashboardSlice = createSlice({
    name: 'dashboard',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getDashboard.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getDashboard.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload.data ? action.payload.data : null;
                state.error = null;
            })
            .addCase(getDashboard.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string || 'Lỗi lấy dữ liệu dashboard';
            });
    },
});

export default dashboardSlice.reducer;
