import { createSlice } from '@reduxjs/toolkit';
import { PackageResponseDto } from '../../types/Packages/packages';
import { getPackages } from './packagesTh́unk';


interface PackagesState {
    data: PackageResponseDto[] | null;
    loading: boolean;
    error: string | null;
}

const initialState: PackagesState = {
    data: null,
    loading: false,
    error: null,
};

const packagesSlice = createSlice({
    name: 'packages',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getPackages.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getPackages.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload.data ? action.payload.data : null;
                state.error = null;
            })
            .addCase(getPackages.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string || 'Lỗi lấy dữ liệu dashboard';
            });
    },
});

export default packagesSlice.reducer;
