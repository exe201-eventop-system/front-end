import { createSlice } from '@reduxjs/toolkit';
import { getFeedbackSystem } from './cartThunk';
import { FeedbackQuestionAnswer } from '../../types/Dashboard/analysis';

interface FeedbackState {
    feedbacks: FeedbackQuestionAnswer[];
    loading: boolean;
    error: string | null;
}

const initialState: FeedbackState = {
    feedbacks: [],
    loading: false,
    error: null,
};

const feedbackSlice = createSlice({
    name: 'feedback',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getFeedbackSystem.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getFeedbackSystem.fulfilled, (state, action) => {
                state.loading = false;
                state.feedbacks = action.payload.data || [];
            })
            .addCase(getFeedbackSystem.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'Lấy feedback thất bại';
            });
    },
});

export default feedbackSlice.reducer;
export const selectFeedbacks = (state: any) => state.feedback.feedbacks;
export const selectFeedbackLoading = (state: any) => state.feedback.loading;
export const selectFeedbackError = (state: any) => state.feedback.error; 