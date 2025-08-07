import { createSlice } from '@reduxjs/toolkit';
import { CategoryResponseDto } from '../../types/Category/category';
import { getCategory } from './categoryThunk';

interface CategoryState {
    data: CategoryResponseDto[] | null;
    loading: boolean;
    error: string | null;
}

const initialState: CategoryState = {
    data: null,
    loading: false,
    error: null,
};

const categorySlice = createSlice({
    name: 'category',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getCategory.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getCategory.fulfilled, (state, action) => {
                state.loading = false;
                // API trả về { data: { categories: [...] } }
                const responseData = action.payload.data as any;
                state.data = responseData?.categories || responseData || null;
                state.error = null;
            })
            .addCase(getCategory.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string || 'Lỗi lấy dữ liệu dashboard';
            });
    },
});

export default categorySlice.reducer;
