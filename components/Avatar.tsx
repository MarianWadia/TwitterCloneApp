import useUser from '@/hooks/useUser';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useCallback } from 'react'

interface AvatarProps{
    userId: string;
    hasBorder?: boolean;
    isLarge?: boolean;
}

const Avatar : React.FC<AvatarProps> = ({
    userId,
    hasBorder,
    isLarge
}) => {
    const router = useRouter()
    console.log(userId)
    const {data: fetchedUser} = useUser(userId) 

   const onClick = useCallback((event:any)=>{
        event.stopPropagation();
        const href = `/users/${userId}`
        router.push(href)
   },[router, userId])
   
  return (
    <div className={`
        ${isLarge? 'h-32': 'h-12'}
        ${isLarge? 'w-32': 'w-12'}
        ${hasBorder ? 'border-4 border-black' : ''}
        rounded-full cursor-pointer hover:opacity-90 transition relative
    `}>
        <Image 
            fill 
            alt='Avatar' 
            style={{objectFit: 'cover', borderRadius: '100%'}} 
            src={fetchedUser?.profileImage || '/images/placeholder.png' } 
            onClick={onClick}
        />
    </div>
  )
}

export default Avatar