import { Outlet, Navigate } from 'react-router-dom';

const PrivateRoutes = () => {
    let jwt = localStorage.getItem('jwt');
    return(
        jwt === '' ? <Navigate to="/login" /> : <Outlet/>
    );
}

export default PrivateRoutes;