import mongoose from 'mongoose';

const pollSchema = new mongoose.Schema({
    title: { type: String, required: true },
    pollName: { type: String, required: true, unique: true },  // New field
    options: [{
        text: { type: String, required: true },
        votes: { type: Number, default: 0 },
        index: { type: Number, required: true }
    }],
    createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Poll', pollSchema);