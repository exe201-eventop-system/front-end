import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Service, Services } from '../../types/Services/Services.type';
import { getServices, GetService } from './serviceThunks';
import { PaginationResult } from '../../types/Generict/PaginationResult.type';

interface FilterUIState {
  showFilterOptions: boolean;
  expandedFilters: {
    category: boolean;
    price: boolean;
  };
}

interface ServiceState {
  services: PaginationResult<Services>;
  selected_image_index: number;
  loading: boolean;
  error: string | null;
  errorMessage: string;
  service: Service | null;
  filter: {
    search_term: string;
    sort_by: string;
    selected_category: string;
    price_range: string;
    current_page: number;
  };
  filterUI: FilterUIState;
  categories: { id: string; name: string }[]; // Thêm dòng này
}

const initialState: ServiceState = {
  services: {
    content: [],
    item_amount: 0,
    current_page: 0,
    page_count: 0,
    page_size: 12,
  },
  errorMessage: '',
  selected_image_index: 0,
  loading: false,
  error: null,
  service: null,
  filter: {
    search_term: "",
    sort_by: "",
    price_range: "",
    selected_category: "",
    current_page: 1,
  },
  filterUI: {
    showFilterOptions: false,
    expandedFilters: {
      category: true,
      price: true
    }
  },
  categories: [], // Thêm dòng này
};

const serviceSlice = createSlice({
  name: 'service',
  initialState,
  reducers: {
    setSearchTerm: (state, action) => {
      state.filter.search_term = action.payload;
    },
    setSelectedPriceRange: (state, action) => {
      state.filter.price_range = action.payload;
    },
    setSelectedImageIndex: (state, action) => {
      state.selected_image_index = action.payload;
    },
    setSortBy: (state, action) => {
      state.filter.sort_by = action.payload;
    },
    setCategory: (state, action) => {
      state.filter.selected_category = action.payload;
    },
    setCurrentPage: (state, action) => {
      state.filter.current_page = action.payload;
    },
    toggleFilterOptions: (state) => {
      state.filterUI.showFilterOptions = !state.filterUI.showFilterOptions;
    },
    toggleFilterSection: (state, action: PayloadAction<'category' | 'price'>) => {
      const section = action.payload;
      state.filterUI.expandedFilters[section] = !state.filterUI.expandedFilters[section];
    },
    setCategories: (state, action: PayloadAction<{ id: string; name: string }[]>) => {
      state.categories = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getServices.pending, (state) => {
        state.loading = true;
      })
      .addCase(getServices.fulfilled, (state, action) => {
        state.loading = false;
        state.services = action.payload.data || {
          content: [],
          item_amount: 0,
          current_page: 0,
          page_count: 0,
          page_size: 12,
        }
      })
      .addCase(getServices.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Có lỗi';
      })
      .addCase(GetService.pending, (state) => {
        state.loading = true;
      })
      .addCase(GetService.fulfilled, (state, action) => {
        state.loading = false;
        state.service = action.payload.data ?? null;
      })
      .addCase(GetService.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Có lỗi khi lấy chi tiết bài viết';
      })
  },
});

export const {
  setSearchTerm,
  setSortBy,
  setCategory,
  setSelectedPriceRange,
  setCurrentPage,
  toggleFilterOptions,
  toggleFilterSection,
  setSelectedImageIndex,
  setCategories
} = serviceSlice.actions;

export default serviceSlice.reducer;
