import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ERP from '../../components/general/ERP';
import { Table, Switch, Spin, Row, Col, Typography, message, Button, Progress } from 'antd';
import { fetchUserGetAll } from '../../redux/slices/userGetAllSlice';
import { fetchServicesGetAll } from '../../redux/slices/servicesGetAllSlice';
import { fetchUserPermissionGetAll } from '../../redux/slices/userPermissionGetAllSlice';
import { fetchUserPermissionCreate } from '../../redux/slices/userPermissionCreateSlice';
import { fetchUserPermissionUpdate } from '../../redux/slices/userPermissionUpdateSlice';

const { Title, Paragraph } = Typography;

const RolePage = () => {
    const dispatch = useDispatch();
    const users = useSelector(state => state.userGetAll.data);
    const usersStatus = useSelector(state => state.userGetAll.status);
    const services = useSelector(state => state.servicesGetAll.data);
    const servicesStatus = useSelector(state => state.servicesGetAll.status);
    const permissions = useSelector(state => state.userPermissionGetAll.data);
    const permissionsStatus = useSelector(state => state.userPermissionGetAll.status);

    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);
    const [progress, setProgress] = useState(0);
    // Değişiklikleri burada biriktiriyoruz: { [userId_serviceName]: {canRead, canWrite, canDelete} }
    const [changes, setChanges] = useState({});

    useEffect(() => {
        dispatch(fetchUserGetAll({ search: '', pageNumber: 1, pageSize: 1000 }));
        dispatch(fetchServicesGetAll());
        dispatch(fetchUserPermissionGetAll());
    }, [dispatch]);

    // Kullanıcı ve servis için mevcut izin kaydını bul
    const getPermission = (user, serviceName) => {
        if (!permissions) return null;
        const uid = user.userId || user.id;
        return permissions.find(
            p => (p.userId === uid) && (p.serviceName === serviceName)
        );
    };

    // Switch değiştiğinde local state'te değişikliği biriktir
    const handlePermissionChange = (user, serviceName, type, checked) => {
        const uid = user.userId || user.id;
        const key = `${uid}_${serviceName}`;
        const current = changes[key] || getPermission(user, serviceName) || { canRead: false, canWrite: false, canDelete: false };
        setChanges(prev => ({
            ...prev,
            [key]: {
                ...current,
                [type]: checked
            }
        }));
    };

    // Toplu kaydet
    const handleSave = async () => {
        setSaving(true);
        setProgress(0);
        const changeKeys = Object.keys(changes);
        let completed = 0;
        for (const key of changeKeys) {
            const [uid, serviceName] = key.split('_');
            const newPerm = changes[key];
            const permission = permissions.find(
                p => (p.userId === uid) && (p.serviceName === serviceName)
            );
            try {
                if (!permission) {
                    // Yeni kayıt
                    await dispatch(fetchUserPermissionCreate({
                        formData: {
                            serviceName,
                            userId: uid,
                            canRead: !!newPerm.canRead,
                            canWrite: !!newPerm.canWrite,
                            canDelete: !!newPerm.canDelete,
                        }
                    })).unwrap();
                } else {
                    // Güncelle
                    await dispatch(fetchUserPermissionUpdate({
                        formData: {
                            serviceName,
                            userId: uid,
                            canRead: !!newPerm.canRead,
                            canWrite: !!newPerm.canWrite,
                            canDelete: !!newPerm.canDelete,
                        },
                        id: permission.id
                    })).unwrap();
                }
            } catch (err) {
                message.error(`${serviceName} için güncelleme başarısız!`);
            }
            completed++;
            setProgress(Math.round((completed / changeKeys.length) * 100));
        }
        await dispatch(fetchUserPermissionGetAll());
        setChanges({});
        setSaving(false);
        setProgress(100);
        message.success('Tüm değişiklikler kaydedildi!');
    };

    if (
        usersStatus === 'loading' ||
        servicesStatus === 'loading' ||
        permissionsStatus === 'loading' ||
        !users ||
        !services
    ) {
        return (
            <ERP>
                <div style={{ minHeight: 300, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Spin size="large" />
                </div>
            </ERP>
        );
    }

    return (
        <ERP>
            <Title level={3} style={{ textAlign: 'left', marginBottom: 5 }}>Rol Yönetimi</Title>
            <Paragraph style={{ textAlign: 'left', marginBottom: 32 }}>
                Kullanıcılara ait rolleri buradan güncelleyebilirsiniz.
            </Paragraph>
            <div style={{ marginBottom: 16 }}>
                <Button
                    type="primary"
                    onClick={handleSave}
                    disabled={Object.keys(changes).length === 0 || saving}
                    loading={saving}
                >
                    Değişiklikleri Kaydet
                </Button>
                {saving && (
                    <Progress
                        percent={progress}
                        status={progress < 100 ? "active" : "success"}
                        style={{ width: 200, marginLeft: 16 }}
                    />
                )}
            </div>
            <div style={{ overflowX: 'auto', pointerEvents: saving ? 'none' : 'auto', opacity: saving ? 0.5 : 1 }}>
                <Table
                    dataSource={users}
                    rowKey={record => record.userId || record.id}
                    pagination={false}
                    bordered
                    scroll={{ x: true }}
                    columns={[
                        {
                            title: '',
                            dataIndex: 'firstName',
                            key: 'firstName',
                            fixed: 'left',
                            width: 180,
                            render: (text, record) => (
                                <div>
                                    <strong>{record.firstName} {record.lastName}</strong>
                                    <div style={{ fontSize: 12, color: '#888' }}>{record.email}</div>
                                </div>
                            ),
                        },
                        ...services.map(service => ({
                            title: (
                                <div style={{ minWidth: 140, textAlign: 'center' }}>
                                    <div style={{ fontWeight: 600, marginBottom: 10 }}>{service.name}</div>
                                    <div style={{ fontSize: 11, color: '#888' }}>
                                        <span style={{ margin: '0 6px' }}>Oku</span>
                                        <span style={{ margin: '0 6px' }}>Yaz</span>
                                        <span style={{ margin: '0 6px' }}>Sil</span>
                                    </div>
                                </div>
                            ),
                            dataIndex: service.name,
                            key: service.name,
                            align: 'center',
                            render: (_, user) => {
                                const uid = user.userId || user.id;
                                const key = `${uid}_${service.name}`;
                                // Önce değişikliklerde var mı bak, yoksa mevcut izinleri göster
                                const permission = changes[key] || getPermission(user, service.name) || {};
                                return (
                                    <Row gutter={4} justify="center" align="middle">
                                        <Col>
                                            <Switch
                                                size="small"
                                                checked={!!permission.canRead}
                                                disabled={saving}
                                                onChange={checked =>
                                                    handlePermissionChange(user, service.name, 'canRead', checked)
                                                }
                                            />
                                        </Col>
                                        <Col>
                                            <Switch
                                                size="small"
                                                checked={!!permission.canWrite}
                                                disabled={saving}
                                                onChange={checked =>
                                                    handlePermissionChange(user, service.name, 'canWrite', checked)
                                                }
                                            />
                                        </Col>
                                        <Col>
                                            <Switch
                                                size="small"
                                                checked={!!permission.canDelete}
                                                disabled={saving}
                                                onChange={checked =>
                                                    handlePermissionChange(user, service.name, 'canDelete', checked)
                                                }
                                            />
                                        </Col>
                                    </Row>
                                );
                            }
                        })),
                    ]}
                />
            </div>
        </ERP>
    );
};

export default RolePage;