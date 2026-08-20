// Central API Service Client connecting Sparkle Frontend to Express Backend

const API_BASE_URL = (import.meta.env.VITE_API_URL || '/api/v1').replace(/\/$/, '');

export const getAuthToken = () => localStorage.getItem('sparkle_token');

export const setAuthToken = (token) => {
  if (token) {
    localStorage.setItem('sparkle_token', token);
  } else {
    localStorage.removeItem('sparkle_token');
  }
};

export const apiFetch = async (endpoint, options = {}) => {
  const token = getAuthToken();
  const headers = {
    'Content-Type': 'application/json',
    ...(options.headers || {}),
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const config = {
    ...options,
    headers,
  };

  const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
  const contentType = response.headers.get('content-type') || '';
  const data = contentType.includes('application/json') ? await response.json() : null;

  if (!response.ok) {
    throw new Error(data.message || 'API request failed');
  }

  return data;
};

/* ---------- API HELPER FUNCTIONS ---------- */

// Auth
export const loginApi = (email, password) =>
  apiFetch('/auth/login', { method: 'POST', body: JSON.stringify({ email, password }) });

export const registerApi = (name, email, password, phone) =>
  apiFetch('/auth/register', { method: 'POST', body: JSON.stringify({ name, email, password, phone }) });

export const getMeApi = () => apiFetch('/auth/me');

// Products
export const fetchProductsApi = (params = {}) => {
  const queryString = new URLSearchParams(params).toString();
  return apiFetch(`/products${queryString ? `?${queryString}` : ''}`);
};

export const fetchProductByIdApi = (id) => apiFetch(`/products/${id}`);

export const createProductApi = (productData) =>
  apiFetch('/products', { method: 'POST', body: JSON.stringify(productData) });

export const updateProductApi = (id, productData) =>
  apiFetch(`/products/${id}`, { method: 'PUT', body: JSON.stringify(productData) });

export const deleteProductApi = (id) =>
  apiFetch(`/products/${id}`, { method: 'DELETE' });

// Orders
export const createOrderApi = (orderData) =>
  apiFetch('/orders', { method: 'POST', body: JSON.stringify(orderData) });

export const fetchMyOrdersApi = () => apiFetch('/orders/my-orders');

export const fetchOrderByIdApi = (id) => apiFetch(`/orders/${id}`);

// Admin
export const fetchAdminDashboardApi = () => apiFetch('/admin/dashboard');
export const fetchAdminUsersApi = () => apiFetch('/admin/users');
export const fetchAdminOrdersApi = () => apiFetch('/admin/orders');

// AI Bot Assistant
export const sendAiChatMessageApi = (message, sessionId) =>
  apiFetch('/ai/chat', { method: 'POST', body: JSON.stringify({ message, sessionId }) });
