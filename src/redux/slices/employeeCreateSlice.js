import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { EmployeeCreateService } from '../../services';

export const fetchEmployeeCreate = createAsyncThunk(
    'employeeCreate/fetchEmployeeCreate',
    async ({ formData }) => {
        const userId = localStorage.getItem("auth") === null ? null : JSON.parse(localStorage.getItem("auth")).user?.userId

        const data = new FormData();
        if (formData.file) {
            if (Array.isArray(formData.file)) {
                formData.file.forEach(file => {
                    if (file instanceof File) {
                        data.append("file", file);
                    }
                });
            }
            else if (formData.file instanceof File) {
                data.append("file", formData.file);
            }
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

        const response = await EmployeeCreateService(data)
        return response.result
    }
);

const employeeCreateSlice = createSlice({
    name: 'employeeCreate',
    initialState: {
        data: null,
        status: 'idle',
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchEmployeeCreate.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchEmployeeCreate.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.data = action.payload;
            })
            .addCase(fetchEmployeeCreate.rejected, (state) => {
                state.status = 'failed';
            });
    },
});

export default employeeCreateSlice.reducer;
