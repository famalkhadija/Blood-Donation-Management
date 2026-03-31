import express from "express";
import cors from "cors";
import userRoutes from "./routes/userRoutes.js";
import requestRoutes from "./routes/requestRoutes.js";
const app = express();
const PORT = process.env.PORT || 5000;
import dotenv from "dotenv";
dotenv.config();
app.use(cors());
app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/requests", requestRoutes);
app.get("/", (req, res) => {
  res.send("Blood Donation Backend Running!");
});

app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`);
});