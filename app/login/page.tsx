import React from 'react'
import Image from 'next/image'
import AuthForm from '../ui/login/AuthForm';

const page = () => {
  return (
    <div className='flex min-h-full items-center justify-center py-[150px] px-4 sm:px-6 lg:px-8'>
        <div className='w-full flex flex-col items-center max-w-md space-y-8'>
          <div className='flex flex-col font-bold items-center gap-8'>
            <Image
        src={"/logo.png"}
          alt=""
          width="300"
          height="100"
        />
            <h2 className=' text-center text-3xl font-bold tracking-tight text-white'>
              Sign in to your account
            </h2>
          </div>
          <AuthForm/>
        </div>
      </div>
  )
}

export default page