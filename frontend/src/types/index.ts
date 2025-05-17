export interface QueryRequest {
  query: string;
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