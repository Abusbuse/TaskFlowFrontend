import api from "./axios";

export const login = async (email, password) => {
    try {
        const response = await api.post('/login', { email, password });
        localStorage.setItem('token', response.data.token);  // Stocke le token
        api.defaults.headers['Authorization'] = `Bearer ${response.data.token}`;
        return response.data;
    } catch (error) {
        console.error('Login failed:', error);
        return null;
    }
};