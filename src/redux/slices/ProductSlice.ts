import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

// Define a ProductType interface based on the expected API response structure
interface ProductType {
  id: number;
  title: string;
  price: number;
  // add other relevant fields
}

// Define the state type
interface ProductState {
  isLoading: boolean;
  data: ProductType[] | null;
  isError: boolean;
}

// Initial state
const initialState: ProductState = {
  isLoading: false,
  data: null,
  isError: false,
};

// Async thunk action
export const fetchProducts = createAsyncThunk<ProductType[]>(
  "fetchProducts",
  async () => {
    const response = await fetch("https://fakestoreapi.com/products");
    return response.json();
  }
);

// Product slice
const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
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
  }
});

export default productSlice.reducer;
