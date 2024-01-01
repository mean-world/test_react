import { apiClient } from './base';

export const setTraining = async (model: string) => {
  return apiClient.get('/default', {
    params: { model },
  });
};
