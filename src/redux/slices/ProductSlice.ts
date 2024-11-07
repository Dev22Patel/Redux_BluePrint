import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { ReactNode } from "react";

// Define a ProductType interface based on the expected API response structure
interface ProductType {
  image: string | undefined;
  rating: any;
  description: ReactNode;
  category: ReactNode;
  id: number;
  title: string;
  price: number;
  // add other relevant fields
}

// Define the state type
interface ProductState {
  isLoading: boolean;
  data: ProductType[] | null; // Array of products
  selectedProduct: ProductType | null; // Selected product
  isError: boolean;
}

// Initial state
const initialState: ProductState = {
  isLoading: false,
  data: null,
  selectedProduct: null, // Initialize as null
  isError: false,
};

// Async thunk action for fetching all products
export const fetchProducts = createAsyncThunk<ProductType[]>(
  "fetchProducts",
  async () => {
    const response = await fetch("https://fakestoreapi.com/products");
    return response.json();
  }
);

// Async thunk action for fetching a single product by ID
export const fetchProductById = createAsyncThunk<ProductType, number>(
  "fetchProductById",
  async (productId: number) => {
    const response = await fetch(`https://fakestoreapi.com/products/${productId}`);
    return response.json();
  }
);

// Product slice
const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Handle fetching all products
    builder.addCase(fetchProducts.fulfilled, (state, action: PayloadAction<ProductType[]>) => {
      state.isLoading = false;
      state.data = action.payload;
    });
    builder.addCase(fetchProducts.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchProducts.rejected, (state) => {
      state.isError = true;
      state.isLoading = false;
    });

    // Handle fetching a single product by ID
    builder.addCase(fetchProductById.fulfilled, (state, action: PayloadAction<ProductType>) => {
      state.isLoading = false;
      state.selectedProduct = action.payload; // Update selected product field
    });
    builder.addCase(fetchProductById.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchProductById.rejected, (state) => {
      state.isError = true;
      state.isLoading = false;
    });
  },
});

export default productSlice.reducer;
