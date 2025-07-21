import { createSlice } from '@reduxjs/toolkit';
import { getBookingHistory } from './bookingThunks';
import { BookingHistoryDTO } from '../../types/History/bookingHitstory';

interface BookingState {
    bookingHistory: BookingHistoryDTO[];
    loading: boolean;
    paymentLoading: boolean;
    totalQuantity: number;
    totalPrice: number;
    totalDiscount: number;
    totalOfCart: number;
    error: boolean | null;
}

const initialState: BookingState = {
    bookingHistory: [],
    loading: false,
    paymentLoading: false,
    error: null,
    totalQuantity: 0,
    totalPrice: 0,
    totalDiscount: 0,
    totalOfCart: 0,
};

const bookingSlice = createSlice({
    name: 'booking',
    initialState,
    reducers: {
        // addToCart: (state, action: PayloadAction<CartItem>) => {
        //     const existingItem = state.items.find(item => item.id === action.payload.id);
        //     state.totalQuantity += 1;
        //     state.totalPrice += action.payload.price;
        //     if (existingItem) {
        //         existingItem.quantity += 1;
        //     } else {
        //         state.items.push({ ...action.payload, quantity: 1 });
        //     }
        // },

        // removeFromCart: (state, action: PayloadAction<string>) => {
        //     state.items = state.items.filter(item => item.id !== action.payload);
        //     state.totalQuantity -= 1;
        //     // state.totalPrice -= action.payload.price;
        // },
        // updateQuantity: (state, action: PayloadAction<{ id: string; quantity: number }>) => {
        //     const item = state.items.find(item => item.id === action.payload.id);
        //     if (item) {
        //         item.quantity = action.payload.quantity;
        //     }
        // },
        // clearCart: (state) => {
        //     state.items = [];
        // },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getBookingHistory.pending, (state) => {
                state.loading = true;
            })
            .addCase(getBookingHistory.fulfilled, (state, action) => {
                state.bookingHistory = action.payload.data ?? [];
                state.loading = false;
            })
            .addCase(getBookingHistory.rejected, (state) => {
                state.loading = false;
                state.error = true;
            });
    },
});

export const { } = bookingSlice.actions;
export default bookingSlice.reducer; 