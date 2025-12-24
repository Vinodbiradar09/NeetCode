import { Router } from "express";
import { problemController } from "../controllers/problem.controller.js";
import { jwtVerify } from "../middlewares/authSession.js";

const router = Router();
router.post("/", jwtVerify , problemController.create);
router.get("/", jwtVerify , problemController.list);
router.get("/:slug" , jwtVerify, problemController.one);

export default router;
