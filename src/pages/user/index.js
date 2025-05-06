import React, { useEffect, useState } from 'react'
import ERP from '../../components/general/ERP'
import Banner from '../../components/page/Banner'
import { useTranslation } from 'react-i18next'
import Alerts from '../../components/page/Alert'
import ERPTable from '../../components/general/ERPTable'
import { columns } from '../../utilities/columns/userColumns'
import { useDispatch, useSelector } from 'react-redux'
import ERPForm from '../../components/page/ERPForm'
import { fetchUserGetAll } from '../../redux/slices/userGetAllSlice'
import { fetchUserDelete } from '../../redux/slices/userDeleteSlice'
import { fetchUserUpdate } from '../../redux/slices/userUpdateSlice'
import { fetchUserCreate } from '../../redux/slices/userCreateSlice'
import { fetchUserGet } from '../../redux/slices/userGetSlice'
import { fetchDepartmentGetAll } from '../../redux/slices/departmentGetAllSlice'

const UserPage = () => {
    const { t } = useTranslation()
    const [modal, setModal] = useState(false)
    const [selectedItem, setSelectedItem] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);
    const [pageSize, setPageSize] = useState(10)
    const [formData, setFormData] = useState({ file: null });
    const [formValues] = useState([
        { label: t("image"), col: 6, key: "file", type: "file" },
        { label: t("name"), col: 6, key: "firstName", type: "text" },
        { label: t("surname"), col: 6, key: "lastName", type: "text" },
        { label: t("department"), col: 6, key: "department", type: "select" },
        { label: t("username"), col: 6, key: "userName", type: "text" },
        { label: t("TC NO"), col: 6, key: "tckno", type: "text" },
        { label: t("email"), col: 6, key: "email", type: "text" },
        { label: t("phone"), col: 6, key: "phoneNumber", type: "text" },
        { label: `${t("phone")} 2`, col: 6, key: "phoneNumber2", type: "text" },
        { label: t("field"), col: 6, key: "field", type: "text" },
        { label: t("birthday"), col: 6, key: "birthday", type: "date" },
        { label: t("startday"), col: 6, key: "startDate", type: "date" },
        { label: t("address"), col: 12, key: "address", type: "textarea" },
    ]);
    const users = useSelector((state) => state.userGetAll.data)
    const dispatch = useDispatch()

    const getData = async () => {
        setLoading(true)
        await dispatch(fetchUserGetAll({ search: "", pageNumber: pageNumber, pageSize: pageSize }))
        var data = await dispatch(fetchDepartmentGetAll())
        if (data.payload) {
            formValues[3].options = data.payload.map((item) => ({
                label: item.name,
                value: item.id
            }));
        }
        setLoading(false)
    }

    const deleteData = async (id) => {
        setLoading(true)
        await dispatch(fetchUserDelete({ id: id }))
        await getData()
        setLoading(false)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true)
            if (selectedItem) {
                console.log(formData)
                await dispatch(fetchUserUpdate({
                    file: formData.file,
                    UserId: selectedItem,
                    FirstName: formData.firstName,
                    LastName: formData.lastName,
                    UserName: formData.userName,
                    Email: formData.email,
                    tckno: formData.tckno,
                    PhoneNumber: formData.phoneNumber,
                    PhoneNumber2: formData.phoneNumber2,
                    Address: formData.address,
                    Field: formData.field,
                    DepartmentID: formData.department,
                    Title: formData.title,
                    Birthday: formData.birthday,
                    StartDate: formData.startDate,
                    DepartureDate: new Date().toISOString(),
                    Gender: null,
                    IsActive: true
                }))
                await getData()
                setSuccess(t('update_success'))
                setModal(false)
                setTimeout(() => setSuccess(null), 5000);
            } else {
                await dispatch(fetchUserCreate({
                    file: formData.file,
                    FirstName: formData.firstName,
                    LastName: formData.lastName,
                    UserName: formData.userName,
                    Email: formData.email,
                    tckno: formData.tckno,
                    PhoneNumber: formData.phoneNumber,
                    PhoneNumber2: formData.phoneNumber2,
                    Address: formData.address,
                    Field: formData.field,
                    DepartmentID: formData.department,
                    Title: formData.title,
                    Birthday: formData.birthday,
                    StartDate: formData.startDate,
                    DepartureDate: new Date().toISOString(),
                    Gender: null,
                    IsActive: true
                }))
                await getData()
                setSuccess(t('create_success'))
                setModal(false)
                setTimeout(() => setSuccess(null), 5000);
            }
            setFormData({ id: 0, file: null })
            setLoading(false)
        } catch (error) {
            setLoading(false)
            setError(t('load_error'))
            setTimeout(() => setError(null), 5000)
        }
    }

    const findData = async () => {
        if (selectedItem) {
            setLoading(true);
            const data = await dispatch(fetchUserGet({ id: selectedItem }));
            if (data.payload) {
                setFormData({
                    firstName: data.payload.firstName,
                    lastName: data.payload.lastName,
                    userName: data.payload.userName,
                    email: data.payload.email,
                    tckno: data.payload.tckno,
                    phoneNumber: data.payload.phoneNumber,
                    phoneNumber2: data.payload.phoneNumber2,
                    department: data.payload.departmentID,
                    field: data.payload.field,
                    title: data.payload.title,
                    address: data.payload.address,
                    birthday: data.payload.birthday,
                    startDate: data.payload.startDate,
                });
            }
            setLoading(false);
        }
    }

    useEffect(() => { getData() }, [dispatch])
    useEffect(() => { findData() }, [selectedItem])

    return (
        <ERP>
            <Banner
                modal={modal}
                setModal={setModal}
                title={t('employee_management')}
                description={t('employee_management_desc')}
            />

            <Alerts
                success={success}
                error={error}
            />

            <ERPTable
                data={users}
                columns={columns({
                    t: t,
                    setSelectedItem: setSelectedItem,
                    modal: modal,
                    deleteData: deleteData,
                    setModal: setModal
                })}
                loading={loading}
            />

            <ERPForm
                modal={modal}
                setModal={setModal}
                setFormData={setFormData}
                formData={formData}
                handleSubmit={handleSubmit}
                formValues={formValues}
            />
        </ERP>
    )
}

export default UserPage
