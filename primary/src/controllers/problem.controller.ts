import type { Request, Response, NextFunction } from "express";
import { problemService } from "../services/problem.service.js";
import { prisma } from "../prismadb.js";

export const problemController = {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { title, description, examples } = req.body;
      if (!title || !description || !examples) {
        return res.status(400).json({
          message: "all the fields are required",
          success: false,
        });
      }
      const problem = await problemService.createProblem(
        title,
        description,
        examples
      );
      if (!problem) {
        return res.status(404).json({
          message: "failed to create a problem",
          success: false,
        });
      }
      res
        .status(201)
        .json({
          success: true,
          problem,
          message: "problem created successfully",
        });
    } catch (err) {
      next(err);
    }
  },

  async list(req: Request, res: Response, next: NextFunction) {
    try {
      const problems = await problemService.listProblems();
      if (problems.length === 0) {
        return res.status(200).json({
          message: "zero problems",
          success: true,
        });
      }
      res.status(200).json({ success: true, problems });
    } catch (err) {
      next(err);
    }
  },

  async one (req : Request , res : Response , next : NextFunction){
    try {
      const {slug} = req.params;
      if(!slug){
        return res.status(400).json({
          message : "problem slug is required",
          success : false,
        })
      }
      const prob = await prisma.problem.findUnique({
        where : {
          id : slug,
        },
      })
      if(!prob){
        return res.status(404).json({
          message : "problem not found",
          success : false
        })
      }
      return res.status(200).json({
        message : "problem got successfully",
        success : true,
        problem : prob,
      })
    } catch (error) {
      console.log("error for getting the problem" , error);
      return res.status(500).json({
        message : "error in getting the problem",
        success : false
      })
    }
  }
};
