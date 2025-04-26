import React, { useEffect, useState } from 'react'
import ERP from '../../components/general/ERP'
import Banner from '../../components/page/Banner'
import { useTranslation } from 'react-i18next'
import Alerts from '../../components/page/Alert'
import ERPTable from '../../components/general/ERPTable'
import { columns } from '../../utilities/columns/employeeColumns'
import { useDispatch, useSelector } from 'react-redux'
import { fetchEmployeeGetAll } from '../../redux/slices/employeeGetAllSlice'
import { fetchEmployeeDelete } from '../../redux/slices/employeeDeleteSlice'
import ERPForm from '../../components/page/ERPForm'
import { fetchEmployeeUpdate } from '../../redux/slices/employeeUpdateSlice'
import { fetchEmployeeCreate } from '../../redux/slices/employeeCreateSlice'
import { fetchEmployeeGet } from '../../redux/slices/employeeGetSlice'

const EmployeePage = () => {
    const { t } = useTranslation()
    const [modal, setModal] = useState(false)
    const [selectedItem, setSelectedItem] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [formData, setFormData] = useState({ id: 0, file: null });
    const [formValues] = useState([
        { label: t("image"), col: 6, key: "file", type: "file" },
        { label: t("name"), col: 6, key: "name", type: "text" },
        { label: t("surname"), col: 6, key: "surname", type: "text" },
        { label: t("email"), col: 6, key: "email", type: "text" },
        { label: t("phone"), col: 6, key: "phone", type: "text" },
        { label: t("field"), col: 6, key: "field", type: "text" },
        { label: t("birthday"), col: 6, key: "birthday", type: "date" },
        { label: t("startday"), col: 6, key: "startdate", type: "date" },
        { label: t("address"), col: 12, key: "address", type: "textarea" },
    ]);
    const employees = useSelector((state) => state.employeeGetAll.data)
    const dispatch = useDispatch()

    const getData = async () => {
        await dispatch(fetchEmployeeGetAll())
    }

    const deleteData = async (id) => {
        setLoading(true)
        await dispatch(fetchEmployeeDelete({ id: id }))
        await getData()
        setLoading(false)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true)
            if (selectedItem) {
                await dispatch(fetchEmployeeUpdate({ formData: formData, id: selectedItem }))
                await getData()
                setSuccess(t('update_success'))
                setModal(false)
                setTimeout(() => setSuccess(null), 5000);
            } else {
                await dispatch(fetchEmployeeCreate({ formData: formData }))
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
            const data = await dispatch(fetchEmployeeGet({ id: selectedItem }));
            if (data.payload) {
                setFormData({
                    id: data.payload.id,
                    file: data.payload.file,
                    name: data.payload.name,
                    surname: data.payload.surname,
                    email: data.payload.email,
                    phone: data.payload.phone,
                    address: data.payload.address,
                    field: data.payload.field,
                    birthday: data.payload.birthday,
                    startdate: data.payload.startDate,
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
                data={employees}
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

export default EmployeePage
