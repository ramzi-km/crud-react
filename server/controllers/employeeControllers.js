import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import employeeModel from "../models/employeeModel.js";

export const employeeLogin = async (req, res) => {
  try {
    const { email, password } = { ...req.body };
    if (!email || !password) {
      return res.status(422).json({ message: "provide necessary information" });
    }

    // Find the employee master by email
    const employee = await employeeModel.findOne({
      where: { email },
    });

    if (employee) {
      // Compare passwords
      const comparison = await bcrypt.compare(password, employee.password);
      if (comparison) {
        // Generate JWT token
        const secret = process.env.JWT_SECRET_KEY_EMPLOYEE;
        const token = jwt.sign({ _id: employee.id }, secret);

        // Set cookie
        res.cookie("employeeToken", token, {
          httpOnly: true,
          secure: true,
          sameSite: "none",
          maxAge: 3 * 24 * 60 * 60 * 1000, // 3 days
        });
        const { password, ...employeeData } = employee.toJSON();

        return res.status(200).json({ employee: employeeData });
      } else {
        return res.status(403).json({ message: "Incorrect password" });
      }
    } else {
      return res.status(404).json({ message: "Employee not found" });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).send({ message: "Internal server error" });
  }
};

export const employeeLogout = async (req, res) => {
  try {
    res.cookie("employeeToken", "", {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 0,
    });
    return res.status(200).send({ message: "Success" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const fetchEmployee = async (req, res) => {
  try {
    // Return the employee data stored in req.employee
    return res.status(200).json({ employee: req.employee });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const empId = req.employee.id;
    const { firstName, lastName, email, department, empCode, contact } =
      req.body;

    const updatingEmployee = await employeeModel.findByPk(empId);

    const existingEmail = await employeeModel.findOne({ where: { email } });
    const existingEmpCode = await employeeModel.findOne({ where: { empCode } });

    if (!updatingEmployee) {
      return res.status(404).json({ message: "Employee not found" });
    }
    if (existingEmail && updatingEmployee.id !== existingEmail.id) {
      return res.status(404).json({ message: "Email already exist" });
    }
    if (existingEmpCode && updatingEmployee.id !== existingEmpCode.id) {
      return res.status(404).json({ message: "Employee code already exist" });
    }

    // Update the employee fields
    updatingEmployee.firstName = firstName || updatingEmployee.firstName;
    updatingEmployee.lastName = lastName || updatingEmployee.lastName;
    updatingEmployee.email = email || updatingEmployee.email;
    updatingEmployee.department = department || updatingEmployee.department;
    updatingEmployee.empCode = empCode || updatingEmployee.empCode;
    updatingEmployee.contact = contact || updatingEmployee.contact;

    // Save the updated employee details
    await updatingEmployee.save();

    return res
      .status(200)
      .json({ updatedEmployee: updatingEmployee, message: "success" });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};
