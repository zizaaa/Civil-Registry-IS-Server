import { Router } from "express";
import { login, logout, registerUser } from "../controllers/userController.js";

const router = Router();

const isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next(); // User is authenticated, proceed to the next middleware
    }
    res.status(401).json({ message: 'Unauthorized' }); // User is not authenticated
};


// register user
router.post('/register', registerUser);

//login
router.post('/login', login);

//log out
router.post('/logout', logout)

export default router;