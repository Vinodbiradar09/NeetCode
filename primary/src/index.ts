import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import { initQueue } from "./queues/rabbit.js";
import { authMiddleware } from "./auth/auth.js";
import { authSession } from "./middlewares/authSession.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import userRoutes from "./routes/user.routes.js";
import submissionRoutes from "./routes/submission.routes.js";
import problemRoutes from "./routes/problem.routes.js";
const app = express();

app.set("trust proxy", true);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: process.env.FRONTEND_ORIGIN || "http://localhost:3000",
  credentials: true,
}));

app.use("/auth", authMiddleware);
// app.use(authSession);
app.use("/api/users", userRoutes);
app.use("/api/submissions", submissionRoutes);
app.use("/api/problems", problemRoutes);
app.use(errorHandler);
initQueue().then(() => {
  app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
  });
}).catch(err => {
  console.error("Failed to init queue:", err);
  process.exit(1);
});
