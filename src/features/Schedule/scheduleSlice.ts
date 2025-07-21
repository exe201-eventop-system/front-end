import { createSlice } from '@reduxjs/toolkit';
import { TimeSlotDto } from '../../types/Schedule/schedule';
import { getSheduleSupplier } from './scheduleThunk';

interface ScheduleState {
    schedule_supplier: TimeSlotDto[];
    loading: boolean;
    error: string | null;

}

const initialState: ScheduleState = {
    schedule_supplier: [],
    loading: false,
    error: null,
};

const scheduleSlice = createSlice({
    name: 'schedule',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(getSheduleSupplier.fulfilled, (state, action) => {
                state.loading = false;
                state.schedule_supplier = action.payload.data ?? [];
            });
    },
});

export const {

} = scheduleSlice.actions;

export default scheduleSlice.reducer;
