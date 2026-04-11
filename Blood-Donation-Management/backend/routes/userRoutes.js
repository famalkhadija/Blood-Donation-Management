import express from "express";
import {
  registerUser,
  loginUser,
  updateProfile,
  getMe,
} from "../controllers/userController.js";
import { authMiddleware } from "../middleware/auth.js";
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.put("/profile", authMiddleware, updateProfile);
router.get("/me", authMiddleware, getMe);
export default router;
