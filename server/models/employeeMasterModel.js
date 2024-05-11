import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.connection.js';

const EmployeeMaster = sequelize.define(
  'employee_master',
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }
);

//Export the model
export default EmployeeMaster;