import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../axios';
import { RootState } from '../store';
import { IFormValues, IFormValues2, IProduct } from '../../types/types';


export const fetchAuth = createAsyncThunk<IAuthState, IFormValues>('auth/fetchAuth', async ({ email, password }: IFormValues, { rejectWithValue }) => {
    try {
        const { data } = await axios.post<IAuthState>('/auth/login', { email, password });
        return data;
    }
    catch (err: any) {
        return rejectWithValue(err.response.data.map((error: { msg: string; }) => error.msg));
    }
});

export const fetchRegister = createAsyncThunk<IAuthState, IFormValues2>('auth/fetchRegister', async ({ fullName, email, password }: IFormValues2, { rejectWithValue }) => {
    try {
        const { data } = await axios.post<IAuthState>('/auth/register', { fullName, email, password });
        return data;
    }
    catch (err: any) {
        return rejectWithValue(err.response.data.map((error: { msg: string; }) => error.msg));
    }
});

export const fetchAuthMe = createAsyncThunk('auth/fetchAuthMe', async () => {
    const { data } = await axios.get<IAuthState>('/auth/me');
    return data;
});

export const fetchAddToBasket = createAsyncThunk<IAuthState, IBasketAdd>('auth/fetchAddToBasket', async ({ id, quantity }: IBasketAdd) => {
    const { data } = await axios.post<IAuthState>('/auth/addToBasket', { id, quantity });
    return data;
});

export const fetchDeleteFromBasket = createAsyncThunk<IAuthState, IBasketDel>('auth/fetchDeleteFromBasket', async ({ id }: IBasketDel) => {
    const { data } = await axios.patch<IAuthState>('/auth/updateBasket', { id });
    return data;
});


export interface IBasketAdd {
    id: string;
    quantity: number;
}

export interface IBasketDel {
    id: string;
}

export interface IAuthState {
    _id: string;
    email: string;
    fullName: string;
    basket: {
        product: IProduct,
        quantity: number,
    }[];
    createdAt: string;
    errors: {
        fetchRegisterErrors: string[],
        fetchAuthErrors: string[],
    };
    token: string;
}

const initialState: IAuthState = {
    _id: "",
    email: "",
    fullName: "",
    createdAt: new Date(500000000000).toISOString().split('T')[0],
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
            state._id = "";
            state.email = "";
            state.fullName = "";
            window.localStorage.removeItem('token');
            state.basket = []
            state.createdAt = new Date(500000000000).toISOString().split('T')[0]
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchAuth.pending, (state) => {
            state._id = "";
            state.email = "";
            state.fullName = "";
            state.basket = [];
            state.createdAt = new Date(500000000000).toISOString().split('T')[0];
        });
        builder.addCase(fetchAuth.fulfilled, (state, action) => {
            state._id = action.payload._id;
            state.email = action.payload.email;
            state.fullName = action.payload.fullName;
            state.basket = action.payload.basket;
            state.createdAt = action.payload.createdAt.toString().split('T')[0];
            window.localStorage.setItem('token', action.payload.token);
            state.errors.fetchAuthErrors = [];
        });
        builder.addCase(fetchAuth.rejected, (state, action) => {
            state._id = "";
            state.email = "";
            state.fullName = "";
            state.basket = [];
            state.createdAt = new Date(500000000000).toISOString().split('T')[0];
            state.errors.fetchAuthErrors = action.payload as string[];
        });
        builder.addCase(fetchRegister.pending, (state) => {
            state._id = "";
            state.email = "";
            state.fullName = "";
            state.basket = [];
            state.createdAt = new Date(500000000000).toISOString().split('T')[0];
        });
        builder.addCase(fetchRegister.fulfilled, (state, action) => {
            state._id = action.payload._id;
            state.email = action.payload.email;
            state.fullName = action.payload.fullName;
            state.basket = action.payload.basket;
            state.createdAt = action.payload.createdAt.toString().split('T')[0];
            window.localStorage.setItem('token', action.payload.token);
            state.errors.fetchRegisterErrors = [];
        });
        builder.addCase(fetchRegister.rejected, (state, action) => {
            state._id = "";
            state.email = "";
            state.fullName = "";
            state.basket = [];
            state.createdAt = new Date(500000000000).toISOString().split('T')[0];
            state.errors.fetchRegisterErrors = action.payload as string[];
        });
        builder.addCase(fetchAuthMe.pending, (state) => {
            state._id = "";
            state.email = "";
            state.fullName = "";
            state.basket = [];
            state.createdAt = new Date(500000000000).toISOString().split('T')[0];
        });
        builder.addCase(fetchAuthMe.fulfilled, (state, action) => {
            state._id = action.payload._id;
            state.email = action.payload.email;
            state.fullName = action.payload.fullName;
            state.basket = action.payload.basket;
            state.createdAt = action.payload.createdAt.toString().split('T')[0];
        });
        builder.addCase(fetchAuthMe.rejected, (state) => {
            state._id = "";
            state.email = "";
            state.fullName = "";
            state.basket = [];
            state.createdAt = new Date(500000000000).toISOString().split('T')[0];
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
