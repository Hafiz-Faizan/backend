import Quote from '../models/Quote.js';

export const createQuote = async (req, res) => {
    try {
        const quote = new Quote(req.body);
        await quote.save();
        res.status(201).json(quote);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const getQuotes = async (req, res) => {
    try {
        const quotes = await Quote.find().populate('businessId', 'name');
        res.json(quotes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};