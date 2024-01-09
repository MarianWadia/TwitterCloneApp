import { useEffect } from 'react';
import fetcher from '@/libs/fetcher';
import useSWR from 'swr';

const useCurrentUser = () => {
  const { data, isLoading, mutate, error } = useSWR('/api/currentUser', fetcher);

  return {
    data,
    isLoading,
    mutate,
    error,
  };
};

export default useCurrentUser;
