import { api } from './apiClient';

export const login = async (mail, password) => {
  const { data } = await api.post('/auth/login', { mail, password });
  return data;
};

export const logout = async () => {
  await api.post('/auth/logout');
};

export const getMe = async () => {
  const { data } = await api.get('/auth/me');
  return data;
};
