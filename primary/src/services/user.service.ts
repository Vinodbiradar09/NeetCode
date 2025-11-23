import { prisma } from "../prismadb.js";
import bcrypt from "bcrypt";

export const userService = {
  async createUser(email: string, password: string) {
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      throw new Error("User already exists");
    }
    const hashed = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: { email, password: hashed },
    });
    return user;
  },
};
