import React, { useEffect, useState } from 'react'
import ERP from '../../../components/general/ERP'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Banner from '../../../components/page/Banner'
import { fetchTechnicalDrawingGet } from '../../../redux/slices/technicalDrawingGetSlice'
import ERPTable from '../../../components/general/ERPTable'
import { useTranslation } from 'react-i18next'
import ERPForm from '../../../components/page/ERPForm'
import Alerts from '../../../components/page/Alert'
import { columns } from '../../../utilities/columns/technicalDrawingNoteColumns'
import { fetchTechnicalDrawingNoteGetAllByDrawing } from '../../../redux/slices/technicalDrawingNoteGetAllByDrawingSlice'
import { fetchTechnicalDrawingNoteDelete } from '../../../redux/slices/technicalDrawingNoteDeleteSlice'
import { fetchTechnicalDrawingNoteCreate } from '../../../redux/slices/technicalDrawingNoteCreateSlice'
import { fetchTechnicalDrawingNoteUpdate } from '../../../redux/slices/technicalDrawingNoteUpdateSlice'

const TechnicalDrawingNotePage = () => {
    const { t } = useTranslation()
    const technicalDrawing = useSelector((state) => state.technicalDrawingGet.data)
    const technicalDrawingNotes = useSelector((state) => state.technicalDrawingNoteGetAllByDrawing.data)
    const [selectedItem, setSelectedItem] = useState(null)
    const [loading, setLoading] = useState(false)
    const [modal, setModal] = useState(false)
    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(null)
    const dispatch = useDispatch()
    const [formData, setFormData] = useState({ id: 0, file: [], status: false });
    const [formValues] = useState([
        { label: t("part_code"), col: 6, key: "partCode", type: "text" },
        { label: t("description"), col: 6, key: "description", type: "textarea" },
        { label: t("status"), col: 4, key: "status", type: "switch" },
    ]);
    const { id } = useParams()

    const getData = async () => {
        setLoading(true)
        await dispatch(fetchTechnicalDrawingGet({ id: id }))
        await dispatch(fetchTechnicalDrawingNoteGetAllByDrawing({ id: id }))
        setLoading(false)
    }

    const deleteData = async (id) => {
        await dispatch(fetchTechnicalDrawingNoteDelete({ id: id }))
        await getData()
    }

    const findData = async () => {
        if (selectedItem) {
            const selectedData = technicalDrawingNotes.find((item) => item.id === selectedItem);
            if (selectedData) {
                setFormData({
                    id: selectedData.id,
                    note: selectedData.note,
                    description: selectedData.description,
                    status: selectedData.status,
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
                if (formData.status === null || formData.status === undefined) {
                    setFormData({ ...formData, status: false });
                }
                setLoading(true);
                await dispatch(fetchTechnicalDrawingNoteCreate({ formData: formData, manualId: id }));
                await getData();
                setSuccess(t('add_success'));
                setTimeout(() => setSuccess(null), 5000);
            } else {
                setLoading(true);
                await dispatch(fetchTechnicalDrawingNoteUpdate({ formData: formData, id: selectedItem, manualId: id }));
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
                description={t("project_note_desc")}
            />

            <Alerts
                success={success}
                error={error}
            />

            <ERPTable
                data={technicalDrawingNotes}
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

export default TechnicalDrawingNotePage
