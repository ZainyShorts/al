'use client'
import React,{ useState } from 'react'
import { MdEmail } from "react-icons/md"
import Button from "../../components/button/Button"
import Input from "../../components/input/Input"
import { useMyContext } from "@/app/Context/MyContextProvider"


const AuthForm = () => {    
    const {Login , email , password , setEmail , setPassword} = useMyContext()
    
    const [toggle,setToggle] = useState('closeEye')
      
   

  return (
    <>
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
      <div 
        className="
        bg-[#182237]
          px-4
          py-8
          shadow
          sm:rounded-lg
          sm:px-10
        "
      >
        <form 
          className='space-y-6' 
          
        >
          <Input 
            placeholder={"Email"}
            disabled={false}
            value={email}
            required={true}
            change={setEmail}
            id="email" 
            label="Email address" 
            type="text"
          /> 
          <Input 
          placeholder={"Password"}
          iconChange={setToggle}
          showEyeIcon={toggle}
            disabled={false}
            value={password}
            required={true}
            change={setPassword}
            id="password" 
            label="Password" 
            type={toggle == 'showEye' ? 'text' : 'password'}
          />
          <div className="flex justify-center">
            <Button onClick={(e)=>Login(e)} className='max-w-sm mx-auto w-full'    type="submit" >
            <MdEmail className='mr-2 h-4 w-4' />
              Sign in
            </Button>
          </div>
        </form>

       <div className='flex 
            gap-2 
            justify-center 
            text-sm 
            px-2 
            cursor-pointer
            text-gray-500'>
            {/* <h1 onClick={()=>setVariant('FORGOT')}>Forgot Password</h1> */}
          </div>
        <div 
          className="
            flex 
            gap-2 
            justify-center 
            text-sm 
            mt-6 
            px-2 
            text-gray-500
          "
        >
          
          
        
        </div>
      </div>
    </div>

    </>
  )
}

export default AuthForm