export interface QueryRequest {
  query: string;
  model: ModelType;
}

export interface QueryResponse {
  id: string;
  query: string;
  response: string;
  timestamp: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
}


export type ModelType = 'gpt-4-mini' | 'gpt-4' | 'gpt-3.5-turbo' | 'gpt-4-turbo';

