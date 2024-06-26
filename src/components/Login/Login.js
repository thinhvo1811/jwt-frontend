import { useContext, useEffect, useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import './Login.scss';
import { loginUser } from '../../services/userService';
import { UserContext } from '../../context/UserContext';

const Login = (props) => {
    const { user, loginContext } = useContext(UserContext);

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
            let groupWithRoles = response.DT.groupWithRoles;
            let email = response.DT.email;
            let username = response.DT.username;
            let token = response.DT.access_token;
            let data = {
                isAuthenticated: true,
                token,
                account: { groupWithRoles, email, username },
            };

            localStorage.setItem('jwt', token);
            loginContext(data);
            history.push('/users');
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
        if (user && user.isAuthenticated) {
            history.push('/');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="login-container">
            <div className="container">
                <div className="row px-3 px-md-0">
                    <div className="content-left d-none col-md-7 d-md-block">
                        <div className="brand">
                            <Link to="/">
                                <span title="Return to HomePage">JWT Fullstack</span>
                            </Link>
                        </div>
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
                            <div className="return mt-3">
                                <Link to="/">
                                    <i className="fa fa-arrow-circle-left"></i>
                                    <span title="Return to HomePage">Return to HomePage</span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
