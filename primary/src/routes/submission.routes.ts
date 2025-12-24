import { Router } from "express";
import { submissionController } from "../controllers/submission.controller.js";
import { jwtVerify } from "../middlewares/authSession.js";

const router = Router();
router.post("/", jwtVerify ,submissionController.submit);

export default router;

