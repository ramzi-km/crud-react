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
  updateProfile,
} from "../controllers/employeeControllers.js";

//-------------------   ------------   --------------------------------//

// employee auth routes //
router.get("/employee", verifyEmployee, fetchEmployee);
router.post("/login", employeeLogin);
router.post("/logout", employeeLogout);

// employee profile //
router.patch("/employee", verifyEmployee, updateProfile);

export default router;
