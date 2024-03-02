import { BrowserRouter as Router } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Rings } from 'react-loader-spinner';
import { useContext } from 'react';
import './App.scss';
import Nav from './components/Navigation/Nav';
import AppRoutes from './routes/AppRoutes';
import { UserContext } from './context/UserContext';

function App() {
    const { user } = useContext(UserContext);

    return (
        <>
            <Router>
                {user && user.isLoading ? (
                    <div className="loading-container">
                        <Rings height="80" width="80" radius="9" color="#1877f2" ariaLabel="loading" />
                        <div>Loading data...</div>
                    </div>
                ) : (
                    <>
                        <div className="app-header">
                            <Nav />
                        </div>
                        <div className="app-container">
                            <AppRoutes />
                        </div>
                    </>
                )}
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
