import mongoose from 'mongoose';

const adminSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});

// Remove the pre-save hook for password hashing
// Remove the comparePassword method as it's no longer necessary

export default mongoose.model('Admin', adminSchema);
