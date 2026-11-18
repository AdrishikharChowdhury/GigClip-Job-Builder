import type { DefaultSession } from "next-auth";

type UserRole = "employee" | "employer";

declare module "next-auth" {
  interface User {
    role: UserRole;
  }

  interface Session {
    user: {
      id: string;
      encodedId: string;
      role: UserRole;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    encodedId: string;
    role: UserRole;
  }
}