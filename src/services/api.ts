import axios from 'axios';

export const axiosInstance = axios.create();

export async function createOrUpdateDay(body: Application.CreateOrUpdateDayInput) {
  const response = await axiosInstance.post('/api/days', body);

  return response.data;
}

export async function getDaysFromMonth(params: Application.GetDaysFromMonthInput) {
  const response = await axiosInstance.get('/api/days', { params });

  return response.data;
}
