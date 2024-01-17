import fetcher from "@/libs/fetcher"
import useSWR from "swr"

const useUser = ( userId: string) =>{
    const {data, mutate, isLoading, error} = useSWR(userId? `/api/users/${userId}`: null , fetcher)
    return { data, mutate, isLoading, error}
}

export default useUser