import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { PiFeather } from "react-icons/pi";
import { Button, Col, Form, Input, Modal, ModalBody, ModalHeader, Row, Badge, ModalFooter } from 'reactstrap';
import { Switch } from 'antd';

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

    const removeFile = (idx) => {
        const updatedFiles = [...formData.file];
        updatedFiles.splice(idx, 1);
        setFormData({ ...formData, file: updatedFiles });
    };

    const getFileName = (file) => {
        if (!file) return 'Dosya';

        if (file instanceof File) return file.name;

        if (typeof file === 'string') {
            const parts = file.split(/[\/\\]/);
            return parts[parts.length - 1];
        }

        if (typeof file === 'object' && file.name) return file.name;

        return 'Dosya';
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

    return (
        <Modal isOpen={modal} toggle={() => setModal(!modal)} size="lg" className="modal-dialog-centered">
            <ModalHeader toggle={() => setModal(!modal)} tag="h5">{t('add_new')}</ModalHeader>
            <Form onSubmit={handleSubmit}>
                <ModalBody className='overflow-y-auto'>
                    <Row>
                        {
                            formValues.map((item, index) => (
                                <Col key={index} md={item.col} className='mb-3'>
                                    <div className='form-item'>
                                        <div className={item.type === "switch" ? "w-100 text-center" : ""}><label>{item.label}</label></div>
                                        {item.type !== "file" && item.type !== "switch" ? <PiFeather size={20} className='color4' /> : null}

                                        {item.type === 'file' ? (
                                            <div>
                                                <Input
                                                    id={item.key}
                                                    name={item.key}
                                                    multiple={true}
                                                    type="file"
                                                    onChange={handleFileChange}
                                                />

                                                {formData.file && formData.file.length > 0 && (
                                                    <div className="selected-files mt-2">
                                                        <small className="text-muted">{t('selected_files') || 'Seçilen Dosyalar'}:</small>
                                                        <div className="d-flex flex-wrap gap-2 mt-1">
                                                            {formData.file.map((file, idx) => (
                                                                <Badge key={idx} color="primary" className="p-2">
                                                                    {getFileName(file)}
                                                                    <Button
                                                                        close
                                                                        className="ms-2"
                                                                        onClick={(e) => {
                                                                            e.preventDefault();
                                                                            removeFile(idx);
                                                                        }}
                                                                    />
                                                                </Badge>
                                                            ))}
                                                        </div>
                                                    </div>
                                                )}
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