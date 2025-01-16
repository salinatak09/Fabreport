import User from "@/models/users";
import NextAuth, { NextAuthOptions, SessionStrategy } from "next-auth";
import { authOptions } from "@/lib/auth";

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
