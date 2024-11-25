'use client'
import React, { useEffect, useState } from 'react'
import { IoIosAddCircle } from "react-icons/io";
import { FaFileExcel } from 'react-icons/fa'
import Link from 'next/link';
import styles from '../../ui/dashboard/users/upload/upload.module.css'
import { useMyContext } from '@/app/Context/MyContextProvider';
import * as XLSX from 'xlsx';

const page = () => {
  const {router , format , setFormat , setData} = useMyContext();

  useEffect(()=>{
    return()=>setFormat('')
  },[])

  



  const handleFileUpload = (e:any) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (e:any) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: 'array' });
      console.log(workbook)
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const excelData = XLSX.utils.sheet_to_json(worksheet, { header: 1 , defval: '' });
      setData(excelData)
    };
    reader.readAsArrayBuffer(file);
    router.push('/dashboard//addData/preview')
    
  };


  return (
    <>
    <div className={styles.container}>
 { format != 'CallCenter' &&   <form className={styles.form}>
     <select className={styles.select} onChange={(e)=>setFormat(e.target.value)}  >
     <option disabled selected>Select an option</option>
            <option value={'CallCenter'} >Call Center Data Format</option>
            <option value={'other'} >Up comming 1</option>
            <option value={'othe2'}  >Up comming 2</option>
      </select>
    </form>}
{ format == 'CallCenter' && 
<>

<label  className={styles.customFileUpload}>
<div className={styles.icon}>
  <FaFileExcel className={styles.svg} size={50} />
</div>
<div className={styles.text}>
   <span className={styles.span}>Click to upload excel file</span>
   </div>
   <input onChange={(e)=>handleFileUpload(e)} className={styles.input} id="file" type="file" accept=".xls,.xlsx" />
</label>

<Link href={'/dashboard/addData/manual'}>
<label  className={styles.customFileUpload}>
<div className={styles.icon}>
    <IoIosAddCircle size={60} className={styles.svg}/>
</div>
<div className={styles.text}>
   <span className={styles.span}>Add manually</span>
   </div>
   <input className={styles.input} id="file" type="file"/>
</label>
</Link>
</>
}
    </div>
    </>
  )
}

export default page