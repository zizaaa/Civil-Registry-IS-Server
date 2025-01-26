import { Router } from "express";
import { archive, handleGetPaginatedArchiveCertificates, handleUnArchive } from "../controllers/archiveController.js";
import isAuthenticated from "../auth/isAuthenticated.js";

const router = Router();

router.post('/archive', isAuthenticated, archive);

router.post('/unarchive', isAuthenticated, handleUnArchive);

router.get('/archive/get-all', isAuthenticated, handleGetPaginatedArchiveCertificates);

export default router;