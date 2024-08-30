// src/infrastructure/authService.ts
import axios from 'axios';

const API_URL = 'http://localhost:3006/api/authClient';

export const registerUserService = (userData: Record<string, any>) => {
    return axios.post(`${API_URL}/register`, userData);
};
