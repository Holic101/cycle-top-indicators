import axios from 'axios';
import { MAG7Data, BTCData, Indicator } from '../types';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000/api/v1',
});

export const getMAG7Data = async (): Promise<MAG7Data> => {
  const response = await api.get('/stocks/mag7/current');
  return response.data;
};

export const getBTCData = async (): Promise<BTCData> => {
  const response = await api.get('/indicators/btc-mag7/current');
  return response.data;
};

export const getHistoricalData = async (
  indicator: string,
  timeframe: string
): Promise<Indicator[]> => {
  const response = await api.get(`/indicators/${indicator}/historical`, {
    params: { timeframe },
  });
  return response.data;
};