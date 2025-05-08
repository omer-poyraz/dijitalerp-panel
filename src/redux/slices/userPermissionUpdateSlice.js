import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { UserPermissionUpdateService } from '../../services';

export const fetchUserPermissionUpdate = createAsyncThunk(
    'userPermissionUpdate/fetchUserPermissionUpdate',
    async ({ formData, id }) => {
        const data = {
            "serviceName": formData.serviceName,
            "canRead": formData.canRead,
            "canWrite": formData.canWrite,
            "canDelete": formData.canDelete,
            "id": id,
            "userId": formData.userId,
        }

        const response = await UserPermissionUpdateService(data)
        return response.result
    }
);

const userPermissionUpdateSlice = createSlice({
    name: 'userPermissionUpdate',
    initialState: {
        data: null,
        status: 'idle',
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserPermissionUpdate.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchUserPermissionUpdate.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.data = action.payload;
            })
            .addCase(fetchUserPermissionUpdate.rejected, (state) => {
                state.status = 'failed';
            });
    },
});

export default userPermissionUpdateSlice.reducer;
