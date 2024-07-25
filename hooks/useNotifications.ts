import fetcher from "@/libs/fetcher"
import useSWR from "swr"

const useNotifications = (userId?:string) => {
    const url = userId ? `/api/notifications/${userId}` : null
    const {isLoading, data, mutate, error} = useSWR(url, fetcher)
    return{
        isLoading,
        data,
        mutate,
        error
    }
}

export default useNotifications