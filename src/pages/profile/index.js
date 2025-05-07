import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ERP from '../../components/general/ERP';
import { fetchUserGet } from '../../redux/slices/userGetSlice';
import { fetchUserUpdate } from '../../redux/slices/userUpdateSlice';
import { Form, Input, Button, Row, Col, DatePicker, Select, Upload, message, Spin, Switch } from 'antd';
import { UserOutlined, MailOutlined, PhoneOutlined, UploadOutlined } from '@ant-design/icons';
import moment from 'moment';
import { useTranslation } from 'react-i18next';
import { URL as URL2 } from '../../api';
import { PiNumberCircleFive } from 'react-icons/pi';
import { BiCapsule } from 'react-icons/bi';
import { fetchDepartmentGetAll } from '../../redux/slices/departmentGetAllSlice';

const { Option } = Select;

const ProfilePage = () => {
    const dispatch = useDispatch();
    const userGet = useSelector(state => state.userGet);
    const userUpdate = useSelector(state => state.userUpdate);
    const departments = useSelector(state => state.departmentGetAll.data);
    const [form] = Form.useForm();
    const [avatar, setAvatar] = useState(null);
    const [avatarPreview, setAvatarPreview] = useState(null);
    const [loading, setLoading] = useState(false);
    const [fileList, setFileList] = useState([]);
    const { t } = useTranslation();
    const auth = JSON.parse(localStorage.getItem("auth"));
    const userId = auth?.user?.id;

    useEffect(() => {
        if (userId) {
            dispatch(fetchUserGet({ id: userId }));
            dispatch(fetchDepartmentGetAll())
        }
    }, [dispatch, userId]);

    useEffect(() => {
        if (userGet.data) {
            form.setFieldsValue({
                FirstName: userGet.data.firstName,
                LastName: userGet.data.lastName,
                UserName: userGet.data.userName,
                Email: userGet.data.email,
                tckno: userGet.data.tckno,
                PhoneNumber: userGet.data.phoneNumber,
                PhoneNumber2: userGet.data.phoneNumber2,
                Address: userGet.data.address,
                Field: userGet.data.field,
                DepartmentID: userGet.data.departmentID,
                Title: userGet.data.title,
                Birthday: userGet.data.birthday ? moment(userGet.data.birthday) : null,
                StartDate: userGet.data.startDate ? moment(userGet.data.startDate) : null,
                DepartureDate: userGet.data.departureDate ? moment(userGet.data.departureDate) : null,
                Gender: userGet.data.gender,
                IsActive: userGet.data.isActive,
            });
            if (!avatar) {
                const fileUrl = userGet?.data?.file
                    ? `${userGet?.data?.file?.search("http") === -1 ? URL2 : ""}${userGet?.data?.file}`
                    : null;
                setAvatarPreview(fileUrl);
            }
        }
    }, [userGet.data, form, avatar]);

    const handleAvatarChange = info => {
        setFileList(info.fileList);

        if (info.fileList.length > 0) {
            const file = info.fileList[0].originFileObj;
            setAvatar(file);
            setAvatarPreview(URL.createObjectURL(file));
        }
    };

    console.log(avatar);
    console.log(avatarPreview);

    const onFinish = async (values) => {
        setLoading(true);
        try {
            var newList = []
            newList.push(avatar)
            await dispatch(fetchUserUpdate({
                file: newList,
                UserId: userId,
                FirstName: values.FirstName,
                LastName: values.LastName,
                UserName: values.UserName,
                Email: values.Email,
                tckno: values.tckno,
                PhoneNumber: values.PhoneNumber,
                PhoneNumber2: values.PhoneNumber2,
                Address: values.Address,
                Field: values.Field,
                DepartmentID: values.DepartmentID,
                Title: values.Title,
                Birthday: values.Birthday ? values.Birthday.format('YYYY-MM-DD') : "",
                StartDate: values.StartDate ? values.StartDate.format('YYYY-MM-DD') : "",
                DepartureDate: values.DepartureDate ? values.DepartureDate.format('YYYY-MM-DD') : "",
                Gender: values.Gender,
                IsActive: values.IsActive,
            }));
            message.success("Profil başarıyla güncellendi!");
        } catch (err) {
            message.error("Bir hata oluştu!");
        }
        setLoading(false);
    };

    if (userGet.status === "loading" || !userGet.data) {
        return (
            <ERP>
                <div className="center" style={{ minHeight: 300 }}>
                    <Spin size="large" />
                </div>
            </ERP>
        );
    }

    return (
        <ERP>
            <h2 style={{ textAlign: "center", marginBottom: 24 }}>Profil Bilgilerim</h2>
            <Form
                form={form}
                layout="vertical"
                onFinish={onFinish}
                initialValues={{ IsActive: true }}
            >
                <Row gutter={24}>
                    <Col xs={24} md={4} style={{ textAlign: "center" }}>
                        <Upload
                            showUploadList={false}
                            beforeUpload={() => false}
                            onChange={handleAvatarChange}
                            accept="image/*"
                            fileList={fileList}
                        >
                            <div style={{ marginBottom: 16 }}>
                                <img
                                    src={avatarPreview || "/default-avatar.png"}
                                    alt="Avatar"
                                    style={{ width: 120, height: 120, borderRadius: "50%", objectFit: "cover", border: "2px solid #eee" }}
                                />
                            </div>
                            <Button icon={<UploadOutlined />}>{t("load_photo")}</Button>
                        </Upload>
                    </Col>
                    <Col xs={24} md={20}>
                        <Row gutter={16}>
                            <Col xs={24} md={12} className='mb-0'>
                                <Form.Item className='mb-2' name="FirstName" label="Ad" rules={[{ required: true, message: 'Ad zorunlu' }]}>
                                    <Input prefix={<UserOutlined />} />
                                </Form.Item>
                            </Col>
                            <Col xs={24} md={12} className='mb-0'>
                                <Form.Item className='mb-2' name="LastName" label="Soyad" rules={[{ required: true, message: 'Soyad zorunlu' }]}>
                                    <Input prefix={<UserOutlined />} />
                                </Form.Item>
                            </Col>
                            <Col xs={24} md={12}>
                                <Form.Item className='mb-2' name="UserName" label="Kullanıcı Adı" rules={[{ required: true, message: 'Kullanıcı adı zorunlu' }]}>
                                    <Input prefix={<UserOutlined />} />
                                </Form.Item>
                            </Col>
                            <Col xs={24} md={12}>
                                <Form.Item className='mb-2' name="Email" label="E-posta" rules={[{ required: true, type: 'email', message: 'Geçerli bir e-posta girin' }]}>
                                    <Input prefix={<MailOutlined />} />
                                </Form.Item>
                            </Col>
                            <Col xs={24} md={12}>
                                <Form.Item className='mb-2' name="PhoneNumber" label="Telefon">
                                    <Input prefix={<PhoneOutlined />} />
                                </Form.Item>
                            </Col>
                            <Col xs={24} md={12}>
                                <Form.Item className='mb-2' name="PhoneNumber2" label="Telefon 2">
                                    <Input prefix={<PhoneOutlined />} />
                                </Form.Item>
                            </Col>
                            <Col xs={24} md={12}>
                                <Form.Item className='mb-2' name="tckno" label="TCKN">
                                    <Input prefix={<PiNumberCircleFive />} />
                                </Form.Item>
                            </Col>
                            <Col xs={24} md={12}>
                                <Form.Item className='mb-2' name="Title" label="Ünvan">
                                    <Input prefix={<BiCapsule />} />
                                </Form.Item>
                            </Col>
                            <Col xs={24} md={12}>
                                <Form.Item className='mb-2' name="Birthday" label="Doğum Tarihi">
                                    <DatePicker style={{ width: "100%" }} format="YYYY-MM-DD" />
                                </Form.Item>
                            </Col>
                            <Col xs={24} md={12}>
                                <Form.Item className='mb-2' name="StartDate" label="Başlangıç Tarihi">
                                    <DatePicker style={{ width: "100%" }} format="YYYY-MM-DD" />
                                </Form.Item>
                            </Col>
                            <Col xs={24} md={12}>
                                <Form.Item className='mb-2' name="Gender" label="Cinsiyet">
                                    <Select>
                                        <Option value="Erkek">Erkek</Option>
                                        <Option value="Kadın">Kadın</Option>
                                    </Select>
                                </Form.Item>
                            </Col>
                            <Col xs={24} md={12}>
                                <Form.Item className='mb-2' name="DepartmentID" label="Departman ID">
                                    <Select>
                                        {departments?.map((item, index) => {
                                            return (
                                                <Option key={index} value={item.id}>{item.name}</Option>
                                            )
                                        })}
                                    </Select>
                                </Form.Item>
                            </Col>
                            <Col xs={24} md={24}>
                                <Form.Item className='mb-2' name="Address" label="Adres">
                                    <Input.TextArea rows={2} />
                                </Form.Item>
                            </Col>
                            <Col xs={24} md={12}>
                                <Form.Item className='mb-2' name="Field" label="Alan">
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col xs={24} md={12}>
                                <Form.Item className='mb-2' name="IsActive" label="Aktif mi?" valuePropName="checked">
                                    <Switch />
                                </Form.Item>
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <div className='d-flex justify-content-end w-100'>
                    <Button type="primary" htmlType="submit" loading={loading || userUpdate.status === "loading"} size="large">
                        Güncelle
                    </Button>
                </div>
            </Form>
        </ERP>
    );
};

export default ProfilePage;