import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { authService } from "@/core/infrastructure/AuthService"

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        identifier: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.identifier || !credentials?.password) {
          return null
        }
        try {
          const response = await authService.loginUser({
            identifier: credentials.identifier,
            password: credentials.password,
          })
          const user = response.data.user
          return { ...user, jwt: response.data.jwt }
        } catch (error) {
          return null
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user }
    },
    async session({ session, token }) {
      session.user = token as any
      return session
    }
  },
  pages: {
    signIn: '/auth/login',
  },
})

export { handler as GET, handler as POST }
