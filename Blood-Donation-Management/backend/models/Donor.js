import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Donor = sequelize.define("Donor", {
  name: DataTypes.STRING,
  phone: DataTypes.STRING,
  bloodgroup: DataTypes.STRING,
  city: DataTypes.STRING,
});

export default Donor;
