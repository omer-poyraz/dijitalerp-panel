import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { UserPermissionDeleteService } from '../../services';

export const fetchUserPermissionDelete = createAsyncThunk(
    'userPermissionDelete/fetchUserPermissionDelete',
    async ({ id }) => {
        const response = await UserPermissionDeleteService(id)
        return response.result
    }
);

const userPermissionDeleteSlice = createSlice({
    name: 'userPermissionDelete',
    initialState: {
        data: null,
        status: 'idle',
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserPermissionDelete.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchUserPermissionDelete.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.data = action.payload;
            })
            .addCase(fetchUserPermissionDelete.rejected, (state) => {
                state.status = 'failed';
            });
    },
});

export default userPermissionDeleteSlice.reducer;
