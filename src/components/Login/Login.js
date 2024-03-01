import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import './Login.scss';
import { loginUser } from '../../services/userService';

const Login = (props) => {
    const defaultValidInput = {
        isValidValueLogin: true,
        isValidPassword: true,
    };

    const [valueLogin, setValueLogin] = useState('');
    const [password, setPassword] = useState('');
    const [objCheckInput, setObjCheckInput] = useState(defaultValidInput);
    let history = useHistory();

    const handleCreateNewAccount = () => {
        history.push('/register');
    };

    const handleLogin = async () => {
        setObjCheckInput(defaultValidInput);

        if (!valueLogin) {
            toast.error('Please enter your email address or phone number!');
            setObjCheckInput({ ...defaultValidInput, isValidValueLogin: false });
            return;
        }
        if (!password) {
            toast.error('Please enter your password!');
            setObjCheckInput({ ...defaultValidInput, isValidPassword: false });
            return;
        }

        let response = await loginUser(valueLogin, password);

        if (response && +response.EC === 0) {
            let data = {
                isAuthenticated: true,
                token: 'fake token',
            };
            sessionStorage.setItem('account', JSON.stringify(data));
            history.push('/users');
            window.location.reload();
        }
        if (response && +response.EC !== 0) {
            toast.error(response.EM);
        }
    };

    const handlePressEnter = (e) => {
        if (e.charCode === 13 && e.code === 'Enter') {
            handleLogin();
        }
    };

    useEffect(() => {
        let session = sessionStorage.getItem('account');

        if (session) {
            history.push('/');
            window.location.reload();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="login-container">
            <div className="container">
                <div className="row px-3 px-md-0">
                    <div className="content-left d-none col-md-7 d-md-block">
                        <div className="brand">JWT Fullstack</div>
                        <div className="detail">
                            Learn about JSON Web Tokens, what are they, how they work, when and why you should use them.
                        </div>
                    </div>
                    <div className="content-right col-12 col-md-5 d-flex flex-column gap-3 py-3">
                        <div className="brand d-md-none">JWT Fullstack</div>
                        <input
                            type="text"
                            className={objCheckInput.isValidValueLogin ? 'form-control' : 'form-control is-invalid'}
                            placeholder="Email address or phone number"
                            value={valueLogin}
                            onChange={(e) => setValueLogin(e.target.value)}
                        />
                        <input
                            type="password"
                            className={objCheckInput.isValidPassword ? 'form-control' : 'form-control is-invalid'}
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            onKeyPress={(e) => handlePressEnter(e)}
                        />
                        <button className="btn btn-primary" onClick={() => handleLogin()}>
                            Login
                        </button>
                        <span className="text-center">
                            <a className="forgot-password" href="/">
                                Forgotten password?
                            </a>
                        </span>
                        <hr />
                        <div className="text-center">
                            <button className="btn btn-success" onClick={() => handleCreateNewAccount()}>
                                Create new account
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
