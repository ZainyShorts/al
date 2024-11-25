'use client';
import React, { useEffect } from 'react';
import styles from '../users.module.css';
import Search from '../../search/search';
import Link from 'next/link';
import Image from 'next/image';
import Pagination from '../../pagination/pagination';
import { useMyContext } from '@/app/Context/MyContextProvider';
import { useSearchParams } from 'next/navigation';
import { formatDateFromMongoDB } from '@/app/utils/dateFormat';

const Client = () => {
  const pageParams = useSearchParams();
  const page = pageParams.get('page');
  const { fetchAllClients, listOfClients, totalPages, router, searchUsers,role,setRole,getTimeStamp ,searching,setSearching,userRole} = useMyContext();

  useEffect(() => {
    fetchAllClients(page);
    return(()=>{
      setSearching((false))
    })
  }, [router,page]);

  const naviagte=()=>{
    if(role == 'Employee')
    {
      setRole('Client')
      router.push('/dashboard/clients/add')
    }
  }

 
  return (
    <div className={styles.container}>
      <div  className={styles.top}>
        <Search placholder={'Search for a client'} page={page} func={searchUsers} role={'Client'} />
        <div onClick={naviagte}>
          <button className={styles.addButton}>Add New Client</button>
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
          {listOfClients.map((clients: any) => (
            <tr
              key={clients._id}
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
                  {clients.username}
                </div>
              </td>
              <td>
                {clients.email}
              </td>
              <td>{formatDateFromMongoDB(clients.createdAt)}</td>

              <td>
                {getTimeStamp(clients.createdAt)}
              </td>

              <td>
                <div className={styles.buttons}>
                 {userRole == 'Admin' && <Link href={`/dashboard/clients/${clients._id}?view=profile`}>
                    <button className={`${styles.button} ${styles.view}`}>
                    Edit
                    </button>
                  </Link>}
                  <Link href={`/dashboard/clients/${clients._id}?view=leads&page=1`}>
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
     {!searching && <Pagination router={router} totalPages={totalPages} page={page} path={'/dashboard/clients?'} />}
    </div>
  );
};

export default Client;
