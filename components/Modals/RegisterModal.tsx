
import useLoginModal from '@/hooks/useLoginModal'
import React, { useCallback, useState } from 'react'
import Input from '../Input';
import Modal from '../Modal';
import useRegisterModal from '@/hooks/useRegisterModal';
import axios from 'axios';
import toast from 'react-hot-toast';
import { signIn } from 'next-auth/react';



const RegisterModal = () => {
    const loginModal = useLoginModal(); 
    const registerModal = useRegisterModal();
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const toggleModals = useCallback(()=>{
        if(isLoading) return;
        registerModal.onClose();
        loginModal.onOpen();

    }, [isLoading, loginModal, registerModal])

    const onSubmit = useCallback(async () => {
        try {
            setIsLoading(true);
            // TODO: adding the actual functionality of signing the user in and registering the user

            await axios.post('/api/register', {
                username,
                password,
                email,
                name
            })
            toast.success('Account successfully created.');
            signIn('credentials', {
                email,
                password
            })
            console.log('signed in successfully')
            registerModal.onClose();

        } catch (error) {
            console.error('error signing user in', error);
            toast.error('Something went wrong.')
        }finally{
            // setLoading to false regardless success or failure
            setIsLoading(false);
        }
        
    }, [registerModal, email, password, name, username])

    /* The Body of the Modal as we will return the Modal Component at the bottom which will take the 
    BodyContent Component as a value for the body */

    const BodyContent = (
        <div className='flex flex-col gap-3'>
            <Input 
                onChange={(e)=>setEmail(e.target.value)} 
                type='text'
                placeholder='Email'
                value={email}
                disabled={isLoading}  //* If isLoading is true so the input will be disabled
            />
            <Input 
                onChange={(e)=>setName(e.target.value)} 
                type='text'
                placeholder='Name'
                value={name}
                disabled={isLoading}
            />
            <Input 
                onChange={(e)=>setUsername(e.target.value)} 
                type='text'
                placeholder='username'
                value={username}
                disabled={isLoading}
            />  
            <Input 
                onChange={(e)=>setPassword(e.target.value)} 
                type='password'
                placeholder='password'
                value={password}
                disabled={isLoading}
            />
        </div>
    )

    const FooterContent = (
        <div className='text-neutral-400 mt-4 flex flex-row gap-1 justify-center'>
            <p>Already Have an account?</p>
            <span className='text-white cursor-pointer hover:underline font-semibold' onClick={toggleModals}>Sign In</span>
        </div>
    )
  return (
    <Modal 
        isOpen={registerModal.isOpen} 
        onClose={registerModal.onClose} 
        onSubmit={onSubmit}
        title='Create an account'
        body={BodyContent}
        footer={FooterContent}
        actionLabel='Register'
    />
  )
}

export default RegisterModal