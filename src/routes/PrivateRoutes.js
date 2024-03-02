import { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Route } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

const PrivateRoutes = (props) => {
    let history = useHistory();
    const { user } = useContext(UserContext);

    useEffect(() => {
        console.log(user);
        let session = sessionStorage.getItem('account');

        if (!session) {
            history.push('/login');
            window.location.reload();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <Route path={props.path} component={props.component} />
        </>
    );
};

export default PrivateRoutes;
