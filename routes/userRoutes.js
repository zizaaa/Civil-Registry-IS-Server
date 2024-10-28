import { Router } from "express";
import { currentUser, login, logout, registerUser, updatePassword, updatePersonalInfo } from "../controllers/userController.js";
import isAuthenticated from "../auth/isAuthenticated.js";

const router = Router();

// register user
router.post('/register', registerUser);

//login
router.post('/login', login);

//current user
router.get('/current-user', isAuthenticated ,currentUser)

// update personal information
router.post('/update-information/:id', isAuthenticated, updatePersonalInfo)

// update personal information
router.post('/update-password/:id', isAuthenticated, updatePassword)

//log out
router.post('/logout', logout)

export default router;