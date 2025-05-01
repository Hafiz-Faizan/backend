import mongoose from 'mongoose';

const complaintSchema = new mongoose.Schema({
    business: { type: mongoose.Schema.Types.ObjectId, ref: 'Business', required: true },
    text: { type: String, required: true }, // Only this field is required
    email: { type: String, default: "" }, // Default value for email
    createdAt: { type: Date, default: Date.now },
    isApproved: { type: Boolean, default: false },
});

export default mongoose.model('Complaint', complaintSchema);
