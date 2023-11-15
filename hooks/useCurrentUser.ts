import fetcher from "@/libs/fetcher";
import useSWR from "swr";

const useCurrentUser = () =>{
    //* useSWR is going to fetch the data from /api/currentUser using the axios we created in fetcher
    //* and store it in its global store
    const {data, isLoading, mutate, error} = useSWR('/api/currentUser', fetcher);

    return {
        data, 
        isLoading, 
        mutate, 
        error
    }
}

export default useCurrentUser;