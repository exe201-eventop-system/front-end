import { createSlice } from '@reduxjs/toolkit';
import { TransactionDTOs } from '../../types/Transaction/Payment.types';
import { getTransaction, getRevenue } from './cartThunk';
import { RevenueDto } from '../../types/Dashboard/analysis';

interface TransactionState {
    transactions: TransactionDTOs[];
    loading: boolean;
    error: string | null;
    revenue: RevenueDto[];
}

const initialState: TransactionState = {
    transactions: [],
    loading: false,
    error: null,
    revenue: [],
};

const transactionSlice = createSlice({
    name: 'transaction',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getTransaction.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getTransaction.fulfilled, (state, action) => {
                state.loading = false;
                state.transactions = action.payload.data || [];
            })
            .addCase(getTransaction.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'Lấy giao dịch thất bại';
            })
            .addCase(getRevenue.fulfilled, (state, action) => {
                state.revenue = action.payload.data || [];
            });
    },
});

export default transactionSlice.reducer;
export const selectTransactions = (state: any) => state.transaction.transactions;
export const selectTransactionLoading = (state: any) => state.transaction.loading;
export const selectTransactionError = (state: any) => state.transaction.error; 