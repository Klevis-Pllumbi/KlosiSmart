'use client';
import { createContext, useContext, useEffect, useMemo, useRef, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loadingUser, setLoadingUser] = useState(true);
    const mounted = useRef(true);
    const router = useRouter();

    useEffect(() => {
        mounted.current = true;
        const controller = new AbortController();

        (async () => {
            try {
                const res = await axios.get('http://localhost:8080/api/user/profile', {
                    withCredentials: true,
                    signal: controller.signal,
                });
                if (mounted.current) setUser(res.data ?? null);
            } catch {
                if (mounted.current) setUser(null);
            } finally {
                if (mounted.current) setLoadingUser(false);
            }
        })();

        return () => {
            mounted.current = false;
            controller.abort();
        };
    }, []);

    const loginUser = async (email, password) => {
        try {
            const res = await axios.post(
                'http://localhost:8080/api/auth/login',
                { email, password },
                { withCredentials: true }
            );
            setUser({ email: res.data.email, role: res.data.role });
            return { success: true };
        } catch (err) {
            return {
                success: false,
                message:
                    err.response?.data?.message ||
                    err.response?.data?.error ||
                    'Ndodhi një gabim gjatë login.',
            };
        }
    };

    const logoutUser = async () => {
        try {
            await axios.post('http://localhost:8080/api/auth/logout', {}, { withCredentials: true });
        } finally {
            setUser(null);
            router.push('/');
        }
    };

    const value = useMemo(() => ({ user, loadingUser, loginUser, logoutUser }), [user, loadingUser]);

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
