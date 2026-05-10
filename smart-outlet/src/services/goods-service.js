import apiClient from './api-client';

const API_V1_BASE = '/v1/api';

const goodsService = {
  getAllGoods: () => apiClient.get(`${API_V1_BASE}/goods/`),
  getGoodsById: (id) => apiClient.get(`${API_V1_BASE}/goods/${id}/`),
  createGoods: (data) => apiClient.post(`${API_V1_BASE}/goods/`, data),
  updateGoods: (id, data) => apiClient.patch(`${API_V1_BASE}/goods/${id}/`, data),
  deleteGoods: (id) => apiClient.delete(`${API_V1_BASE}/goods/${id}/`),

  getBatches: () => apiClient.get(`${API_V1_BASE}/batches/`),
  createBatch: (data) => apiClient.post(`${API_V1_BASE}/batches/`, data),
  updateBatch: (id, data) => apiClient.patch(`${API_V1_BASE}/batches/${id}/`, data),
  deleteBatch: (id) => apiClient.delete(`${API_V1_BASE}/batches/${id}/`),
};

export default goodsService;
