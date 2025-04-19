import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { LoginService } from '../../services';

export const fetchLogin = createAsyncThunk(
    'login/fetchLogin',
    async ({ userName, password }) => {
        const response = await LoginService(userName, password)
        return response;
    }
);

const loginSlice = createSlice({
    name: 'login',
    initialState: {
        login: null,
        status: 'idle',
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchLogin.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchLogin.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.login = action.payload;
            })
            .addCase(fetchLogin.rejected, (state) => {
                console.log("burası")
                state.status = 'failed';
            });
    },
});

export default loginSlice.reducer;
