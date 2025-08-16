import { createContext, useState, useEffect, useCallback } from 'react';
import { jwtDecode } from 'jwt-decode';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [logoutWarning, setLogoutWarning] = useState(false);

    const isTokenExpired = (token) => {
        if (!token) return true;
        try {
            const { exp } = jwtDecode(token);
            return Date.now() >= exp * 1000;
        } catch {
            return true;
        }
    };

    const login = (token, role) => {
        localStorage.setItem('token', token);
        localStorage.setItem('role', role);
        setUser({ token, role });
    };

    const logout = useCallback(() => {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        setUser(null);
    }, []);

    useEffect(() => {
        const token = localStorage.getItem('token');
        const role = localStorage.getItem('role');

        if (token && role) {
            if (isTokenExpired(token)) {
                logout();
            } else {
                setUser({ token, role });

                const { exp } = jwtDecode(token);
                const timeUntilExpiry = exp * 1000 - Date.now();

                if (timeUntilExpiry > 60000) { // more than 1 min left
                    const warningTimer = setTimeout(() => {
                        setLogoutWarning(true); // show warning 1 min before
                    }, timeUntilExpiry - 60000);

                    const logoutTimer = setTimeout(() => {
                        logout();
                    }, timeUntilExpiry);

                    return () => {
                        clearTimeout(warningTimer);
                        clearTimeout(logoutTimer);
                    };
                } else {
                    // less than 1 min left, logout directly
                    logout();
                }
            }
        }
        setLoading(false);
    }, [logout]);

    return (
        <AuthContext.Provider value={{ user, login, logout, loading, logoutWarning }}>
            {children}
        </AuthContext.Provider>
    );
};