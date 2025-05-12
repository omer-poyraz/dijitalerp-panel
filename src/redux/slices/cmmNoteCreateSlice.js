import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { CMMNoteCreateService } from '../../services';

export const fetchCMMNoteCreate = createAsyncThunk(
    'cmmNoteCreate/fetchCMMNoteCreate',
    async ({ formData, manualId }) => {
        const userId = localStorage.getItem("auth") === null ? null : JSON.parse(localStorage.getItem("auth")).user?.userId

        const data = {
            "note": formData.Note,
            "partCode": formData.PartCode,
            "description": formData.Description,
            "status": true,
            "cmmid": manualId,
            "userId": userId
        }

        const response = await CMMNoteCreateService(data)
        return response.result
    }
);

const cmmNoteCreateSlice = createSlice({
    name: 'cmmNoteCreate',
    initialState: {
        data: null,
        status: 'idle',
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCMMNoteCreate.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchCMMNoteCreate.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.data = action.payload;
            })
            .addCase(fetchCMMNoteCreate.rejected, (state) => {
                state.status = 'failed';
            });
    },
});

export default cmmNoteCreateSlice.reducer;
