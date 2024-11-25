'use client'
import Image from "next/image";
import Request from './component/request';
import Button from "../components/button/Button";
import { useRouter } from "next/navigation";

export default  function Home() {
    
    const router = useRouter();

    return (
    <>
    <Button className=' w-20 float-end mt-5 mr-5' onClick={()=>router.push('/login')}    type="submit" >Sign in</Button>
    <div className='flex min-h-full items-center ml-44 justify-center py-[150px] px-4 sm:px-6 lg:px-8'>
        <div className='w-full flex flex-col items-center max-w-md space-y-8'>
          <div className='flex flex-col font-bold items-center gap-8'>
            <Image
        src={"/logo.png"}
          alt=""
          width="300"
          height="100"
        />
            <h2 className=' text-center text-3xl font-bold tracking-tight text-white'>
              Send request 
            </h2>
          </div>
          <Request/>
        </div>
      </div>
    </>
  )
}