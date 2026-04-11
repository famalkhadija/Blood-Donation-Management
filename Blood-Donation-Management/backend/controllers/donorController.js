import { Donor,User } from "../models/index.js";
import { Op } from "sequelize";
export const getDonors = async (req, res) => {
  try {
    const user=await User.findByPk(req.user.id);
    const { bloodgroup } = req.query;
    let where = {};
    // City filter according to hospital city
if(req.user.role==="hospital"){
    where.city = {
      [Op.iLike]: user.city,
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
