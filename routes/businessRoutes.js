import express from 'express';
import { addBusiness, searchBusinesses, getBusinessById, getAllBusinesses } from '../controllers/businessController.js';

const router = express.Router();

router.post('/', addBusiness);
router.get('/search', searchBusinesses);
router.get('/all', getAllBusinesses);
router.get('/:id', getBusinessById);

export default router;