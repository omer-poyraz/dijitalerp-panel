import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { UserPermissionGetAllService } from '../../services';

export const fetchUserPermissionGetAll = createAsyncThunk(
    'userPermissionGetAll/fetchUserPermissionGetAll',
    async () => {
        const response = await UserPermissionGetAllService()
        return response.result
    }
);

const userPermissionGetAllSlice = createSlice({
    name: 'userPermissionGetAll',
    initialState: {
        data: null,
        status: 'idle',
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserPermissionGetAll.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchUserPermissionGetAll.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.data = action.payload;
            })
            .addCase(fetchUserPermissionGetAll.rejected, (state) => {
                state.status = 'failed';
            });
    },
});

export default userPermissionGetAllSlice.reducer;
