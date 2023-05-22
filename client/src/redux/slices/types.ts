import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
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
}


const initialState: TypesState = {
    types: [],
}

export const typeSlice = createSlice({
    name: 'type',
    initialState,
    reducers: {},
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


export default typeSlice.reducer;
