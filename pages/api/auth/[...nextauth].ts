import NextAuth from "next-auth"
import CredentialsProvider from 'next-auth/providers/credentials';
import { rootConfig } from "../../../rootConfig";

export default NextAuth({
  pages: {
    signIn: "/signin"
  },
  secret: rootConfig.SECRET,
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        username: { label: "Login", type: "text" },
        password: {  label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (credentials?.password === rootConfig.SECRET) {
          return {
            ...credentials,
            password: null
          }
        }
  
        return null
      }
    })
  ],
})