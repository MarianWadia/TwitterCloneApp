import fetcher from "@/libs/fetcher"
import useSWR from "swr"

const usePost = (postId: string) => { 
    const { 
        data, 
        mutate, 
        isLoading, 
        error 
    } = useSWR(postId ? `/api/posts/${postId}` : null , fetcher)

    return{
        data, 
        mutate, 
        isLoading,
        error
    }
}

export default usePost