import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserAllInfo } from '../../types/Auth/User.type';
import { PaginationResult } from '../../types/Generict/PaginationResult.type';
import { GetAllUserQuery } from '../../types/User/User.type';
import { getAllUser } from './userThunks';

interface UserState {
    users: PaginationResult<UserAllInfo>;
    loading: boolean;
    error: string | null;
    filter: GetAllUserQuery;
}

const initialState: UserState = {
    users: {
        content: [],
        item_amount: 0,
        page_size: 5,
        current_page: 1,
        page_count: 0,
    },
    loading: false,
    error: null,
    filter: {
        page: 1,
        page_size: 10,
        search: '',
    },
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setCurrentPage: (state, action: PayloadAction<number>) => {
            state.filter.page = action.payload;
        },
        setPageSize: (state, action: PayloadAction<number>) => {
            state.filter.page_size = action.payload;
        },
        setSearchTerm: (state, action: PayloadAction<string>) => {
            state.filter.search = action.payload;
            state.filter.page = 1; // Reset về trang 1 khi search
        },
        clearError: (state) => {
            state.error = null;
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },
        setUsers: (state, action: PayloadAction<PaginationResult<UserAllInfo>>) => {
            state.users = action.payload;
            state.loading = false;
            state.error = null;
        },
        setError: (state, action: PayloadAction<string>) => {
            state.error = action.payload;
            state.loading = false;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAllUser.fulfilled, (state, action) => {
                state.loading = false;
                const response = action.payload;
                state.users = response.data || {
                    content: [],
                    item_amount: 0,
                    current_page: 0,
                    page_count: 0,
                    page_size: 5,
                }

            })
            .addCase(getAllUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'Có lỗi xảy ra khi tải danh sách người dùng';
            });
    },
});

export const {
    setCurrentPage,
    setPageSize,
    setSearchTerm,
    clearError,
    setLoading,
    setUsers,
    setError
} = userSlice.actions;
export default userSlice.reducer;
