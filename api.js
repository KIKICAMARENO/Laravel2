import axios from 'axios';

const API_URL = 'http://localhost:8000/api';

const config = {
  headers: {
    'Content-Type': 'application/json',
  },
};

export const register = (userData) => axios.post(`${API_URL}/register`, userData, config);
export const login = (userData) => axios.post(`${API_URL}/login`, userData, config);
export const getUser = (token) => axios.get(`${API_URL}/user`, { headers: { Authorization: `Bearer ${token}`, ...config.headers } });
export const createTask = (taskData, token) => axios.post(`${API_URL}/tasks`, taskData, { headers: { Authorization: `Bearer ${token}`, ...config.headers } });
export const getTasks = (token) => axios.get(`${API_URL}/tasks`, { headers: { Authorization: `Bearer ${token}`, ...config.headers } });
export const updateTask = (taskId, taskData, token) => axios.put(`${API_URL}/tasks/${taskId}`, taskData, { headers: { Authorization: `Bearer ${token}`, ...config.headers } });
export const deleteTask = (taskId, token) => axios.delete(`${API_URL}/tasks/${taskId}`, { headers: { Authorization: `Bearer ${token}`, ...config.headers } });
