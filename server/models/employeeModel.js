import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.connection.js';

const Employee = sequelize.define(
  'employee',
  {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false
    },

    lastName: {
      type: DataTypes.STRING,
      allowNull: false
    },

    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },

    department: {
        type: DataTypes.STRING,
        allowNull: false
      },

    empCode: {
        type: DataTypes.STRING,
        allowNull: false,
      unique: true
      },

    contact: {
        type: DataTypes.STRING,
        allowNull: false,
      },

    profilePic: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue:'https://res.cloudinary.com/dbmujhmpe/image/upload/v1694617826/wanderplan/b2mu5lc0tvqiaxmscnh4.png'
      },

    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },

  }
);

//Export the model
export default Employee;