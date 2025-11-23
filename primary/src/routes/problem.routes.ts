import { Router } from "express";
import { problemController } from "../controllers/problem.controller.js";
import { authSession } from "../middlewares/authSession.js";

const router = Router();
router.post("/", problemController.create);
router.get("/", problemController.list);
router.get("/:slug" , problemController.one);

export default router;
