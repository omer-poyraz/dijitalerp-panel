import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { DepartmentUpdateService } from '../../services';

export const fetchDepartmentUpdate = createAsyncThunk(
    'departmentUpdate/fetchDepartmentUpdate',
    async ({ name, id }) => {
        const data = {
            "name": name,
            "id": id
        }

        const response = await DepartmentUpdateService(data)
        return response.result
    }
);

const departmentUpdateSlice = createSlice({
    name: 'departmentUpdate',
    initialState: {
        data: null,
        status: 'idle',
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchDepartmentUpdate.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchDepartmentUpdate.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.data = action.payload;
            })
            .addCase(fetchDepartmentUpdate.rejected, (state) => {
                state.status = 'failed';
            });
    },
});

export default departmentUpdateSlice.reducer;
