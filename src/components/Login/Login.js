import './Login.scss';

const Login = (props) => {
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
                        <input type="text" className="form-control" placeholder="Email address or phone number" />
                        <input type="password" className="form-control" placeholder="Password" />
                        <button className="btn btn-primary">Login</button>
                        <span className="text-center">
                            <a className="forgot-password" href="/">
                                Forgotten password?
                            </a>
                        </span>
                        <hr />
                        <div className="text-center">
                            <button className="btn btn-success">Create new account</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
