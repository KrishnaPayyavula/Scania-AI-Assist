import { ObjectId } from 'mongodb';
import { db } from '../config/database';
import logger from '../utils/logger';

export interface QueryDocument {
  _id?: ObjectId;
  query: string;
  response: string;
  timestamp: Date;
}

class Query {
  private collection = db.collection<QueryDocument>('query-logs');

  async create(data: Omit<QueryDocument, '_id'>): Promise<QueryDocument> {
    const result = await this.collection.insertOne({
      ...data,
      timestamp: new Date()
    });

    logger.info(`Query saved with ID: ${result.insertedId}`);
    
    const savedQuery = await this.collection.findOne({ _id: result.insertedId });
    logger.info('Saved query document:', JSON.stringify(savedQuery, null, 2));

    return {
      _id: result.insertedId,
      ...data
    };
  }

  async findAll(limit = 10): Promise<QueryDocument[]> {
    const queries = await this.collection
      .find()
      .sort({ timestamp: -1 })
      .limit(limit)
      .toArray();

    logger.info(`Retrieved ${queries.length} queries:`);
    queries.forEach(query => {
      logger.info(`ID: ${query._id}, Query: "${query.query.substring(0, 50)}..."`);
    });

    return queries;
  }
}

export default new Query();