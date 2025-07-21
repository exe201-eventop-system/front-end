import { createSlice } from '@reduxjs/toolkit';
import {  Carts } from '../../types/Cart/Cart.type';
import { getTotalCart, addItemToCart, deleteCartItem, getAllCart, checkoutCart, paymentCallback } from './cartThunk';

interface CartState {
    carts: Carts;
    loading: boolean;
    errorMessage: string;
    paymentLoading: boolean;
    totalQuantity: number;
    totalPrice: number;
    totalDiscount: number;
    totalOfCart: number;
    error: boolean | null;
}

const initialState: CartState = {
    carts: {
        cartId: '',
        content: []
    },
    loading: false,
    errorMessage: '',
    paymentLoading: false,
    error: null,
    totalQuantity: 0,
    totalPrice: 0,
    totalDiscount: 0,
    totalOfCart: 0,
};

const cartSlice = createSlice({
    name: 'cart',
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
            .addCase(getTotalCart.fulfilled, (state, action) => {
                state.totalOfCart = action.payload.data?.total_cart_item || 0;
            })
            .addCase(getAllCart.fulfilled, (state, action) => {
                state.carts = action.payload.data ?? { cartId: '', content: [] };
                state.loading = false;
            })
            .addCase(getTotalCart.pending, (state) => {
                state.loading = true
            })
            .addCase(paymentCallback.pending, (state) => {
                state.paymentLoading = true
            })
            .addCase(paymentCallback.fulfilled, (state) => {
                state.paymentLoading = false
            })
            .addCase(paymentCallback.rejected, (state) => {
                state.paymentLoading = false
            })
            .addCase(checkoutCart.fulfilled, (state, action) => {
                state.loading = false;
                const payosLink = action.payload.data?.payment_url;
                if (payosLink) {
                    window.location.href = payosLink;
                }

            })
            .addCase(getAllCart.rejected, (state) => {
                state.loading = false;
                state.error = true;
            })
            .addCase(deleteCartItem.fulfilled, (state, action) => {
                state.totalOfCart = action.payload.data?.total_cart_item ?? 0;
            })
            .addCase(addItemToCart.fulfilled, (state, action) => {
                state.totalOfCart = action.payload.data?.total_cart_item ?? 0;
            });
    },
});

export const { } = cartSlice.actions;
export default cartSlice.reducer; 