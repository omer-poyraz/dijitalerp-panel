import React, { useEffect, useState } from 'react'
import ERP from '../../../components/general/ERP'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Banner from '../../../components/page/Banner'
import { fetchCMMGet } from '../../../redux/slices/cmmGetSlice'
import ERPTable from '../../../components/general/ERPTable'
import { useTranslation } from 'react-i18next'
import ERPForm from '../../../components/page/ERPForm'
import Alerts from '../../../components/page/Alert'
import { fetchCMMSuccessGetAllByManual } from '../../../redux/slices/cmmSuccessGetAllByManualSlice'
import { fetchCMMSuccessDelete } from '../../../redux/slices/cmmSuccessDeleteSlice'
import { fetchCMMSuccessCreate } from '../../../redux/slices/cmmSuccessCreateSlice'
import { fetchCMMSuccessUpdate } from '../../../redux/slices/cmmSuccessUpdateSlice'
import { columns } from '../../../utilities/columns/cmmSuccessColumns'
import { fetchUserGetAll } from '../../../redux/slices/userGetAllSlice'

const CMMSuccessPage = () => {
    const { t } = useTranslation()
    const cmm = useSelector((state) => state.cmmGet.data)
    const cmmSuccess = useSelector((state) => state.cmmSuccessGetAllByManual.data)
    const [selectedItem, setSelectedItem] = useState(null)
    const [loading, setLoading] = useState(false)
    const [modal, setModal] = useState(false)
    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(null)
    const dispatch = useDispatch()
    const [formData, setFormData] = useState({ id: 0, file: [] });
    const [formValues] = useState([
        { label: t("technician"), col: 6, key: "TechnicianID", type: "select" },
        { label: t("part_code"), col: 6, key: "PartCode", type: "text" },
        { label: t("approval"), col: 12, key: "Approval", type: "text" },
        { label: t("pending_quantity"), col: 4, key: "PendingQuantity", type: "number" },
        { label: t("date"), col: 4, key: "Date", type: "date" },
        { label: t("status"), col: 4, key: "Status", type: "switch" },
        { label: t("quality_description"), col: 12, key: "QualityDescription", type: "textarea" },
        { label: t("description"), col: 12, key: "Description", type: "textarea" },
    ]);
    const { id } = useParams()

    const getData = async () => {
        setLoading(true)
        await dispatch(fetchCMMGet({ id: id }))
        await dispatch(fetchCMMSuccessGetAllByManual({ id: id }))
        var data = await dispatch(fetchUserGetAll({ search: "", pageNumber: 1, pageSize: 100 }))
        if (data.payload) {
            formValues[0].options = data.payload.map((item) => ({
                label: `${item.firstName} ${item.lastName}`,
                value: item.userId
            }));
        }
        setLoading(false)
    }

    const deleteData = async (id) => {
        await dispatch(fetchCMMSuccessDelete({ id: id }))
        await getData()
    }

    const findData = async () => {
        if (selectedItem) {
            const selectedData = cmmSuccess.find((item) => item.id === selectedItem);
            if (selectedData) {
                setFormData({
                    id: selectedData.id,
                    Description: selectedData.Description,
                    TechnicianID: selectedData.TechnicianID,
                    PartCode: selectedData.PartCode,
                    Status: selectedData.Status,
                    Approval: selectedData.Approval,
                    PendingQuantity: selectedData.PendingQuantity,
                    Date: selectedData.Date,
                    QualityDescription: selectedData.QualityDescription
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
                console.log(formData)
                await dispatch(fetchCMMSuccessCreate({ formData: formData, manualId: id }));
                await getData();
                setSuccess(t('add_success'));
                setTimeout(() => setSuccess(null), 5000);
            } else {
                setLoading(true);
                await dispatch(fetchCMMSuccessUpdate({ formData: formData, id: selectedItem, manualId: id }));
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
                title={cmm?.projectName}
                description={t("project_success_desc")}
            />

            <Alerts
                success={success}
                error={error}
            />

            <ERPTable
                data={cmmSuccess}
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

export default CMMSuccessPage
