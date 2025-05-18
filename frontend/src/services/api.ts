import axios from 'axios';
import { QueryResponse } from '../types/query';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5001',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const submitQuery = async (query: string, model: string) => {
  try {
    const response = await api.post('/api/query', { query, model });
    return response.data.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Failed to process query');
    }
    throw new Error('An unexpected error occurred');
  }
};

export const getQueryHistory = async (): Promise<QueryResponse[]> => {
  try {
    const response = await api.get<{success: boolean; data: any[]}>('/api/queries');
    
    // Map the backend response to the expected frontend format
    return response.data.data.map(item => ({
      id: item._id || item.id,
      query: item.query,
      response: item.response,
      model: item.model,
      timestamp: item.createdAt || item.timestamp
    }));
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Failed to fetch query history');
    }
    throw new Error('An unexpected error occurred');
  }
};
