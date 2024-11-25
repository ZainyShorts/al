// pages/index.js
'use client'
// import styles from '../../ui/dashboard/users/view/viewexcel.module.css'
import styles from '../../dashboard/addData/preview/preview.module.css'
import { useMyContext } from '../../Context/MyContextProvider';
import { useEffect } from 'react';

const ViewExcel = () => {
  const {viewSingleLead,setViewSingleLead, downloadSingleExcel} = useMyContext()

  // useEffect(()=>{
  //   return()=>setViewSingleLead([])
  // },[])
  

  
  

  return (
    <div className={styles.container}>
      <div className='flex justify-between items-center'>
        <div>
          <label className='mr-5'>File name</label>
      <input className={styles.inputField} type="text" value={viewSingleLead[0]?.fileName}  required />
        </div>
      <button onClick={()=>downloadSingleExcel(viewSingleLead)} className={styles.button}>Download</button>
      </div>
      <div className={styles.excelContainer}>
        <div className={styles.tableContainer}>
          <table className={styles.table}>

            <thead>
              <tr className='text-white px-10' >
                  <th className={styles.th}>phone_number</th>
                  <th className={styles.th}>title</th>
                  <th className={styles.th}>first_name</th>
                  <th className={styles.th}>middle_initial</th>
                  <th className={styles.th}>last_name</th>
                  <th className={styles.th}>address1</th>
                  <th className={styles.th}>address2</th>
                  <th className={styles.th}>address3</th>
                  <th className={styles.th}>city</th>
                  <th className={styles.th}>state</th>
                  <th className={styles.th}>province</th>
                  <th className={styles.th}>postal_code</th>
                  <th className={styles.th}>country_code</th>
                  <th className={styles.th}>gender</th>
                  <th className={styles.th}>date_of_birth</th>
                  <th className={styles.th}>alt_phone</th>
                  <th className={styles.th}>email</th>
                  <th className={styles.th}>ID Number</th>
                  <th className={styles.th}>Vehicle</th>
                  <th className={styles.th}>Bank Name</th>
                  <th className={styles.th}>Status_name</th>
              </tr>
            </thead>
            <tbody>
                <tr className={styles.tr}>
                  {viewSingleLead.map((cell:any, cellIndex:any) => (
                    <>
                    <td className={styles.td} key={cellIndex}>{cell.phone == '' ? 'Empty' : cell.phone}</td>
                    <td className={styles.td} key={cellIndex}>{cell.title == '' ? 'Empty' : cell.title}</td>
                    <td className={styles.td} key={cellIndex}>{cell.firstName == '' ? 'Empty' : cell.firstName}</td>
                    <td className={styles.td} key={cellIndex}>{cell.middleName == '' ? 'Empty' : cell.middleName}</td>
                    <td className={styles.td} key={cellIndex}>{cell.lastName == '' ? 'Empty' : cell.lastName}</td>
                    <td className={styles.td} key={cellIndex}>{cell.address1 == '' ? 'Empty' : cell.address1}</td>
                    <td className={styles.td} key={cellIndex}>{cell.address2 == '' ? 'Empty' : cell.address2}</td>
                    <td className={styles.td} key={cellIndex}>{cell.address3 == '' ? 'Empty' : cell.address3}</td>
                    <td className={styles.td} key={cellIndex}>{cell.city == '' ? 'Empty' : cell.city}</td>
                    <td className={styles.td} key={cellIndex}>{cell.state == '' ? 'Empty' : cell.state}</td>
                    <td className={styles.td} key={cellIndex}>{cell.province == '' ? 'Empty' : cell.province}</td>
                    <td className={styles.td} key={cellIndex}>{cell.postalCode == '' ? 'Empty' : cell.postalCode}</td>
                    <td className={styles.td} key={cellIndex}>{cell.countryCode == '' ? 'Empty' : cell.countryCode}</td>
                    <td className={styles.td} key={cellIndex}>{cell.gender == '' ? 'Empty' : cell.gender}</td>
                    <td className={styles.td} key={cellIndex}>{cell.dob == '' ? 'Empty' : cell.dob}</td>
                    <td className={styles.td} key={cellIndex}>{cell.altPhne == '' ? 'Empty' : cell.altPhone}</td>
                    <td className={styles.td} key={cellIndex}>{cell.idNumber == '' ? 'Empty' : cell.idNumber}</td>
                    <td className={styles.td} key={cellIndex}>{cell.vehicle == '' ? 'Empty' : cell.vehicle}</td>
                    <td className={styles.td} key={cellIndex}>{cell.bankName == '' ? 'Empty' : cell.bankName}</td>
                    <td className={styles.td} key={cellIndex}>{cell.statusName == '' ? 'Empty' : cell.statusName}</td>
                    </>
                  ))}
                </tr>
            </tbody>
          </table>
        </div>
      </div>
  </div>
  );
};

export default ViewExcel;
