import { Router } from "express";
import isAuthenticated from "../auth/isAuthenticated.js";
import { upload } from "../config/multer.js";
import { handleFormRegistryNumber, handleGetPaginatedFoundlingCertificates, handleGetSingleCertificate, registerFoundlingCert } from "../controllers/foundlingCertController.js";

const router = Router();

router.post('/register', isAuthenticated, upload.fields([
    {name:'twelveInformantSignature', maxCount: 1},
    {name:'twelveRegistrarSignature', maxCount: 1},
    {name:'thirteenSignature', maxCount: 1},
    {name:'scannedFile', maxCount: 1},
]), registerFoundlingCert);

router.get('/form-number', isAuthenticated, handleFormRegistryNumber);

router.get('/get-all', isAuthenticated, handleGetPaginatedFoundlingCertificates);

router.get('/get-single', isAuthenticated, handleGetSingleCertificate);

export default router;