import express from 'express';
import { signIn } from '../controllers/authController.js';

const router = express.Router();

router.post('/signin', signIn);

export default router;