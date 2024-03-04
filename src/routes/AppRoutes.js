import { Switch, Route } from 'react-router-dom';
import Register from '../components/Register/Register';
import Users from '../components/ManageUsers/Users';
import Login from '../components/Login/Login';
import PrivateRoutes from './PrivateRoutes';
import Role from '../components/Role/Role';
import GroupRole from '../components/GroupRole/GroupRole';
import Home from '../components/Home/Home';

const AppRoutes = (props) => {
    return (
        <div className="app-content">
            <Switch>
                <PrivateRoutes path="/users" component={Users} />
                <PrivateRoutes path="/roles" component={Role} />
                <PrivateRoutes path="/group-role" component={GroupRole} />

                <Route path="/login">
                    <Login />
                </Route>
                <Route path="/register">
                    <Register />
                </Route>
                <Route path="/" exact>
                    <Home />
                </Route>
                <Route path="*">
                    <div className="container">404 Not Found</div>
                </Route>
            </Switch>
        </div>
    );
};

export default AppRoutes;
