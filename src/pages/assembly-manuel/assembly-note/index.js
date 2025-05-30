import React, { useEffect, useState } from 'react'
import ERP from '../../../components/general/ERP'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Banner from '../../../components/page/Banner'
import { fetchAssemblyManualGet } from '../../../redux/slices/assemblyManualGetSlice'
import ERPTable from '../../../components/general/ERPTable'
import { useTranslation } from 'react-i18next'
import ERPForm from '../../../components/page/ERPForm'
import Alerts from '../../../components/page/Alert'
import { columns } from '../../../utilities/columns/assemblyNoteColumns'
import { fetchAssemblyNoteGetAllByManual } from '../../../redux/slices/assemblyNoteGetAllByManualSlice'
import { fetchAssemblyNoteDelete } from '../../../redux/slices/assemblyNoteDeleteSlice'
import { fetchAssemblyNoteCreate } from '../../../redux/slices/assemblyNoteCreateSlice'
import { fetchAssemblyNoteUpdate } from '../../../redux/slices/assemblyNoteUpdateSlice'

const AssemblyNotePage = () => {
    const { t } = useTranslation()
    const assemblyManual = useSelector((state) => state.assemblyManualGet.data)
    const assemblyNotes = useSelector((state) => state.assemblyNoteGetAllByManual.data)
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
        await dispatch(fetchAssemblyManualGet({ id: id }))
        await dispatch(fetchAssemblyNoteGetAllByManual({ id: id }))
        setLoading(false)
    }

    const deleteData = async (id) => {
        await dispatch(fetchAssemblyNoteDelete({ id: id }))
        await getData()
    }

    const findData = async () => {
        if (selectedItem) {
            const selectedData = assemblyNotes.find((item) => item.id === selectedItem);
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
                await dispatch(fetchAssemblyNoteCreate({ formData: formData, manualId: id }));
                await getData();
                setSuccess(t('add_success'));
                setTimeout(() => setSuccess(null), 5000);
            } else {
                setLoading(true);
                await dispatch(fetchAssemblyNoteUpdate({ formData: formData, id: selectedItem, manualId: id }));
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
                description={t("project_note_desc")}
            />

            <Alerts
                success={success}
                error={error}
            />

            <ERPTable
                data={assemblyNotes}
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

export default AssemblyNotePage
