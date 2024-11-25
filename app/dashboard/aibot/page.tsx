import React from 'react'
import Image from 'next/image'

const aichatBot = () => {
  return (
    <>
        <div className='flex h-full justify-evenly items-center mt-5'>
           <Image src={"/bot.png"} width={400} height={200} alt='Bot' />
        </div>
    </>
  )
}

export default aichatBot