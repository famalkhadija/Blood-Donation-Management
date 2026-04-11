import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Request = sequelize.define("Request", {
  userId: {
    type: DataTypes.INTEGER,
  },
  hospital: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  bloodgroup: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  city: {
    type: DataTypes.STRING,
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: "open",
  },
  date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
});

export default Request;
