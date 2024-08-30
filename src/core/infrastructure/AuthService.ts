// src/infrastructure/authService.ts
import axios from 'axios';

const API_URL = 'http://localhost:3006/api/authClient';

export const authService = {
    registerUser: (userData: Record<string, any>) => {
        return axios.post(`${API_URL}/register`, userData);
    },
    loginUser: (userData: Record<string, any>) => {
        return axios.post(`${API_URL}/login`, userData);
    }
};
