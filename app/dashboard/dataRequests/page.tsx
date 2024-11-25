'use client'
import React,{useEffect, useState} from 'react'
import styles from '../../ui/dashboard/users/users.module.css'
import Modal from '@/app/components/modal/Modal'
import { useMyContext } from '@/app/Context/MyContextProvider'
import { formatDateFromMongoDB } from '@/app/utils/dateFormat'
import Image from 'next/image'
import { useSearchParams } from 'next/navigation'
import Pagination from '@/app/ui/dashboard/pagination/pagination'

const DataRequest = () => {
  const {router ,  fetchRequests, listOfRequests, deleteClientRequest,totalPages,getTimeStamp} = useMyContext()
  const [isOpen,setIsOpen] = useState(false);
  const pageParams = useSearchParams()
  const page = pageParams.get('page')
  useEffect(()=>{
    fetchRequests(page)
  },[page])

  const delRecord = (e:any,id:string) =>{
    e.preventDefault()
    let check = confirm('Are you sure?');
    if(!check) return;
    const pass = prompt('Enter your password')
    if(pass == process.env.NEXT_PUBLIC_DELETE_PASSWORD)
    {
      deleteClientRequest(e,id)
    }else{
      alert('Wrong password')
    }
    
  }

  const [msg,setmsg]=useState("")
  const [name,setName]=useState("")
  const [email,setEmail]=useState("")


  

  return (
    <>
    <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
      <div className='flex flex-col-reverse'>
        <textarea
        value={msg}
        className={styles.textArea}
        name="address"
        id="address"
        rows={6}
        placeholder=""
      ></textarea>
      <label>Msg</label>
      <input className={styles.input} type='text'  value={name} readOnly={true} />
        <label>Name</label>
        <input className={styles.input} type='text'  value={email} readOnly={true} />
        <label>Email</label>
      </div>
    </Modal>
    <div className={styles.container}>
    <div className={styles.top}>
        
    </div>
    <table className={styles.table}>
    <thead>
      <tr>
        <td>Name</td>
        {/* <td>Email</td> */}
        <td>Created At</td>
        <td>Time</td>
        <td>Detail</td>
        <td>Delete</td>
      </tr>
    </thead>
    <tbody>
      {listOfRequests.map((user:any,index:number) => (
        <tr 
        key={user.id}
        >
          <td>
          <div className={styles.user}>
                  <Image
                    // src={user.img || "/noavatar.png"}
                    src={'/unknown.jpg'}
                    alt=""
                    width={40}
                    height={40}
                    className={styles.userImage} />
                  {user.username.slice(0,15)}
                </div>
          </td>
          {/* <td>
            {user.email.slice(0,20)}
         </td> */}
          <td>
            {formatDateFromMongoDB(user.createdAt)}
          </td>
          <td >
            {getTimeStamp(user.createdAt)}
          </td>
          
          <td>
            <div className={styles.buttons}>
              
                <button onClick={()=>{setmsg(user.msg);setEmail(user.email);setName(user.username);setIsOpen(true)}}  className={`${styles.button} ${styles.view}`}>
                  View 
                </button>

            </div>
          </td>
          <td>
            <div className={styles.buttons}>
            <form 
              >
                <button className={`${styles.button} ${styles.delete}`} onClick={(e)=>delRecord(e,user._id)}>
                  Delete Msg 
                </button>
              </form>
            </div>
          </td>
        </tr>
      ))}
      
        
    </tbody>
  </table>
    <Pagination router={router} page={page} totalPages={totalPages} path={'/dashboard/dataRequests?'} />
</div>
  </>
  )
}

export default DataRequest