import { api } from './apiClient';

export const getPosts = async () => {
  const res = await api.get('/posts/');
  return res.data;
};

export const getUsers = async () => {
  const res = await api.get('/users/');
  return res.data;
};

export const getCommentsByPost = async (postId) => {
  const res = await api.get(`/comments/${postId}`);
  return res.data;
};

export const addPost = async (title, text) => {
  const res = await api.post('/posts/', null, {
    params: { title, text }
  });
  return res.data;
};
