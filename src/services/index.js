import axios from "axios"
import { ASSEMBLY_FAILURE_CREATE, ASSEMBLY_FAILURE_DELETE, ASSEMBLY_FAILURE_GET, ASSEMBLY_FAILURE_GETALL, ASSEMBLY_FAILURE_GETALLBYMANUAL, ASSEMBLY_FAILURE_UPDATE, ASSEMBLY_MANUAL_CREATE, ASSEMBLY_MANUAL_DELETE, ASSEMBLY_MANUAL_GET, ASSEMBLY_MANUAL_GETALL, ASSEMBLY_MANUAL_UPDATE, ASSEMBLY_NOTE_CREATE, ASSEMBLY_NOTE_DELETE, ASSEMBLY_NOTE_GET, ASSEMBLY_NOTE_GETALL, ASSEMBLY_NOTE_GETALLBYMANUAL, ASSEMBLY_NOTE_UPDATE, ASSEMBLY_SUCCESS_CREATE, ASSEMBLY_SUCCESS_DELETE, ASSEMBLY_SUCCESS_GETALL, ASSEMBLY_SUCCESS_GETALLBYMANUAL, ASSEMBLY_SUCCESS_UPDATE, EMPLOYEE_CREATE, EMPLOYEE_DELETE, EMPLOYEE_GET, EMPLOYEE_GETALL, EMPLOYEE_UPDATE, LOGIN_SERVICE, RESET_PASSWORD_SERVICE } from "../api"

const token = localStorage.getItem("auth") === null ? null : JSON.parse(localStorage.getItem("auth")).accessToken
const language = localStorage.getItem("lang") === null ? "tr" : localStorage.getItem("lang")
const header = { headers: { "Authorization": `Bearer ${token}`, "Accept-Language": language } }
const headerFormData = { headers: { "Authorization": `Bearer ${token}`, "Content-Type": "multipart/form-data", "Accept-Language": language } }


// AUTHENTICATION
export function LoginService(userName, password) {
    return axios.post(LOGIN_SERVICE, { "userName": userName, "password": password }, header)
        .then(res => res.data).catch(er => { console.log(er.response.data); return er.response.data })
}
// AUTHENTICATION_END


// ASSEMBLY_MANUAL
export function AssemblyManualGetAllService() {
    return axios.get(ASSEMBLY_MANUAL_GETALL, header)
        .then(res => res.data).catch(er => { console.log(er.response.data); return er.response.data })
}
export function AssemblyManualGetService(id) {
    return axios.get(`${ASSEMBLY_MANUAL_GET}/${id}`, header)
        .then(res => res.data).catch(er => { console.log(er.response.data); return er.response.data })
}
export function AssemblyManualCreateService(data) {
    return axios.post(ASSEMBLY_MANUAL_CREATE, data, headerFormData)
        .then(res => res.data).catch(er => { console.log(er.response.data); return er.response.data })
}
export function AssemblyManualUpdateService(data) {
    return axios.put(ASSEMBLY_MANUAL_UPDATE, data, headerFormData)
        .then(res => res.data).catch(er => { console.log(er.response.data); return er.response.data })
}
export function AssemblyManualDeleteService(id) {
    return axios.delete(`${ASSEMBLY_MANUAL_DELETE}/${id}`, header)
        .then(res => res.data).catch(er => { console.log(er.response.data); return er.response.data })
}
// ASSEMBLY_MANUAL_END


// ASSEMBLY_FAILURE
export function AssemblyFailureGetAllService() {
    return axios.get(ASSEMBLY_FAILURE_GETALL, header)
        .then(res => res.data).catch(er => { console.log(er.response.data); return er.response.data })
}
export function AssemblyFailureGetAllByManualService(id) {
    return axios.get(`${ASSEMBLY_FAILURE_GETALLBYMANUAL}/${id}`, header)
        .then(res => res.data).catch(er => { console.log(er.response.data); return er.response.data })
}
export function AssemblyFailureGetService(id) {
    return axios.get(`${ASSEMBLY_FAILURE_GET}/${id}`, header)
        .then(res => res.data).catch(er => { console.log(er.response.data); return er.response.data })
}
export function AssemblyFailureCreateService(data) {
    return axios.post(ASSEMBLY_FAILURE_CREATE, data, header)
        .then(res => res.data).catch(er => { console.log(er.response.data); return er.response.data })
}
export function AssemblyFailureUpdateService(data) {
    return axios.put(ASSEMBLY_FAILURE_UPDATE, data, header)
        .then(res => res.data).catch(er => { console.log(er.response.data); return er.response.data })
}
export function AssemblyFailureDeleteService(id) {
    return axios.delete(`${ASSEMBLY_FAILURE_DELETE}/${id}`, header)
        .then(res => res.data).catch(er => { console.log(er.response.data); return er.response.data })
}
// ASSEMBLY_FAILURE_END


