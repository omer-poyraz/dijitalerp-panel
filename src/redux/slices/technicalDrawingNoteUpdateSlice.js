import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TechnicalDrawingNoteUpdateService } from '../../services';

export const fetchTechnicalDrawingNoteUpdate = createAsyncThunk(
    'technicalDrawingNoteUpdate/fetchTechnicalDrawingNoteUpdate',
    async ({ formData, id, manualId }) => {
        const userId = localStorage.getItem("auth") === null ? null : JSON.parse(localStorage.getItem("auth")).user?.userId

        const data = {
            "note": formData.note,
            "partCode": formData.partCode,
            "description": formData.description,
            "status": Boolean(formData.status),
            "technicalDrawingID": parseInt(manualId),
            "id": id,
            "userId": userId
        }

        const response = await TechnicalDrawingNoteUpdateService(data)
        return response.result
    }
);

const technicalDrawingNoteUpdateSlice = createSlice({
    name: 'technicalDrawingNoteUpdate',
    initialState: {
        data: null,
        status: 'idle',
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchTechnicalDrawingNoteUpdate.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchTechnicalDrawingNoteUpdate.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.data = action.payload;
            })
            .addCase(fetchTechnicalDrawingNoteUpdate.rejected, (state) => {
                state.status = 'failed';
            });
    },
});

export default technicalDrawingNoteUpdateSlice.reducer;
