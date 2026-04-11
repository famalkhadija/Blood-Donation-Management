import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/userRoutes.js";
import requestRoutes from "./routes/requestRoutes.js";
import donorRoutes from "./routes/donorRoutes.js";
const app = express();
const PORT = process.env.PORT || 5000;
import sequelize from "./config/db.js";
import dotenv from "dotenv";
dotenv.config();
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));
app.use(express.json());
app.use(cookieParser());
app.use("/api/users", userRoutes);
app.use("/api/requests", requestRoutes);
app.use("/api/donors", donorRoutes);
await sequelize
  .authenticate()
  .then(() => {
    console.log("Database connection established successfully!");
  })
  .catch((error) => {
    console.error("Unable to connect to the database:", error);
  });
await sequelize
  .sync({ alter: true })
  .then(() => {
    console.log("Database synchronized successfully!");
  })
  .catch((error) => {
    console.error("Error synchronizing the database:", error);
  });
app.get("/", (req, res) => {
  res.send("Blood Donation Backend Running!");
});
app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`);
});
