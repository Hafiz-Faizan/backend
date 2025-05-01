import mongoose from 'mongoose';

const formDataSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, default: "" },
    phone: { type: String, default: "" },
    option: {
        type: String,
        enum: ['advertise', 'member'],
        default: 'advertise'
    },
    businessName: { type: String, default: "" },
    businessWebsite: { type: String, default: "" },
    image: { type: String, default: "" }
});

export default mongoose.model('FormData', formDataSchema);
