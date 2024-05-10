import express from 'express';
const router = express.Router();

//-------------------   controllers   -------------------------//

//---------------employeeMasterAuthControllers----------------//
import { employeeMasterLogin } from '../controllers/employeeMasterAuthControllers.js';

router.post('/login', employeeMasterLogin);

export default router;