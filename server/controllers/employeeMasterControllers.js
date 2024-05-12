import employeeModel from "../models/employeeModel.js";
import bcrypt from "bcrypt";
import passwordGenerator from "generate-password";
import sentMail from "../helpers/sentMail.js";

// Controller function to retrieve all employees
export const fetchAllEmployees = async (req, res) => {
  try {
    const filter = req.query.filter;
    const whereClause = filter ? { department: filter } : {};
    const employees = await employeeModel.findAll({
      where: whereClause,
      attributes: { exclude: ["password"] },
    });

    return res.status(200).json({ employees });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Controller function to create an employee
export const createEmployee = async (req, res) => {
  try {
    const { firstName, lastName, email, department, empCode, contact } =
      req.body;

    if (
      !email ||
      !firstName.trim() ||
      !lastName.trim() ||
      !department ||
      !empCode ||
      !contact
    ) {
      return res.status(422).json({ message: "Provide necessary information" });
    }

    const existingEmail = await employeeModel.findOne({ where: { email } });
    const existingEmpCode = await employeeModel.findOne({ where: { empCode } });

    if (existingEmail) {
      return res.status(403).json({ message: "This email already exists" });
    }
    if (existingEmpCode) {
      return res
        .status(403)
        .json({ message: "This Employee code already exists" });
    }

    const password = passwordGenerator.generate({
      length: 6,
      numbers: true,
      uppercase: false,
      strict: true,
    });
    const hashedPassword = await bcrypt.hash(password, 10);

    const newEmployee = await employeeModel.create(
      {
        firstName,
        lastName,
        email,
        department,
        empCode,
        contact,
        password: hashedPassword,
      },
      "-password"
    );
    const subject = "Employee manager login credentials";
    const html = `
  <h1>${subject}</h1>
  <h3>Hi ${firstName} ${lastName},</h3>
  <p>Below are your login credentials for Employee Manager:</p>
  <p><strong>Username:</strong> ${email}</p>
  <p><strong>Password:</strong> ${password}</p>
    `;
    sentMail(email, subject, html);

    return res.status(201).json({ newEmployee });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const updateEmployee = async (req, res) => {
  try {
    const { empId } = req.params;
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
