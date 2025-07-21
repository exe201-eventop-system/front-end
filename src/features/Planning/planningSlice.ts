import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createPlanningStep1, getNumberPlaning, getPlanning, createPlanningStep2, deletePlanning } from './planningThunks';
import { PlaningResponse } from '../../types/Planning/Planning.type';
import { GenericResponse } from '../../types/Generict/GenerictResponse';
import { PaginationResult } from '../../types/Generict/PaginationResult.type';

interface PlanningState {
  plannings: PlaningResponse[];
  isPlanningModalOpen: boolean;
  totalOfPlannings: number;
  loading: boolean;
  error: string | null;
}

const initialState: PlanningState = {
  plannings: [],
  isPlanningModalOpen: false,
  totalOfPlannings: 0,
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
    openPlanningModal: (state) => {
      state.isPlanningModalOpen = true;
    },
    closePlanningModal: (state) => {
      state.isPlanningModalOpen = false;
    },
    updatePlanning: (state, action: PayloadAction<PlaningResponse>) => {
      const index = state.plannings.findIndex(p => p.id === action.payload.id);
      if (index !== -1) {
        state.plannings[index] = action.payload;
      }
    }
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
          state.totalOfPlannings = state.totalOfPlannings + 1;
          state.plannings.unshift(action.payload.data);
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
      .addCase(getNumberPlaning.fulfilled, (state, action: PayloadAction<GenericResponse<number>>) => {
        state.loading = false;
        state.totalOfPlannings = action.payload.data || 0;
      })
      .addCase(createPlanningStep2.fulfilled, (state, action: PayloadAction<GenericResponse<PlaningResponse>>) => {
        state.loading = false;
        if (action.payload.data) {
          const index = state.plannings.findIndex(p => p.id === action.payload.data?.id);
          console.log("index", index);
          if (index !== -1) {
            state.plannings[index] = action.payload.data;
          }
        }
      })
      .addCase(deletePlanning.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
        state.totalOfPlannings = state.totalOfPlannings - 1;
      });
  },
});

export const { clearError, updatePlanning, closePlanningModal, openPlanningModal } = planningSlice.actions;
export default planningSlice.reducer;
