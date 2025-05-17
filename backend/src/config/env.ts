
import path from 'path';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

// Environment variables
export const env = {
  // Server configuration
  NODE_ENV: process.env.NODE_ENV || 'development',
  PORT: parseInt(process.env.PORT || '5001', 10),
  
  // Database configuration: MongoDB configuration
  MONGODB_USERNAME: process.env.MONGODB_USERNAME ,
  MONGODB_PASSWORD: process.env.MONGODB_PASSWORD ,
  
  // API keys
  OPENAI_API_KEY: process.env.OPENAI_API_KEY || '',
  AZURE_OPENAI_ENDPOINT: process.env.AZURE_OPENAI_ENDPOINT || '',
  AZURE_OPENAI_API_KEY: process.env.AZURE_OPENAI_API_KEY || '',
  AZURE_OPENAI_DEPLOYMENT_NAME: process.env.AZURE_OPENAI_DEPLOYMENT_NAME || 'gpt-4',
  AZURE_OPENAI_API_VERSION: process.env.AZURE_OPENAI_API_VERSION || '2024-02-15-preview',
  
  // CORS configuration
  CORS_ORIGIN: process.env.CORS_ORIGIN || '*',
};

// Validate required environment variables
export const validateEnv = (): void => {
  const requiredEnvVars = [
    'OPENAI_API_KEY',
    'AZURE_OPENAI_ENDPOINT',
    'AZURE_OPENAI_API_KEY',
    'AZURE_OPENAI_DEPLOYMENT_NAME'
  ];

  for (const envVar of requiredEnvVars) {
    if (!env[envVar as keyof typeof env]) {
      throw new Error(`${envVar} is required`);
    }
  }
};

