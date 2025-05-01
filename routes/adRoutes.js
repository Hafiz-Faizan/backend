import express from 'express';
import multer from 'multer';
import { createAd, getRandomVerticalAd, getRandomHorizontalAd, editAd, getAllAds, deleteImage } from '../controllers/adController.js';

const router = express.Router();

// Set up multer for memory storage (not disk storage)
const storage = multer.memoryStorage();
const upload = multer({ storage });

// POST /api/ads
router.post('/', upload.single('image'), createAd);

// GET /api/ads/vertical
router.get('/vertical', getRandomVerticalAd);

// GET /api/ads/horizontal
router.get('/horizontal', getRandomHorizontalAd);

// GET /api/ads (all ads with images and views)
router.get('/', getAllAds);

// PUT /api/ads/:id (edit ad, add image/type)
router.put('/:id', upload.single('image'), editAd);

// DELETE /api/ads/:adId/images/:imageId
router.delete('/:adId/images/:imageId', deleteImage);

export default router; 