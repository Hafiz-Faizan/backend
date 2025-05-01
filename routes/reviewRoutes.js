import express from 'express';
import { addReview, getReviewsByBusiness } from '../controllers/reviewController.js';

const router = express.Router();

router.post('/', addReview);
router.get('/business/:businessId', getReviewsByBusiness);

export default router;