import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { AssemblyVisualNoteCreateService } from '../../services';

export const fetchAssemblyVisualNoteCreate = createAsyncThunk(
    'assemblyVisualNoteCreate/fetchAssemblyVisualNoteCreate',
    async ({ formData, manualId }) => {
        const userId = localStorage.getItem("auth") === null ? null : JSON.parse(localStorage.getItem("auth")).user?.userId

        const data = new FormData();
        if (formData.file && formData.file.length > 0) {
            formData.file.forEach(file => {
                data.append("file", file);
            });
        }
        data.append("AssemblyManuelID", manualId)
        data.append("UserId", userId)

        const response = await AssemblyVisualNoteCreateService(data)
        return response.result
    }
);

const assemblyVisualNoteCreateSlice = createSlice({
    name: 'assemblyVisualNoteCreate',
    initialState: {
        data: null,
        status: 'idle',
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAssemblyVisualNoteCreate.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchAssemblyVisualNoteCreate.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.data = action.payload;
            })
            .addCase(fetchAssemblyVisualNoteCreate.rejected, (state) => {
                state.status = 'failed';
            });
    },
});

export default assemblyVisualNoteCreateSlice.reducer;
