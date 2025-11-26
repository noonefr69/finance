// auth.ts
import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import User from "./app/(auth)/sign-up/models/userSchema"; // Verify this path
import dbConnect from "./lib/db";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    GitHub({
      clientId: process.env.AUTH_GITHUB_ID,
      clientSecret: process.env.AUTH_GITHUB_SECRET,
    }),
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        try {
          if (!credentials?.email || !credentials?.password) {
            return null;
          }

          await dbConnect();

          // 1. Find user in DB
          const user = await User.findOne({ email: credentials.email });

          // 2. If no user, or user has no password (signed up via OAuth originally), return null
          if (!user || !user.password) {
            throw new Error("User not found or password incorrect");
          }

          // 3. Check password
          const isPasswordCorrect = await bcrypt.compare(
            credentials.password as string,
            user.password
          );

          if (!isPasswordCorrect) {
            throw new Error("User not found or password incorrect");
          }

          // 4. Return user (This creates the session/cookie automatically)
          return user;
        } catch (error) {
          return null; // Return null prevents sign in
        }
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      // Allow Credentials login to pass without extra checks
      // because 'authorize' already handled the validation
      if (account?.provider === "credentials") {
        return true;
      }

      // Logic for OAuth (Google/Github) only
      if (account?.provider === "google" || account?.provider === "github") {
        try {
          await dbConnect();
          const existingUser = await User.findOne({ email: user.email });

          if (!existingUser) {
            await User.create({
              email: user.email,
              name: user.name,
              // No password for OAuth users
            });
            console.log(`User Created via OAuth!`);
          }
          return true;
        } catch (error) {
          console.error("Error saving user", error);
          return false;
        }
      }
      return true;
    },
  },
});
