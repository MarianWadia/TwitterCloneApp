import useCurrentUser from '@/hooks/useCurrentUser';
import useLoginModal from '@/hooks/useLoginModal';
import { formatDistanceToNowStrict } from 'date-fns';
import { useRouter } from 'next/router';
import React, { useCallback, useMemo } from 'react'
import Avatar from '../Avatar';
import { AiFillHeart, AiOutlineHeart, AiOutlineMessage } from 'react-icons/ai';
import useLike from '@/hooks/useLike';

interface PostItemProps {
    userId?: string;
    data: Record<string, any>;
}

const PostItem: React.FC<PostItemProps> = ({userId, data}) => {
    const loginModal = useLoginModal()
    const {data: currentUser} = useCurrentUser()
    // console.log('userId', userId)
    const {isLiked, toggleLike} = useLike({postId: data?.id, userId})
    const router = useRouter()
    console.log('data', data)

    const goToUser = useCallback((event: any)=>{
        event.stopPropagation()
        router.push(`/users/${data?.user?.id}`)
    },[router, data?.user?.id])

    const goToPost = useCallback(()=>{
        router.push(`/posts/${data?.id}`)
    },[router, data?.id])

    // const likeIcon = isLiked ? AiFillHeart : AiOutlineHeart 

    const onLike = useCallback((event: any)=>{
        event.stopPropagation();
        // loginModal.onOpen()
        console.log('isLiked', isLiked)
        toggleLike()
        console.log('isLiked', isLiked)
    },[toggleLike])

    const createdAt = useMemo(()=>{
        if(!data?.createdAt){
            return null
        }
        return formatDistanceToNowStrict(new Date(data?.createdAt))
    },[data?.createdAt]) 

  return (
    <div className='border-b-[1px] border-neutral-800 p-5 hover:bg-neutral-900 cursor-pointer' onClick={goToPost}>
        <div className='flex flex-row items-start gap-4'>
            <Avatar userId={data?.user?.id} />
            <div className='flex flex-col'>
                <div className='flex flex-row gap-2 items-center'>
                    <p
                        className='hover:underline text-white font-semibold cursor-pointer'
                    >{data?.user?.name}</p>
                    <p onClick={goToUser} className='text-neutral-500 text-sm cursor-pointer hover:underline hidden md:block'>@{data?.user?.Username}</p>
                    <span className='text-neutral-500 text-sm'>{createdAt}</span>
                </div>
                <p className='text-white text-sm mt-1'>{data?.body}</p>
                <div className='flex flex-row items-center gap-10 mt-2'>
                   <div 
                        className='flex flex-row items-center gap-1 text-neutral-500 cursor-pointer transition hover:text-sky-500'
                        onClick={()=>router.push(`/posts/${data?.id}`)}
                    >
                        <AiOutlineMessage  size={20} />
                        <span>{data?.comments?.length || 0}</span>
                   </div>
                    <div 
                        className='flex flex-row items-center gap-1 text-neutral-500 cursor-pointer transition hover:text-red-500'
                        onClick={onLike}
                    >
                        {isLiked ? (<AiFillHeart size={20} color='red' />) : (<AiOutlineHeart size={20} />)}
                        <span>{data?.likedIds?.length || 0}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default PostItem