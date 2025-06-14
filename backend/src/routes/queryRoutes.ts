import { Router } from 'express';
import * as queryController from '../controllers/queryController';

const router = Router();

// POST /api/query - Process a developer query
router.post('/query', queryController.processQuery);

// GET /api/queries - Get query history (optional additional endpoint)
router.get('/queries', queryController.getQueryHistory);

// If this file doesn't exist, create it and add this route
router.get('/history', queryController.getQueryHistory);


export default router;