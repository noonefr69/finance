import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import User from "./app/(auth)/sign-up/models/userSchema";
import dbConnect from "./lib/db";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    GitHub,
    // Credentials({
    //   credentials: {
    //     email: {},
    //     password: {},
    //   },
    //   authorize: async (credentials) => {
    //     let user = null;

    //     // logic to salt and hash password
    //     const hashedPassword = await bcrypt.hash(credentials.password, 10);

    //     await dbConnect();

    //     // logic to verify if the user exists
    //     user = await User.findOne(
    //       // credentials.name,
    //       credentials.email,
    //       hashedPassword
    //     );

    //     if (!user) {
    //       // No user found, so this is their first attempt to login
    //       // Optionally, this is also the place you could do a user registration
    //       throw new Error("Invalid credentials.");
    //     }

    //     // return user object with their profile data
    //     return user;
    //   },
    // }),
  ],
  callbacks: {
    async signIn({ user }) {
      try {
        await dbConnect();

        const existingUser = await User.findOne({ email: user.email });

        if (!existingUser) {
          await User.create({
            email: user.email,
            name: user.name,
          });
          console.log(`User Created!`);
        } else {
          console.log("User Already Exist");
        }

        return true;
      } catch (error) {
        console.error(error);
        return false;
      }
    },
  },
});
