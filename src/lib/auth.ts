import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { apiClient } from "./api/client";

interface User {
  id: string;
  username: string;
  email: string;
  token: string;
}

interface Session {
  accessToken?: string;
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) {
          return null;
        }

        try {
          const response = await apiClient.login(
            credentials.username,
            credentials.password
          );

          if (response.token && response.user) {
            return {
              id: response.user.id,
              username: response.user.username,
              email: response.user.email,
              token: response.token,
            } as unknown as User;
          }
          return null;
        } catch (error) {
          console.error("Auth error:", error);
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = (user as User).token;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        (session as Session).accessToken = token.accessToken as string;
      }
      return session;
    },
  },
  pages: {
    signIn: "/admin/login",
  },
};
