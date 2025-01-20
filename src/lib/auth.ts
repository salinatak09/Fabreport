import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { NextAuthOptions, SessionStrategy } from "next-auth";
import User from "@/models/users";
import { JWT } from "next-auth/jwt";

export const authOptions : NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "email",
          type: "email",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Please provide both email and password.");
        }

        try {
          // Find the user by email
          const user = await User.findOne({
            email: credentials.email,
          });
          console.log({user});
          if (!user) {
            throw new Error("User not found.");
          }
          // Verify password (use bcrypt or any other hashing mechanism here)
          const isValidPassword =  await bcrypt.compare(credentials?.password as string, user.password);
          console.log(isValidPassword);
          if (!isValidPassword) {
            throw new Error("Invalid password.");
          }
          // Return user object if authentication is successful
          return {
            id: user._id?.toString(),
            name: user.name,
            email: user.email
          };
        } catch (error) {
          console.error("Error during authorization:", error);
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: `${process.env.NEXT_PUBLIC_BASE_API_URL}/login`, // Custom login page
  },
  session: {
    strategy: "jwt" as SessionStrategy,
  },
  secret:process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({token, user}) {
      console.log({token, user});
      if (user) {
        token.id = user.id;
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }: {session:any, token:JWT}) {
      const sessionUser = session.user !;
      console.log({sessionUser});
      if(token){
        sessionUser.id = token.id;
        sessionUser.email = token.email;
      }
      return session;
    },
  },
};