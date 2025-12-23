import express from 'express';
import User from '../models/User.ts';

const router = express.Router();


router.post('/verify', async (req, res) => {
    const { userId, phone, otp } = req.body;

    if (otp !== '1234') {
        return res.status(401).json({ success: false, message: 'Invalid OTP' });
    }
    
    
    const user = await User.findOne({ userId, phone });
    
    if (!user) {
         return res.status(404).json({ success: false, message: 'User not found' });
    }

    
    res.json({ success: true, message: 'OTP verified', userId });
});

export default router;