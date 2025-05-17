import { Request, Response } from 'express';
import Query from '../models/query';
import llmService from '../services/llmService';
import logger from '../utils/logger';

export const processQuery = async (req: Request, res: Response): Promise<void> => {
  try {
    const { query } = req.body;

    if (!query?.trim() || typeof query !== 'string') {
      res.status(400).json({ 
        success: false,
        message: 'Query is required and must be a non-empty string' 
      });
      return;
    }

    if (query.length > 1000) {
      res.status(400).json({ 
        success: false,
        message: 'Query exceeds maximum length of 1000 characters' 
      });
      return;
    }

    logger.info(`Processing query: ${query}`);
    const response = await llmService.processQuery(query);
    
    const queryRecord = await Query.create({
      query,
      response,
      timestamp: new Date()
    });

    logger.info(`Query processed and saved with ID: ${queryRecord._id}`);

    res.status(200).json({
      success: true,
      data: {
        id: queryRecord._id,
        query,
        response,
        timestamp: queryRecord.timestamp
      }
    });
  } catch (error) {
    logger.error('Error processing query:', error);
    res.status(500).json({ 
      success: false,
      message: error instanceof Error ? error.message : 'An unexpected error occurred' 
    });
  }
};

export const getQueryHistory = async (_req: Request, res: Response): Promise<void> => {
  try {
    const queries = await Query.findAll(10);
    logger.info(`Retrieved ${queries.length} queries from history`);
    res.status(200).json({
      success: true,
      data: queries
    });
  } catch (error) {
    logger.error('Error retrieving query history:', error);
    res.status(500).json({ 
      success: false,
      message: error instanceof Error ? error.message : 'An unexpected error occurred' 
    });
  }
};