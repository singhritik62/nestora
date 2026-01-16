import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

import propertyRoutes from "./routes/propertyRoutes.js";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("🚀 NESTORA API is running");
});

app.use("/api/properties", propertyRoutes);
app.use("/api/users", userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`🔥 Server running on http://localhost:${PORT}`)
);