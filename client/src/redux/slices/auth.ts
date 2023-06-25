import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../axios';
import { RootState } from '../store';
import { IFormValues, IFormValues2, Product } from '../../types/types';
import { AxiosError } from 'axios';


export const fetchAuth = createAsyncThunk<AuthState, IFormValues>('auth/fetchAuth', async ({ email, password }: IFormValues, { rejectWithValue }) => {
    try {
        const { data } = await axios.post<AuthState>('/auth/login', { email, password });
        return data;
    }
    catch (err: any) {
        return rejectWithValue(err.response.data.map((error: { msg: string; }) => error.msg));
    }
});

export const fetchRegister = createAsyncThunk<AuthState, IFormValues2>('auth/fetchRegister', async ({ fullName, email, password }: IFormValues2, { rejectWithValue }) => {
    try {
        const { data } = await axios.post<AuthState>('/auth/register', { fullName, email, password });
        return data;
    }
    catch (err: any) {
        return rejectWithValue(err.response.data.map((error: { msg: string; }) => error.msg));
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
    errors: {
        fetchRegisterErrors: string[],
        fetchAuthErrors: string[],
    };
    token: string;
}

const initialState: AuthState = {
    email: "",
    fullName: "",
    token: "",
    errors: {
        fetchRegisterErrors: [],
        fetchAuthErrors: [],
    },
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
            state.basket = action.payload.basket;
            window.localStorage.setItem('token', action.payload.token);
            state.errors.fetchAuthErrors = [];
        });
        builder.addCase(fetchAuth.rejected, (state, action) => {
            state.email = "";
            state.fullName = "";
            state.basket = [];
            state.errors.fetchAuthErrors = action.payload as string[];
        });
        builder.addCase(fetchRegister.pending, (state) => {
            state.email = "";
            state.fullName = "";
            state.basket = [];
        });
        builder.addCase(fetchRegister.fulfilled, (state, action) => {
            state.email = action.payload.email;
            state.fullName = action.payload.fullName;
            state.basket = action.payload.basket;
            window.localStorage.setItem('token', action.payload.token);
            state.errors.fetchRegisterErrors = [];
        });
        builder.addCase(fetchRegister.rejected, (state, action) => {
            state.email = "";
            state.fullName = "";
            state.basket = [];
            state.errors.fetchRegisterErrors = action.payload as string[];
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
