import { Router } from "express";
import { handleGetFormNumber, handleGetPaginatedDeathCertificates, handleGetSingleCertificate, registerDeathCert } from "../controllers/deathCertController.js";

import isAuthenticated from "../auth/isAuthenticated.js";
import { upload } from "../config/multer.js";

const router = Router();

router.post('/register', isAuthenticated, upload.fields([
    {name:'twentySignature', maxCount: 1},
    {name:'twentyReviewedSignature', maxCount: 1},
    {name:'twentyFiveSignature', maxCount: 1},
    {name:'twentySixSignature', maxCount: 1},
    {name:'twentySevenSignature', maxCount: 1},
]), registerDeathCert);

router.get('/form-number', isAuthenticated, handleGetFormNumber);

router.get('/get-all', isAuthenticated, handleGetPaginatedDeathCertificates);

router.get('/get-single', isAuthenticated, handleGetSingleCertificate);

export default router;