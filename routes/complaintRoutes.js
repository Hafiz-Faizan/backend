import express from 'express';
import { addComplaint, getComplaintsByBusiness } from '../controllers/complaintController.js';

const router = express.Router();

router.post('/', addComplaint);
router.get('/business/:businessId', getComplaintsByBusiness);

export default router;