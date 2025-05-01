import express from 'express';
import { authenticateAdmin } from '../middleware/auth.js';
import {
    editBusiness,
    getPendingReviews,
    getPendingComplaints,
    approveReview,
    approveComplaint,
    deleteReview,
    deleteComplaint
} from '../controllers/adminController.js';

const router = express.Router();

// Apply authenticateAdmin middleware to all admin routes
router.use(authenticateAdmin);

router.put('/business/:id', editBusiness);
router.get('/pending-reviews', getPendingReviews);
router.get('/pending-complaints', getPendingComplaints);
router.put('/approve-review/:id', approveReview);
router.put('/approve-complaint/:id', approveComplaint);
router.delete('/review/:id', deleteReview);
router.delete('/complaint/:id', deleteComplaint);

export default router;