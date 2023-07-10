import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../axios';
import { IProductCreate, IProduct } from '../../types/types';
import { error } from 'console';

export const fetchProducts = createAsyncThunk<IProduct[]>('product/fetchProducts', async () => {
  const { data } = await axios.get<IProduct[]>('/product');
  return data;
});

export const fetchProductsByType = createAsyncThunk<IProduct[], string>('product/fetchProductsByType', async (typeId) => {
  const { data } = await axios.get<IProduct[]>(`/product/type/${typeId}`);
  return data;
});

export const fetchCreateProduct = createAsyncThunk<IProduct, IProductCreate>('product/fetchCreateProduct', async ({ title, price, characteristic, img, type }: IProductCreate, { rejectWithValue }) => {
  try {
    const { data } = await axios.post<IProduct>('/product', { title, price, characteristic, img, type });
    return data;
  }
  catch (err: any) {
    return rejectWithValue(err.response.data.map((error: { msg: string; }) => error.msg));
  }
});

export const fetchUpdateProduct = createAsyncThunk<IProduct, IProduct>('product/fetchUpdateProduct', async ({ _id, title, price, characteristic, img, type }: IProduct, { rejectWithValue }) => {
  try {
    const { data } = await axios.patch<IProduct>(`/product/${_id}`, { title, price, characteristic, img, type });
    return data;
  }
  catch (err: any) {
    return rejectWithValue(err.response.data.map((error: { msg: string; }) => error.msg));
  }
});

export interface IProductsState {
  products: IProduct[];
  errors: {
    fetchProductsErrors: string[],
    fetchProductsByTypeErrors: string[],
    fetchCreateProductErrors: string[],
    fetchUpdateProductErrors: string[],
  };
}

const initialState: IProductsState = {
  products: [],
  errors: {
    fetchProductsErrors: [],
    fetchProductsByTypeErrors: [],
    fetchCreateProductErrors: [],
    fetchUpdateProductErrors: [],
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
    builder.addCase(fetchUpdateProduct.fulfilled, (state, action) => {
      state.errors.fetchUpdateProductErrors = [];
    });
    builder.addCase(fetchUpdateProduct.rejected, (state, action) => {
      state.errors.fetchUpdateProductErrors = action.payload as string[];
    });
  },
});


export default productSlice.reducer;