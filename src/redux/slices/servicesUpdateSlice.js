import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { ServicesUpdateService } from '../../services';

export const fetchServicesUpdate = createAsyncThunk(
    'servicesUpdate/fetchServicesUpdate',
    async ({ formData, id }) => {
        const userId = localStorage.getItem("auth") === null ? null : JSON.parse(localStorage.getItem("auth")).user?.userId

        const data = {
            "name": formData.name,
            "endPoint": formData.endpoint,
            "id": id,
            "userId": userId,
        }

        const response = await ServicesUpdateService(data)
        return response.result
    }
);

const servicesUpdateSlice = createSlice({
    name: 'servicesUpdate',
    initialState: {
        data: null,
        status: 'idle',
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchServicesUpdate.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchServicesUpdate.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.data = action.payload;
            })
            .addCase(fetchServicesUpdate.rejected, (state) => {
                state.status = 'failed';
            });
    },
});

export default servicesUpdateSlice.reducer;
