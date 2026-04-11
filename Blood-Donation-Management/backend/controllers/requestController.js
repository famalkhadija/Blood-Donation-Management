import { Request, Donor } from "../models/index.js";
import { Op } from "sequelize";
//  Create Request
export const createRequest = async (req, res) => {
  try {
    console.log("request" + req.body);
    const newRequest = await Request.create({
      ...req.body,
      userId: req.user.id,
    });
    res.json({
      message: "Request created",
      request: newRequest,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
//  Get all requests (with donors)
export const getRequests = async (req, res) => {
  try {
    const { city, bloodgroup } = req.query;
    let where = {};
    // City filter
    if (city) {
      where.city = {
        [Op.iLike]: `%${city}%`,
      };
    }
    // Blood group filter
    if (bloodgroup) {
      where.bloodgroup = bloodgroup;
    }
    // Hospital → only own requests
    if (req.user?.role === "hospital") {
      where.userId = req.user.id;
    }
    const requests = await Request.findAll({
      where,
      include: {
        model: Donor,
        as: "donors",
      },
      order: [["id", "DESC"]],
    });
    res.json(requests);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};
//  Donate to Request
export const donateToRequest = async (req, res) => {
  try {
    const requestId = req.params.id;
    const { donor } = req.body;
    const request = await Request.findByPk(requestId, {
      include: { model: Donor, as: "donors" },
    });
    if (!request) {
      return res.status(404).json({ message: "Request not found" });
    }
    // check duplicate donor (by phone)
    const alreadyExists = request.donors.find((d) => d.phone === donor.phone);
    if (alreadyExists) {
      return res.json({
        message: "You already sent request.",
      });
    }
    // create donor
    const newDonor = await Donor.create({
      ...donor,
      RequestId: requestId,
    });
    res.json({
      message: "we will contact you soon.",
      donor: newDonor,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
export const deleteRequest = async (req, res) => {
  try {
    const requestId = req.params.id;
    const request = await Request.findByPk(requestId);
    if (!request) {
      return res.status(404).json({ message: "Request not found" });
    }
    if (request.userId !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }
    await request.destroy();
    res.json({ message: "Request deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
