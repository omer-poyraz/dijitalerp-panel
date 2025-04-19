import React, { useState } from 'react';
import { Container, Row, Col, Card, CardBody, Form, FormGroup, Input, Button, InputGroup, InputGroupText } from 'reactstrap';
import { Checkbox, Divider } from 'antd';
import { UserOutlined, LockOutlined, EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import logo from '../../images/logo.svg';
import { useTranslation } from 'react-i18next';
import LoginComponent from './LoginComponent';

const LoginPage = () => {
    const [passwordVisible, setPasswordVisible] = useState(false);
    const { t, i18n } = useTranslation();
    const handleLogin = LoginComponent();

    const [formData, setFormData] = useState({ userName: '', password: '', rememberMe: false });
    const languages = [{ code: 'en', name: 'English' }, { code: 'tr', name: 'Türkçe' }];

    const changeLanguage = (languageCode) => {
        localStorage.setItem('lang', languageCode);
        i18n.changeLanguage(languageCode);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleCheckboxChange = (e) => {
        setFormData({
            ...formData,
            rememberMe: e.target.checked
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        handleLogin(formData)
    };

    return (
        <div className="modern-login-page">
            <div className="login-background-overlay"></div>
            <Container className="login-container">
                <Row className="justify-content-center">
                    <Col md={10} lg={8} xl={6}>
                        <div className="login-branding text-center">
                            <img src={logo} alt="Company Logo" className="login-logo" />
                        </div>

                        <Card className="modern-login-card">
                            <CardBody className="p-4 p-md-5">
                                <div className="text-center mb-5">
                                    <h2 className="welcome-title">{t("welcome")}</h2>
                                    <p className="welcome-subtitle">{t("please_login")}</p>
                                </div>

                                <Form onSubmit={handleSubmit}>
                                    <FormGroup className="mb-4">
                                        <label className="form-label">{t("email")}</label>
                                        <InputGroup className="modern-input-group">
                                            <InputGroupText className="modern-input-icon">
                                                <UserOutlined />
                                            </InputGroupText>
                                            <Input
                                                type="text"
                                                name="userName"
                                                className="modern-form-control"
                                                placeholder={t("username")}
                                                value={formData.userName}
                                                onChange={handleInputChange}
                                            />
                                        </InputGroup>
                                    </FormGroup>

                                    <FormGroup className="mb-4">
                                        <label className="form-label">{t("password")}</label>
                                        <InputGroup className="modern-input-group">
                                            <InputGroupText className="modern-input-icon">
                                                <LockOutlined />
                                            </InputGroupText>
                                            <Input
                                                type={passwordVisible ? "text" : "password"}
                                                name="password"
                                                className="modern-form-control"
                                                placeholder={t("password")}
                                                value={formData.password}
                                                onChange={handleInputChange}
                                            />
                                            <InputGroupText
                                                className="modern-password-toggle"
                                                onClick={() => setPasswordVisible(!passwordVisible)}
                                            >
                                                {passwordVisible ? <EyeTwoTone /> : <EyeInvisibleOutlined />}
                                            </InputGroupText>
                                        </InputGroup>
                                    </FormGroup>

                                    <div className="d-flex justify-content-between align-items-center mb-4">
                                        <Checkbox
                                            checked={formData.rememberMe}
                                            onChange={handleCheckboxChange}
                                            className="modern-checkbox"
                                        >
                                            {t("remember_me")}
                                        </Checkbox>
                                        <a href="#forgot-password" className="modern-link">
                                            {t("forgot_password")}
                                        </a>
                                    </div>

                                    <Button
                                        color="primary"
                                        block
                                        type="submit"
                                        className="modern-btn-primary mb-4"
                                    >
                                        {t("sign_in")}
                                    </Button>

                                    <div className="language-section mt-5">
                                        <p className="text-center text-muted mb-3">{t("select_language")}</p>
                                        <div className="language-buttons d-flex justify-content-center">
                                            {languages.map((language) => (
                                                <Button
                                                    key={language.code}
                                                    color="light"
                                                    size="sm"
                                                    className={`modern-language-btn ${i18n.language === language.code ? 'active-language' : ''}`}
                                                    onClick={() => changeLanguage(language.code)}
                                                >
                                                    {language.name}
                                                </Button>
                                            ))}
                                        </div>
                                    </div>
                                </Form>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default LoginPage;