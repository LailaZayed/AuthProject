import {NextAuthOptions} from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials"

export const authOptions: NextAuthOptions = {
    providers: [
     CredentialsProvider({
    name: 'Credentials',

    credentials: {
      username: { label: "Email", type: "email", placeholder: "ex) something@gmail.com" },
      password: { label: "Password", type: "password", placeholder: "Please Enter your Password"}
    },
    async authorize(credentials, req) {
      const res = await fetch("/your/endpoint", {
        method: 'POST',
        body: JSON.stringify(credentials),
        headers: { "Content-Type": "application/json" }
      })
      const user = await res.json()
      if (res.ok && user) {
        return user
      }

      return null
    }
  })
]

    

}



