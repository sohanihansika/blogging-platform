import NextAuth, { NextAuthOptions } from "next-auth";
import User from "@/models/user";
import { connectToDatabase } from "@/lib/mongodb";
import bcrypt from "bcryptjs";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import Github from "next-auth/providers/github";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
    maxAge: 60 * 60,
    updateAge: 15 * 60,
  },
  // jwt: {
  //   maxAge: 1 * 60,

  // },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    Github({
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    }),

    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        try {
          await connectToDatabase();
          const user = await User.findOne({ email: credentials?.email });
          if (!user) {
            throw new Error("No user found with the email address");
          }
          const isValidPassword = await bcrypt.compare(
            credentials?.password ?? "",
            user.password as string
          );
          if (!isValidPassword) {
            throw new Error("Invalid password");
          }
          return {
            id: user._id.toString(),
            name: user.name,
            email: user.email,
          };
        } catch (error) {
          console.error("Error authorizing user:", error);
          throw new Error("Authorization failed");
        }
      },
    }),
  ],
  callbacks: {
    async signIn({ account, profile }) {
      if (account?.provider === "google" || account?.provider === "github") {
        await connectToDatabase();
        const existingUser = await User.findOne({ email: profile?.email });
        if (!existingUser) {
          await User.create({
            name: profile?.name,
            email: profile?.email,
          });
        }
      }
      return true;
    },

    async jwt({ token, user }) {
      await connectToDatabase();
      const dbUser = await User.findOne({ email: token.email });

      if (dbUser) {
        token.id = dbUser._id.toString();
        token.name = dbUser.name;
        token.email = dbUser.email;
        token.picture = dbUser.image;
      }
      if (token?.iat && token?.exp) {
        const issuedAt = new Date(Number(token.iat) * 1000).toLocaleString();
        const expiresAt = new Date(Number(token.exp) * 1000).toLocaleString();
        console.log(`Token issued at: ${issuedAt}`);
        console.log(`Token expires at: ${expiresAt}`);
      }

      return token;
    },

    async session({ session, token }) {
      if (session.user && token) {
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.image = token.picture ?? null;
      }

      return session;
    },
  },
  pages: {
    signIn: "/signin",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
