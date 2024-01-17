import useUser from '@/hooks/useUser'
import Image from 'next/image'
import React from 'react'
import Avatar from '../Avatar'

interface HeroProps{
    userId: string
}

const UserHero : React.FC<HeroProps> = ({
    userId
}) => {
    const { data: fetchedUser} = useUser(userId)
  return (
    <div>
        <div className='bg-neutral-700 h-44 relative'>
            {fetchedUser?.coverImage && 
                <Image 
                    fill 
                    style={{objectFit: 'cover'}} 
                    src={fetchedUser?.coverImage} 
                    alt='coverImage' 
                />
            }

            <div className='absolute -bottom-6 left-4'>
                <Avatar userId={userId} hasBorder isLarge />
            </div>
        </div>
    </div>
  )
}

export default UserHero