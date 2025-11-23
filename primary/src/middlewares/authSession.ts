import { getSession } from "@auth/express";
import type { Request, Response, NextFunction } from "express";
import { authConfig } from "../auth/auth.js";

export const authSession = async (req: Request, res: Response, next: NextFunction) => {
  try {
    console.log("cookies" , req.headers.cookie);
    const session = await getSession(req, authConfig);
    res.locals.session = session;
    
  } catch (err) {
    console.error("authSession error:", err);
    res.locals.session = null;
  }
  next();
};

