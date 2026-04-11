import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const registerUser = async (req, res) => {
  const { role, profile } = req.body;
  const user = await User.create({
    role,
    ...profile,
  });
const token = jwt.sign(
  { id: user.id, role: user.role },
  process.env.JWT_SECRET,
  { expiresIn: "7d" }
);

res.cookie("token", token, {
  httpOnly: true,
  secure: false,
  sameSite: "lax",
});
  res.json({
    message: "User registered",
    user,
    role: user.role,
  });
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ where: { email } });
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  if (password !== user.password) {
    return res.status(400).json({ message: "Wrong Password" });
  }
  const token = jwt.sign(
    {
      id: user.id,
      role: user.role,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1d" },
  );
  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
  });
  res.json({
    user,
    role: user.role,
    token,
  });
};
export const updateProfile = async (req, res) => {
  const user = await User.findOne({ where: { id: req.user.id } });

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  await user.update(req.body);

  res.json({
    message: "Profile updated",
    user,
  });
};
// /me
export const getMe = async (req, res) => {
  const user = await User.findOne({ where: { id: req.user.id } });
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  res.json({ user });
};
export const logoutUser = async (req, res) => {
  res.clearCookie("token");
  res.json({ message: "Logged out" });
};
