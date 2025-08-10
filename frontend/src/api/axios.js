import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8080/api'
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    console.log("TOKEN NGA LOCALSTORAGE:", token);

    const isAuthEndpoint = config.url.includes('/auth/login') || config.url.includes('/auth/register');

    if (token && !isAuthEndpoint) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

export default api;