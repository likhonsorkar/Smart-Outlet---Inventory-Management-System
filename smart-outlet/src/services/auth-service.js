import apiClient from './api-client';

const registerUser = async (userData) => {
  const response = await apiClient.post('/auth/users/', userData);
  return response.data;
};

const loginUser = async (credentials) => {
  const response = await apiClient.post('/auth/jwt/create/', credentials);
  if (response.data.access) {
    localStorage.setItem('access_token', response.data.access);
    localStorage.setItem('refresh_token', response.data.refresh);
  }
  return response.data;
};

const getCurrentUser = async () => {
  const response = await apiClient.get('/auth/users/me/');
  return response.data;
};

const logoutUser = () => {
  localStorage.removeItem('access_token');
  localStorage.removeItem('refresh_token');
};

export default {
  registerUser,
  loginUser,
  getCurrentUser,
  logoutUser,
};
