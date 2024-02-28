import './Register.scss';
import { useHistory } from 'react-router-dom';

const Register = (props) => {
    let history = useHistory();
    const handleLogin = () => {
        history.push('/login');
    };

    return (
        <div className="register-container">
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
                        <div className="form-group">
                            <label>Email:</label>
                            <input type="text" className="form-control" placeholder="Email address" />
                        </div>
                        <div className="form-group">
                            <label>Phone number:</label>
                            <input type="text" className="form-control" placeholder="Phone number" />
                        </div>
                        <div className="form-group">
                            <label>Username:</label>
                            <input type="text" className="form-control" placeholder="Username" />
                        </div>
                        <div className="form-group">
                            <label>Password:</label>
                            <input type="password" className="form-control" placeholder="Password" />
                        </div>
                        <div className="form-group">
                            <label>Re-enter password:</label>
                            <input type="password" className="form-control" placeholder="Re-enter password" />
                        </div>
                        <button className="btn btn-primary">Register</button>
                        <hr />
                        <div className="text-center">
                            <button className="btn btn-success" onClick={() => handleLogin()}>
                                Already've an account. Login
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
