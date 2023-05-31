import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from '../../axios';

export const fetchTypes = createAsyncThunk<Type[]>('type/fetchTypes', async () => {
  const { data } = await axios.get<Type[]>('/type');
  return data;
});


export interface Type {
  _id: string;
  name: string;
  __v: number;
}

export interface TypesState {
  types: Type[];
  typeName: string;
}


const initialState: TypesState = {
  types: [],
  typeName: "All",
}

export const typeSlice = createSlice({
  name: 'type',
  initialState,
  reducers: {
    setTypeName: (state, action: PayloadAction<string>) => {
      state.typeName = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTypes.pending, (state) => {
      state.types = [];
    });
    builder.addCase(fetchTypes.fulfilled, (state, action) => {
      state.types = action.payload;
    });
    builder.addCase(fetchTypes.rejected, (state) => {
      state.types = [];
    });
  },
});

export const { setTypeName } = typeSlice.actions;

export default typeSlice.reducer;
