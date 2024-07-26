import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/accounts/';



const register = async (username, password, password2) => {
    try {
        const response = await axios.post(API_URL + 'register/', {
            username,
            password,
            password2,
        });
    
    } catch (error) {
        console.error('Error during registration:', error);
        throw error;
    }
    return response.data;
};

const login = async (username, password) => {
    try {
        const response = await axios.post(API_URL + 'login/', {
            username,
            password,
        });
        if (response.data.access) {
            localStorage.setItem('user', JSON.stringify({
                username, // O cualquier otra información que quieras guardar
                accessToken: response.data.access,
                refreshToken: response.data.refresh,
            }));
        }
        return response.data;
    } catch (error) {
        console.error('Error during login:', error);
        throw error;
    }
};

const logout = async () => {
    try {
        localStorage.removeItem('user');
        await axios.post(API_URL + 'logout/');
    } catch (error) {
        console.error('Error during logout:', error);
        throw error;
    }
};

const getCurrentUser = () => {
    try {
        const user = JSON.parse(localStorage.getItem('user'));
        return user; // Devuelve los datos del usuario, no solo el token
    } catch (error) {
        console.error('Error retrieving user from localStorage:', error);
        return null;
    }
};

export default {
    register,
    login,
    logout,
    getCurrentUser,
};