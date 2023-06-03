import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../axios';


export const fetchUserData = createAsyncThunk<AuthState>('auth/fetchUserData', async (login, password) => {
    const { data } = await axios.post<AuthState>('/auth/login', login, password);
    return data;
});

export interface AuthState {
    email: string;
    passwordHash: string;
}

const initialState: AuthState = {
    email: "",
    passwordHash: "",
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(fetchUserData.pending, (state) => {
            state.email = "";
            state.passwordHash = "";
        });
        builder.addCase(fetchUserData.fulfilled, (state, action) => {
            state.email = action.payload.email;
            state.passwordHash = action.payload.passwordHash;
        });
        builder.addCase(fetchUserData.rejected, (state) => {
            state.email = "";
            state.passwordHash = "";
        });
    },
});

export default authSlice.reducer;