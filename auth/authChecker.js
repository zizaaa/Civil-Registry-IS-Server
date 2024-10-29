import { Router } from "express";
import passport from "passport";
import isAuthenticated from "./isAuthenticated.js";

const router = Router();


router.get('/api/cris/auth-check', isAuthenticated, (req, res) => {
    return res.status(200).json({ isAuthenticated: true, user: req.user });
});


router.get('/api/cris/token-validation', passport.authenticate('jwt', { session: false }), async(req, res) =>{
    const user = req.user;

    try {
        // Retrieve the token from the Authorization header
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            res.status(401).json({ isValid: false, message: 'No token provided!' });
            return;
        }

        const token = authHeader.split(' ')[1]; // Extract the token from "Bearer <token>"

        if(user.token !== token){
            res.json({ isValid: false });
            return
        }
        res.json({ isValid: true });
    } catch (error) {
        console.error(error);
        res.status(500).json({ isValid: false, error: 'Error during token validation.' });
    }
})

export default router;