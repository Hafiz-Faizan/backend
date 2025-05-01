import Business from '../models/Business.js';
import Review from '../models/Review.js';
import Complaint from '../models/Complaint.js';

export const editBusiness = async (req, res) => {
    try {
        const business = await Business.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!business) return res.status(404).json({ message: 'Business not found' });
        res.json(business);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const getPendingReviews = async (req, res) => {
    try {
        const reviews = await Review.find({ isApproved: false }).populate('business');
        res.json(reviews);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getPendingComplaints = async (req, res) => {
    try {
        const complaints = await Complaint.find({ isApproved: false }).populate('business');
        res.json(complaints);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const approveReview = async (req, res) => {
    try {
        const review = await Review.findByIdAndUpdate(req.params.id, { isApproved: true }, { new: true });
        if (!review) return res.status(404).json({ message: 'Review not found' });
        res.json(review);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const approveComplaint = async (req, res) => {
    try {
        const complaint = await Complaint.findByIdAndUpdate(req.params.id, { isApproved: true }, { new: true });
        if (!complaint) return res.status(404).json({ message: 'Complaint not found' });
        res.json(complaint);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const deleteReview = async (req, res) => {
    try {
        const review = await Review.findByIdAndDelete(req.params.id);
        if (!review) return res.status(404).json({ message: 'Review not found' });
        res.json({ message: 'Review deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteComplaint = async (req, res) => {
    try {
        const complaint = await Complaint.findByIdAndDelete(req.params.id);
        if (!complaint) return res.status(404).json({ message: 'Complaint not found' });
        res.json({ message: 'Complaint deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};