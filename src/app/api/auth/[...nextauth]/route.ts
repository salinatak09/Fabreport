import User, { UserDocument } from "@/models/users";
import NextAuth, { SessionStrategy } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

export const authOptions = {
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
          if (!user) {
            throw new Error("User not found.");
          }
          // Verify password (use bcrypt or any other hashing mechanism here)
          const isValidPassword =  await bcrypt.compare(credentials?.password as string, user.password);
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
    signIn: "/login", // Custom login page
  },
  session: {
    strategy: "jwt" as SessionStrategy,
  },
  secret:process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({token, user}: {token: any, user: any}) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }: {session: any, token: any}) {
      if(token){
        session.user.id = token.id;
        session.user.email = token.email;
      }
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
