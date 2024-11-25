'use client'
import { MdEmail } from "react-icons/md"
import Button from "../../components/button/Button"
import Input from "../../components/input/Input"
import React,{ useState } from 'react'
import { useMyContext } from "@/app/Context/MyContextProvider"
const Request = () => {    
    const { email, username ,msg ,setMsg , setEmail , setUsername , sendRequest} = useMyContext();
    

    
      
    

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
          placeholder={"Username"}
            disabled={false}
            value={username}
            required={true}
            change={setUsername}
            id="password" 
            label="Username" 
            type={'text'}
          />
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
          placeholder={"Message"}
          tag={true}
            disabled={false}
            value={msg}
            required={true}
            change={setMsg}
            id="password" 
            label="Message" 
            type={'text'}
          />
          <div  onClick={(e)=>sendRequest(e)} className="flex justify-center">
            <Button  className='max-w-sm mx-auto w-full'    type="submit" >
            <MdEmail className='mr-2 h-4 w-4' />
              Send
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

export default Request