// ASSEMBLY_SUCCESS
export function AssemblySuccessGetAllService() {
    return axios.get(ASSEMBLY_SUCCESS_GETALL, header)
        .then(res => res.data).catch(er => { console.log(er.response.data); return er.response.data })
}
export function AssemblySuccessGetAllByManualService(id) {
    return axios.get(`${ASSEMBLY_SUCCESS_GETALLBYMANUAL}/${id}`, header)
        .then(res => res.data).catch(er => { console.log(er.response.data); return er.response.data })
}
export function AssemblySuccessGetService(id) {
    return axios.get(`${ASSEMBLY_SUCCESS_GETALL}/${id}`, header)
        .then(res => res.data).catch(er => { console.log(er.response.data); return er.response.data })
}
export function AssemblySuccessCreateService(data) {
    return axios.post(ASSEMBLY_SUCCESS_CREATE, data, header)
        .then(res => res.data).catch(er => { console.log(er.response.data); return er.response.data })
}
export function AssemblySuccessUpdateService(data) {
    return axios.put(ASSEMBLY_SUCCESS_UPDATE, data, header)
        .then(res => res.data).catch(er => { console.log(er.response.data); return er.response.data })
}
export function AssemblySuccessDeleteService(id) {
    return axios.delete(`${ASSEMBLY_SUCCESS_DELETE}/${id}`, header)
        .then(res => res.data).catch(er => { console.log(er.response.data); return er.response.data })
}
// ASSEMBLY_SUCCESS_END


// ASSEMBLY_NOTE
export function AssemblyNoteGetAllService() {
    return axios.get(ASSEMBLY_NOTE_GETALL, header)
        .then(res => res.data).catch(er => { console.log(er.response.data); return er.response.data })
}
export function AssemblyNoteGetAllByManualService(id) {
    return axios.get(`${ASSEMBLY_NOTE_GETALLBYMANUAL}/${id}`, header)
        .then(res => res.data).catch(er => { console.log(er.response.data); return er.response.data })
}
export function AssemblyNoteGetService(id) {
    return axios.get(`${ASSEMBLY_NOTE_GET}/${id}`, header)
        .then(res => res.data).catch(er => { console.log(er.response.data); return er.response.data })
}
export function AssemblyNoteCreateService(data) {
    return axios.post(ASSEMBLY_NOTE_CREATE, data, header)
        .then(res => res.data).catch(er => { console.log(er.response.data); return er.response.data })
}
export function AssemblyNoteUpdateService(data) {
    return axios.put(ASSEMBLY_NOTE_UPDATE, data, header)
        .then(res => res.data).catch(er => { console.log(er.response.data); return er.response.data })
}
export function AssemblyNoteDeleteService(id) {
    return axios.delete(`${ASSEMBLY_NOTE_DELETE}/${id}`, header)
        .then(res => res.data).catch(er => { console.log(er.response.data); return er.response.data })
}
// ASSEMBLY_NOTE_END


// EMPLOYEE
export function EmployeeGetAllService() {
    return axios.get(EMPLOYEE_GETALL, header)
        .then(res => res.data).catch(er => { console.log(er.response.data); return er.response.data })
}
export function EmployeeGetService(id) {
    return axios.get(`${EMPLOYEE_GET}/${id}`, header)
        .then(res => res.data).catch(er => { console.log(er.response.data); return er.response.data })
}
export function EmployeeCreateService(data) {
    return axios.post(EMPLOYEE_CREATE, data, headerFormData)
        .then(res => res.data).catch(er => { console.log(er.response.data); return er.response.data })
}
export function EmployeeUpdateService(data) {
    return axios.put(EMPLOYEE_UPDATE, data, headerFormData)
        .then(res => res.data).catch(er => { console.log(er.response.data); return er.response.data })
}
export function EmployeeDeleteService(id) {
    return axios.delete(`${EMPLOYEE_DELETE}/${id}`, header)
        .then(res => res.data).catch(er => { console.log(er.response.data); return er.response.data })
}
// EMPLOYEE_END


// USER
export function ResetPassordService(mail) {
    return axios.get(RESET_PASSWORD_SERVICE, { "mail": mail }, header)
        .then(res => res.data).catch(er => { console.log(er.response.data); return er.response.data })
}
// USER_END