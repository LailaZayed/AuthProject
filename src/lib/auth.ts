import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import clientPromise from "./mongodb";   
import { db } from "./db";               
import { compare } from "bcrypt";


export const authOptions: NextAuthOptions = {
  adapter: MongoDBAdapter(clientPromise),  
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/sign-in",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "ex) something@gmail.com" },
        password: { label: "Password", type: "password", placeholder: "Please Enter your Password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          return null;
        }

        // still use Prisma for your own logic
        const existingUser = await db.user.findUnique({
          where: { email: credentials.email },
        });

        if (!existingUser) {
          return null;
        }

        const passwordMatch = await compare(credentials.password, existingUser.password);
        if (!passwordMatch) {
          return null;
        }

        return {
          id: existingUser.id + "",
          username: existingUser.username,
          email: existingUser.email,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        return {
          ...token,
          username: (user as any).username, // ensure username persists
        };
      }
      return token;
    },
    async session({ session, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          username: (token as any).username,
        },
      };
    },
  },
};




