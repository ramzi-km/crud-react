import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.connection.js';

const employee_master = sequelize.define(
  'employee_master',
  {
    name: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
    },

    password: {
      type: DataTypes.STRING,
    },
  },
  { timestamps: true }
);

//Export the model
export default employee_master;