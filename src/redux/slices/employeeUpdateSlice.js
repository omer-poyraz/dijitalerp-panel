import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { EmployeeUpdateService } from '../../services';

export const fetchEmployeeUpdate = createAsyncThunk(
    'employeeUpdate/fetchEmployeeUpdate',
    async ({ formData, id }) => {
        const userId = localStorage.getItem("auth") === null ? null : JSON.parse(localStorage.getItem("auth")).user?.userId

        const data = new FormData();
        console.log(formData.file)
        if (formData.file) {
            data.append("file", formData.file);
        }
        data.append("Name", formData.name)
        data.append("Surname", formData.surname)
        data.append("Email", formData.email)
        data.append("Phone", formData.phone)
        data.append("Address", formData.address)
        data.append("Field", formData.field)
        data.append("Birthday", formData.birthday || new Date().toLocaleDateString())
        data.append("StartDate", formData.startdate || new Date().toLocaleDateString())
        data.append("UserId", userId)
        data.append("ID", id)

        const response = await EmployeeUpdateService(data)
        return response.result
    }
);

const employeeUpdateSlice = createSlice({
    name: 'employeeUpdate',
    initialState: {
        data: null,
        status: 'idle',
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchEmployeeUpdate.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchEmployeeUpdate.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.data = action.payload;
            })
            .addCase(fetchEmployeeUpdate.rejected, (state) => {
                state.status = 'failed';
            });
    },
});

export default employeeUpdateSlice.reducer;
