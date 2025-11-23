import { Router } from "express";
import { submissionController } from "../controllers/submission.controller.js";
import { authSession } from "../middlewares/authSession.js";

const router = Router();
router.post("/", submissionController.submit);

export default router;

