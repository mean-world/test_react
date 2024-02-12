import { apiClient } from './base';


export const setTraining = async (username:string, cpu:number, memory:number, worker:number) => {
  return apiClient.get('/create_ray_env', {
    params: {username, cpu, memory, worker},
  });
};
