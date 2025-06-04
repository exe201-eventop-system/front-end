import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CartItem } from '../../types/Cart.type';
import { getTotalCart } from './cartThunk';

interface CartState {
    items: CartItem[];
    loading: boolean;
    totalQuantity: number;
    totalPrice: number;
    totalDiscount: number;
    totalOfCart: number;
    error: string | null;
}

const initialState: CartState = {
    items: [],
    loading: false,
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
        addToCart: (state, action: PayloadAction<CartItem>) => {
            const existingItem = state.items.find(item => item.id === action.payload.id);
            state.totalQuantity += 1;
            state.totalPrice += action.payload.price;
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                state.items.push({ ...action.payload, quantity: 1 });
            }
        },

        removeFromCart: (state, action: PayloadAction<string>) => {
            state.items = state.items.filter(item => item.id !== action.payload);
            state.totalQuantity -= 1;
            // state.totalPrice -= action.payload.price;
        },
        updateQuantity: (state, action: PayloadAction<{ id: string; quantity: number }>) => {
            const item = state.items.find(item => item.id === action.payload.id);
            if (item) {
                item.quantity = action.payload.quantity;
            }
        },
        clearCart: (state) => {
            state.items = [];
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getTotalCart.fulfilled, (state, action) => {
                state.totalOfCart = action.payload.data || 0;
            })
            .addCase(getTotalCart.pending, (state) => {
                state.loading = true;
            })
            .addCase(getTotalCart.rejected, (state, action) => {
                state.error = action.error.message || 'Error fetching total cart';
                console.log("🔹 [CartSlice] Error fetching total cart:", state.error);
                state.loading = false;
            });
    },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer; 