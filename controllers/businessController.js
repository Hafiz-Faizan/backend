import Business from '../models/Business.js';

export const addBusiness = async (req, res) => {
    try {
        const business = new Business(req.body);
        await business.save();
        res.status(201).json(business);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
export const searchBusinesses = async (req, res) => {
    try {
        const { query } = req.query;  // Removed 'country' from query parameters
        let searchCriteria = { name: { $regex: query, $options: 'i' } };

        const businesses = await Business.find(searchCriteria);
        res.json(businesses);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


export const getBusinessById = async (req, res) => {
    try {
        const business = await Business.findById(req.params.id);
        if (!business) return res.status(404).json({ message: 'Business not found' });
        res.json(business);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// In businessController.js

export const getAllBusinesses = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const sort = req.query.sort || 'name';
        const order = req.query.order === 'desc' ? -1 : 1;

        const skip = (page - 1) * limit;

        const businesses = await Business.find({})
            .sort({ [sort]: order })
            .skip(skip)
            .limit(limit);

        const total = await Business.countDocuments();

        res.json({
            businesses,
            currentPage: page,
            totalPages: Math.ceil(total / limit),
            totalBusinesses: total
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};