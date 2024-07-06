import React from 'react'
import CommentItem from './CommentItem'


type commentsProps = {
    comments?: Record<string, any>[]
}

const CommentsFeed = ({ comments }: commentsProps) => {
  console.log('comments', comments)
  return (
    <>
    {comments?.map(comment =>(
      <CommentItem data={comment} key={comment.id} />
    ))}
    </>
  )
}

export default CommentsFeed