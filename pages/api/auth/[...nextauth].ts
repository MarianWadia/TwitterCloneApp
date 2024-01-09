import prisma from "@/libs/prismadb";
import NextAuth from "next-auth/next";
import credentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import bcrypt from "bcrypt"
import { AuthOptions } from "next-auth";

export const authOptions : AuthOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        credentialsProvider({
            name: "credentials",
            credentials: {
                email: {label: "email", type: "text", placeholder: "Your email address"},
                password: {label: "password", type: "password", placeholder: "Your password"},
            },
            async authorize(credentials){
                if (!credentials?.email || !credentials?.password) {
                    throw new Error("Invalid credentials");
                }
            
                const user = await prisma.user.findUnique({
                    where: {
                        email: credentials.email
                    }
                });
            
                if (!user || !user.hashedPassword) {
                    throw new Error("Invalid credentials");
                }
            
                const isCorrectPassword = await bcrypt.compare(
                    credentials.password,
                    user.hashedPassword
                );
            
                if (!isCorrectPassword) {
                    throw new Error("Invalid credentials");
                }
            
                return Promise.resolve(user);
            }
        })
    ],
    debug: process.env.NODE_ENV==='development',
    session: {
        strategy: "jwt"
    },
    jwt: {
        secret: process.env.NEXTAUTH_JWT_SECRET
    },
    secret: process.env.NEXTAUTH_SECRET
}

export default NextAuth(authOptions)