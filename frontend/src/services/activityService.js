import api from './api';

export const trackActivity = async ({ user_id, news_id, time_spent = 1 }) => {
  try {
    const response = await api.post('/activities', {
      user_id,
      news_id,
      time_spent,
    });
    return response.data;
  } catch (error) {
    // Fail silently without blocking article display or user experience
    console.warn('Activity tracking failed silently:', error.message);
    return null;
  }
};
