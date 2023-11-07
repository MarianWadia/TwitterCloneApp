import React from 'react'
import {BiLogOut} from 'react-icons/bi'
import {BsHouseFill, BsBellFill} from "react-icons/bs"
import {FaUser} from "react-icons/fa"
import SideBarLogo from './SideBarLogo'
import SideBarItem from './SideBarItem'
import SideBarTweetButton from './SideBarTweetButton'

const items = [
    {
        label: "Home", 
        href: "/",
        icon: BsHouseFill
    }, 
    {
        label: "Notifications", 
        href: "/notifications",
        icon: BsBellFill
    },
    {
        label: "Profile", 
        href: "/users/123",
        icon: FaUser
    }
]

const SideBar = () => {
  return (
    <div className='col-span-1 h-full md:pr-6'>
        <div className='flex flex-col items-end'>
            <div className='space-y-2 lg:w-[230px]'>
                <SideBarLogo />
                {items.map((item)=>(
                    <SideBarItem
                        key={item.href}
                        href={item.href}
                        label={item.label}
                        icon={item.icon}
                    />
                ))}
                {/* another sidebar item component separate from those of iteration */}
                <SideBarItem onClick={()=>{}} label='Logout' icon={BiLogOut}/>
                <SideBarTweetButton />
            </div>
        </div>
    </div>
  )
}

export default SideBar