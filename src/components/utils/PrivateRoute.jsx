import { Outlet, Navigate, useLocation } from 'react-router-dom';

const PrivateRoutes = () => {
    const location = useLocation();

    let jwt = localStorage.getItem('jwt');
    return(
        jwt === '' ? <Navigate to="/login" state={{ from: location }} replace/> : <Outlet/>
    );
}

export default PrivateRoutes;