import { useContext, useState } from 'react';
import './Login.css'
import { Button, Input, PasswordInput, Toast } from '@skbkontur/react-ui';
import axios from 'axios';
import { AUTH_SIGNIN } from '../../utils/consts';
import { AuthContext } from '../../providers/AuthProvider';
import Loader from '../Loader/Loader';


const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const setUser = useContext(AuthContext)![1]

    const login = () => {

        setLoading(true)
        axios.post(AUTH_SIGNIN, {
            email: email,
            password: password
        })
            .then(response => {
                const user = response?.data?.values;
                setUser({ authorized: true, userName: user.userName, userEmail: user.userEmail, token: user.token })
                localStorage.setItem('token', user.token);
            })
            .catch(error => {
                let message: string;
                if (error?.response) {
                    message = error.response.data.values.message
                } else {
                    message = error.message
                }

                Toast.push(message, null, 1000)
            })
            .finally(() => {
                setLoading(false)
            })
    }

    return (
        <div className="login">
            {loading ? <Loader /> : <div className='login_data'>
                <p>Авторизация</p>
                Эл. почта
                <Input type="email" value={email} onChange={event => setEmail(event.target.value)} />
                Пароль
                <PasswordInput detectCapsLock value={password} onChange={event => setPassword(event.target.value)} />
                <Button className="loginButton" use='success' title="Войти" onClick={login}>Войти</Button>
            </div>}
        </div>
    )
}

export default Login;