import NextAuth, { type NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"

import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { env } from "../../../env/server.mjs"
import { prisma } from "../../../server/db/client"

export const authOptions: NextAuthOptions = {
  callbacks: {
    async session({ session, token }) {
      if (token.sub && session.user) {
        session.user.id = token.sub.toString()
      }

      return session
    },
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role
      }

      return token
    },
  },
  adapter: PrismaAdapter(prisma),
  providers: [
    GithubProvider({
      clientId: env.GITHUB_CLIENT_ID,
      clientSecret: env.GITHUB_CLIENT_SECRET,
    }),
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: "Credentials",

      credentials: {
        username: {
          label: "Email Address",
          type: "text",
          placeholder: "Email Address",
        },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials, req) {
        const user = prisma.user.findFirst({
          where: {
            email: "demo@example.com",
          },
          select: {
            id: true,
            email: true,
            name: true,
            image: true,
            role: true,
          },
        })

        if (!user) return null

        if (credentials?.password !== "demo123") {
          return null
        }

        return user
      },
    }),
  ],

  secret: env.NEXTAUTH_SECRET,

  session: {
    strategy: "jwt",

    maxAge: 30 * 24 * 60 * 60,
    updateAge: 24 * 60 * 60,
  },
}

export default NextAuth(authOptions)
