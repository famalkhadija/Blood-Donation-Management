import express from "express";
import {
  createRequest,
  getRequests,
  donateToRequest,
} from "../controllers/requestController.js";
import { authMiddleware } from "../middleware/auth.js";

const router = express.Router();

router.post("/", authMiddleware, createRequest);
router.get("/", authMiddleware, getRequests);
router.post("/:id/donate", authMiddleware, donateToRequest);

export default router;