import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/libs/prismadb";
import { getSession } from "next-auth/react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

const serverAuth = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const session = await getServerSession(req, res, authOptions);

        console.log("Session:", session);

        if (!session) {
            throw new Error("No session found");
        }

        if (!session.user || !session.user.email) {
            throw new Error("Not signed in - user email not found in session");
        }

        const currentUser = await prisma.user.findUnique({
            where: {
                email: session.user.email,
            },
        });

        if (!currentUser) {
            throw new Error("User not found");  // Customize the error message as needed
        }

        return { ...currentUser };
    } catch (error) {
        console.error("Authentication error: user not signed in")

    }
};

export default serverAuth;
