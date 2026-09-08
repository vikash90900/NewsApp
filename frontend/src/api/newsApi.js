import axiosClient from './axiosClient';

export const newsApi = {
  fetchExternalNews: async (params = {}) => {
    const response = await axiosClient.get('/news/fetch', { params });
    return response.data;
  },

  getNews: async (params = {}) => {
    const response = await axiosClient.get('/news', { params });
    return response.data;
  },
};

export default newsApi;
