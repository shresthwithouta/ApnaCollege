import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { connect } from "@/lib/db";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          return null;
        }

        await connect();

        const user = await User.findOne({
          $or: [
            { email: credentials.email },
            { username: credentials.email },
          ],
        });

        if (!user) return null;

        const isValid = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!isValid) return null;

        
        return {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          role: user.role,
          tokenVersion: user.tokenVersion,
        };
      },
    }),
  ],

  session: {
    strategy: "jwt",
  },

  callbacks: {
    async jwt({ token, user }) {
      
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.tokenVersion = user.tokenVersion;
      }

    
      if (token.id) {
        await connect();
        const dbUser = await User.findById(token.id).select("tokenVersion");

        if (!dbUser || dbUser.tokenVersion !== token.tokenVersion) {
        
          delete token.id;
          delete token.role;
          delete token.tokenVersion;
        }
      }

      return token;
    },

    async session({ session, token }) {
      if (session.user && token.id) {
        session.user.id = token.id;
        session.user.role = token.role ?? "user";
      }
      return session;
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
};
