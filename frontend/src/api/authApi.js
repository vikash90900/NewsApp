import axiosClient from './axiosClient';

export const authApi = {
  login: async (credentials) => {
    const response = await axiosClient.post('/users/login', credentials);
    return response.data;
  },

  register: async (userData) => {
    const response = await axiosClient.post('/users/register', userData);
    return response.data;
  },

  getProfile: async () => {
    const response = await axiosClient.get('/users/profile');
    return response.data;
  },

  getUsers: async () => {
    const response = await axiosClient.get('/users');
    return response.data;
  },
};

export default authApi;
