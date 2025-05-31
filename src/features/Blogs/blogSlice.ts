import { createSlice } from '@reduxjs/toolkit';
import { Blog } from '../../types/Blog.type';
import { Blogs, BlogDetail } from './blogThunks';

interface BlogState {
  blogs: Blog[];
  loading: boolean;
  error: string | null;
  selectedBlog: Blog | null;
}

const initialState: BlogState = {
  blogs: [],
  loading: false,
  error: null,
  selectedBlog: null,
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
      // Blog list actions (using Blogs namespace)
      .addCase(Blogs.pending, (state) => {
        state.loading = true;
      })
      .addCase(Blogs.fulfilled, (state, action) => {
        state.loading = false;
       // state.blogs = action.payload.data;
      })
      .addCase(Blogs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Có lỗi';
      })
      // BlogDetail actions (using BlogDetail namespace)
      .addCase(BlogDetail.pending, (state) => {
        state.loading = true;
      })
      .addCase(BlogDetail.fulfilled, (state, action) => {
        state.loading = false;
        // state.selectedBlog = action.payload.data; // Lưu blog chi tiết
      })
      .addCase(BlogDetail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Có lỗi khi lấy chi tiết bài viết';
      });
  },
});

export const { clearSelectedBlog } = blogSlice.actions;
export default blogSlice.reducer;
