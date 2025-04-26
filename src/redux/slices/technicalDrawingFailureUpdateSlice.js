import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TechnicalDrawingFailureUpdateService } from '../../services';

export const fetchTechnicalDrawingFailureUpdate = createAsyncThunk(
    'technicalDrawingFailureUpdate/fetchTechnicalDrawingFailureUpdate',
    async ({ formData, id, manualId }) => {
        const userId = localStorage.getItem("auth") === null ? null : JSON.parse(localStorage.getItem("auth")).user?.userId

        const data = {
            "inappropriateness": formData.inappropriateness,
            "projectName": formData.projectName,
            "stand": formData.stand,
            "partCode": formData.partCode,
            "description": formData.description,
            "productionQuantity": parseInt(formData.productionQuantity),
            "quantityDescription": formData.quantityDescription,
            "approval": formData.approval,
            "date": new Date(formData.date).toISOString(),
            "operatorID": formData.operatorID,
            "status": Boolean(formData.status),
            "technicalDrawingID": parseInt(manualId),
            "id": id,
            "userId": userId
        }

        const response = await TechnicalDrawingFailureUpdateService(data)
        return response.result
    }
);

const technicalDrawingFailureUpdateSlice = createSlice({
    name: 'technicalDrawingFailureUpdate',
    initialState: {
        data: null,
        status: 'idle',
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchTechnicalDrawingFailureUpdate.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchTechnicalDrawingFailureUpdate.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.data = action.payload;
            })
            .addCase(fetchTechnicalDrawingFailureUpdate.rejected, (state) => {
                state.status = 'failed';
            });
    },
});

export default technicalDrawingFailureUpdateSlice.reducer;
