import React from 'react'
import {BiLogOut} from 'react-icons/bi'
import {BsHouseFill, BsBellFill} from "react-icons/bs"
import {FaUser} from "react-icons/fa"
import SideBarLogo from './SideBarLogo'
import SideBarItem from './SideBarItem'
import SideBarTweetButton from './SideBarTweetButton'
import useCurrentUser from '@/hooks/useCurrentUser'
import { signOut } from 'next-auth/react'

// const items = [
//     {
//         label: "Home", 
//         href: "/",
//         icon: BsHouseFill
//     }, 
//     {
//         label: "Notifications", 
//         href: "/notifications",
//         icon: BsBellFill,
//         isProtected: true,
//         alert: true

//     },
//     {
//         label: "Profile", 
//         href: "/users/123",
//         icon: FaUser,
//         isProtected: true
//     }
// ]

const SideBar = () => {
    const {data: currentUser} = useCurrentUser();
    console.log(currentUser);

    
const items = [
    {
        label: "Home", 
        href: "/",
        icon: BsHouseFill
    }, 
    {
        label: "Notifications", 
        href: "/notifications",
        icon: BsBellFill,
        isProtected: true,
        alert: currentUser?.hasNotifications,

    },
    {
        label: "Profile", 
        href: `/users/${currentUser?.id}`,
        icon: FaUser,
        isProtected: true
    }
]

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
                        isProtected={item.isProtected}
                        alert={item.alert}
                    />
                ))}
                {/* another sidebar item component separate from those of iteration */}
                {currentUser && (
                    <>
                        <SideBarItem onClick={()=>{signOut()}} label='Logout' icon={BiLogOut}/>
                        {/* <SideBarItem label='Profile' icon={FaUser} href='/users/123' /> */}
                    </>
                )}
                <SideBarTweetButton />
            </div>
        </div>
    </div>
  )
}

export default SideBar