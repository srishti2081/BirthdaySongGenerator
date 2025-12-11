import express from 'express';
// import { v4 as uuidv4 } from 'uuid'; // <-- DELETE THIS LINE
import User from '../models/User.ts'; // Ensure this is now .ts

const router = express.Router();

// Mock Register: Saves user and returns a unique userId
router.post('/register', async (req, res) => {
    const { name, email, phone } = req.body;
    
    // 💥 FIX: Dynamic import of uuid
    const { v4: uuidv4 } = await import('uuid'); 

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
            userId: uuidv4() // This line now uses the dynamically imported function
        });
        await newUser.save();
        res.json({ userId: newUser.userId });
    } catch (error) {
        console.error('Registration/Find failed:', error);
        res.status(500).json({ message: 'Server error during registration.' });
    }
});

export default router;