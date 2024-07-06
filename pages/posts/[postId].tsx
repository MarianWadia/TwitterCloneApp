import Form from '@/components/Form'
import Header from '@/components/Header'
import PostItem from '@/components/posts/PostItem'
import usePost from '@/hooks/usePost'
import { useRouter } from 'next/router'
import React from 'react'
import { ClipLoader } from 'react-spinners'

export default function PostView() {
    const router = useRouter()
    const { postId } = router.query
    const {data: fetchedPost, isLoading} = usePost(postId as string)
    console.log('fetchedPost', fetchedPost)
    if(isLoading){
        return (
            <div className='h-full flex items-center justify-center'>
                <ClipLoader color='lightblue' size={60} />
            </div>
        )
    }
  return (
    <>
        <Header label='Tweet' showBackArrow />
        <PostItem data={fetchedPost?.length && fetchedPost[0]} userId={fetchedPost?.length && fetchedPost[0]?.user?.id} />
        <Form placeholder='Tweet your reply' isComment postId={postId as string} />
    </>
  )
}
