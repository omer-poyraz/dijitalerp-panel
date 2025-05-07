import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { DepartmentCreateService } from '../../services';

export const fetchDepartmentCreate = createAsyncThunk(
    'departmentCreate/fetchDepartmentCreate',
    async ({ name }) => {
        const data = {
            "name": name,
        }

        const response = await DepartmentCreateService(data)
        return response.result
    }
);

const departmentCreateSlice = createSlice({
    name: 'departmentCreate',
    initialState: {
        data: null,
        status: 'idle',
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchDepartmentCreate.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchDepartmentCreate.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.data = action.payload;
            })
            .addCase(fetchDepartmentCreate.rejected, (state) => {
                state.status = 'failed';
            });
    },
});

export default departmentCreateSlice.reducer;
