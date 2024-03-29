
import React, { useCallback } from 'react'
import {AiOutlineClose} from "react-icons/ai"
import Button from './Button';

interface ModelProps {
    isOpen?: boolean;
    onClose: () => void;
    onSubmit: () => void;
    title?: string;
    body?: React.ReactElement;
    footer?: React.ReactElement;
    actionLabel: string;
    disabled?: boolean;
}

const Modal: React.FC<ModelProps> = ({
    isOpen,
    onClose,
    onSubmit,
    title,
    body,
    footer,
    actionLabel,
    disabled
}) => {
    const handleClose = useCallback(()=>{
        if(disabled){
            return;
        }
        onClose();
    },[disabled, onClose])

    const handleSubmit = useCallback(()=>{
        if(disabled){
            return
        }
        onSubmit();
    },[disabled, onSubmit])

    if(!isOpen) return null;
  return (
    <>
        <div className='
            flex justify-center items-center outline-none bg-neutral-800
            opacity-90 z-50 overflow-x-hidden overflow-y-auto inset-0 fixed focus:outline-none
        '>
            <div className='relative md:top-6 xl:top-4 w-full xl:w-[575px] lg:w-3/6 my-2 mx-auto lg:max-w-3xl h-full lg:h-auto lg:max-h-[600px] flex justify-center items-center overflow-hidden'>
                {/* Content */}
                <div className='
                    h-full  
                    border-0
                    rounded-lg 
                    shadow-lg 
                    relative 
                    flex 
                    flex-col   
                    w-full 
                    bg-black 
                    outline-none 
                    focus:outline-none
                '>
                    {/* header */}
                    <div className='
                        flex 
                        justify-between
                        items-center
                        p-5
                        rounded-t
                    '>
                        <h3 className='text-3xl font-semibold text-white'>{title}</h3>
                        <button onClick={handleClose}
                        className='
                            p-1
                            text-white
                            hover:opacity-75
                            border-0
                            ml-auto
                            transition'
                        >
                            <AiOutlineClose size={20}/>
                        </button>
                    </div>

                    {/* Body */}
                   <div className='relative p-5 flex-auto'>
                        {body}
                   </div>

                   {/* Footer */}
                   <div className='flex flex-col gap-2 p-5'>
                        <Button disabled={false} label={actionLabel} fullWidth secondary large onClick={handleSubmit} />
                        {footer}
                   </div>
                </div>

            </div>
            
        </div>
    </>
  )
}

export default Modal