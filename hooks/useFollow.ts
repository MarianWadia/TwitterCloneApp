import { useCallback, useMemo } from "react"
import useCurrentUser from "./useCurrentUser"
import useLoginModal from "./useLoginModal"
import useUser from "./useUser"
import toast from "react-hot-toast"
import axios from "axios"

const useFollow = (userId: string) =>{
    const { data: currentUser, mutate: mutateCurrentUser } = useCurrentUser()
    const { data: user, mutate: mutateUser } = useUser(userId)
    const loginModal = useLoginModal()

    const isFollowing = useMemo(()=>{
        const listOfFollowingIds = currentUser?.followingIds || [];
        return listOfFollowingIds.includes(userId)
    },[currentUser?.followingIds, userId])

    const toggleFollow = useCallback(async () => {
        if(!currentUser) return loginModal.onOpen()
        try {
            let request;
            if(isFollowing){
                request = () => axios.delete('/api/follow', { data: { userId }})
            }else{
                request = () => axios.post('/api/follow', { userId })
            }
            await request()

            // By calling mutate, you typically trigger a re-fetch of the data from the server.
            mutateCurrentUser()
            mutateUser()

            toast.success('Success')
        } catch (error) {
            toast.error('Something went wrong')
        }
    },[userId, isFollowing, mutateCurrentUser, mutateUser, loginModal, currentUser])

    return {
        toggleFollow,
        isFollowing
    }
}

export default useFollow;