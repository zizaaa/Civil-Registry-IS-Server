import { Router } from "express";
import axios from 'axios'
const router = Router();
import * as dotenv from "dotenv";
dotenv.config();

router.post('/verify-captcha', async (req, res) => {
    const { token } = req.body;

    if (!token) {
        return res.status(400).json({ success: false, message: 'Captcha token missing' });
    }

    try {
        // Send a POST request to Google reCAPTCHA verification API
        const response = await axios.post(`https://www.google.com/recaptcha/api/siteverify`, null, {
            params: {
                secret: `${process.env.CAPTCHA_KEY}`,
                response: token,
            }
        });

        // If verification is successful
        if (response.data.success) {
            res.json({ success: true, message: 'Captcha verified successfully' });
        } else {
            res.json({ success: false, message: 'Captcha verification failed' });
        }
    } catch (error) {
        console.log(error)
        console.error('Error during reCAPTCHA verification:', error);
        res.status(500).json({ success: false, message: 'Error during verification' });
    }
});

export default router;