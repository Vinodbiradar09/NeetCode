import type { Request, Response, NextFunction } from "express";
import { submissionService } from "../services/submission.service.js";

export const submissionController = {
  async submit(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user?.id;
      const { problemId, lang, code } = req.body;
      console.log("userId" , userId);
      if (!userId) {
        return res.status(401).json({ success: false, message: "Not authenticated" });
      }
      const result = await submissionService.submitCode({ userId, problemId, lang, code });
      console.log("resss" , result);
      res.status(200).json({ success: true, message: result.message });
    } catch (err) {
      next(err);
    }
  },
};

