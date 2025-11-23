import type { Request, Response, NextFunction } from "express";
import { userService } from "../services/user.service.js";

export const userController = {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;
      if(!email || !password){
        return res.status(400).json({
          success : false,
          message : "email and password are required to login"
        })
      }
      const user = await userService.createUser(email, password);
      res.status(201).json({ success: true, userId: user.id , message : "Account created successfully" });
    } catch (err) {
      next(err);
    }
  },
};

