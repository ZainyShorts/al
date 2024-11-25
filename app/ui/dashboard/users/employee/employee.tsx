'use client'
import React, { useEffect } from 'react'
import styles from '../users.module.css'
import Search from '../../search/search'
import Link from 'next/link'
import Image from 'next/image'
import Pagination from '../../pagination/pagination'
import { useMyContext } from '@/app/Context/MyContextProvider'
import { useSearchParams } from 'next/navigation'
import { formatDateFromMongoDB } from '@/app/utils/dateFormat'

const Employee = () => {
  const {fetchAllEmployees , listOfEmployees , totalPages , role , setRole , router , searchUsers,getTimeStamp , searching,setSearching} = useMyContext();
  const pageParams = useSearchParams()
  const page = pageParams.get('page')
  useEffect(()=>{
    fetchAllEmployees(page);
    return(()=>{
      setSearching((false))
    })
  },[router,page])

  const naviagte=()=>{
    if(role == 'Client')
    {
      setRole('Employee')
      router.push('/dashboard/employees/add')
    }else{
      setRole('Employee')
      router.push('/dashboard/employees/add')
    }
  }

  return (
    <div className={styles.container}>
        <div className={styles.top}>
            <Search placholder={'Search for a employee'} page={page} func={searchUsers} role={'Employee'} />
            <div onClick={naviagte}>
               < button className={styles.addButton}>Add New Employee</button>
            </div>
        </div>
        <table className={styles.table}>
        <thead>
          <tr>
            <td>Name</td>
            <td>Email</td>
            <td>Created At</td>
            <td>Time</td>
            <td>Action</td>
          </tr>
        </thead>
        <tbody>
          {listOfEmployees.map((employee:any) => (
            <tr 
            key={employee._id}
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
                  {employee.username}
                </div>
              </td>
              <td>
                {employee.email}
             </td>
              <td>
                {formatDateFromMongoDB(employee.createdAt)}
              </td>
              <td>
                {getTimeStamp(employee.createdAt)}
                </td>
              <td>
                <div className={styles.buttons}>
                  <Link href={`/dashboard/employees/${employee._id}?view=profile`}>
                    <button className={`${styles.button} ${styles.view}`}>
                      Edit
                    </button>
                  </Link>
                  <Link href={`/dashboard/employees/${employee._id}?view=leads&page=1`}>
                    <button className={`${styles.button} ${styles.view}`}>
                      Leads
                    </button>
                  </Link>
                </div>
              </td>
            </tr>
           ))} 
        </tbody>
      </table>
       {!searching &&<Pagination router={router} page={page} totalPages={totalPages} path={'/dashboard/employees?'} /> }
    </div>
  )
}

export default Employee