import { prisma } from "../prismadb.js";

export const problemService = {
  async createProblem(title: string, description: string, examples: string) {
    const problem = await prisma.problem.create({
      data: { title, description, examples },
    });
    return problem;
  },

  async listProblems() {
    const problems = await prisma.problem.findMany();
    return problems;
  },
};

