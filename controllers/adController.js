import Ad from '../models/Ad.js';

// POST /api/ads
export const createAd = async (req, res) => {
  try {
    const { type } = req.body;
    if (!req.file || !type) {
      return res.status(400).json({ message: 'Image and type are required.' });
    }
    
    // Convert image buffer to base64 string
    const imageData = req.file.buffer.toString('base64');
    
    let ad = await Ad.findOne({ type });
    if (ad) {
      ad.images.push({ data: imageData, views: 0 });
      await ad.save();
    } else {
      ad = new Ad({ type, images: [{ data: imageData, views: 0 }] });
      await ad.save();
    }
    res.status(201).json(ad);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Helper to get random image and increment view
const getRandomAdImage = async (type, res) => {
  try {
    const ad = await Ad.findOne({ type });
    if (!ad || ad.images.length === 0) {
      return res.status(404).json({ message: 'No ads found.' });
    }
    const idx = Math.floor(Math.random() * ad.images.length);
    ad.images[idx].views += 1;
    await ad.save();
    res.json({ 
      data: ad.images[idx].data, 
      views: ad.images[idx].views,
      id: ad.images[idx]._id 
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET /api/ads/vertical
export const getRandomVerticalAd = (req, res) => getRandomAdImage('vertical', res);

// GET /api/ads/horizontal
export const getRandomHorizontalAd = (req, res) => getRandomAdImage('horizontal', res);

// PUT /api/ads/:id
export const editAd = async (req, res) => {
  try {
    const { type } = req.body;
    let ad = await Ad.findById(req.params.id);
    if (!ad) return res.status(404).json({ message: 'Ad not found' });
    
    if (req.file) {
      // Convert image buffer to base64 string
      const imageData = req.file.buffer.toString('base64');
      ad.images.push({ data: imageData, views: 0 });
    }
    
    if (type) ad.type = type;
    await ad.save();
    res.json(ad);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET /api/ads (all ads with images and views)
export const getAllAds = async (req, res) => {
  try {
    const ads = await Ad.find();
    res.json(ads);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE /api/ads/:adId/images/:imageId
export const deleteImage = async (req, res) => {
  try {
    const { adId, imageId } = req.params;
    
    // Find the ad
    const ad = await Ad.findById(adId);
    if (!ad) {
      return res.status(404).json({ message: 'Ad not found' });
    }
    
    // Find the image index
    const imageIndex = ad.images.findIndex(img => img._id.toString() === imageId);
    if (imageIndex === -1) {
      return res.status(404).json({ message: 'Image not found in this ad' });
    }
    
    // Remove the image from the array
    ad.images.splice(imageIndex, 1);
    
    // Save the updated ad
    await ad.save();
    
    res.json({ message: 'Image deleted successfully', ad });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}; 