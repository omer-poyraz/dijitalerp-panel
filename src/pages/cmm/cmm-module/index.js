import { useEffect, useState } from 'react'
import ERP from '../../../components/general/ERP'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Banner from '../../../components/page/Banner'
import { fetchCMMGet } from '../../../redux/slices/cmmGetSlice'
import ERPTable from '../../../components/general/ERPTable'
import { useTranslation } from 'react-i18next'
import ERPForm from '../../../components/page/ERPForm'
import Alerts from '../../../components/page/Alert'
import { columns } from '../../../utilities/columns/cmmModuleColumns'
import { fetchCMMModuleDelete } from '../../../redux/slices/cmmModuleDeleteSlice'
import { fetchCMMModuleCreate } from '../../../redux/slices/cmmModuleCreateSlice'
import { fetchCMMModuleUpdate } from '../../../redux/slices/cmmModuleUpdateSlice'
import { fetchCMMModuleGetAll } from '../../../redux/slices/cmmModuleGetAllSlice'

const CMMModulePage = () => {
    const { t } = useTranslation()
    const cmmModules = useSelector((state) => state.cmmModuleGetAll.data)
    const [selectedItem, setSelectedItem] = useState(null)
    const [loading, setLoading] = useState(false)
    const [modal, setModal] = useState(false)
    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(null)
    const dispatch = useDispatch()
    const [formData, setFormData] = useState({ id: 0, file: [], status: false });
    const [formValues] = useState([
        { label: t("file"), col: 6, key: "file", type: "file" },
        { label: t("cmm"), col: 6, key: "CMM", type: "text" },
    ]);
    const { id } = useParams()

    const getData = async () => {
        setLoading(true)
        await dispatch(fetchCMMModuleGetAll())
        setLoading(false)
    }

    const deleteData = async (id) => {
        await dispatch(fetchCMMModuleDelete({ id: id }))
        await getData()
    }

    const findData = async () => {
        if (selectedItem) {
            const selectedData = cmmModules.find((item) => item.id === selectedItem);
            if (selectedData) {
                setFormData({
                    id: selectedData.id,
                    file: selectedData.file,
                    cmm: selectedData.cmm,
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
                await dispatch(fetchCMMModuleCreate({ formData: formData, manualId: id }));
                await getData();
                setSuccess(t('add_success'));
                setTimeout(() => setSuccess(null), 5000);
            } else {
                setLoading(true);
                await dispatch(fetchCMMModuleUpdate({ formData: formData, id: selectedItem, manualId: id }));
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
                title={t("cmm_module")}
                description={t("project_note_desc")}
            />

            <Alerts
                success={success}
                error={error}
            />

            <ERPTable
                data={cmmModules}
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

export default CMMModulePage
