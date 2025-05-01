import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
    business: { type: mongoose.Schema.Types.ObjectId, ref: 'Business', required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    text: String,
    email: { type: String, default: "" }, // Default value for email
    createdAt: { type: Date, default: Date.now },
    isApproved: { type: Boolean, default: false },
});

export default mongoose.model('Review', reviewSchema);