import useCurrentUser from '@/hooks/useCurrentUser';
import useLoginModal from '@/hooks/useLoginModal';
import { useRouter } from 'next/router';
import React, { useCallback } from 'react'
import { IconType } from 'react-icons/lib';
import { BsDot } from 'react-icons/bs'


interface SideBarItemProps {
    href?: string;
    label: string;
    icon: IconType;
    onClick?: () => void;
    isProtected?: boolean;
    alert?: boolean;
}

const SideBarItem: React.FC<SideBarItemProps> = ({
    label, 
    href,
    icon: Icon,
    onClick,
    isProtected,
    alert
}) => {
  const {data: currentUser} = useCurrentUser()
  const loginModal = useLoginModal()
  const router = useRouter()
  const handleClick = useCallback(()=>{
    if(onClick){
      return onClick()
    }
    if(isProtected && !currentUser){
      loginModal.onOpen()
    }else if(href) {
      router.push(href)
    }
  },[router, href, onClick, isProtected, loginModal, currentUser])
  return (
    <div onClick={handleClick} className='flex flex-row items-center'>
      {/* Mobile first styles */}
        <div className='relative rounded-full w-14 h-14 flex items-center justify-center p-4 hover:bg-slate-300 
          hover:bg-opacity-10 cursor-pointer lg:hidden'>
            <Icon size={20} color='white'/>
            {alert ? <BsDot size={50} className='text-sky-500 absolute -top-1 left-2' /> : null}
        </div>
        
      {/* large screens styles */}
        <div className='relative hidden lg:flex flex-row gap-4 rounded-full items-center p-4 hover:bg-slate-300 
          hover:bg-opacity-10 cursor-pointer'>
            <Icon size={20} color='white'/>
            {alert ? <BsDot size={40} className='text-sky-500 absolute -top-0 left-3' /> : null}
            <p className='hidden lg:block text-white text-l'>{label}</p>
        </div>
    </div>
  )
}

export default SideBarItem