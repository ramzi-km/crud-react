import express from "express";
const router = express.Router();

//-------------------   middlewares   -------------------------//
import verifyEmployee from "../middlewares/verifyEmployee.js";
import { upload } from "../config/multer.config.js";

//-------------------   controllers   --------------------------------//

//--------------employeeAuthControllers--------------//
import {
  employeeLogin,
  employeeLogout,
  fetchEmployee,
  updateProfile,
  updateProfilePic,
} from "../controllers/employeeControllers.js";

//-------------------   ------------   --------------------------------//

// employee auth routes //
router.get("/employee", verifyEmployee, fetchEmployee);
router.post("/login", employeeLogin);
router.post("/logout", employeeLogout);

// employee profile //
router.patch("/employee", verifyEmployee, updateProfile);
router.post(
  "/employee/profilePic",
  verifyEmployee,
  upload.single("image"),
  updateProfilePic
);



export default router;
