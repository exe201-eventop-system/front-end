import { createSlice } from '@reduxjs/toolkit';
import { Service } from '../../types/Services.type';
import { Services, ServiceDetail } from './serviceThunks';

interface ServiceState {
  services: Service[];
  loading: boolean;
  error: string | null;
  selectedBlog: Service | null;
}

const initialState: ServiceState = {
  services: [],
  loading: false,
  error: null,
  selectedBlog: null,
};

const serviceSlice = createSlice({
  name: 'service',
  initialState,
  reducers: {
    clearSelectedService: (state) => {
      state.selectedBlog = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(Services.pending, (state) => {
        state.loading = true;
      })
      .addCase(Services.fulfilled, (state, action) => {
        state.loading = false;
        state.services = action.payload;
      })
      .addCase(Services.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Có lỗi';
      })
      // BlogDetail actions (using BlogDetail namespace)
      .addCase(ServiceDetail.pending, (state) => {
        state.loading = true;
      })
      .addCase(ServiceDetail.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedBlog = action.payload; // Lưu blog chi tiết
      })
      .addCase(ServiceDetail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Có lỗi khi lấy chi tiết bài viết';
      });
  },
});

export const { clearSelectedService } = serviceSlice.actions;
export default serviceSlice.reducer;
