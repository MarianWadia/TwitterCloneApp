import useUsers from '@/hooks/useUsers'
import React from 'react'
import Avatar from '../Avatar'

const FollowBar = () => {
  const { data: users = [] } = useUsers()
  if(users.length === 0) return null

  return (
    <div className='px-6 py-4 hidden lg:block'>
      <div className='bg-neutral-800 p-4 rounded-xl'>
        <h2 className='text-l font-semibold text-white'>Who to follow</h2>

        <div className='bg-neutral flex flex-col mt-4'>
          {users.map((user:Record<string, any>) =>(
            <div key={user.id} className='flex flex-row gap-6 mb-5 items-center'>
              <Avatar userId={user.id} />
              <div className='flex flex-col lowercase'>
                <p className='font-semibold text-white text-sm' >{user.name}</p>
                <p className='text-sm text-neutral-400'>@{user.Username}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default FollowBar