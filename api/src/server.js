import express from "express";
import dotenv from "dotenv";
import { clerkMiddleware } from "@clerk/express";
import connectDB from "./config/db.config.js";
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import adminRoutes from "./routes/admin.routes.js";
import albumRoutes from "./routes/album.routes.js";
import songRoutes from "./routes/song.routes.js";
import statRoutes from "./routes/stat.routes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.use(clerkMiddleware());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/albums", albumRoutes);
app.use("/api/songs", songRoutes);
app.use("/api/stats", statRoutes);

app.listen(PORT, async () => {
  console.log(`http://localhost:${PORT}`);
  await connectDB();
});