import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { DepartmentCreateService } from '../../services';

export const fetchDepartmentCreate = createAsyncThunk(
    'departmentCreate/fetchDepartmentCreate',
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
