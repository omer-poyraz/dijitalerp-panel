import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { fetchLogin } from '../../redux/slices/loginSlice';
import { useTranslation } from 'react-i18next';

const LoginComponent = () => {
    const dispatch = useDispatch();
    const { t } = useTranslation();

    const handleLogin = async (formData) => {
        try {
            console.log(formData)
            const login = await dispatch(fetchLogin({
                userName: formData.userName,
                password: formData.password
            }));

            if (login.payload) {
                const data = login.payload;
                if (data.statusCode === 200) {
                    localStorage.setItem('auth', JSON.stringify(data.result));
                    toast.success(`${data.message}. ${t("welcome")}, ${data.result.user.firstName}`);
                    setTimeout(() => {
                        window.location.href = '/';
                    }, 1500);
                } else {
                    toast.error(`${data.message}`);
                }
            }
        } catch (error) {
            toast.error('Giriş işlemi sırasında bir hata oluştu');
        }
    };

    return handleLogin;
};

export default LoginComponent;