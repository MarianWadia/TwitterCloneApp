import serverAuth from "@/libs/serverAuth";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "GET") {
        return res.status(405).end();
    }

    try {
        const currentUser = await serverAuth(req, res);
        console.log(currentUser);
        return res.status(200).json(currentUser);
    } catch (error) {
        console.error(error);  // Log the error for debugging purposes
        return res.status(401).json({ error: "Not authenticated" });
    }
}
