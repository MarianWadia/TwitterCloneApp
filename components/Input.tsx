import React from 'react'

interface inputProps{
    type?: string;
    placeholder?: string;
    disabled?: boolean;
    value?: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>)=>void;
    
}
const Input: React.FC<inputProps> = ({
    type,
    placeholder,
    disabled,
    value,
    onChange
}) => {
  return (
    <input type={type} placeholder={placeholder} disabled={disabled} value={value} onChange={onChange} 
      className='
        w-full
        p-4 
        text-lg
        bg-black
        border-2
        border-neutral-800
        rounded-md
        outline-none
        text-white
        focus:border-sky-500
        focus:border-2
        transition
        disabled:bg-neutral-900
        disabled:opacity-70
        disabled:cursor-not-allowed
      '
    />
  )
}

export default Input