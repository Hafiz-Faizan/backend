import express from 'express';
import FormData from '../models/Formdata.js'; // Ensure this matches the exact file name

const router = express.Router();

// Endpoint to insert form data
router.post('/addFormdata', async (req, res) => {
    try {
        const formData = new FormData(req.body);
        const savedFormData = await formData.save();
        res.status(201).json(savedFormData);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Endpoint to get all form data
router.get('/getFormdata', async (req, res) => {
    try {
        const formData = await FormData.find();
        res.status(200).json(formData);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default router;
