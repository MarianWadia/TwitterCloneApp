import { useRouter } from 'next/router'
import React from 'react'
import { FaFeather } from 'react-icons/fa'

const SideBarTweetButton = () => {
    const router = useRouter()
  return (
    <div onClick={()=>router.push('/')}>
        {/* // **Mobile Style** */}
        <div className='relative rounded-full w-14 h-10 flex items-center justify-center p-4 mr-1 bg-sky-500 
          hover:bg-opacity-80 cursor-pointer lg:hidden transition'
        >
            <FaFeather size={20} color='white'/>
        </div>

        {/* // **Desktop style** */}
        <div className='hidden lg:flex bg-sky-500 cursor-pointer 
            justify-center items-center rounded-full px-4 py-2 hover:bg-opacity-90 transition gap-3'
        >
            <p className='hidden lg:block text-white text-[15px] font-semibold'>Tweet</p>
        </div>
    </div> 
  )
}

export default SideBarTweetButton