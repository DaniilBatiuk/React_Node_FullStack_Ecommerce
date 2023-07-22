import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from '../../axios';
import { IType } from '../../types/types';

export const fetchTypes = createAsyncThunk<IType[]>('type/fetchTypes', async () => {
  const { data } = await axios.get<IType[]>('/type');
  return data;
});



export interface ITypesState {
  types: IType[];
  typeName: string;
}


const initialState: ITypesState = {
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
    builder.addCase(fetchTypes.fulfilled, (state, action: PayloadAction<IType[]>) => {
      state.types = action.payload;
    });
    builder.addCase(fetchTypes.rejected, (state) => {
      state.types = [];
    });
  },
});

export const { setTypeName } = typeSlice.actions;

export default typeSlice.reducer;
