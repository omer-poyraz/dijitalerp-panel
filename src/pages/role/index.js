import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ERP from '../../components/general/ERP';
import { Table, Switch, Spin, Row, Col, Typography, message } from 'antd';
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

    useEffect(() => {
        dispatch(fetchUserGetAll({ search: '', pageNumber: 1, pageSize: 1000 }));
        dispatch(fetchServicesGetAll());
        dispatch(fetchUserPermissionGetAll());
    }, [dispatch]);

    const getPermission = (user, serviceName) => {
        if (!permissions) return null;
        const uid = user.userId || user.id;
        return permissions.find(
            p => (p.userId === uid) && (p.serviceName === serviceName)
        );
    };

    const handlePermissionChange = async (user, serviceName, type, checked) => {
        console.log('handlePermissionChange', user, serviceName, type, checked);
        setLoading(true);
        try {
            const uid = user.userId || user.id;
            let permission = getPermission(user, serviceName);
            console.log(uid, permission);

            if (!permission) {
                const formData = {
                    serviceName: serviceName,
                    userId: uid,
                    canRead: type === 'canRead' ? checked : false,
                    canWrite: type === 'canWrite' ? checked : false,
                    canDelete: type === 'canDelete' ? checked : false,
                };
                console.log('formData', formData);
                await dispatch(fetchUserPermissionCreate({ formData })).unwrap();
            } else {
                const formData = {
                    serviceName: serviceName,
                    userId: uid,
                    canRead: type === 'canRead' ? checked : permission.canRead,
                    canWrite: type === 'canWrite' ? checked : permission.canWrite,
                    canDelete: type === 'canDelete' ? checked : permission.canDelete,
                };
                console.log('formData', formData);
                await dispatch(fetchUserPermissionUpdate({ formData, id: permission.id })).unwrap();
            }
            await dispatch(fetchUserPermissionGetAll());
            message.success('Yetki güncellendi');
        } catch (err) {
            message.error('Yetki güncellenemedi');
        }
        setLoading(false);
    };

    if (usersStatus === 'loading' || servicesStatus === 'loading' || permissionsStatus === 'loading' || !users || !services) {
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
            <div style={{ overflowX: 'auto' }}>
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
                                const permission = getPermission(user, service.name) || {};
                                return (
                                    <Row gutter={4} justify="center" align="middle">
                                        <Col>
                                            <Switch
                                                size="small"
                                                checked={!!permission.canRead}
                                                loading={loading}
                                                onChange={checked =>
                                                    handlePermissionChange(user, service.name, 'canRead', checked)
                                                }
                                            />
                                        </Col>
                                        <Col>
                                            <Switch
                                                size="small"
                                                checked={!!permission.canWrite}
                                                loading={loading}
                                                onChange={checked =>
                                                    handlePermissionChange(user, service.name, 'canWrite', checked)
                                                }
                                            />
                                        </Col>
                                        <Col>
                                            <Switch
                                                size="small"
                                                checked={!!permission.canDelete}
                                                loading={loading}
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