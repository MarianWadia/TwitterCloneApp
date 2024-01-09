import { useRouter } from 'next/router';
import React, { useCallback } from 'react'
import { IconType } from 'react-icons/lib';


interface SideBarItemProps {
    href?: string;
    label: string;
    icon: IconType;
    onClick?: () => void;
}

const SideBarItem: React.FC<SideBarItemProps> = ({
    label, 
    href,
    icon: Icon,
    onClick 

}) => {
  const router = useRouter()
  const handleClick = useCallback(()=>{
    if(onClick){
      return onClick()
    }
    if(href) {
      router.push(href)
    }
  },[router, href, onClick])
  return (
    <div onClick={handleClick} className='flex flex-row items-center'>
      {/* Mobile first styles */}
        <div className='relative rounded-full w-14 h-14 flex items-center justify-center p-4 hover:bg-slate-300 
          hover:bg-opacity-10 cursor-pointer lg:hidden'>
            <Icon size={20} color='white'/>
        </div>
        
      {/* large screens styles */}
        <div className='relative hidden lg:flex flex-row gap-4 rounded-full items-center p-4 hover:bg-slate-300 
          hover:bg-opacity-10 cursor-pointer'>
            <Icon size={20} color='white'/>
            <p className='hidden lg:block text-white text-l'>{label}</p>
        </div>
    </div>

  )
}

export default SideBarItem