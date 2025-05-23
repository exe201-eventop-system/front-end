import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createPlanningStep1, getPlanning } from './planningThunks';
import { PlaningResponse } from '../../types/Planning.type';
import { GenericResponse } from '../../types/GenerictResponse';
import { PaginationResult } from '../../types/PaginationResult.type';

interface PlanningState {
  plannings: PlaningResponse[];
  loading: boolean;
  error: string | null;
}

const initialState: PlanningState = {
  plannings: [],
  loading: false,
  error: null,
};

const planningSlice = createSlice({
  name: 'planning',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // create
      .addCase(createPlanningStep1.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createPlanningStep1.fulfilled, (state, action: PayloadAction<GenericResponse<PlaningResponse>>) => {
        state.loading = false;
        if (action.payload.data) {
          state.plannings.push(action.payload.data);
        }
      })
      .addCase(createPlanningStep1.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? 'Failed to create planning';
      })

      // get list
      .addCase(getPlanning.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      
      .addCase(getPlanning.fulfilled, (state, action: PayloadAction<GenericResponse<PaginationResult<PlaningResponse>>>) => {
        state.loading = false;
        state.plannings = action.payload.data?.content || [];
      })
      .addCase(getPlanning.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? 'Failed to fetch planning list';
      });
  },
});

export const { clearError } = planningSlice.actions;
export default planningSlice.reducer;
