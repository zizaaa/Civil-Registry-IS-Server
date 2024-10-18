import { Router } from "express";
import { login, logout, registerUser } from "../controllers/userController.js";

const router = Router();

// register user
router.post('/register', registerUser);

//login
router.post('/login', login);

//log out
router.post('/logout', logout)

export default router;