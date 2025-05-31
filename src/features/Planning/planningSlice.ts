import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createPlanningStep1, getNumberPlaning, getPlanning } from './planningThunks';
import { PlaningResponse } from '../../types/Planning.type';
import { GenericResponse } from '../../types/GenerictResponse';
import { PaginationResult } from '../../types/PaginationResult.type';

interface PlanningState {
  plannings: PlaningResponse[];
  number: number;
  loading: boolean;
  error: string | null;
}

const initialState: PlanningState = {
  plannings: [],
  number: 0,
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
        console.log("🔹 [PlanningSlice] Received create response:", action.payload);
        if (action.payload.data) {
          console.log("🔹 [PlanningSlice] Current plannings:", state.plannings);
          state.plannings = [action.payload.data, ...state.plannings];
          console.log("🔹 [PlanningSlice] Updated plannings:", state.plannings);
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
      })


      .addCase(getNumberPlaning.fulfilled, (state, action: PayloadAction<GenericResponse<number>>) => {
        state.loading = false;
        state.number = action.payload.data || 0;
      });
  },
});

export const { clearError } = planningSlice.actions;
export default planningSlice.reducer;
