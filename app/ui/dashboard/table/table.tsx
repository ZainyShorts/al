import React from 'react'
import Image from 'next/image'
import styles from './table.module.css'
import { formatDateFromMongoDB } from '@/app/utils/dateFormat'

interface TableProps{
  listOfFour:any,
}
const Table:React.FC<TableProps> = ({listOfFour}) => {
  return (
    <div  className={styles.container}>
    <h2 className={styles.title}>Recent join users</h2>
    <table className={styles.table}>
      <thead>
        <tr>
          <td>Name</td>
          <td>Role</td>
          <td>Join Date</td>
          <td>Access</td>
        </tr>
      </thead>
      <tbody>
        {listOfFour && listOfFour.map((users:any)=>(
          <>
          
        <tr>
         
          <td>
            <div className={styles.user}>
            <Image
                    // src={user.img || "/noavatar.png"}
                    src={'/unknown.jpg'}
                    alt=""
                    width={40}
                    height={40}
                    className={styles.userImage} />
              {users.username}
            </div>
          </td>
          <td>
           {users.role == 'Employee' && <span className={`${styles.status} ${styles.pending}`}>{users.role}</span>}
           {users.role == 'Client' && <span className={`${styles.status} ${styles.done}`}>{users.role}</span>}
           {users.role == 'Admin' && <span className={`${styles.status} ${styles.cancelled}`}>{users.role}</span>}
          </td>
          <td>{formatDateFromMongoDB(users.createdAt)}</td>
          <td>{users.access}</td>
        
        </tr>
                </>
        ))}
      </tbody>
       
    </table>
  </div>
  )
}

export default Table