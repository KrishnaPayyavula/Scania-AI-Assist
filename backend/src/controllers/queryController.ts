import { Request, Response } from 'express';
import { LLMService } from '../services/llmService';
import { Query } from '../models/query';
import logger from '../utils/logger';

const llmService = new LLMService();

export const processQuery = async (req: Request, res: Response): Promise<void> => {
  try {
    const { query, model } = req.body;
    
    if (!query) {
      res.status(400).json({ success: false, message: 'Query is required' });
      return;
    }
    
    // Process the query with the LLM service
    const response = await llmService.processQuery(query, model);
    
    // Save the query and response to the database
    const savedQuery = await Query.create({
      query,
      response,
      model: model || 'default', // Store the model used
      timestamp: new Date()
    });
    
    logger.info(`Query processed and saved with ID: ${savedQuery.id}`);
    
    res.status(200).json({
      success: true,
      data: {
        id: savedQuery.id,
        query: savedQuery.query,
        response: savedQuery.response,
        model: savedQuery.model,
        timestamp: savedQuery.timestamp
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