import jwt from 'jsonwebtoken'
import employeeMasterModel from '../models/employeeMasterModel.js'

export default async function verifyEmployeeMaster(req, res, next) {
    try {
        const token = req.cookies.employeeMasterToken;
        if (!token) {
            return res.status(401).json({ message: 'Unauthorized: No token provided.' });
        }

        const secret = process.env.JWT_SECRET_KEY_EMPLOYEE_MASTER;
        const decoded = jwt.verify(token, secret);

        // Check if the decoded user ID exists in the database
        const employeeMaster = await employeeMasterModel.findOne({
            where: { id: decoded._id },
            attributes: { exclude: ['password'] } 
        });

        if (!employeeMaster) {
            return res.status(401).json({ message: 'Employee Master not found.' });
        }
        const data = {
            id: employeeMaster.id,
            email: employeeMaster.email,
            name:employeeMaster.name
        };
        req.employeeMaster = data;
        next();
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Internal server error.' });
    }
}