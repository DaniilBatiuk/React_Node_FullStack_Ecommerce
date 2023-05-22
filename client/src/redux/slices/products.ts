import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../axios';
import { Product } from '../../types/types';

export const fetchProducts = createAsyncThunk<Product[]>('product/fetchProducts', async () => {
    const { data } = await axios.get<Product[]>('/product');
    return data;
});



export interface ProductsState {
    products: Product[];
}


const initialState: ProductsState = {
    products: [],
}

export const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder.addCase(fetchProducts.pending, (state) => {
        state.products = [];
      });
      builder.addCase(fetchProducts.fulfilled, (state, action) => {
        state.products = action.payload;
      });
      builder.addCase(fetchProducts.rejected, (state) => {
        state.products = [];
      });
    },
  });

export default productSlice.reducer;