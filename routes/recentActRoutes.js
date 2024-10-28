import { Router } from "express";
import isAuthenticated from "../auth/isAuthenticated.js";
import { createActivity, getActivity } from "../controllers/recentActivityController.js";

const router = Router();

router.post('/add-activity', isAuthenticated , createActivity);
router.get('/getAll-activity', isAuthenticated , getActivity);

export default router;