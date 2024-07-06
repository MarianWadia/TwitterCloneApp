import usePosts from '@/hooks/usePosts'
import React from 'react'
import PostItem from './PostItem'

interface PostFeedsProps {
    userId?: string,
}
 const PostFeed : React.FC<PostFeedsProps> = ({
    userId
 }) => {
  console.log('userId', userId)
    const {data: posts = []} = usePosts(userId || '')
    console.log('posts', posts)
  return (
    <>
        {posts.map((post : Record<string, any>)=>(
            <PostItem data={post} userId={userId} key={post.id}/>
        ))}
    </>
  )
}


export default PostFeed