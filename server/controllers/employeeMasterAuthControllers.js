import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import employeeMasterModel from '../models/employeeMasterModel.js'

export const employeeMasterLogin = async (req, res) => {
    try {
        const { email, password } = { ...req.body };
        if (!email || !password) {
            return res.status(422).json({ message: 'provide necessary information' });
        }

        // Find the employee master by email
        const employeeMaster = await employeeMasterModel.findOne({ where: { email } });

        if (employeeMaster) {
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
                    name: employeeMaster.name
                };

                return res.status(200).json({ employeeMaster: data });
            } else {
                return res.status(403).json({ message: 'Incorrect password' });
            }
        } else {
            return res.status(404).json({ message: 'Employee Master not found' });
        }
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: 'Internal server error' });
    }
};

export const employeeMasterLogout = async (req, res) => {
    try {
        res.cookie('employeeMasterToken', '', {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
            maxAge: 0,
        });
        return res.status(200).send({ message: 'Success' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

export const getEmployeeMaster = async (req, res) => {
    try {
        // Return the employee data stored in req.employee
        return res.status(200).json({ employeeMaster: req.employeeMaster });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};