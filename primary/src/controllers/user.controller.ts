import type { Request, Response, NextFunction } from "express";
import { userService } from "../services/user.service.js";
import bcrypt from "bcrypt";
import { generateAccessAndRefreshTokens, options } from "../lib/tokens.js";

export const userController = {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password, name } = req.body;
      if (!email || !password || !name) {
        return res.status(400).json({
          success: false,
          message: "email , password and name are required to create account",
        });
      }
      const user = await userService.createUser(email, password, name);
      const sanitizedUser = {
        id : user.id,
        name : user.name,
        email : user.email,
        createdAt : user.createdAt
      }
      res.status(201).json({
        success: true,
        user : sanitizedUser,
        message: "Account created successfully",
      });
    } catch (err) {
      next(err);
    }
  },

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return res.status(400).json({
          success: false,
          message: "email and password are required to login",
        });
      }
      const user = await userService.loginUser(email, password);
      const passwordValid = await bcrypt.compare(password, user.password);
      if (!passwordValid) {
        return res
          .status(400)
          .json({ success: false, message: "invalid creds" });
      }
      const { accessToken, refreshToken } =
        await generateAccessAndRefreshTokens(user.id);
      res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json({ message: "user logged in successfully", success: true, user });
    } catch (error) {
      next(error);
    }
  },

  async me (req: Request, res: Response) {
    try {
      const user = req.user;
      const sanitizedUser = {
        id : user?.id,
        email : user?.email,
        name : user?.name,
        createdAt : user?.createdAt,
      }
      return res
        .status(200)
        .json({ message: "current logged user accessed", success: true, sanitizedUser });
    } catch (error) {
      console.log("failed to access the current logged user", error);
      return res.status(500).json({
        message: "failed to access the current logged user",
        success: false,
      });
    }
  },
};
