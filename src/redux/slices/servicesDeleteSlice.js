import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { ServicesDeleteService } from '../../services';

export const fetchServicesDelete = createAsyncThunk(
    'servicesDelete/fetchServicesDelete',
    async ({ id }) => {
        const response = await ServicesDeleteService(id)
        return response.result
    }
);

const servicesDeleteSlice = createSlice({
    name: 'servicesDelete',
    initialState: {
        data: null,
        status: 'idle',
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchServicesDelete.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchServicesDelete.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.data = action.payload;
            })
            .addCase(fetchServicesDelete.rejected, (state) => {
                state.status = 'failed';
            });
    },
});

export default servicesDeleteSlice.reducer;
