import { Router } from "express";
import { userController } from "../controllers/user.controller.js";
import { jwtVerify } from "../middlewares/authSession.js";
const router = Router();
router.post("/signup",  userController.create);
router.post('/signin' , userController.login);
router.get('/me' , jwtVerify , userController.me);
export default router;

