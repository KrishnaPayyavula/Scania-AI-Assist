import { MongoClient, ServerApiVersion } from 'mongodb';
import { env } from './env';
import logger from '../utils/logger';

const uri = `mongodb+srv://${env.MONGODB_USERNAME}:${env.MONGODB_PASSWORD}@myatlasclusteredu.srsfc.mongodb.net/?retryWrites=true&w=majority&appName=myAtlasClusterEDU`;

// Create MongoDB client
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

// Get database instance
const db = client.db('scania-ai-assist');

// Test database connection
export const testConnection = async (): Promise<void> => {
  try {
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    logger.info('MongoDB connection has been established successfully.');
  } catch (error) {
    logger.error('Unable to connect to MongoDB:', error);
    throw error;
  }
};

export { client, db };
export default db;