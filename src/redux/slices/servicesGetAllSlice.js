import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { ServicesGetAllService } from '../../services';

export const fetchServicesGetAll = createAsyncThunk(
    'servicesGetAll/fetchServicesGetAll',
    async () => {
        const response = await ServicesGetAllService()
        return response.result
    }
);

const servicesGetAllSlice = createSlice({
    name: 'servicesGetAll',
    initialState: {
        data: null,
        status: 'idle',
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchServicesGetAll.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchServicesGetAll.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.data = action.payload;
            })
            .addCase(fetchServicesGetAll.rejected, (state) => {
                state.status = 'failed';
            });
    },
});

export default servicesGetAllSlice.reducer;
