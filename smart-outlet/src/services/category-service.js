import apiClient from './api-client';

const API_V1_BASE = '/v1/api';

const getCategories = async () => {
  const response = await apiClient.get(`${API_V1_BASE}/categories/`);
  return response.data;
};

const getSubCategories = async (parentId) => {
  const response = await apiClient.get(`${API_V1_BASE}/categories/${parentId}/sub_categories/`);
  return response.data;
};

const createCategory = async (categoryData) => {
  const response = await apiClient.post(`${API_V1_BASE}/categories/`, categoryData);
  return response.data;
};

const updateCategory = async (id, categoryData) => {
  const response = await apiClient.put(`${API_V1_BASE}/categories/${id}/`, categoryData);
  return response.data;
};

const deleteCategory = async (id) => {
  const response = await apiClient.delete(`${API_V1_BASE}/categories/${id}/`);
  return response.data;
};

export default {
  getCategories,
  getSubCategories,
  createCategory,
  updateCategory,
  deleteCategory,
};
