import { DefaultSession, DefaultUser } from "@auth/core/types";

declare module "@auth/core" {
  interface Session {
    user: DefaultSession["user"] & { id: string };
  }

  interface User extends DefaultUser {
    id: string;
  }

  interface JWT {
    id: string;
  }
}
