import jwt from "jsonwebtoken";
import employeeModel from "../models/employeeModel.js";

export default async function verifyEmployee(req, res, next) {
  try {
    const token = req.cookies.employeeToken;
    if (!token) {
      return res
        .status(401)
        .json({ message: "Unauthorized: No token provided." });
    }

    const secret = process.env.JWT_SECRET_KEY_EMPLOYEE;
    const decoded = jwt.verify(token, secret);

    // Check if the decoded user ID exists in the database
    const employee = await employeeModel.findOne({
      where: { id: decoded._id },
      attributes: { exclude: ["password"] },
    });

    if (!employee) {
      return res.status(401).json({ message: "Employee not found." });
    }
    req.employee = employee;
    next();
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error." });
  }
}
