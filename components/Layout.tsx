import React from 'react'
import SideBar from './Layout/SideBar';
import FollowBar from "./Layout/FollowBar"

const Layout: React.FC<{ children: React.ReactNode }> = ({children}) => {
  return (
    <div className='h-screen bg-black'>
        <div className='container h-full mx-auto xl:px-30 max-w-6xl'>
            <div className='grid grid-cols-4 h-full'>
              {/* a side bar taking one column */}
                <SideBar />
                {/* this is the main content taking 2 columns in lg screens and 3 columns in small screens*/}
                <div className='col-span-3 lg:col-span-2 border-x-[1px] border-neutral-800'>
                    {children}
                </div>
                {/* a follow bar taking one column but hidden in small screens as the main taking 3 columns in small screens*/}
                <FollowBar />
            </div>
        </div>
    </div>
  )
}

export default Layout