import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const User = sequelize.define("User", {
  name: DataTypes.STRING,
  email: {
    type: DataTypes.STRING,
    unique: true,
    isLowercase: true,
  },
  password: {
    type: DataTypes.STRING,
  },
  role: DataTypes.STRING,
  bloodgroup: DataTypes.STRING,
  city: DataTypes.STRING,
  phone: DataTypes.STRING,
  licenseNumber: DataTypes.STRING,
});

export default User;
