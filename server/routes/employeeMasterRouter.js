import express from 'express';
const router = express.Router();

//-------------------   middlewares   -------------------------//
import verifyEmployeeMaster from '../middlewares/verifyEmployeeMaster.js';

//-------------------   controllers   -------------------------//

//---------------employeeMasterAuthControllers----------------//
import { employeeMasterLogin, employeeMasterLogout, getEmployeeMaster } from '../controllers/employeeMasterAuthControllers.js';



router.get('/',verifyEmployeeMaster,getEmployeeMaster)
router.post('/login', employeeMasterLogin);
router.post('/logout', employeeMasterLogout);

export default router;