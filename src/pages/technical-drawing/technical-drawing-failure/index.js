import React, { useEffect, useState } from 'react'
import ERP from '../../../components/general/ERP'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Banner from '../../../components/page/Banner'
import { fetchTechnicalDrawingGet } from '../../../redux/slices/technicalDrawingGetSlice'
import ERPTable from '../../../components/general/ERPTable'
import { fetchTechnicalDrawingFailureGetAllByDrawing } from '../../../redux/slices/technicalDrawingFailureGetAllByDrawingSlice'
import { columns } from '../../../utilities/columns/technicalDrawingFailureColumns'
import { useTranslation } from 'react-i18next'
import { fetchTechnicalDrawingFailureDelete } from '../../../redux/slices/technicalDrawingFailureDeleteSlice'
import ERPForm from '../../../components/page/ERPForm'
import { fetchTechnicalDrawingFailureCreate } from '../../../redux/slices/technicalDrawingFailureCreateSlice'
import { fetchTechnicalDrawingFailureUpdate } from '../../../redux/slices/technicalDrawingFailureUpdateSlice'
import Alerts from '../../../components/page/Alert'
import { fetchUserGetAll } from '../../../redux/slices/userGetAllSlice'

const TechnicalDrawingFailurePage = () => {
    const { t } = useTranslation()
    const technicalDrawing = useSelector((state) => state.technicalDrawingGet.data)
    const technicalDrawingFailures = useSelector((state) => state.technicalDrawingFailureGetAllByDrawing.data)
    const [selectedItem, setSelectedItem] = useState(null)
    const [loading, setLoading] = useState(false)
    const [modal, setModal] = useState(false)
    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(null)
    const dispatch = useDispatch()
    const [formData, setFormData] = useState({ id: 0, file: [] });
    const [formValues] = useState([
        { label: t("operator"), col: 6, key: "operatorID", type: "select" },
        { label: t("part_code"), col: 6, key: "partCode", type: "text" },
        { label: t("pending_quantity"), col: 4, key: "productionQuantity", type: "text" },
        { label: t("date"), col: 4, key: "date", type: "date" },
        { label: t("status"), col: 4, key: "status", type: "switch" },
        { label: t("quality_description"), col: 12, key: "quantityDescription", type: "textarea" },
    ]);
    const { id } = useParams()

    const getData = async () => {
        setLoading(true)
        await dispatch(fetchTechnicalDrawingGet({ id: id }))
        await dispatch(fetchTechnicalDrawingFailureGetAllByDrawing({ id: id }))
        var data = await dispatch(fetchUserGetAll({ search: "", pageNumber: 1, pageSize: 100 }))
        if (data.payload) {
            formValues[0].options = data.payload.map((item) => ({
                label: `${item.fistName} ${item.lastName}`,
                value: item.userId
            }));
        }
        setLoading(false)
    }

    const deleteData = async (id) => {
        await dispatch(fetchTechnicalDrawingFailureDelete({ id: id }))
        await getData()
    }

    const findData = async () => {
        if (selectedItem) {
            const selectedData = technicalDrawingFailures.find((item) => item.id === selectedItem);
            if (selectedData) {
                setFormData({
                    id: selectedData.id,
                    inappropriateness: selectedData.inappropriateness,
                    operatorID: selectedData.operatorID,
                    partCode: selectedData.partCode,
                    productionQuantity: selectedData.productionQuantity,
                    date: selectedData.date,
                    status: selectedData.status,
                    quantityDescription: selectedData.quantityDescription,
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
                await dispatch(fetchTechnicalDrawingFailureCreate({ formData: formData, manualId: id }));
                await getData();
                setSuccess(t('add_success'));
                setTimeout(() => setSuccess(null), 5000);
            } else {
                setLoading(true);
                await dispatch(fetchTechnicalDrawingFailureUpdate({ formData: formData, id: selectedItem, manualId: id }));
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
                title={technicalDrawing?.projectName}
                description={t("project_error_desc")}
            />

            <Alerts
                success={success}
                error={error}
            />

            <ERPTable
                data={technicalDrawingFailures}
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

export default TechnicalDrawingFailurePage
