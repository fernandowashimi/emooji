import axios from 'axios';

export const axiosInstance = axios.create();

export async function createOrUpdateDay(body: Application.CreateOrUpdateDayInput) {
  const response = await axiosInstance.post('/api/day', body);

  return response.data;
}
