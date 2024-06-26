import useCurrentUser from '@/hooks/useCurrentUser';
import useUser from '@/hooks/useUser';
import { format } from 'date-fns';
import React, { useId, useMemo } from 'react'
import Button from '../Button';
import { BiCalendar } from 'react-icons/bi';
import useEditModal from '@/hooks/useEditModal';
import useFollow from '@/hooks/useFollow';

interface BioProps{
    userId: string;
}

const UserBio : React.FC<BioProps> = ({
    userId
}) => {
    const { data: currentUser } = useCurrentUser()
    const { data: fetchedUser } = useUser(userId)
    const editModal = useEditModal()
    const {isFollowing, toggleFollow} = useFollow(userId)

    const createdAt = useMemo(()=>{
        if(!fetchedUser?.createdAt){
            return null
        }
        return format(new Date(fetchedUser?.createdAt), 'MMMM yyyy')
    },[fetchedUser?.createdAt])
  return (
    <div className='border-b-[1px] border-neutral-800 pb-4'>
        <div className='flex justify-end p-2'>
            {currentUser?.id === fetchedUser?.id ? 
                (<Button secondary label='Edit' onClick={editModal.onOpen}/>) 
                : 
                (<Button 
                    secondary={!isFollowing} 
                    label={isFollowing ? 'Unfollow': 'Follow'} 
                    onClick={toggleFollow}
                    outline={isFollowing}
                />
                )}
        </div>

        <div className='mt-2 px-4'>
            <div className='flex flex-col'>
                <p className='text-white font-semibold text-2xl'>{fetchedUser?.name}</p>
                <p className='text-neutral-400 text-md'>@{fetchedUser?.Username}</p>
            </div>
            <div className='flex flex-col mt-4'>
                <p className='text-white'>{fetchedUser?.bio}</p>
                <div className='flex flex-row gap-2 text-neutral-500 items-center mt-4'>
                    <BiCalendar size={24} />
                    <p>Joined {createdAt}</p>
                </div>
            </div>
            <div className='flex flex-row items-center gap-5 mt-4'>
                <div className='flex flex-row items-center gap-1 text-white'>
                    <p>{fetchedUser?.followingIds.length}</p>
                    <p className='text-neutral-500'>Following</p>
                </div>
                <div className='flex flex-row items-center gap-1 text-white'>
                    <p>{fetchedUser?.followersCount || 0}</p>
                    <p className='text-neutral-500'>Followers</p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default UserBio