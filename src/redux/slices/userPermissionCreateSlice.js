import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { UserPermissionCreateService } from '../../services';

export const fetchUserPermissionCreate = createAsyncThunk(
    'userPermissionCreate/fetchUserPermissionCreate',
    async ({ formData }) => {
        const userId = localStorage.getItem("auth") === null ? null : JSON.parse(localStorage.getItem("auth")).user?.userId

        const data = {
            "serviceName": formData.serviceName,
            "canRead": formData.canRead,
            "canWrite": formData.canWrite,
            "canDelete": formData.canDelete,
            "userId": userId,
        }

        const response = await UserPermissionCreateService(data)
        return response.result
    }
);

const userPermissionCreateSlice = createSlice({
    name: 'userPermissionCreate',
    initialState: {
        data: null,
        status: 'idle',
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserPermissionCreate.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchUserPermissionCreate.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.data = action.payload;
            })
            .addCase(fetchUserPermissionCreate.rejected, (state) => {
                state.status = 'failed';
            });
    },
});

export default userPermissionCreateSlice.reducer;
