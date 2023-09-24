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
                    const response = await axios.post('http://localhost:3000/api/auth/login', credentials)
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