import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import cartReducer from './cartSlice';  // Changed import
import searchReducer from './searchSlice';  // Missing import

export const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,  // Fixed variable name
    search: searchReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;