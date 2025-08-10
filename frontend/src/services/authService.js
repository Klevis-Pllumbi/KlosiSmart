import api from '../api/axios';

export const login = async (email, password) => {
    return await api.post('/auth/login', { email, password });
};

export const register = async (name, email, password) => {
    return await api.post('/auth/register', { name, email, password });
};