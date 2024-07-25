import serverAuth from "@/libs/serverAuth";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/libs/prismadb";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if(req.method !== 'GET' && req.method !== 'POST'){
        return res.status(405).end()
    }
    try {
        const { postId } = req.query
        const currentUser = await serverAuth(req, res)
        if(!postId || typeof postId !== 'string'){
            throw new Error('Invalid postID')
        }
        if(req.method === 'POST'){
            const { body } = req.body;
            const comment = await prisma.comment.create({
                data: {
                    body: body as string,
                    postId,
                    userId: currentUser?.id as string
                }
            })
            try {
                const post = await prisma.post.findUnique({
                    where: {
                        id: postId,
                    },
                    include:{
                        user: true
                    }
                })
                if(post?.userId === currentUser?.id){
                    await prisma.notification.create({
                        data: {
                            body: `${currentUser?.name}, you have commented to your post`,
                            userId: currentUser?.id as string
                        }
                    })
    
                    await prisma.user.update({
                        where:{
                            id: currentUser?.id,
                        },
                        data: {
                            hasNotifications: true
                        }
                    })
                }else if(post?.userId){
                    await prisma.notification.create({
                        data: {
                            body: `${post.user?.name}, ${currentUser?.name} has commented to your post`,
                            userId: post.userId
                        }
                    })
    
                    await prisma.user.update({
                        where:{
                            id: post.userId,
                        },
                        data: {
                            hasNotifications: true
                        }
                    })
                }    
            } catch (error) {
                console.log(error);
            } 
            return res.status(200).json(comment)
        }
        if(req.method === 'GET'){
            const postComments = await prisma.comment.findMany({
                where: {
                    postId
                },
                include: {
                    user: true,
                }
            })
            return res.status(200).json(postComments)
        }
    } catch (error) {
        console.log(error)
        return res.status(400).end()        
    }

}