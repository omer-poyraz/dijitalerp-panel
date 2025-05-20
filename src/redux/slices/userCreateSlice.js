import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { UserCreate } from '../../services';

export const fetchUserCreate = createAsyncThunk(
    'userCreate/fetchUserCreate',
    async ({ file, FirstName, LastName, UserName, Email, Password, TCKNO, Field, PhoneNumber2, DepartmentID, Title, StartDate, DepartureDate, Gender, IsActive, Roles }) => {
        var roles = []
        roles.push(Roles)
        const formData = new FormData();
        if (file) formData.append("file", file[0]);
        formData.append("FirstName", FirstName);
        formData.append("LastName", LastName);
        formData.append("UserName", UserName);
        formData.append("Email", Email);
        formData.append("Password", Password || "DijitalErp123.");
        formData.append("TCKNO", TCKNO);
        formData.append("Field", Field);
        formData.append("PhoneNumber2", PhoneNumber2);
        if (DepartmentID !== null) formData.append("DepartmentID", DepartmentID);
        formData.append("Title", Title || "");
        formData.append("StartDate", new Date(StartDate).toISOString());
        formData.append("DepartureDate", new Date(DepartureDate).toISOString());
        formData.append("Gender", Gender || "Erkek");
        formData.append("IsActive", IsActive || true);
        formData.append("Roles", roles || ["Personel"]);

        const response = await UserCreate(formData)
        return response.result
    }
);

const userCreateSlice = createSlice({
    name: 'userCreate',
    initialState: {
        data: null,
        status: 'idle',
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserCreate.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchUserCreate.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.data = action.payload;
            })
            .addCase(fetchUserCreate.rejected, (state) => {
                state.status = 'failed';
            });
    },
});

export default userCreateSlice.reducer;
