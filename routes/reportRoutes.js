import { Router } from "express";
import isAuthenticated from "../auth/isAuthenticated.js";
import { handleGetAllCount } from "../controllers/reportController.js";

const router = Router();

router.get('/all-certificates', isAuthenticated, handleGetAllCount);

export default router;