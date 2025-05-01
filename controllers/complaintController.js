import Complaint from '../models/Complaint.js';

export const addComplaint = async (req, res) => {
    try {
        const complaint = new Complaint(req.body);
        await complaint.save();
        res.status(201).json(complaint);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// complaintController.js
export const getComplaintsByBusiness = async (req, res) => {
    try {
        const complaints = await Complaint.find({ business: req.params.businessId, isApproved: true });
        res.json(complaints);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};