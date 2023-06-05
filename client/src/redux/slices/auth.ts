import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../axios';
import { IFormValues, IFormValues2 } from '../../components/UI/Modal/Input/MyInput';
import { RootState } from '../store';


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

export interface AuthState {
    email: string;
    fullName: string;
}

const initialState: AuthState = {
    email: "",
    fullName: "",
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        signout: (state) => {
            state.email = ""
            state.fullName = ""
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchAuth.pending, (state) => {
            state.email = "";
            state.fullName = "";
        });
        builder.addCase(fetchAuth.fulfilled, (state, action) => {
            state.email = action.payload.email;
            state.fullName = action.payload.fullName;
        });
        builder.addCase(fetchAuth.rejected, (state) => {
            state.email = "";
            state.fullName = "";
        });
        builder.addCase(fetchRegister.pending, (state) => {
            state.email = "";
            state.fullName = "";
        });
        builder.addCase(fetchRegister.fulfilled, (state, action) => {
            state.email = action.payload.email;
            state.fullName = action.payload.fullName;
        });
        builder.addCase(fetchRegister.rejected, (state) => {
            state.email = "";
            state.fullName = "";
        });
    },
});

export const selectIsAuth = (state: RootState) => Boolean(state.auth.email && state.auth.fullName);

export default authSlice.reducer;

export const { signout } = authSlice.actions;
