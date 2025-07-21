import { createSlice } from '@reduxjs/toolkit';
import { BlogQueryResult } from '../../types/Blogs/Blog.type';
import { getAllBlog, getBlogDetail } from './blogThunks';

interface BlogState {
  blogs: BlogQueryResult[];
  loading: boolean;
  error: string | null;
  selectedBlog: BlogQueryResult | null;
  item_amount: number;
  page_count: number;
  current_page: number;
}

const initialState: BlogState = {
  blogs: [],
  loading: false,
  error: null,
  selectedBlog: null,
  item_amount: 0,
  page_count: 1,
  current_page: 1,
};

const blogSlice = createSlice({
  name: 'blog',
  initialState,
  reducers: {
    clearSelectedBlog: (state) => {
      state.selectedBlog = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllBlog.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllBlog.fulfilled, (state, action) => {
        state.loading = false;
        state.blogs = action.payload.data?.content || [];
        state.item_amount = action.payload.data?.item_amount || 0;
        state.page_count = action.payload.data?.page_count || 1;
        state.current_page = action.payload.data?.current_page || 1;
      })
      .addCase(getAllBlog.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Có lỗi';
      })
      .addCase(getBlogDetail.pending, (state) => {
        state.loading = true;
      })
      .addCase(getBlogDetail.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedBlog = action.payload.data || null;
      })
      .addCase(getBlogDetail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Có lỗi khi lấy chi tiết bài viết';
      });
  },
});

export const { clearSelectedBlog } = blogSlice.actions;
export default blogSlice.reducer;
