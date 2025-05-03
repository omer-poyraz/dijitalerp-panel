import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TechnicalDrawingVisualNoteCreateService } from '../../services';

export const fetchTechnicalDrawingVisualNoteCreate = createAsyncThunk(
    'technicalDrawingVisualNoteCreate/fetchTechnicalDrawingVisualNoteCreate',
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
        
        const response = await TechnicalDrawingVisualNoteCreateService(data)
        return response.result
    }
);

const technicalDrawingVisualNoteCreateSlice = createSlice({
    name: 'technicalDrawingVisualNoteCreate',
    initialState: {
        data: null,
        status: 'idle',
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchTechnicalDrawingVisualNoteCreate.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchTechnicalDrawingVisualNoteCreate.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.data = action.payload;
            })
            .addCase(fetchTechnicalDrawingVisualNoteCreate.rejected, (state) => {
                state.status = 'failed';
            });
    },
});

export default technicalDrawingVisualNoteCreateSlice.reducer;
