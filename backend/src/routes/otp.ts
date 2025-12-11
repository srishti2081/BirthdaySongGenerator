import express from 'express';
import User from '../models/User.ts';

const router = express.Router();

// Mock OTP Verification: Always succeeds if OTP is '1234'
router.post('/verify', async (req, res) => {
    const { userId, phone, otp } = req.body;

    if (otp !== '1234') {
        return res.status(401).json({ success: false, message: 'Invalid OTP' });
    }
    
    // In a real app, you would check the database and time limit here.
    const user = await User.findOne({ userId, phone });
    
    if (!user) {
         return res.status(404).json({ success: false, message: 'User not found' });
    }

    // Success
    res.json({ success: true, message: 'OTP verified', userId });
});

export default router;