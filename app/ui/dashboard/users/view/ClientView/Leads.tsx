'use client'
import React, { useEffect } from 'react'
import styles from '../../users.module.css'
import Search from '../../../search/search'
import Link from 'next/link'
import Image from 'next/image'
import Pagination from '../../../pagination/pagination'
import { formatDateFromMongoDB } from '@/app/utils/dateFormat'
import { useMyContext } from '@/app/Context/MyContextProvider'
import * as XLSX from 'xlsx';
import axios from 'axios'
import toast from 'react-hot-toast'

interface ProfilePoprs{

    id:any,
    page?:string
}

const Leads:React.FC<ProfilePoprs> = ({id,page}) => {

    const {  searchleads , data , setData , router ,totalPages  , setViewSingleLead ,delSingleClientSharredLead,fetchSingleClientLeads} = useMyContext()

    useEffect(()=>{
      fetchSingleClientLeads(id,page)


      return(()=>{
        setData([])
      })
    },[router,page])

    const viewLead=(id:string)=>{

      setViewSingleLead(data.filter((e:any)=>e._id == id))
      router.push('/dashboard/viewExcel')
    }

    const downloadAllLeads = async(e:any)=> {
        // Sample JSON data
        e.preventDefault();
       
        let jsonData=[];
      
        for(let i=0;i<data.length;i++)
        {
          
          const lead = { phone_number: data[i].phone,
             title: data[i].title,
             first_name: data[i].firstName,
             middle_initial:data[i].middleName,
             last_name:data[i].lastName,
             address1:data[i].address1,
             address2:data[i].address2,
             address3:data[i].address3,
             city:data[i].city,
             state:data[i].state,
             province:data[i].province,
             postal_code:data[i].postalCode,
             country_code:data[i].countryCode,
             gender:data[i].gender,
             date_of_birth:data[i].dob,
             altPhone:data[i].altPhone,
             email:data[i].email,
             ID_Number:data[i].idNumber,
             Vehicle:data[i].vehicle,
             Bank_name:data[i].bankName,
             Status_name:data[i].statusName
             }
             jsonData.push(lead)
        }

            
      
        // Convert JSON to worksheet
        const worksheet = XLSX.utils.json_to_sheet(jsonData);
      
        // Create a workbook
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
      
        // Convert workbook to binary XLSX file
        const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
      
        // Create Blob from binary XLSX data
        const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
      
        // Create download link and trigger click event
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `Leads.xlsx`;
        a.click();
      
        // Cleanup
        window.URL.revokeObjectURL(url);
      }

        
     

 

  return (
    <div className={styles.container}>
      {
        data.length<=0  && 
        <>
        <div className='h-[300px] w-full flex justify-center items-center'>

          <h1>No Leads</h1>

        </div>
        </>
      }
      {data && data.length>0 && <>
       <div className={styles.top}>
            <Search placholder={'Search for leads'} func={searchleads}  role={'Employee'} />
            <div >
               <button onClick={(e)=>downloadAllLeads(e)} className={styles.addButton}>Download All Leads</button>
            </div>
        </div>
        <table className={styles.table}>
        <thead>
          <tr>
            <td></td>
            <td>Firstname</td>
            <td>Phone</td>
            <td>Created At</td>
            <td>FileName</td>
            <td>Action</td>
          </tr>
        </thead>
        <tbody>
          {data && data.map((leads:any,index:number) => (
            <tr 
            key={leads._id}
            >
              <td>
                {index+1}
             </td>
              <td>
              <div className={styles.user}>
                  {leads.firstName}
                </div>
              </td>
              <td>
                {leads.phone}
             </td>
              <td>
                {formatDateFromMongoDB(leads.createdAt)}
              </td>
              <td>
                {leads.fileName}
                </td>
              <td>
                <div className={styles.buttons}>
                    <button onClick={()=>viewLead(leads._id)} className={`${styles.button} ${styles.view}`}>
                      View
                    </button>
                    <button onClick={(e)=>delSingleClientSharredLead(e,id,leads._id)}  className={`${styles.button} ${styles.delete}`} >
                      Delete
                    </button>
                </div>
              </td>
            </tr>
           ))} 
        </tbody>
      </table>
        <Pagination router={router} page={page} totalPages={totalPages} path={`/dashboard/employees/${data[0]?.userId}?view=leads&`}/>
      </>}
    </div>
  )
}

export default Leads