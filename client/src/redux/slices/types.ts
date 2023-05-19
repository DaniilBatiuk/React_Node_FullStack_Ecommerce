import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../axios';

export const fetchTypes = createAsyncThunk('type/fetchTypes', async () => {
    const { data } = await axios.get('/type');
    return data;
});


export interface TypeState {
    _id: string;
    name: string;
    __v: number;
}

export interface TypesState {
    types: TypeState[];
}


const initialState: TypesState = {
    types: [],
}

export const typeSlice = createSlice({
    name: 'type',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder.addCase(fetchTypes.fulfilled, (state, action) => {
        state.types = action.payload;
      });
    },
  });

export const { } = typeSlice.actions

export default typeSlice.reducer
