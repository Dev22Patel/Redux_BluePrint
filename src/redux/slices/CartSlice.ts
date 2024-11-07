import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartItem } from "../../components/Types"; // Assuming CartItem is imported from another file

interface CartState {
  items: CartItem[];
  total: number;
}

const initialState: CartState = {
  items: [],
  total: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<CartItem>) => {
      // Check if item already exists in the cart
      const existingItem = state.items.find(item => item.id === action.payload.id);

      if (existingItem) {
        // If item exists, update the quantity
        existingItem.quantity += 1;
      } else {
        // Otherwise, add the new item to the cart
        state.items.push(action.payload);
      }

      // Recalculate total
      state.total = state.items.reduce((total, item) => total + item.price * item.quantity, 0);
    },
    // CartSlice.ts
updateItem: (state, action: PayloadAction<{ id: number, quantity: number }>) => {
    const itemIndex = state.items.findIndex(item => item.id === action.payload.id);
    if (itemIndex !== -1) {
      state.items[itemIndex].quantity = action.payload.quantity;

      // Recalculate total
      state.total = state.items.reduce((total, item) => total + item.price * item.quantity, 0);
    }
  },
      // Remove an item from the cart
      removeItem: (state, action: PayloadAction<number>) => {
        // Remove item by id
        state.items = state.items.filter(item => item.id !== action.payload);

        // Recalculate total
        state.total = state.items.reduce((total, item) => total + item.price * item.quantity, 0);
      },
  },

});

export const { addItem ,updateItem,removeItem} = cartSlice.actions;
export default cartSlice.reducer;
