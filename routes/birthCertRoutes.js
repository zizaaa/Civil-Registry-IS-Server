import { Router } from "express";
import { handleGetPaginatedBirthCertificates, handleGetRegistryNumber, handleGetSingleCertificate, registerBirthCert } from "../controllers/birthCertControllers.js";
import isAuthenticated from "../auth/isAuthenticated.js";
import { upload } from "../config/multer.js";

const router = Router();

router.post('/register',isAuthenticated, upload.fields([
    {name:'nineteenB_Signature', maxCount: 1},
    {name:'twenty_Signature', maxCount: 1},
    {name:'twentyOne_Signature', maxCount: 1},
    {name:'twentyTwo_Signature', maxCount: 1},
    {name:'scannedFile', maxCount: 1},
]), registerBirthCert);

router.get('/registry-number', isAuthenticated, handleGetRegistryNumber);

router.get('/get-all', isAuthenticated, handleGetPaginatedBirthCertificates);

router.get('/get-single', isAuthenticated, handleGetSingleCertificate);

export default router;