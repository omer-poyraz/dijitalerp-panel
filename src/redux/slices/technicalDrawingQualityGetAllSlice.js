import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TechnicalDrawingQualityGetAllService } from '../../services';

export const fetchTechnicalDrawingQualityGetAll = createAsyncThunk(
    'technicalDrawingQualityGetAll/fetchTechnicalDrawingQualityGetAll',
    async () => {
        const response = await TechnicalDrawingQualityGetAllService()
        return response.result
    }
);

const technicalDrawingQualityGetAllSlice = createSlice({
    name: 'technicalDrawingQualityGetAll',
    initialState: {
        data: null,
        status: 'idle',
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchTechnicalDrawingQualityGetAll.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchTechnicalDrawingQualityGetAll.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.data = action.payload;
            })
            .addCase(fetchTechnicalDrawingQualityGetAll.rejected, (state) => {
                state.status = 'failed';
            });
    },
});

export default technicalDrawingQualityGetAllSlice.reducer;
