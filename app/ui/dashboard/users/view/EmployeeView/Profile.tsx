'use client'
import Image from "next/image";
import styles from '@/app/ui/dashboard/users/singleUser/singleUser.module.css'
import { useMyContext } from "@/app/Context/MyContextProvider";
import { useEffect } from "react";

interface ProfilePoprs{

    id:any,
    view:string
}

const profile:React.FC<ProfilePoprs> = ({id,view}) => {
  const { fetchSingleUser ,  email , setEmail , username , setUsername , access , setAccess , phone , setPhone , address , setAddress , role , updateUser} = useMyContext()
  
  useEffect(()=>{
    if(view == 'profile')
    {
        fetchSingleUser(id)
    }
    
    return()=>{
      setUsername('')
      setEmail('')
      setPhone('')
      setAddress('')
      // setAccess('Yes')
    }
  },[])

  
  
  return (
    <div className={styles.container}>
      <div className={styles.infoContainer}>
        <div className={styles.imgContainer}>
          <Image src={"/one.jpg"} alt="" fill />
        </div>
        <h1 className="text-center">
          {username}
        </h1>
        <div className="flex flex-col mt-10">

        </div>
      </div>
      <div className={styles.formContainer}>
        <form className={styles.form}>
          <label>Username</label>
          <input type="text" name="username" onChange={(e)=>setUsername(e.target.value)} value={username} />
          <label>Email</label>
          <input type="text" name="email" onChange={(e)=>setEmail(e.target.value)} value={email}  />
          <label>Phone</label>
          <input type="text" name="phone" onChange={(e)=>setPhone(e.target.value)} value={phone} />
          <label>Address</label>
          <textarea  name="address" onChange={(e)=>setAddress(e.target.value)} value={address}  />
          <label >Login Access?</label>
          <select name="isAdmin" id="isAdmin" onChange={(e)=>setAccess(e.target.value)} value={access}  >
            
          {access == 'Yes' && (
            <>
            <option >Yes</option>
            <option >No</option>
            </>
          )} 
          {access == 'No' && (
            <>
            <option >No</option>
            <option >Yes</option>
            </>
          )} 
          </select>
          <label>Role?</label>
          <select name="isAdmin" id="isAdmin" value={role}>
            <option>Employee</option>
          </select>
          <button onClick={(e)=>updateUser(e,id)}>Update</button>
        </form>
      </div>
    </div>
  );
};

export default profile;