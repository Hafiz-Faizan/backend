import mongoose from 'mongoose';

const quoteSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    message: { type: String, required: true },
    businessId: { type: mongoose.Schema.Types.ObjectId, ref: 'Business', required: true },
    createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Quote', quoteSchema);