import { Router } from "express";
import passport from "passport";

const router = Router();

router.get('/api/cris/auth-check',(req, res)=>{
    try {
        console.log('checking...')
        console.log('Session ID:', req.sessionID);
        console.log('User in session:', req.user);
        if (req.isAuthenticated()) {
            const user = req.user;

            res.json({ isAuthenticated: true , role:user.role, verified:user.verified});
        } else {
            res.json({ isAuthenticated: false });
        }
    } catch (error) {
        res.json({ isAuthenticated: false });
    }
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