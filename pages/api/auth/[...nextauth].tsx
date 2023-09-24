import NextAuth from 'next-auth'
import CredentialsProvider from "next-auth/providers/credentials";
import axios from 'axios'

export default NextAuth({
    providers: [
        CredentialsProvider({
            credentials: {
                username: { label: "username", type: "text" },
                password: { label: "password", type: "password" },
            },
            async authorize(credentials) {
                try {
                    const apiUrl = process.env.NEXT_PUBLIC_API_URL

                    const response = await axios.post(apiUrl!, credentials)
                    const user = response.data.user

                    if (user) {
                        return Promise.resolve(user)
                    } else {
                        return Promise.resolve(null)
                    }
                } catch (error) {
                    console.log(error)
                    throw new Error('E-mail ou senha incorretos')
                }
            },
        }),
    ],
    callbacks: {
        async session({ session, user }) {
            if (user) {
                session.user = {
                    ...session.user,
                    name: user.name,
                };
            }
            return session;
        },
    },
});