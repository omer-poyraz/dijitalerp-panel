import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { AssemblyFailureCreateService } from '../../services';

export const fetchAssemblyFailureCreate = createAsyncThunk(
    'assemblyFailureCreate/fetchAssemblyFailureCreate',
    async ({ formData, manualId }) => {
        const userId = localStorage.getItem("auth") === null ? null : JSON.parse(localStorage.getItem("auth")).user?.userId

        const data = {
            "inappropriateness": formData.inappropriateness,
            "technicianID": formData.technicianID,
            "partCode": formData.partCode,
            "status": Boolean(formData.status),
            "pendingQuantity": parseInt(formData.pendingQuantity),
            "description": formData.description,
            "date": new Date(formData.date).toISOString(),
            "assemblyManuelID": parseInt(manualId),
            "userId": userId
        }

        const response = await AssemblyFailureCreateService(data)
        return response.result
    }
);

const assemblyFailureCreateSlice = createSlice({
    name: 'assemblyFailureCreate',
    initialState: {
        data: null,
        status: 'idle',
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAssemblyFailureCreate.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchAssemblyFailureCreate.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.data = action.payload;
            })
            .addCase(fetchAssemblyFailureCreate.rejected, (state) => {
                state.status = 'failed';
            });
    },
});

export default assemblyFailureCreateSlice.reducer;
