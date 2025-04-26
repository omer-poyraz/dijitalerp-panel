import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTechnicalDrawingGetAll } from '../../redux/slices/technicalDrawingGetAllSlice';
import ERP from '../../components/general/ERP';
import Banner from '../../components/page/Banner';
import Alerts from '../../components/page/Alert';
import ERPForm from '../../components/page/ERPForm';
import { fetchTechnicalDrawingCreate } from '../../redux/slices/technicalDrawingCreateSlice';
import ERPTable from '../../components/general/ERPTable';
import { columns } from '../../utilities/columns/technicalDrawingColumns';
import { fetchTechnicalDrawingDelete } from '../../redux/slices/technicalDrawingDeleteSlice';
import { fetchTechnicalDrawingGet } from '../../redux/slices/technicalDrawingGetSlice';
import { fetchTechnicalDrawingUpdate } from '../../redux/slices/technicalDrawingUpdateSlice';
import { useNavigate } from 'react-router-dom';
import { fetchEmployeeGetAll } from '../../redux/slices/employeeGetAllSlice';

const TechnicalDrawingPage = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const [modal, setModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [selectedItem, setSelectedItem] = useState(null);
    const [formData, setFormData] = useState({ id: 0, file: [] });
    const [formValues] = useState([
        { label: t("files"), col: 6, key: "file", type: "file" },
        { label: t("project_name"), col: 6, key: "projectName", type: "text" },
        { label: t("part_code"), col: 6, key: "partCode", type: "text" },
        { label: t("responible"), col: 6, key: "responibleID", type: "select", },
        { label: t("person_in_charge"), col: 6, key: "personInChargeID", type: "select" },
        { label: t("serial_number"), col: 6, key: "serialNumber", type: "text" },
        { label: t("production_quantity"), col: 6, key: "productionQuantity", type: "number" },
        { label: t("time"), col: 6, key: "time", type: "number" },
        { label: t("date"), col: 6, key: "date", type: "date" },
        { label: t("operator_date"), col: 6, key: "operatorDate", type: "date" },
        { label: t("description"), col: 12, key: "description", type: "textarea" },
    ]);
    const technicalDrawings = useSelector((state) => state.technicalDrawingGetAll.data);
    const navigation = useNavigate()

    const getData = async () => {
        try {
            setLoading(true);
            await dispatch(fetchTechnicalDrawingGetAll());
            var data = await dispatch(fetchEmployeeGetAll())
            if (data.payload) {
                formValues[3].options = data.payload.map((item) => ({
                    label: `${item.name} ${item.surname}`,
                    value: item.id
                }));
                formValues[4].options = data.payload.map((item) => ({
                    label: `${item.name} ${item.surname}`,
                    value: item.id
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
            await dispatch(fetchTechnicalDrawingDelete({ id: id }));
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
            const data = await dispatch(fetchTechnicalDrawingGet({ id: selectedItem }));
            if (data.payload) {
                setFormData({
                    id: data.payload.id,
                    file: data.payload.file,
                    projectName: data.payload.projectName,
                    partCode: data.payload.partCode,
                    responibleID: data.payload.responibleID,
                    personInChargeID: data.payload.personInChargeID,
                    serialNumber: data.payload.serialNumber,
                    productionQuantity: data.payload.productionQuantity,
                    time: data.payload.time,
                    date: data.payload.date,
                    operatorDate: data.payload.operatorDate,
                    description: data.payload.description
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
                await dispatch(fetchTechnicalDrawingCreate({ formData: formData }));
                await getData();
                setSuccess(t('add_success'));
                setTimeout(() => setSuccess(null), 5000);
            } else {
                setLoading(true);
                await dispatch(fetchTechnicalDrawingUpdate({ formData: formData, id: selectedItem }));
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

    useEffect(() => { getData(); }, [dispatch]);
    useEffect(() => { findData() }, [selectedItem])

    return (
        <ERP>
            <Banner
                modal={modal}
                setModal={setModal}
                title={t('technical_drawing')}
                description={t('technical_drawing_desc')}
            />

            <Alerts
                success={success}
                error={error}
            />

            <ERPTable
                data={technicalDrawings}
                columns={columns({
                    t: t,
                    setSelectedItem: setSelectedItem,
                    modal: modal,
                    deleteData: deleteData,
                    setModal: setModal,
                    navigation: navigation,
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
    );
};

export default TechnicalDrawingPage;