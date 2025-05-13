import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCMMGetAll } from '../../redux/slices/cmmGetAllSlice';
import ERP from '../../components/general/ERP';
import Banner from '../../components/page/Banner';
import Alerts from '../../components/page/Alert';
import ERPForm from '../../components/page/ERPForm';
import { fetchCMMCreate } from '../../redux/slices/cmmCreateSlice';
import ERPTable from '../../components/general/ERPTable';
import { columns } from '../../utilities/columns/cmmColumns';
import { fetchCMMDelete } from '../../redux/slices/cmmDeleteSlice';
import { fetchCMMGet } from '../../redux/slices/cmmGetSlice';
import { fetchCMMUpdate } from '../../redux/slices/cmmUpdateSlice';
import { useNavigate } from 'react-router-dom';
import { fetchUserGetAll } from '../../redux/slices/userGetAllSlice';
import CMMView from './view';

const CMMPage = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const [modal, setModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [viewModal, setViewModal] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [formData, setFormData] = useState({ id: 0, file: [], resultFile: [] });
    const [formValues] = useState([
        { label: t("files"), col: 6, key: "file", type: "file" },
        { label: t("files"), col: 6, key: "resultFile", type: "file" },
        { label: t("project_name"), col: 6, key: "ProjectName", type: "text" },
        { label: t("part_code"), col: 6, key: "PartCode", type: "text" },
        { label: t("stand"), col: 6, key: "Stand", type: "text" },
        { label: t("time"), col: 6, key: "Time", type: "number" },
        { label: t("date"), col: 6, key: "Date", type: "date" },
        { label: t("install_result_date"), col: 6, key: "InstallResultDate", type: "date" },
        { label: t("solid_model"), col: 6, key: "SolidModel", type: "text" },
        { label: t("description"), col: 6, key: "Description", type: "text" },
        { label: t("measuring_person"), col: 4, key: "MeasuringPersonID", type: "select" },
        { label: t("cmm_personel"), col: 4, key: "CMMUserID", type: "select" },
        { label: t("responible"), col: 4, key: "ResponibleID", type: "select", },
        { label: t("person_in_charge"), col: 4, key: "PersonInChargeID", type: "select", },
        { label: t("quality_officer"), col: 8, key: "QualityOfficerID", type: "select" },
    ]);
    const cmms = useSelector((state) => state.cmmGetAll.data);
    const navigation = useNavigate()

    const getData = async () => {
        try {
            setLoading(true);
            await dispatch(fetchCMMGetAll());
            var data = await dispatch(fetchUserGetAll({ search: "", pageNumber: 1, pageSize: 100 }));
            if (data.payload) {
                formValues[10].options = data.payload.map((item) => ({
                    label: `${item.firstName} ${item.lastName}`,
                    value: item.userId
                }));
                formValues[11].options = data.payload.map((item) => ({
                    label: `${item.firstName} ${item.lastName}`,
                    value: item.userId
                }));
                formValues[12].options = data.payload.map((item) => ({
                    label: `${item.firstName} ${item.lastName}`,
                    value: item.userId
                }));
                formValues[13].options = data.payload.map((item) => ({
                    label: `${item.firstName} ${item.lastName}`,
                    value: item.userId
                }));
                formValues[14].options = data.payload.map((item) => ({
                    label: `${item.firstName} ${item.lastName}`,
                    value: item.userId
                }));
            }
            setLoading(false);
        } catch (err) {
            setLoading(false);
            setError(t('load_error'));
            setTimeout(() => setError(null), 5000);
        }
    };

    const deleteData = async (id) => {
        try {
            setLoading(true);
            await dispatch(fetchCMMDelete({ id: id }));
            await getData();
            setSuccess(t('delete_success'));
            setTimeout(() => setSuccess(null), 5000);
        } catch (err) {
            setLoading(false);
            setError(t('load_error'));
            setTimeout(() => setError(null), 5000);
        }
    }

    const findData = async () => {
        if (selectedItem) {
            setLoading(true);
            const data = await dispatch(fetchCMMGet({ id: selectedItem }));
            if (data.payload) {
                setFormData({
                    id: data.payload.id,
                    file: data.payload.file,
                    resultFile: data.payload.resultFile,
                    ProjectName: data.payload.projectName,
                    PartCode: data.payload.partCode,
                    Stand: data.payload.stand,
                    Time: data.payload.time,
                    Date: data.payload.date,
                    InstallResultDate: data.payload.installResultDate,
                    SolidModel: data.payload.solidModel,
                    Description: data.payload.description,
                    MeasuringPersonID: data.payload.measuringPersonID,
                    CMMUserID: data.payload.cmmUserID,
                    ResponibleID: data.payload.responibleID,
                    PersonInChargeID: data.payload.personInChargeID,
                    QualityOfficerID: data.payload.qualityOfficerID,
                });
            }
            setLoading(false);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            if (!selectedItem) {
                setLoading(true);
                await dispatch(fetchCMMCreate({ formData: formData }));
                await getData();
                setSuccess(t('add_success'));
                setTimeout(() => setSuccess(null), 5000);
            } else {
                setLoading(true);
                await dispatch(fetchCMMUpdate({ formData: formData, id: selectedItem }));
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

    const selectedItemData = async () => {
        await dispatch(fetchCMMGet({ id: selectedItem }));
    }

    useEffect(() => { getData(); }, [dispatch]);
    useEffect(() => { selectedItemData(); findData() }, [selectedItem])

    return (
        <ERP>
            <Banner
                modal={modal}
                setModal={setModal}
                title={t('cmm')}
                description={t('cmm_desc')}
            />

            <Alerts
                success={success}
                error={error}
            />

            <ERPTable
                data={cmms}
                columns={columns({
                    t: t,
                    setSelectedItem: setSelectedItem,
                    modal: modal,
                    deleteData: deleteData,
                    setModal: setModal,
                    navigation: navigation,
                    setViewModal: setViewModal,
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

            <CMMView
                viewModal={viewModal}
                setViewModal={setViewModal}
                data={cmms?.find((item) => item.id === selectedItem)}
            />
        </ERP>
    );
};

export default CMMPage;