import api from './api';

export const getNewsArticles = async (filters = {}) => {
  const params = {};
  if (filters.category) params.category = filters.category;
  if (filters.location) params.location = filters.location;

  const response = await api.get('/news', { params });
  return response.data;
};

export const triggerNewsFetch = async () => {
  const response = await api.get('/news/fetch');
  return response.data;
};
