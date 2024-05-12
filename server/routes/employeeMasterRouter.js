import express from "express";
const router = express.Router();

//-------------------   middlewares   -------------------------//
import verifyEmployeeMaster from "../middlewares/verifyEmployeeMaster.js";

//-------------------   controllers   --------------------------------//

//--------------employeeMasterAuthControllers--------------//
import {
  employeeMasterLogin,
  employeeMasterLogout,
  getEmployeeMaster,
} from "../controllers/employeeMasterAuthControllers.js";
import {
  createEmployee,
  deleteEmployee,
  fetchAllEmployees,
  updateEmployee,
} from "../controllers/employeeMasterControllers.js";

//-------------------   ------------   --------------------------------//

// employee master auth routes //
router.get("/", verifyEmployeeMaster, getEmployeeMaster);
router.post("/login", employeeMasterLogin);
router.post("/logout", employeeMasterLogout);

// employee management routes //
router.get("/employees", verifyEmployeeMaster, fetchAllEmployees);
router.post("/employees", verifyEmployeeMaster, createEmployee);
router.patch("/employees/:empId", verifyEmployeeMaster, updateEmployee);
router.delete("/employees/:empId", verifyEmployeeMaster, deleteEmployee);

export default router;
