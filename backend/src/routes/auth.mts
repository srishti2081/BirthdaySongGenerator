import express from 'express';
import { v4 as uuidv4 } from 'uuid'; 
import User from '../models/User.ts';

const router = express.Router();

// Mock Register: Saves user and returns a unique userId
router.post('/register', async (req, res) => {
    const { name, email, phone } = req.body;
    try {
        // Use phone as the unique identifier for a simple mock
        const existingUser = await User.findOne({ phone });
        
        if (existingUser) {
            return res.json({ userId: existingUser.userId });
        }

        const newUser = new User({
            name,
            email,
            phone,
            userId: uuidv4() // <-- The uuidv4 function is now available
        });
        await newUser.save();
        res.json({ userId: newUser.userId });
    } catch (error) {
        console.error('Registration/Find failed:', error);
        res.status(500).json({ message: 'Server error during registration.' });
    }
});

export default router;