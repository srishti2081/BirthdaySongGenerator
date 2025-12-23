import express from 'express';
import User from '../models/User.ts'; 

const router = express.Router();


router.post('/register', async (req, res) => {
    const { name, email, phone } = req.body;
    
  
    const { v4: uuidv4 } = await import('uuid'); 

    try {
        const existingUser = await User.findOne({ phone });
        
        if (existingUser) {
            return res.json({ userId: existingUser.userId });
        }

        const newUser = new User({
            name,
            email,
            phone,
            userId: uuidv4()
        });
        await newUser.save();
        res.json({ userId: newUser.userId });
    } catch (error) {
        console.error('Registration/Find failed:', error);
        res.status(500).json({ message: 'Server error during registration.' });
    }
});

export default router;