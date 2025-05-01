import mongoose from 'mongoose';

const businessSchema = new mongoose.Schema({
    name: { type: String, required: true },
    streetAddress: { type: String, default: '' },
    suiteApt: { type: String, default: '' },
    city: { type: String, default: '' },
    postalCode: { type: String, default: '' },
    email: { type: String, default: '' },
    phoneNumber: { type: String, default: '' },
    website: { type: String, default: '' },
    ownerFirstName: { type: String, default: '' },
    ownerLastName: { type: String, default: '' },
    ownerTitle: { type: String, default: '' },
    image: { type: String, default: '' },
    verify: { type: Boolean, default: false }
});

export default mongoose.model('Business', businessSchema);
