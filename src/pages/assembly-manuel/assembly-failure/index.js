import React, { useEffect, useState } from 'react'
import ERP from '../../../components/general/ERP'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Banner from '../../../components/page/Banner'
import { fetchAssemblyManualGet } from '../../../redux/slices/assemblyManualGetSlice'
import ERPTable from '../../../components/general/ERPTable'
import { fetchAssemblyFailureGetAllByManual } from '../../../redux/slices/assemblyFailureGetAllByManualSlice'
import { columns } from '../../../utilities/columns/assemblyFailureColumns'
import { useTranslation } from 'react-i18next'
import { fetchAssemblyFailureDelete } from '../../../redux/slices/assemblyFailureDeleteSlice'
import ERPForm from '../../../components/page/ERPForm'
import { fetchAssemblyFailureCreate } from '../../../redux/slices/assemblyFailureCreateSlice'
import { fetchAssemblyFailureUpdate } from '../../../redux/slices/assemblyFailureUpdateSlice'
import Alerts from '../../../components/page/Alert'

const AssemblyFailurePage = () => {
    const { t } = useTranslation()
    const assemblyManual = useSelector((state) => state.assemblyManualGet.data)
    const assemblyFailures = useSelector((state) => state.assemblyFailureGetAllByManual.data)
    const [selectedItem, setSelectedItem] = useState(null)
    const [loading, setLoading] = useState(false)
    const [modal, setModal] = useState(false)
    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(null)
    const dispatch = useDispatch()
    const [formData, setFormData] = useState({ id: 0, file: [] });
    const [formValues] = useState([
        { label: t("inappropriateness"), col: 12, key: "inappropriateness", type: "text" },
        { label: t("technician"), col: 6, key: "technician", type: "text" },
        { label: t("part_code"), col: 6, key: "partCode", type: "text" },
        { label: t("pending_quantity"), col: 4, key: "pendingQuantity", type: "text" },
        { label: t("date"), col: 4, key: "date", type: "date" },
        { label: t("status"), col: 4, key: "status", type: "switch" },
        { label: t("quality_description"), col: 12, key: "qualityDescription", type: "textarea" },
    ]);
    const { id } = useParams()

    const getData = async () => {
        setLoading(true)
        await dispatch(fetchAssemblyManualGet({ id: id }))
        await dispatch(fetchAssemblyFailureGetAllByManual({ id: id }))
        setLoading(false)
    }

    const deleteData = async (id) => {
        await dispatch(fetchAssemblyFailureDelete({ id: id }))
        await getData()
    }

    const findData = async () => {
        if (selectedItem) {
            const selectedData = assemblyFailures.find((item) => item.id === selectedItem);
            if (selectedData) {
                setFormData({
                    id: selectedData.id,
                    inappropriateness: selectedData.inappropriateness,
                    technician: selectedData.technician,
                    partCode: selectedData.partCode,
                    pendingQuantity: selectedData.pendingQuantity,
                    date: selectedData.date,
                    status: selectedData.status,
                    qualityDescription: selectedData.qualityDescription,
                });
                setModal(true);
            }
        } else {
            setFormData({ id: 0, file: [] });
            setModal(false);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            if (!selectedItem) {
                setLoading(true);
                await dispatch(fetchAssemblyFailureCreate({ formData: formData, manualId: id }));
                await getData();
                setSuccess(t('add_success'));
                setTimeout(() => setSuccess(null), 5000);
            } else {
                setLoading(true);
                await dispatch(fetchAssemblyFailureUpdate({ formData: formData, id: selectedItem, manualId: id }));
                await getData();
                setSuccess(t('update_success'));
                setTimeout(() => setSuccess(null), 5000);
            }
        } catch (error) {
            setLoading(false);
            setError(t('load_error'));
            setTimeout(() => setError(null), 5000);
        }
        setLoading(false);
        setModal(false);
        setFormData({ id: 0, file: [] });
    }

    useEffect(() => { getData() }, [dispatch])
    useEffect(() => { findData() }, [selectedItem])

    return (
        <ERP>
            <Banner
                modal={modal}
                setModal={setModal}
                title={assemblyManual?.projectName}
                description={t("project_error_desc")}
            />

            <Alerts
                success={success}
                error={error}
            />

            <ERPTable
                data={assemblyFailures}
                columns={columns({
                    t: t,
                    setSelectedItem: setSelectedItem,
                    modal: modal,
                    deleteData: deleteData,
                    setModal: setModal,
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

export default AssemblyFailurePage
