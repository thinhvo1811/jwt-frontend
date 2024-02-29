import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Route } from 'react-router-dom';

const PrivateRoutes = (props) => {
    let history = useHistory();

    useEffect(() => {
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
