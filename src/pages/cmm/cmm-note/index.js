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
import { columns } from '../../../utilities/columns/cmmNoteColumns'
import { fetchCMMNoteGetAllByManual } from '../../../redux/slices/cmmNoteGetAllByManualSlice'
import { fetchCMMNoteDelete } from '../../../redux/slices/cmmNoteDeleteSlice'
import { fetchCMMNoteCreate } from '../../../redux/slices/cmmNoteCreateSlice'
import { fetchCMMNoteUpdate } from '../../../redux/slices/cmmNoteUpdateSlice'

const CMMNotePage = () => {
    const { t } = useTranslation()
    const cmm = useSelector((state) => state.cmmGet.data)
    const cmmNotes = useSelector((state) => state.cmmNoteGetAllByManual.data)
    const [selectedItem, setSelectedItem] = useState(null)
    const [loading, setLoading] = useState(false)
    const [modal, setModal] = useState(false)
    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(null)
    const dispatch = useDispatch()
    const [formData, setFormData] = useState({ id: 0, file: [], status: false });
    const [formValues] = useState([
        { label: t("part_code"), col: 8, key: "PartCode", type: "text" },
        { label: t("status"), col: 4, key: "Status", type: "switch" },
        { label: t("note"), col: 6, key: "Note", type: "textarea" },
        { label: t("description"), col: 6, key: "Description", type: "textarea" },
    ]);
    const { id } = useParams()

    const getData = async () => {
        setLoading(true)
        await dispatch(fetchCMMGet({ id: id }))
        await dispatch(fetchCMMNoteGetAllByManual({ id: id }))
        setLoading(false)
    }

    const deleteData = async (id) => {
        await dispatch(fetchCMMNoteDelete({ id: id }))
        await getData()
    }

    const findData = async () => {
        if (selectedItem) {
            const selectedData = cmmNotes.find((item) => item.id === selectedItem);
            if (selectedData) {
                setFormData({
                    id: selectedData.id,
                    PartCode: selectedData.partCode,
                    Status: selectedData.status,
                    Note: selectedData.note,
                    Description: selectedData.description,
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
                await dispatch(fetchCMMNoteCreate({ formData: formData, manualId: id }));
                await getData();
                setSuccess(t('add_success'));
                setTimeout(() => setSuccess(null), 5000);
            } else {
                setLoading(true);
                await dispatch(fetchCMMNoteUpdate({ formData: formData, id: selectedItem, manualId: id }));
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
                description={t("project_note_desc")}
            />

            <Alerts
                success={success}
                error={error}
            />

            <ERPTable
                data={cmmNotes}
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

export default CMMNotePage
