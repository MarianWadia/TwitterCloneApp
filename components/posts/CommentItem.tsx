import { formatDistanceToNow } from 'date-fns';
import { useRouter } from 'next/router';
import React, { useCallback, useMemo } from 'react'
import Avatar from '../Avatar';

type commentItemProps = { 
    data: Record<string,any>;
}

const CommentItem = ({data}: commentItemProps) => {
    const router = useRouter()

    const goToUser = useCallback((event: any)=>{
        event.stopPropagation()
        router.push(`/users/${data?.user?.id}`)
    },[data?.user?.id, router])

    const createdAt = useMemo(()=>{
        if(!data?.createdAt){
            return null
        }else{
            return formatDistanceToNow(new Date(data?.createdAt))
        }
    },[data?.createdAt])

  return (
    <div className='border-b-[1px] border-neutral-800 p-5 hover:bg-neutral-900 cursor-pointer transition'>
        <div className='flex flex-row gap-3'>
            <Avatar userId={data?.user?.id} />
            <div className='flex flex-col'>
                <div className='flex flex-row gap-2 items-center'>
                    <p onClick={goToUser} className='text-white text-lg font-medium hover:underline cursor-pointer'>
                        {data?.user?.name}
                    </p>
                    <p className='text-sm text-neutral-500 cursor-pointer hidden hover:underline md:block'>@{data?.user?.Username}</p>
                    <p className='text-neutral-500 text-sm'>{createdAt}</p>
                </div>
                <p className='text-white mt-1'>{data?.body}</p>
            </div>
        </div>
    </div>
  )
}

export default CommentItem