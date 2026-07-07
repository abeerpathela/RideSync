import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use(
  (config) => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.token) {
      config.headers.Authorization = `Bearer ${user.token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export const authAPI = {
  register: (userData) => api.post('/users/register', userData),
  login: (userData) => api.post('/users/login', userData),
  getProfile: () => api.get('/users/profile'),
  updateProfile: (formData) => api.put('/users/profile', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  getAllUsers: () => api.get('/users'),
  deleteUser: (id) => api.delete(`/users/${id}`),
};

export const rideAPI = {
  createRide: (rideData) => api.post('/rides', rideData),
  getMyRides: (params) => api.get('/rides/myrides', { params }),
  getAllRides: (params) => api.get('/rides', { params }),
  getRideById: (id) => api.get(`/rides/${id}`),
  updateRideStatus: (id, data) => api.put(`/rides/${id}`, data),
  deleteRide: (id) => api.delete(`/rides/${id}`),
  getDashboardStats: () => api.get('/rides/dashboard'),
};

export default api;
