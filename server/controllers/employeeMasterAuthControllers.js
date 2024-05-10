import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import employeeMasterModel from '../models/employeeMasterModel.js'

export async function employeeMasterLogin(req, res) {
    try {
        const { email, password } = { ...req.body };
        if (!email || !password) {
            return res.status(422).json({ message: 'provide necessary information' });
        }

        // Find the employee master by email
        const employeeMaster = await employeeMasterModel.findOne({ where: { email: email } });

        if (employee) {
            // Compare passwords
            const comparison = await bcrypt.compare(password, employeeMaster.password);
            if (comparison) {
                // Generate JWT token
                const secret = process.env.JWT_SECRET_KEY_EMPLOYEE_MASTER;
                const token = jwt.sign({ _id: employeeMaster.id }, secret);
                
                // Set cookie
                res.cookie('employeeMasterToken', token, {
                    httpOnly: true,
                    secure: true,
                    sameSite: 'none',
                    maxAge: 3 * 24 * 60 * 60 * 1000, // 3 days
                });

               
                const data = {
                    id: employeeMaster.id,
                    email: employeeMaster.email,
                    name:employeeMaster.name
                };

                return res.status(200).json({ employeeMaster: data });
            } else {
                res.status(403).json({ message: 'Incorrect password' });
            }
        } else {
            res.status(404).json({ message: 'Employee not found' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: 'Internal server error' });
    }
}

export async function employeeMasterLogout(req, res) {
    try {
        res.cookie('employeeToken', '', {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
            maxAge: 0,
        });
        res.status(200).send({ message: 'Success' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

export async function getEmployeeMaster(req, res) {
    try {
        // Return the employee data stored in req.employee
        res.status(200).json({ employee: req.employee });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}