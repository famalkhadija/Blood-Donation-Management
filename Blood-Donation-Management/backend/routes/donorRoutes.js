import express from "express";
import { getDonors } from "../controllers/donorController.js";
import { authMiddleware } from "../middleware/auth.js";

const router = express.Router();

// GET donors
router.get("/", authMiddleware, getDonors);

export default router;
