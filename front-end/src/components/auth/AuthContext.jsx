// AuthContext.js
import React, { createContext, useEffect, useState } from 'react';
import authService from './authService';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    

    useEffect(() => {
        const fetchCurrentUser = async () => {
            const user = await authService.getCurrentUser();
            console.log('Current User:', user);
            setCurrentUser(user);
        };
        fetchCurrentUser();
    }, []);

    const login = async (username, password) => {
        try {
            const user = await authService.login(username, password);
            setCurrentUser(user);
            return user;
        } catch (error) {
            throw new Error('Error durante el inicio de sesión');
        }
    };

    const logout = async () => {
        try {
            await authService.logout();
            setCurrentUser(null);
        } catch (error) {
            throw new Error('Error durante el cierre de sesión');
        }
    };

    return (
        
        <AuthContext.Provider value={{ currentUser, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthProvider };
