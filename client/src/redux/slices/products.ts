import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../axios';
import { Product } from '../../types/types';
import { error } from 'console';

export const fetchProducts = createAsyncThunk<Product[]>('product/fetchProducts', async () => {
  const { data } = await axios.get<Product[]>('/product');
  return data;
});

export const fetchProductsByType = createAsyncThunk<Product[], string>('product/fetchProductsByType', async (typeId) => {
  const { data } = await axios.get<Product[]>(`/product/type/${typeId}`);
  return data;
});

export const fetchCreateProduct = createAsyncThunk<Product, Product>('product/fetchCreateProduct', async ({ title, price, characteristic, img, type }: Product, { rejectWithValue }) => {
  try {
    const { data } = await axios.post<Product>('/product', { title, price, characteristic, img, type });
    return data;
  }
  catch (err: any) {
    return rejectWithValue(err.response.data.map((error: { msg: string; }) => error.msg));
  }
});

export interface ProductsState {
  products: Product[];
  errors: {
    fetchProductsErrors: string[],
    fetchProductsByTypeErrors: string[],
    fetchCreateProductErrors: string[],
  };
}

const initialState: ProductsState = {
  products: [],
  errors: {
    fetchProductsErrors: [],
    fetchProductsByTypeErrors: [],
    fetchCreateProductErrors: [],
  },
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
    builder.addCase(fetchProductsByType.pending, (state) => {
      state.products = [];
    });
    builder.addCase(fetchProductsByType.fulfilled, (state, action) => {
      state.products = action.payload;
    });
    builder.addCase(fetchProductsByType.rejected, (state) => {
      state.products = [];
    });
    builder.addCase(fetchCreateProduct.fulfilled, (state, action) => {
      state.products = [...state.products, action.payload];
      state.errors.fetchCreateProductErrors = [];
    });
    builder.addCase(fetchCreateProduct.rejected, (state, action) => {
      state.errors.fetchCreateProductErrors = action.payload as string[];
    });
  },
});


export default productSlice.reducer;