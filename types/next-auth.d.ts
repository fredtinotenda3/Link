// eslint-disable-next-line @typescript-eslint/no-unused-vars
import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      firstName: string;
      lastName: string;
      email: string;
      phone?: string; //
    };
  }

  interface User {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone?: string; //
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    firstName: string;
    lastName: string;
    phone?: string; //
  }
}
