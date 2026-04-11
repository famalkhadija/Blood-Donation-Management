import { Donor } from "../models/index.js";
import { Op } from "sequelize";
export const getDonors = async (req, res) => {
  try {
    const { city, bloodgroup } = req.query;
    let where = {};
    // City filter
    if (city) {
      where.city = {
        [Op.iLike]: `%${city}%`,
      };
    }
    // Blood group
    if (bloodgroup) {
      where.bloodgroup = {
        [Op.iLike]: bloodgroup,
      };
    }
    const donors = await Donor.findAll({
      where ,
      order: [["id", "DESC"]],
    });
    res.json(donors);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};
