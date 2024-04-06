import useCurrentUser from '@/hooks/useCurrentUser';
import useLoginModal from '@/hooks/useLoginModal';
import usePosts from '@/hooks/usePosts';
import useRegisterModal from '@/hooks/useRegisterModal';
import axios from 'axios';
import React, { useCallback, useState } from 'react'
import toast from 'react-hot-toast';
import Button from './Button';
import Avatar from './Avatar';

interface FormProps {
    placeholder: string;
    isComment?: boolean;
    postId?: string;
}

const Form :React.FC<FormProps> = ({
    placeholder, 
    isComment, 
    postId
}) => {
    const registerModal = useRegisterModal()
    const loginModal = useLoginModal()
    const { data: currentUser } = useCurrentUser()
    const { mutate: mutatePosts } = usePosts()
    const [body, setBody] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const onSubmit = useCallback(async()=>{
        try {
            setIsLoading(true)
            const post = await axios.post('/api/posts', {body}) 
            toast.success('Tweet Created')
            setBody('')
            mutatePosts()
        } catch (error) {
            toast.error("Something went wrong")
            console.log(error)
        }finally{
            setIsLoading(false)
            setBody('')
        }
    },[body, mutatePosts]) 
  return (
    <div className='border-b-[1px] border-neutral-800 w-full py-4 px-5'>
       {currentUser?(
            <div className='w-full flex flex-row gap-3'>
                <Avatar userId={currentUser?.id} />
               <div className='flex flex-col self-center w-full items-center'>
                    <textarea
                        disabled={isLoading}
                        onChange={(e)=>setBody(e.target.value)}
                        placeholder={placeholder}
                        value={body}
                        className='w-full disabled:opacity-80 resize-none text-white placeholder:text-neutral-500 bg-transparent outline-none border-none ring-0 peer'
                    ></textarea>
                    <hr 
                        className=' h-[1px] opacity-0 w-full border-neutral-500 peer-focus:opacity-100 transition'
                    />
                    <div className='self-end mt-3'>
                        <Button label='Tweet' disabled={isLoading || !body} onClick={onSubmit} />
                    </div>
               </div>
            </div>
       ):
       (<div className='w-full flex items-center flex-col gap-4 justify-center'>
            <h1 className='text-white font-bold text-2xl'>Welcome to Twitter</h1>
            <div className='flex flex-row items-center gap-4'>
                <Button label='Login' onClick={loginModal.onOpen} />
                <Button label='Register' secondary onClick={registerModal.onOpen} />
            </div>
        </div>)}
    </div>
  )
}

export default Form