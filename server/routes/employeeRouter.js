import express from "express";
const router = express.Router();

//-------------------   middlewares   -------------------------//
import verifyEmployee from "../middlewares/verifyEmployee.js";

//-------------------   controllers   --------------------------------//

//--------------employeeAuthControllers--------------//
import {
  employeeLogin,
  employeeLogout,
  fetchEmployee,
} from "../controllers/employeeControllers.js";

//-------------------   ------------   --------------------------------//

// employee auth routes //
router.get("/employee", verifyEmployee, fetchEmployee);
router.post("/login", employeeLogin);
router.post("/logout", employeeLogout);

export default router;
