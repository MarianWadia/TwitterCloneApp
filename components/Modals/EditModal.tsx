import useCurrentUser from '@/hooks/useCurrentUser'
import useEditModal from '@/hooks/useEditModal'
import useUser from '@/hooks/useUser'
import axios from 'axios'
import React, { useCallback, useState } from 'react'
import toast from 'react-hot-toast'
import Modal from '../Modal'
import Input from '../Input'

const EditModal = () => {
  const { data: currentUser } = useCurrentUser()
  const { mutate: mutateFetchedUser } = useUser(currentUser?.id)
  const editModal = useEditModal()

  const [name, setName] = useState(currentUser?.name)
  const [username, setUsername] = useState(currentUser?.Username)
  const [bio, setBio] = useState(currentUser?.bio)
  const [coverImage, setCoverImage] = useState(currentUser?.coverImage)
  const [profileImage, setProfileImage] = useState(currentUser?.profileImage)
  const [isLoading, setIsLoading] = useState(false)

  const onSubmit = useCallback(async ()=>{
    try {
      setIsLoading(true)
      await axios.patch('/api/edit', {
        name,
        username,
        bio,
        coverImage,
        profileImage
      })
      mutateFetchedUser()
      toast.success('user updated successfully')
      editModal.onClose()
    } catch (error) {
      toast.error('something went wrong')
    }finally{
      setIsLoading(false)
    }
  },[name, bio, coverImage, profileImage, username, mutateFetchedUser, editModal])

  const modalBody = (
    <div className='flex flex-col gap-4'>
      <Input 
        disabled={isLoading} 
        value={name} 
        placeholder='Edit your name' 
        onChange={(e)=>setName(e.target.value)} 
        type='text'
      />
      <Input 
        disabled={isLoading} 
        value={username} 
        placeholder='Edit your username' 
        onChange={(e)=>setUsername(e.target.value)} 
        type='text'
      />
      <Input 
        disabled={isLoading} 
        value={bio} 
        placeholder='Edit your bio' 
        onChange={(e)=>setBio(e.target.value)} 
        type='text'
      />
    </div>
  ) 

  return (
    <Modal 
      disabled={isLoading}
      actionLabel='save changes'
      title='Edit your profile'
      isOpen={editModal.isOpen}
      onClose={editModal.onClose}
      onSubmit={onSubmit}
      body={modalBody}
    />
  )
}

export default EditModal