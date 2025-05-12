import { configureStore } from '@reduxjs/toolkit'
import langReducer from './slices/langSlice'
import authReducer from './slices/authSlice'
import loginReducer from './slices/loginSlice'
import assemblyManualGetAllReducer from './slices/assemblyManualGetAllSlice'
import assemblyManualGetReducer from './slices/assemblyManualGetSlice'
import assemblyManualCreateReducer from './slices/assemblyManualCreateSlice'
import assemblyManualUpdateReducer from './slices/assemblyManualUpdateSlice'
import assemblyManualDeleteReducer from './slices/assemblyManualDeleteSlice'
import assemblyFailureGetAllReducer from './slices/assemblyFailureGetAllSlice'
import assemblyFailureGetAllByManualReducer from './slices/assemblyFailureGetAllByManualSlice'
import assemblyFailureGetReducer from './slices/assemblyFailureGetSlice'
import assemblyFailureCreateReducer from './slices/assemblyFailureCreateSlice'
import assemblyFailureUpdateReducer from './slices/assemblyFailureUpdateSlice'
import assemblyFailureDeleteReducer from './slices/assemblyFailureDeleteSlice'
import assemblySuccessGetAllReducer from './slices/assemblySuccessGetAllSlice'
import assemblySuccessGetAllByManualReducer from './slices/assemblySuccessGetAllByManualSlice'
import assemblySuccessGetReducer from './slices/assemblySuccessGetSlice'
import assemblySuccessCreateReducer from './slices/assemblySuccessCreateSlice'
import assemblySuccessUpdateReducer from './slices/assemblySuccessUpdateSlice'
import assemblySuccessDeleteReducer from './slices/assemblySuccessDeleteSlice'
import assemblyNoteGetAllReducer from './slices/assemblyNoteGetAllSlice'
import assemblyNoteGetAllByManualReducer from './slices/assemblyNoteGetAllByManualSlice'
import assemblyNoteGetReducer from './slices/assemblyNoteGetSlice'
import assemblyNoteCreateReducer from './slices/assemblyNoteCreateSlice'
import assemblyNoteUpdateReducer from './slices/assemblyNoteUpdateSlice'
import assemblyNoteDeleteReducer from './slices/assemblyNoteDeleteSlice'
import assemblyVisualNoteCreateReducer from './slices/assemblyVisualNoteCreateSlice'
import assemblyVisualNoteGetReducer from './slices/assemblyVisualNoteGetSlice'
import assemblyVisualNoteGetAllByDrawingReducer from './slices/assemblyVisualNoteGetAllByDrawingSlice'
import assemblyVisualNoteDeleteReducer from './slices/assemblyVisualNoteDeleteSlice'
import cmmGetAllReducer from './slices/cmmGetAllSlice'
import cmmGetReducer from './slices/cmmGetSlice'
import cmmCreateReducer from './slices/cmmCreateSlice'
import cmmUpdateReducer from './slices/cmmUpdateSlice'
import cmmDeleteReducer from './slices/cmmDeleteSlice'
import cmmFailureGetAllReducer from './slices/cmmFailureGetAllSlice'
import cmmFailureGetAllByManualReducer from './slices/cmmFailureGetAllByManualSlice'
import cmmFailureGetReducer from './slices/cmmFailureGetSlice'
import cmmFailureCreateReducer from './slices/cmmFailureCreateSlice'
import cmmFailureUpdateReducer from './slices/cmmFailureUpdateSlice'
import cmmFailureDeleteReducer from './slices/cmmFailureDeleteSlice'
import cmmModuleGetAllReducer from './slices/cmmModuleGetAllSlice'
import cmmModuleGetReducer from './slices/cmmModuleGetSlice'
import cmmModuleCreateReducer from './slices/cmmModuleCreateSlice'
import cmmModuleUpdateReducer from './slices/cmmModuleUpdateSlice'
import cmmModuleDeleteReducer from './slices/cmmModuleDeleteSlice'
import cmmSuccessGetAllReducer from './slices/cmmSuccessGetAllSlice'
import cmmSuccessGetAllByManualReducer from './slices/cmmSuccessGetAllByManualSlice'
import cmmSuccessGetReducer from './slices/cmmSuccessGetSlice'
import cmmSuccessCreateReducer from './slices/cmmSuccessCreateSlice'
import cmmSuccessUpdateReducer from './slices/cmmSuccessUpdateSlice'
import cmmSuccessDeleteReducer from './slices/cmmSuccessDeleteSlice'
import cmmNoteGetAllReducer from './slices/cmmNoteGetAllSlice'
import cmmNoteGetAllByManualReducer from './slices/cmmNoteGetAllByManualSlice'
import cmmNoteGetReducer from './slices/cmmNoteGetSlice'
import cmmNoteCreateReducer from './slices/cmmNoteCreateSlice'
import cmmNoteUpdateReducer from './slices/cmmNoteUpdateSlice'
import cmmNoteDeleteReducer from './slices/cmmNoteDeleteSlice'
import employeeGetAllReducer from './slices/employeeGetAllSlice'
import employeeGetReducer from './slices/employeeGetSlice'
import employeeCreateReducer from './slices/employeeCreateSlice'
import employeeUpdateReducer from './slices/employeeUpdateSlice'
import employeeDeleteReducer from './slices/employeeDeleteSlice'
import technicalDrawingGetAllReducer from './slices/technicalDrawingGetAllSlice'
import technicalDrawingGetReducer from './slices/technicalDrawingGetSlice'
import technicalDrawingCreateReducer from './slices/technicalDrawingCreateSlice'
import technicalDrawingUpdateReducer from './slices/technicalDrawingUpdateSlice'
import technicalDrawingDeleteReducer from './slices/technicalDrawingDeleteSlice'
import technicalDrawingFailureGetAllReducer from './slices/technicalDrawingFailureGetAllSlice'
import technicalDrawingFailureGetAllByDrawingReducer from './slices/technicalDrawingFailureGetAllByDrawingSlice'
import technicalDrawingFailureGetReducer from './slices/technicalDrawingFailureGetSlice'
import technicalDrawingFailureCreateReducer from './slices/technicalDrawingFailureCreateSlice'
import technicalDrawingFailureUpdateReducer from './slices/technicalDrawingFailureUpdateSlice'
import technicalDrawingFailureDeleteReducer from './slices/technicalDrawingFailureDeleteSlice'
import technicalDrawingSuccessGetAllReducer from './slices/technicalDrawingSuccessGetAllSlice'
import technicalDrawingSuccessGetAllByDrawingReducer from './slices/technicalDrawingSuccessGetAllByDrawingSlice'
import technicalDrawingSuccessGetReducer from './slices/technicalDrawingSuccessGetSlice'
import technicalDrawingSuccessCreateReducer from './slices/technicalDrawingSuccessCreateSlice'
import technicalDrawingSuccessUpdateReducer from './slices/technicalDrawingSuccessUpdateSlice'
import technicalDrawingSuccessDeleteReducer from './slices/technicalDrawingSuccessDeleteSlice'
import technicalDrawingNoteGetAllReducer from './slices/technicalDrawingNoteGetAllSlice'
import technicalDrawingNoteGetAllByDrawingReducer from './slices/technicalDrawingNoteGetAllByDrawingSlice'
import technicalDrawingNoteGetReducer from './slices/technicalDrawingNoteGetSlice'
import technicalDrawingNoteCreateReducer from './slices/technicalDrawingNoteCreateSlice'
import technicalDrawingNoteUpdateReducer from './slices/technicalDrawingNoteUpdateSlice'
import technicalDrawingNoteDeleteReducer from './slices/technicalDrawingNoteDeleteSlice'
import technicalDrawingVisualNoteCreateReducer from './slices/technicalDrawingVisualNoteCreateSlice'
import technicalDrawingVisualNoteGetReducer from './slices/technicalDrawingVisualNoteGetSlice'
import technicalDrawingVisualNoteGetAllByDrawingReducer from './slices/technicalDrawingVisualNoteGetAllByDrawingSlice'
import technicalDrawingVisualNoteDeleteReducer from './slices/technicalDrawingVisualNoteDeleteSlice'
import userCreateReducer from './slices/userCreateSlice'
import userUpdateReducer from './slices/userUpdateSlice'
import userDeleteReducer from './slices/userDeleteSlice'
import userGetAllReducer from './slices/userGetAllSlice'
import userGetReducer from './slices/userGetSlice'
import departmentGetAllReducer from './slices/departmentGetAllSlice'
import departmentGetReducer from './slices/departmentGetSlice'
import departmentCreateReducer from './slices/departmentCreateSlice'
import departmentUpdateReducer from './slices/departmentUpdateSlice'
import departmentDeleteReducer from './slices/departmentDeleteSlice'
import assemblyQualityGetAllByFailureReducer from './slices/assemblyQualityGetAllByFailureSlice'
import assemblyQualityGetAllReducer from './slices/assemblyQualityGetAllSlice'
import assemblyQualityDeleteReducer from './slices/assemblyQualityDeleteSlice'
import technicalDrawingQualityGetAllByFailureReducer from './slices/technicalDrawingQualityGetAllByFailureSlice'
import technicalDrawingQualityGetAllReducer from './slices/technicalDrawingQualityGetAllSlice'
import technicalDrawingQualityDeleteReducer from './slices/technicalDrawingQualityDeleteSlice'
import servicesGetAllReducer from './slices/servicesGetAllSlice'
import servicesGetReducer from './slices/servicesGetSlice'
import servicesCreateReducer from './slices/servicesCreateSlice'
import servicesUpdateReducer from './slices/servicesUpdateSlice'
import servicesDeleteReducer from './slices/servicesDeleteSlice'
import userPermissionGetAllReducer from './slices/userPermissionGetAllSlice'
import userPermissionGetReducer from './slices/userPermissionGetSlice'
import userPermissionCreateReducer from './slices/userPermissionCreateSlice'
import userPermissionUpdateReducer from './slices/userPermissionUpdateSlice'
import userPermissionDeleteReducer from './slices/userPermissionDeleteSlice'

