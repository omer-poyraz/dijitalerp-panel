import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { UserPermissionGetService } from '../../services';

export const fetchUserPermissionGet = createAsyncThunk(
    'userPermissionGet/fetchUserPermissionGet',
    async ({ id }) => {
        const response = await UserPermissionGetService(id)
        return response.result
    }
);

const userPermissionGetSlice = createSlice({
    name: 'userPermissionGet',
    initialState: {
        data: null,
        status: 'idle',
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserPermissionGet.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchUserPermissionGet.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.data = action.payload;
            })
            .addCase(fetchUserPermissionGet.rejected, (state) => {
                state.status = 'failed';
            });
    },
});

export default userPermissionGetSlice.reducer;
