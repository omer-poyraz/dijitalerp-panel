import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchAuth = createAsyncThunk(
    'auth/fetchAuth',
    async () => {
        var data = localStorage.getItem('auth');
        if (data === null) {
            return null;
        }
        data = JSON.parse(data);
        return data;
    }
);

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        auth: null,
        status: 'idle',
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAuth.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchAuth.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.auth = action.payload;
            })
            .addCase(fetchAuth.rejected, (state) => {
                console.log("burası")
                state.status = 'failed';
            });
    },
});

export default authSlice.reducer;
