import { useCallback, useMemo } from "react"
import useCurrentUser from "./useCurrentUser"
import useLoginModal from "./useLoginModal"
import usePost from "./usePost"
import axios from "axios"
import usePosts from "./usePosts"
import toast from "react-hot-toast"

const useLike = ({ postId, userId } : { postId: string, userId?: string }) => {
    const { data: currentUser } = useCurrentUser()
    console.log('postId', postId)
    const { data:fetchedPost, mutate: mutateFetchedPost } = usePost(postId as string)
    console.log('fetchedPost', fetchedPost)
    const { mutate: mutatePosts } = usePosts(userId)
    const loginModal = useLoginModal()

    const isLiked = useMemo(()=>{
        const listOfLikedIds = fetchedPost?.likedIds;
        console.log('listOfLikedIds', listOfLikedIds)
        return listOfLikedIds?.includes(currentUser?.id);
    },[fetchedPost?.likedIds, currentUser?.id])

    const toggleLike = useCallback(async()=>{
        if(!currentUser){
           return loginModal.onOpen()
        }

       try {
            let request

            if(isLiked){
                request = () => axios.delete('/api/like', {data: { postId }})
            }else{
                request = () => axios.post('/api/like', { postId })
            }
            await request()

            mutateFetchedPost()
            mutatePosts()
            toast.success('Success')
       } catch (error) {
        console.log(error)
        toast.error('an error occurred')
       }
    },[currentUser, isLiked, loginModal, mutateFetchedPost, mutatePosts, postId])

    return {
        isLiked,
        toggleLike
    }
}

export default useLike;