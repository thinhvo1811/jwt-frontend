import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { useEffect, useState } from 'react';
import _ from 'lodash';
import 'react-toastify/dist/ReactToastify.css';
import './App.scss';
import Login from './components/Login/Login';
import Nav from './components/Navigation/Nav';
import Register from './components/Register/Register';
import Users from './components/ManageUsers/Users';

function App() {
    const [account, setAccount] = useState({});

    useEffect(() => {
        let session = sessionStorage.getItem('account');

        if (session) {
            setAccount(JSON.parse(session));
        }
    }, []);

    return (
        <>
            <Router>
                <div className="app-container">
                    {account && !_.isEmpty(account) && account.isAuthenticated && <Nav />}
                    <Switch>
                        <Route path="/about">About</Route>
                        <Route path="/news">News</Route>
                        <Route path="/contact">Contact</Route>
                        <Route path="/login">
                            <Login />
                        </Route>
                        <Route path="/register">
                            <Register />
                        </Route>
                        <Route path="/users">
                            <Users />
                        </Route>
                        <Route path="/" exact>
                            Home
                        </Route>
                        <Route path="*">404 Not Found</Route>
                    </Switch>
                </div>
            </Router>
            <ToastContainer
                position="bottom-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </>
    );
}

export default App;
