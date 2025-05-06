import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { PiFeather } from "react-icons/pi";
import { Button, Col, Form, Input, Modal, ModalBody, ModalHeader, Row, ModalFooter } from 'reactstrap';
import { Switch, Select } from 'antd';

const ERPForm = ({ modal, setModal, setFormData, formData, handleSubmit, formValues }) => {
    const { t } = useTranslation();

    useEffect(() => {
        if (modal) {
            if (!formData.file) {
                setFormData(prev => ({ ...prev, file: [] }));
            } else if (!Array.isArray(formData.file)) {
                setFormData(prev => ({ ...prev, file: [formData.file] }));
            }
        }
    }, [modal, formData, setFormData]);

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        if (files.length > 0) {
            const existingFiles = Array.isArray(formData.file) ? formData.file : (formData.file ? [formData.file] : []);
            setFormData({ ...formData, file: [...existingFiles, ...files] });
        }
    };

    const formatDateForInput = (dateValue) => {
        if (!dateValue) return '';
        if (typeof dateValue === 'string' && dateValue.match(/^\d{4}-\d{2}-\d{2}$/)) {
            return dateValue;
        }
        const date = dateValue instanceof Date ? dateValue : new Date(dateValue);
        if (isNaN(date.getTime())) return '';
        return date.toISOString().split('T')[0];
    };

    const handleSelectChange = (value, key) => {
        setFormData({
            ...formData,
            [key]: value
        });
    };

    return (
        <Modal isOpen={modal} toggle={() => setModal(!modal)} size="lg" className="modal-dialog-centered">
            <ModalHeader toggle={() => { setModal(!modal); setFormData({}) }} tag="h5">{formData.id !== 0 ? t("edit") : t('add_new')}</ModalHeader>
            <Form onSubmit={handleSubmit}>
                <ModalBody className='overflow-y-auto'>
                    <Row>
                        {
                            formValues.map((item, index) => (
                                <Col key={index} md={item.col} className='mb-3'>
                                    <div className='form-item'>
                                        <div className={item.type === "switch" ? "w-100 text-center" : ""}><label>{item.label}</label></div>
                                        {item.type !== "file" && item.type !== "switch" && item.type !== "select" ? <PiFeather size={20} className='color4' /> : null}

                                        {item.type === 'file' ? (
                                            <div>
                                                <Input
                                                    id={item.key}
                                                    name={item.key}
                                                    multiple={true}
                                                    type="file"
                                                    onChange={handleFileChange}
                                                />
                                            </div>
                                        ) : item.type === 'date' ? (
                                            <Input
                                                id={item.key}
                                                name={item.key}
                                                value={formatDateForInput(formData[item.key])}
                                                onChange={(e) => {
                                                    const newValue = e.target.value;
                                                    setFormData({
                                                        ...formData,
                                                        [item.key]: newValue || null
                                                    });
                                                }}
                                                type="date"
                                            />
                                        ) : item.type === 'select' ? (
                                            <Select
                                                id={item.key}
                                                value={formData[item.key]}
                                                onChange={(value) => handleSelectChange(value, item.key)}
                                                style={{ width: '100%' }}
                                                placeholder={t('select_option')}
                                                options={item.options || []}
                                                allowClear
                                                showSearch
                                                optionFilterProp="label"
                                            />
                                        ) : item.type === 'switch' ? (
                                            <div className="d-flex justify-content-center align-items-center mt-2">
                                                <Switch
                                                    id={item.key}
                                                    checked={!!formData[item.key]}
                                                    onChange={(checked) => {
                                                        setFormData({
                                                            ...formData,
                                                            [item.key]: checked
                                                        });
                                                    }}
                                                    size="default"
                                                />
                                            </div>
                                        ) : item.type === 'textarea' ? (
                                            <Input
                                                id={item.key}
                                                name={item.key}
                                                value={formData[item.key] || ''}
                                                onChange={(e) => setFormData({
                                                    ...formData,
                                                    [item.key]: e.target.value
                                                })}
                                                type={item.type}
                                                rows={4}
                                            />
                                        ) : (
                                            <Input
                                                id={item.key}
                                                name={item.key}
                                                value={formData[item.key] || ''}
                                                onChange={(e) => setFormData({
                                                    ...formData,
                                                    [item.key]: e.target.value
                                                })}
                                                type={item.type}
                                            />
                                        )}
                                    </div>
                                </Col>
                            ))
                        }
                    </Row>
                </ModalBody>
                <ModalFooter className='border-0 d-flex justify-content-end'>
                    <Button type='submit' className='btn btn-primary mr-2'>{t('save')}</Button>
                    <Button type='button' className='btn btn-secondary ms-2' onClick={() => setModal(false)}>{t('cancel')}</Button>
                </ModalFooter>
            </Form>
        </Modal>
    );
};

export default ERPForm;