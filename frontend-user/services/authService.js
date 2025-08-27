import api from "../lib/axios";
import Cookies from "js-cookie";

export const login = async (email, password) => {
    const response = await api.post("/auth/login", { email, password });

    Cookies.set("token", response.data.token, { expires: 1 });
    Cookies.set("role", response.data.role, { expires: 1 });

    return response.data;
};

export const register = async (name, email, password) => {
    const response = await api.post("/auth/register", { name, email, password });
    return response.data;
};

export const logout = () => {
    Cookies.remove("token");
    Cookies.remove("role");
};