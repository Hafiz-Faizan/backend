import Admin from '../models/Admin.js';
import jwt from 'jsonwebtoken';

export const signIn = async (req, res) => {
    try {
        const { username, password } = req.body;
        const admin = await Admin.findOne({ username });

        if (!admin) {
            return res.status(401).json({ message: 'Authentication failed' });
        }

        // Directly compare the stored password with the provided password
        if (admin.password !== password) {
            return res.status(401).json({ message: 'Authentication failed' });
        }

        const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
        res.json({ token });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
