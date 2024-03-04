import { Link, useHistory } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import './Register.scss';
import { registerNewUser } from '../../services/userService';
import { UserContext } from '../../context/UserContext';

const Register = (props) => {
    const defaultValidInput = {
        isValidEmail: true,
        isValidPhone: true,
        isValidPassword: true,
        isValidConfirmPassword: true,
    };

    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [objCheckInput, setObjCheckInput] = useState(defaultValidInput);
    const { user } = useContext(UserContext);

    let history = useHistory();

    const handleLogin = () => {
        history.push('/login');
    };

    const handleRegister = async () => {
        let check = isValidInputs();

        if (check) {
            let response = await registerNewUser(email, phone, username, password);
            let serverData = response;
            if (+serverData.EC === 0) {
                toast.success(serverData.EM);
                history.push('/login');
            } else {
                toast.error(serverData.EM);
                setObjCheckInput({ ...defaultValidInput, [serverData.DT]: false });
            }
        }
    };

    const isValidInputs = () => {
        setObjCheckInput(defaultValidInput);

        if (!email) {
            toast.error('Email is required');
            setObjCheckInput({ ...defaultValidInput, isValidEmail: false });
            return false;
        }
        let regx = /\S+@\S+\.\S+/;
        if (!regx.test(email)) {
            toast.error('Please enter a valid email address');
            setObjCheckInput({ ...defaultValidInput, isValidEmail: false });
            return false;
        }
        if (!phone) {
            toast.error('Phone is required');
            setObjCheckInput({ ...defaultValidInput, isValidPhone: false });
            return false;
        }
        if (!password) {
            toast.error('Password is required');
            setObjCheckInput({ ...defaultValidInput, isValidPassword: false });
            return false;
        }
        if (password !== confirmPassword) {
            toast.error('Your password is not the same');
            setObjCheckInput({ ...defaultValidInput, isValidConfirmPassword: false });
            return false;
        }
        return true;
    };

    useEffect(() => {
        if (user && user.isAuthenticated) {
            history.push('/');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="register-container">
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
                        <div className="form-group">
                            <label>Email:</label>
                            <input
                                type="text"
                                className={objCheckInput.isValidEmail ? 'form-control' : 'form-control is-invalid'}
                                placeholder="Email address"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label>Phone number:</label>
                            <input
                                type="text"
                                className={objCheckInput.isValidPhone ? 'form-control' : 'form-control is-invalid'}
                                placeholder="Phone number"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label>Username:</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label>Password:</label>
                            <input
                                type="password"
                                className={objCheckInput.isValidPassword ? 'form-control' : 'form-control is-invalid'}
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label>Re-enter password:</label>
                            <input
                                type="password"
                                className={
                                    objCheckInput.isValidConfirmPassword ? 'form-control' : 'form-control is-invalid'
                                }
                                placeholder="Re-enter password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                        </div>
                        <button className="btn btn-primary" onClick={() => handleRegister()}>
                            Register
                        </button>
                        <hr />
                        <div className="text-center">
                            <button className="btn btn-success" onClick={() => handleLogin()}>
                                Already've an account. Login
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

export default Register;
