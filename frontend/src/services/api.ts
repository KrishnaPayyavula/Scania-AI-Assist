import axios from 'axios';
import { QueryRequest, QueryResponse } from '../types';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001';

const api = axios.create({
  baseURL: API_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json'
  }
});

export const submitQuery = async (data: QueryRequest): Promise<QueryResponse> => {
  try {
    const response = await api.post<{success: boolean; data: QueryResponse}>('/api/query', data);
    return response.data.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Failed to submit query');
    }
    throw new Error('An unexpected error occurred');
  }
};

export const getQueryHistory = async (): Promise<QueryResponse[]> => {
  try {
    const response = await api.get<{success: boolean; data: QueryResponse[]}>('/api/queries');
    return response.data.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Failed to fetch query history');
    }
    throw new Error('An unexpected error occurred');
  }
};