import { ObjectId } from 'mongodb';
import { db } from '../config/database';
import logger from '../utils/logger';

interface IQuery {
  id?: string;
  query: string;
  response: string;
  model?: string;
  timestamp: Date;
}

export class Query {
  id?: string;
  query: string;
  response: string;
  model: string;
  timestamp: Date;

  constructor(data: IQuery) {
    this.id = data.id;
    this.query = data.query;
    this.response = data.response;
    this.model = data.model || 'default';
    this.timestamp = data.timestamp;
  }

  static async create(data: Omit<IQuery, 'id'>): Promise<Query> {
    try {
      const collection = db.collection('queries');
      const result = await collection.insertOne({
        query: data.query,
        response: data.response,
        model: data.model || 'default',
        timestamp: data.timestamp
      });

      logger.info(`Created new query with ID: ${result.insertedId}`);
      
      return new Query({
        id: result.insertedId.toString(),
        ...data
      });
    } catch (error) {
      logger.error('Error creating query:', error);
      throw new Error('Failed to create query');
    }
  }

  static async findAll(limit = 20): Promise<Query[]> {
    try {
      const collection = db.collection('queries');
      const results = await collection.find({})
        .sort({ timestamp: -1 })
        .limit(limit)
        .toArray();

      return results.map(doc => new Query({
        id: doc._id.toString(),
        query: doc.query,
        response: doc.response,
        model: doc.model || 'default',
        timestamp: doc.timestamp
      }));
    } catch (error) {
      logger.error('Error finding queries:', error);
      throw new Error('Failed to find queries');
    }
  }
}