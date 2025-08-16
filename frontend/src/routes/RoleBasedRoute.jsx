import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { jwtDecode } from 'jwt-decode';

const RoleBasedRoute = ({ allowedRole, children }) => {
    const { user, loading, logout, logoutWarning } = useContext(AuthContext);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (logoutWarning) {
        return <div>Ju lutem përgatituni, do të dilni nga sistemi së shpejti. Ju lutemi rifreskoni ose identifikohuni përsëri.</div>;
    }

    if (!user) {
        return <Navigate to="/login" replace/>;
    }

    try {
        const {exp} = jwtDecode(user.token);
        if (Date.now() >= exp * 1000) {
            logout();
            return <Navigate to="/login" replace />;
        }
    } catch {
        logout();
        return <Navigate to="/login" replace />;
    }

    if (user.role !== allowedRole) {
        return <Navigate to="/" replace />;
    }

    return children;
};

export default RoleBasedRoute;