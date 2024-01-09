
import useLoginModal from '@/hooks/useLoginModal'
import React, { useCallback, useState } from 'react'
import Input from '../Input';
import Modal from '../Modal';
import useRegisterModal from '@/hooks/useRegisterModal';
import { signIn } from 'next-auth/react';



const LoginModal = () => {
    const {onClose, onOpen, isOpen} = useLoginModal(); 
    const registerModal = useRegisterModal()
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);


    const toggleModals = useCallback(()=>{
        if(isLoading) return;
        onClose();
        registerModal.onOpen();

    }, [isLoading, onClose, registerModal])

    const onSubmit = useCallback(async () => {
        try {
            setIsLoading(true);
            // TODO: adding the actual functionality of signing the user in
            signIn('credentials', {
                email,
                password
            })
            console.log('signed in successfully')
            onClose();
        } catch (error) {
            console.error('error signing user in', error);
        }finally{
            // setLoading to false regardless success or failure
            setIsLoading(false);
        }
        
    }, [onClose, email, password])

    /* The Body of the Modal as we will return the Modal Component at the bottom which will take the 
    BodyContent Component as a value for the body */

    const BodyContent = (
        <div className='flex flex-col gap-5'>
            <Input 
                onChange={(e)=>setEmail(e.target.value)} 
                placeholder='Email'
                value={email}
                disabled={isLoading}  //* If isLoading is true so the input will be disabled
            />
            <Input 
                onChange={(e)=>setPassword(e.target.value)} 
                placeholder='password'
                value={password}
                disabled={isLoading}
            />
        </div>
    )

    const FooterContent = (
        <div className='text-neutral-400 mt-4 flex flex-row gap-1 justify-center'>
            <p>First time using Twitter?</p>  
            <span className='text-white cursor-pointer hover:underline font-semibold' onClick={toggleModals}>Create an account</span>
        </div>
    )

  return (
    <Modal 
        isOpen={isOpen} 
        onClose={onClose} 
        onSubmit={onSubmit}
        title='Login'
        body={BodyContent}
        footer={FooterContent}
        actionLabel='Sign in'
    />
  )
}

export default LoginModal