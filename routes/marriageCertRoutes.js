import { Router } from "express";
import isAuthenticated from "../auth/isAuthenticated.js";
import { upload } from "../config/multer.js";
import { handleGetFormNumber, handleGetPaginatedMarriageCertificates, handleGetSingleCertificate, registerMarriageCert } from "../controllers/marriageCertController.js";

const router = Router();

router.post('/register', isAuthenticated, upload.fields([
    {name:'eighteenHusbandSignature', maxCount: 1},
    {name:'eighteenWifeSignature', maxCount: 1},
    {name:'nineTeenSignature', maxCount: 1},
    {name:'twentySignatureOne', maxCount: 1},
    {name:'twentySignatureTwo', maxCount: 1},
    {name:'twentySignatureThree', maxCount: 1},
    {name:'twentySignatureFour', maxCount: 1},
    {name:'twentyOneSignature', maxCount: 1},
    {name:'twentyTwoSignature', maxCount: 1},
]), registerMarriageCert);

router.get('/form-number', isAuthenticated, handleGetFormNumber);

router.get('/get-all', isAuthenticated, handleGetPaginatedMarriageCertificates);

router.get('/get-single', isAuthenticated, handleGetSingleCertificate);

export default router;