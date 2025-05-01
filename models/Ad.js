import mongoose from 'mongoose';

const imageSchema = new mongoose.Schema({
  data: { type: String, required: true }, // base64 encoded image data
  views: { type: Number, default: 0 }
});

const adSchema = new mongoose.Schema({
  type: { type: String, enum: ['vertical', 'horizontal'], required: true },
  images: [imageSchema]
});

export default mongoose.model('Ad', adSchema); 