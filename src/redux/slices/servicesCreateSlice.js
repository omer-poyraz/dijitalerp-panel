import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { ServicesCreateService } from '../../services';

export const fetchServicesCreate = createAsyncThunk(
    'servicesCreate/fetchServicesCreate',
    async ({ formData }) => {
        const userId = localStorage.getItem("auth") === null ? null : JSON.parse(localStorage.getItem("auth")).user?.userId

        const data = {
            "name": formData.name,
            "endPoint": formData.endpoint,
            "userId": userId,
        }

        const response = await ServicesCreateService(data)
        return response.result
    }
);

const servicesCreateSlice = createSlice({
    name: 'servicesCreate',
    initialState: {
        data: null,
        status: 'idle',
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchServicesCreate.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchServicesCreate.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.data = action.payload;
            })
            .addCase(fetchServicesCreate.rejected, (state) => {
                state.status = 'failed';
            });
    },
});

export default servicesCreateSlice.reducer;
