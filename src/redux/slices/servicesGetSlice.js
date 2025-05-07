import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { ServicesGetService } from '../../services';

export const fetchServicesGet = createAsyncThunk(
    'servicesGet/fetchServicesGet',
    async ({ id }) => {
        const response = await ServicesGetService(id)
        return response.result
    }
);

const servicesGetSlice = createSlice({
    name: 'servicesGet',
    initialState: {
        data: null,
        status: 'idle',
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchServicesGet.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchServicesGet.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.data = action.payload;
            })
            .addCase(fetchServicesGet.rejected, (state) => {
                state.status = 'failed';
            });
    },
});

export default servicesGetSlice.reducer;
