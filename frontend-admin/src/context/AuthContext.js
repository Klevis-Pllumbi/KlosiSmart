'use client'
import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loadingUser, setLoadingUser] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await axios.get("http://localhost:8080/api/user/profile", {
                    withCredentials: true,
                });
                setUser(res.data);
            } catch (err) {
                setUser(null);
            } finally {
                setLoadingUser(false);
            }
        };
        fetchUser();
    }, []);

    const loginUser = async (email, password) => {
        try {
            const res = await axios.post(
                "http://localhost:8080/api/auth/login",
                { email, password },
                { withCredentials: true }
            );
            setUser({ email: res.data.email, role: res.data.role });
            return { success: true };
        } catch (err) {
            return { success: false, message: err.response?.data?.message || err.response?.data?.error || "Ndodhi një gabim gjatë login." };
        }
    };

    const logoutUser = async () => {
        await axios.post("http://localhost:8080/api/auth/logout", {}, { withCredentials: true });
        setUser(null);
        router.push("/");
    };

    return (
        <AuthContext.Provider value={{ user, loadingUser, loginUser, logoutUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
