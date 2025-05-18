export type ModelType = 'gpt-4-mini' | 'gpt-4' | 'gpt-3.5-turbo' | 'gpt-4-turbo';

export interface QueryResponse {
  id: string;
  query: string;
  response: string;
  model: string;
  timestamp: string;
}