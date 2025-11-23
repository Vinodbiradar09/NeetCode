import { ExpressAuth } from "@auth/express";
import { PrismaAdapter } from "@auth/prisma-adapter";
import Credentials from "@auth/express/providers/credentials";
import bcrypt from "bcrypt";
import { prisma } from "../prismadb.js";

export const authConfig = {
  adapter: PrismaAdapter(prisma),
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials: any) => {
        if (!credentials) return null;
        const user = await prisma.user.findUnique({ where: { email: credentials.email }});
        if (!user) return null;
        const isValid = await bcrypt.compare(credentials.password, user.password);
        if (!isValid) return null;
        return { id: user.id, email: user.email };
      },
    }),
  ],
  secret: process.env.AUTH_SECRET!,
  session: { strategy: "jwt" as const },
  callbacks: {
    async jwt({ token, user }: any) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }: any) {
      if (session.user) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
  cookies: {
    sessionToken: {
      name: "auth.session-token",
      options: {
        sameSite: "none" as const,
        secure: false,
        path: "/",
      },
    },
    csrfToken: {
      name: "auth.csrf-token",
      options: {
        sameSite: "none" as const,
        secure: false,
        path: "/",
      },
    },
  },
  debug: process.env.NODE_ENV === "development",
};

export const authMiddleware = ExpressAuth(authConfig);