export const store = configureStore({
    reducer: {
        auth: authReducer,
        assemblyManualGetAll: assemblyManualGetAllReducer,
        assemblyManualGet: assemblyManualGetReducer,
        assemblyManualCreate: assemblyManualCreateReducer,
        assemblyManualUpdate: assemblyManualUpdateReducer,
        assemblyManualDelete: assemblyManualDeleteReducer,
        assemblyFailureGetAll: assemblyFailureGetAllReducer,
        assemblyFailureGetAllByManual: assemblyFailureGetAllByManualReducer,
        assemblyFailureGet: assemblyFailureGetReducer,
        assemblyFailureCreate: assemblyFailureCreateReducer,
        assemblyFailureUpdate: assemblyFailureUpdateReducer,
        assemblyFailureDelete: assemblyFailureDeleteReducer,
        assemblyNoteGetAll: assemblyNoteGetAllReducer,
        assemblyNoteGetAllByManual: assemblyNoteGetAllByManualReducer,
        assemblyNoteGet: assemblyNoteGetReducer,
        assemblyNoteCreate: assemblyNoteCreateReducer,
        assemblyNoteUpdate: assemblyNoteUpdateReducer,
        assemblyNoteDelete: assemblyNoteDeleteReducer,
        assemblyVisualNoteGetAllByDrawing: assemblyVisualNoteGetAllByDrawingReducer,
        assemblyVisualNoteGet: assemblyVisualNoteGetReducer,
        assemblyVisualNoteCreate: assemblyVisualNoteCreateReducer,
        assemblyVisualNoteDelete: assemblyVisualNoteDeleteReducer,
        assemblySuccessGetAll: assemblySuccessGetAllReducer,
        assemblySuccessGetAllByManual: assemblySuccessGetAllByManualReducer,
        assemblySuccessGet: assemblySuccessGetReducer,
        assemblySuccessCreate: assemblySuccessCreateReducer,
        assemblySuccessUpdate: assemblySuccessUpdateReducer,
        assemblySuccessDelete: assemblySuccessDeleteReducer,
        assemblyQualityGetAllByFailure: assemblyQualityGetAllByFailureReducer,
        assemblyQualityGetAll: assemblyQualityGetAllReducer,
        assemblyQualityDelete: assemblyQualityDeleteReducer,
        cmmGetAll: cmmGetAllReducer,
        cmmGet: cmmGetReducer,
        cmmCreate: cmmCreateReducer,
        cmmUpdate: cmmUpdateReducer,
        cmmDelete: cmmDeleteReducer,
        cmmModuleGetAll: cmmModuleGetAllReducer,
        cmmModuleGet: cmmModuleGetReducer,
        cmmModuleCreate: cmmModuleCreateReducer,
        cmmModuleUpdate: cmmModuleUpdateReducer,
        cmmModuleDelete: cmmModuleDeleteReducer,
        cmmFailureGetAll: cmmFailureGetAllReducer,
        cmmFailureGetAllByManual: cmmFailureGetAllByManualReducer,
        cmmFailureGet: cmmFailureGetReducer,
        cmmFailureCreate: cmmFailureCreateReducer,
        cmmFailureUpdate: cmmFailureUpdateReducer,
        cmmFailureDelete: cmmFailureDeleteReducer,
        cmmSuccessGetAll: cmmSuccessGetAllReducer,
        cmmSuccessGetAllByManual: cmmSuccessGetAllByManualReducer,
        cmmSuccessGet: cmmSuccessGetReducer,
        cmmSuccessCreate: cmmSuccessCreateReducer,
        cmmSuccessUpdate: cmmSuccessUpdateReducer,
        cmmSuccessDelete: cmmSuccessDeleteReducer,
        cmmNoteGetAll: cmmNoteGetAllReducer,
        cmmNoteGetAllByManual: cmmNoteGetAllByManualReducer,
        cmmNoteGet: cmmNoteGetReducer,
        cmmNoteCreate: cmmNoteCreateReducer,
        cmmNoteUpdate: cmmNoteUpdateReducer,
        cmmNoteDelete: cmmNoteDeleteReducer,
        departmentGetAll: departmentGetAllReducer,
        departmentGet: departmentGetReducer,
        departmentCreate: departmentCreateReducer,
        departmentUpdate: departmentUpdateReducer,
        departmentDelete: departmentDeleteReducer,
        employeeGetAll: employeeGetAllReducer,
        employeeGet: employeeGetReducer,
        employeeCreate: employeeCreateReducer,
        employeeUpdate: employeeUpdateReducer,
        employeeDelete: employeeDeleteReducer,
        lang: langReducer,
        login: loginReducer,
        servicesGetAll: servicesGetAllReducer,
        servicesGet: servicesGetReducer,
        servicesCreate: servicesCreateReducer,
        servicesUpdate: servicesUpdateReducer,
        servicesDelete: servicesDeleteReducer,
        technicalDrawingGetAll: technicalDrawingGetAllReducer,
        technicalDrawingGet: technicalDrawingGetReducer,
        technicalDrawingCreate: technicalDrawingCreateReducer,
        technicalDrawingUpdate: technicalDrawingUpdateReducer,
        technicalDrawingDelete: technicalDrawingDeleteReducer,
        technicalDrawingFailureGetAll: technicalDrawingFailureGetAllReducer,
        technicalDrawingFailureGetAllByDrawing: technicalDrawingFailureGetAllByDrawingReducer,
        technicalDrawingFailureGet: technicalDrawingFailureGetReducer,
        technicalDrawingFailureCreate: technicalDrawingFailureCreateReducer,
        technicalDrawingFailureUpdate: technicalDrawingFailureUpdateReducer,
        technicalDrawingFailureDelete: technicalDrawingFailureDeleteReducer,
        technicalDrawingNoteGetAll: technicalDrawingNoteGetAllReducer,
        technicalDrawingNoteGetAllByDrawing: technicalDrawingNoteGetAllByDrawingReducer,
        technicalDrawingNoteGet: technicalDrawingNoteGetReducer,
        technicalDrawingNoteCreate: technicalDrawingNoteCreateReducer,
        technicalDrawingNoteUpdate: technicalDrawingNoteUpdateReducer,
        technicalDrawingNoteDelete: technicalDrawingNoteDeleteReducer,
        technicalDrawingVisualNoteDelete: technicalDrawingVisualNoteDeleteReducer,
        technicalDrawingVisualNoteGetAllByDrawing: technicalDrawingVisualNoteGetAllByDrawingReducer,
        technicalDrawingVisualNoteGet: technicalDrawingVisualNoteGetReducer,
        technicalDrawingVisualNoteCreate: technicalDrawingVisualNoteCreateReducer,
        technicalDrawingSuccessGetAll: technicalDrawingSuccessGetAllReducer,
        technicalDrawingSuccessGetAllByDrawing: technicalDrawingSuccessGetAllByDrawingReducer,
        technicalDrawingSuccessGet: technicalDrawingSuccessGetReducer,
        technicalDrawingSuccessCreate: technicalDrawingSuccessCreateReducer,
        technicalDrawingSuccessUpdate: technicalDrawingSuccessUpdateReducer,
        technicalDrawingSuccessDelete: technicalDrawingSuccessDeleteReducer,
        technicalDrawingQualityGetAllByFailure: technicalDrawingQualityGetAllByFailureReducer,
        technicalDrawingQualityGetAll: technicalDrawingQualityGetAllReducer,
        technicalDrawingQualityDelete: technicalDrawingQualityDeleteReducer,
        userCreate: userCreateReducer,
        userUpdate: userUpdateReducer,
        userDelete: userDeleteReducer,
        userGetAll: userGetAllReducer,
        userGet: userGetReducer,
        userPermissionGetAll: userPermissionGetAllReducer,
        userPermissionGet: userPermissionGetReducer,
        userPermissionCreate: userPermissionCreateReducer,
        userPermissionUpdate: userPermissionUpdateReducer,
        userPermissionDelete: userPermissionDeleteReducer,
    },
});

export default store;
