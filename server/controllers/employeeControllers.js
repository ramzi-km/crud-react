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
