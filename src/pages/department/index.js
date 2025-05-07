import React, { useEffect, useState } from 'react'
import ERP from '../../components/general/ERP'
import Banner from '../../components/page/Banner'
import { useTranslation } from 'react-i18next'
import Alerts from '../../components/page/Alert'
import ERPTable from '../../components/general/ERPTable'
import { useDispatch, useSelector } from 'react-redux'
import ERPForm from '../../components/page/ERPForm'
import { fetchDepartmentGetAll } from '../../redux/slices/departmentGetAllSlice'
import { columns } from '../../utilities/columns/departmentColumns'
import { fetchDepartmentGet } from '../../redux/slices/departmentGetSlice'
import { fetchDepartmentCreate } from '../../redux/slices/departmentCreateSlice'
import { fetchDepartmentUpdate } from '../../redux/slices/departmentUpdateSlice'
import { fetchDepartmentDelete } from '../../redux/slices/departmentDeleteSlice'

const DepartmentPage = () => {
    const { t } = useTranslation()
    const [modal, setModal] = useState(false)
    const [selectedItem, setSelectedItem] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [formData, setFormData] = useState({ file: null });
    const [formValues] = useState([
        { label: t("name"), col: 12, key: "name", type: "text" },
    ]);
    const departments = useSelector((state) => state.departmentGetAll.data)
    const dispatch = useDispatch()

    const getData = async () => {
        setLoading(true)
        await dispatch(fetchDepartmentGetAll())
        setLoading(false)
    }

    const deleteData = async (id) => {
        setLoading(true)
        await dispatch(fetchDepartmentDelete({ id: id }))
        await getData()
        setLoading(false)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true)
            if (selectedItem) {
                await dispatch(fetchDepartmentUpdate({ name: formData.name, id: selectedItem }))
                await getData()
                setSuccess(t('update_success'))
                setModal(false)
                setTimeout(() => setSuccess(null), 5000);
            } else {
                await dispatch(fetchDepartmentCreate({ name: formData.name, }))
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
            const data = await dispatch(fetchDepartmentGet({ id: selectedItem }));
            if (data.payload) {
                setFormData({ name: data.payload.name, });
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
                title={t('department_management')}
                description={t('department_management_desc')}
            />

            <Alerts
                success={success}
                error={error}
            />

            <ERPTable
                data={departments}
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

export default DepartmentPage
