import { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import NextAuth from "next-auth/next"


export const nextAuthOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      // change in future use
      id: "credentials",
      name: "Credentials",
      credentials: {
        username: { label: "username", type: "text" },
        password: { label: "password", type: "password" },
      },
      async authorize( credentials, req ) {
        const user = {
          ...credentials,
          id: ""
        }

        if ( !user.password || !user.username ) {
          return Promise.reject(new Error("Authentication failed. Please check your client credentials."))
        }

        const { password, ...restUser } = user
        return restUser
      }
    }),
  ],
  callbacks: {
    jwt: async({ token, user }) => {
      
      if ( user ) {
        token.name = user.name
        token.email = user.email
        token.username = user.username
      }

      return token;
    },
    session: async({ session, token }) => {
      const newSession = {
        ...session,
        user: {
          ...session.user,
          name: token.name,
          email: token.email,
          username: token.username,
        }
      }

      return newSession;
    }
  }
}


export default NextAuth(nextAuthOptions)