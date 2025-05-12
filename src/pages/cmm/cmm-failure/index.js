import { useEffect, useState } from 'react'
import ERP from '../../../components/general/ERP'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Banner from '../../../components/page/Banner'
import { fetchCMMGet } from '../../../redux/slices/cmmGetSlice'
import ERPTable from '../../../components/general/ERPTable'
import { fetchCMMFailureGetAllByManual } from '../../../redux/slices/cmmFailureGetAllByManualSlice'
import { columns } from '../../../utilities/columns/cmmFailureColumns'
import { useTranslation } from 'react-i18next'
import { fetchCMMFailureDelete } from '../../../redux/slices/cmmFailureDeleteSlice'
import ERPForm from '../../../components/page/ERPForm'
import { fetchCMMFailureCreate } from '../../../redux/slices/cmmFailureCreateSlice'
import { fetchCMMFailureUpdate } from '../../../redux/slices/cmmFailureUpdateSlice'
import Alerts from '../../../components/page/Alert'
import { fetchUserGetAll } from '../../../redux/slices/userGetAllSlice'

const CMMFailurePage = () => {
    const { t } = useTranslation()
    const cmm = useSelector((state) => state.cmmGet.data)
    const cmmFailures = useSelector((state) => state.cmmFailureGetAllByManual.data)
    const [selectedItem, setSelectedItem] = useState(null)
    const [loading, setLoading] = useState(false)
    const [modal, setModal] = useState(false)
    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(null)
    const dispatch = useDispatch()
    const navigation = useNavigate()
    const [formData, setFormData] = useState({ id: 0, file: [] });
    const [formValues] = useState([
        { label: t("inappropriateness"), col: 12, key: "Inappropriateness", type: "text" },
        { label: t("technician"), col: 4, key: "TechnicianID", type: "select" },
        { label: t("part_code"), col: 4, key: "PartCode", type: "text" },
        { label: t("status"), col: 4, key: "Status", type: "switch" },
        { label: t("pending_quantity"), col: 4, key: "PendingQuantity", type: "text" },
        { label: t("total"), col: 4, key: "Total", type: "number" },
        { label: t("date"), col: 4, key: "Date", type: "date" },
        { label: t("quality_description"), col: 12, key: "Description", type: "textarea" },
    ]);
    const { id } = useParams()

    const getData = async () => {
        setLoading(true)
        await dispatch(fetchCMMGet({ id: id }))
        await dispatch(fetchCMMFailureGetAllByManual({ id: id }))
        var data = await dispatch(fetchUserGetAll({ search: "", pageNumber: 1, pageSize: 100 }))
        if (data.payload) {
            formValues[1].options = data.payload.map((item) => ({
                label: `${item.firstName} ${item.lastName}`,
                value: item.userId
            }));
        }
        setLoading(false)
    }

    const deleteData = async (id) => {
        await dispatch(fetchCMMFailureDelete({ id: id }))
        await getData()
    }

    const findData = async () => {
        if (selectedItem) {
            const selectedData = cmmFailures.find((item) => item.id === selectedItem);
            if (selectedData) {
                setFormData({
                    id: selectedData.id,
                    Inappropriateness: selectedData.inappropriateness,
                    TechnicianID: selectedData.technicianID,
                    PartCode: selectedData.partCode,
                    PendingQuantity: selectedData.pendingQuantity,
                    Total: selectedData.total,
                    Date: selectedData.date,
                    Status: selectedData.status,
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
                setLoading(true);
                await dispatch(fetchCMMFailureCreate({ formData: formData, manualId: id }));
                await getData();
                setSuccess(t('add_success'));
                setTimeout(() => setSuccess(null), 5000);
            } else {
                setLoading(true);
                await dispatch(fetchCMMFailureUpdate({ formData: formData, id: selectedItem, manualId: id }));
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
                description={t("project_error_desc")}
            />

            <Alerts
                success={success}
                error={error}
            />

            <ERPTable
                data={cmmFailures}
                columns={columns({
                    t: t,
                    setSelectedItem: setSelectedItem,
                    modal: modal,
                    navigation: navigation,
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

export default CMMFailurePage
