// app/store/slices/cartSlice.ts
"use client";

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CartState {
  items: string[];
}

const initialState: CartState = {
  items: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<string>) => {
      state.items.push(action.payload);
    },
    // Add other cart actions as needed
  },
});

export const { addToCart } = cartSlice.actions;
export default cartSlice.reducer;
export type CartStateType = CartState;