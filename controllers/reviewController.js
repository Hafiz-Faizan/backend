import Review from '../models/Review.js';

export const addReview = async (req, res) => {
    try {
        const review = new Review(req.body);
        await review.save();
        res.status(201).json(review);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const getReviewsByBusiness = async (req, res) => {
    try {
        const reviews = await Review.find({ business: req.params.businessId, isApproved: true });
        res.json(reviews);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};