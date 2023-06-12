import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../axios';
import { RootState } from '../store';
import { IFormValues, IFormValues2, Product } from '../../types/types';


export const fetchAuth = createAsyncThunk<AuthState, IFormValues>('auth/fetchAuth', async ({ email, password }: IFormValues) => {
    const { data } = await axios.post<AuthState>('/auth/login', { email, password });
    return data;
});

export const fetchRegister = createAsyncThunk<AuthState, IFormValues2>('auth/fetchRegister', async ({ fullName, email, password }: IFormValues2, { rejectWithValue }) => {
    try {
        const { data } = await axios.post<AuthState>('/auth/register', { fullName, email, password });
        return data;
    }
    catch (err: any) {
        return rejectWithValue(err.response.data);
    }
});

export const fetchAuthMe = createAsyncThunk('auth/fetchAuthMe', async () => {
    const { data } = await axios.get<AuthState>('/auth/me');
    return data;
});

export const fetchAddToBasket = createAsyncThunk<AuthState, IBasketAdd>('auth/fetchAddToBasket', async ({ id, quantity }: IBasketAdd) => {
    const { data } = await axios.post<AuthState>('/auth/addToBasket', { id, quantity });
    return data;
});

export const fetchDeleteFromBasket = createAsyncThunk<AuthState, IBasketDel>('auth/fetchDeleteFromBasket', async ({ id }: IBasketDel) => {
    const { data } = await axios.patch<AuthState>('/auth/updateBasket', { id });
    return data;
});


export interface IBasketAdd {
    id: string;
    quantity: number;
}

export interface IBasketDel {
    id: string;
}

export interface AuthState {
    email: string;
    fullName: string;
    basket: {
        product: Product,
        quantity: number,
    }[];
    token: string;
}

const initialState: AuthState = {
    email: "",
    fullName: "",
    token: "",
    basket: [],
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        signout: (state) => {
            state.email = ""
            state.fullName = ""
            window.localStorage.removeItem('token');
            state.basket = []
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchAuth.pending, (state) => {
            state.email = "";
            state.fullName = "";
            state.basket = [];
        });
        builder.addCase(fetchAuth.fulfilled, (state, action) => {
            state.email = action.payload.email;
            state.fullName = action.payload.fullName;
            window.localStorage.setItem('token', action.payload.token);
            state.basket = action.payload.basket;
        });
        builder.addCase(fetchAuth.rejected, (state) => {
            state.email = "";
            state.fullName = "";
            state.basket = [];
        });
        builder.addCase(fetchRegister.pending, (state) => {
            state.email = "";
            state.fullName = "";
            state.basket = [];
        });
        builder.addCase(fetchRegister.fulfilled, (state, action) => {
            state.email = action.payload.email;
            state.fullName = action.payload.fullName;
            window.localStorage.setItem('token', action.payload.token);
            state.basket = action.payload.basket;
        });
        builder.addCase(fetchRegister.rejected, (state) => {
            state.email = "";
            state.fullName = "";
            state.basket = [];
        });
        builder.addCase(fetchAuthMe.pending, (state) => {
            state.email = "";
            state.fullName = "";
            state.basket = [];
        });
        builder.addCase(fetchAuthMe.fulfilled, (state, action) => {
            state.email = action.payload.email;
            state.fullName = action.payload.fullName;
            state.basket = action.payload.basket;
        });
        builder.addCase(fetchAuthMe.rejected, (state) => {
            state.email = "";
            state.fullName = "";
            state.basket = [];
        });
        builder.addCase(fetchAddToBasket.pending, (state) => {
            state.basket = [];
        });
        builder.addCase(fetchAddToBasket.fulfilled, (state, action) => {
            state.basket = action.payload.basket;
        });
        builder.addCase(fetchAddToBasket.rejected, (state) => {
            state.basket = [];
        });
        builder.addCase(fetchDeleteFromBasket.fulfilled, (state, action) => {
            state.basket = action.payload.basket;
        });
        builder.addCase(fetchDeleteFromBasket.rejected, (state) => {
            state.basket = [];
        });
    },
});

export const selectIsAuth = (state: RootState) => Boolean(state.auth.email && state.auth.fullName);

export default authSlice.reducer;

export const { signout } = authSlice.actions;
