// store.ts
import { configureStore } from '@reduxjs/toolkit';
import cartReducer from "./slices/CartSlice";
import productReducer from "./slices/ProductSlice";

export const store = configureStore({
    reducer: {
        cart: cartReducer,
        product: productReducer
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
