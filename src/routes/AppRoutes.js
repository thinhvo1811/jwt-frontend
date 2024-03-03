import { Switch, Route } from 'react-router-dom';
import Register from '../components/Register/Register';
import Users from '../components/ManageUsers/Users';
import Login from '../components/Login/Login';
import PrivateRoutes from './PrivateRoutes';
import Role from '../components/Role/Role';

const AppRoutes = (props) => {
    return (
        <>
            <Switch>
                <PrivateRoutes path="/users" component={Users} />
                <PrivateRoutes path="/roles" component={Role} />

                <Route path="/login">
                    <Login />
                </Route>
                <Route path="/register">
                    <Register />
                </Route>
                <Route path="/" exact>
                    Home
                </Route>
                <Route path="*">404 Not Found</Route>
            </Switch>
        </>
    );
};

export default AppRoutes;
