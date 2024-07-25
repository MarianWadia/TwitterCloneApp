import useCurrentUser from '@/hooks/useCurrentUser'
import useNotifications from '@/hooks/useNotifications'
import React, { useEffect } from 'react'
import { BsTwitter } from 'react-icons/bs'

export default function NotificationsFeed() {
    const {data: currentUser, mutate: mutateCurrentUser} = useCurrentUser()
    const {data: fetchedNotifications = []} = useNotifications(currentUser?.id)

    useEffect(()=>{
        mutateCurrentUser()
    },[mutateCurrentUser])

    if(fetchedNotifications.length === 0){
        return(
            <div className='text-neutral-600 text-center p-6 text-xl'>No notifications</div>
        )
    }
  return (
    <div className='flex flex-col'>
        {fetchedNotifications.map((item:Record<string, any>)=>(
            <div className='flex flex-row gap-3 items-center text-white p-6 border-b-[1px] border-neutral-800' key={item.id}>
                <BsTwitter size={30} color='white' />
                <p>{item.body}</p>
            </div>
        ))}
    </div>
  )
}
