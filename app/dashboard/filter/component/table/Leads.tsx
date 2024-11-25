'use client'
import React,{useState} from 'react'
import styles from '../../../../ui/dashboard/users/users.module.css'
import { formatDateFromMongoDB } from '@/app/utils/dateFormat'
import { useMyContext } from '@/app/Context/MyContextProvider'
import * as XLSX from 'xlsx';
import axios from 'axios'
import toast from 'react-hot-toast'
import Pagination from '@/app/ui/dashboard/pagination/pagination'
import Modal from '@/app/components/modal/Modal'
import Search from '../Search/search'

interface ProfilePoprs{

    data:any,
    totalPages:number,
    page:any,
    func:any
}

const leads:React.FC<ProfilePoprs> = ({data,totalPages,page,func}) => {

  

    const {  router ,deleteLead , setViewSingleLead , setWork ,setLoader , clients , setClients , searchClientsForShare,query,setQuery,assignLeads} = useMyContext();

    const [select,setSelect]=useState<boolean>(false);
    const [selectedIds, setSelectedIds] = useState<any>([]);
  
    const [selectAllBG,setSelectAllBG]=useState(false);

    const viewLead=(id:string)=>{

      setViewSingleLead(data.filter((e:any)=>e._id == id))
      router.push('/dashboard/viewExcel')
    }

    

    const editLeadData = (id:string,data:any) =>{
      setWork({
          'phone':data.phone,
          'title':data.title,
          'firstName':data.firstName,
          'middleName':data.middleName,
          'lastName':data.lastName,
          'address1':data.address1,
          'address2':data.address2,
          'address3':data.address3,
          'city':data.city,
          'state':data.state,
          'province':data.province,
          'postalCode':data.postalCode,
          'countryCode':data.countryCode,
          'email':data.email,
          'gender':data.gender,
          'idNumber':data.idNumber,
          'dob':data.dob,
          'altPhone':data.altPhone,
          'vehicle':data.vehicle,
          'bankName':data.bankName,
          'statusName':data.statusName
        })
      router.push(`/dashboard/employees/edit/${id}`)
    }
      
        
     function toggle()
     {
      setSelectAllBG(false)
      setSelectedIds([])
      if(select){
        setSelect(false)
        return;
      }
      setSelect(true)
      
     }
     function putSelectedIds(id:String)
     {
      const index = selectedIds.indexOf(id);
      if (index === -1) {
          setSelectedIds([...selectedIds, id]);
      } else {
        const updatedIds = [...selectedIds];
        updatedIds.splice(index, 1);
        setSelectedIds(updatedIds);
    }

     }

     const isSelected = (id:any) => selectedIds.includes(id);

     function shareAll(){
      setSelect(false)
      const arrListIds = data.map((obj:any)=>{return obj._id});
      setSelectedIds(arrListIds);
      setIsOpen(true)
     }

    function downloadSelectedLeads(){
      if(selectedIds.length == 0){
        return;
      }
      setLoader(true)
      let thirdArray = []
      for(let i=0;i<selectedIds.length;i++){
        if(data[i]._id == selectedIds[i]){
          thirdArray.push(data[i]);
        }
      }
        let jsonData=[];
      
        for(let i=0;i<thirdArray.length;i++)
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
        setLoader(false)
        window.URL.revokeObjectURL(url);
       
     }

     function sharSelected(){
      setSelect(false)
      setIsOpen(true)
     }

  
 
 

     const [isOpen,setIsOpen]=useState(false);

  return (
    <>
    <Modal isOpen={isOpen} onClose={() =>{ setClients([]);setQuery("");setIsOpen(false)}}>
      <div className=' flex justify-center'>
      <Search state={query} setState={searchClientsForShare} placholder='Search client by email'/>
      </div>
      <br/>
      <table className={styles.table}>
        <thead>
         {clients.length>0 && <tr>
            <td>Email</td>
            <td>Action</td>
          </tr>}
        </thead>
        <tbody>
          {clients.length>0 && clients.map((clients:any) => (
            <tr 
            key={clients._id}
            >
              
              
              <td>
                {clients.email}
                </td>
              <td>
                <div className={styles.buttons}>
                    <button onClick={()=>assignLeads(clients._id,selectedIds)} className={`${styles.button} ${styles.view}`}>
                      Assign
                    </button>
                </div>
              </td>
            </tr>
           ))} 
        </tbody>
      </table>

    </Modal>

    <div className={styles.container}>
        <div className={styles.top}>
          <div className='w-full'>
            {select && <button onClick={downloadSelectedLeads}   className={`${styles.addButton} ${selectedIds.length == 0 ? "!bg-gray-400" : ""}`}>Download Selected Leads</button> }
            {!select && <button onClick={(e)=>func(e)}   className={styles.addButton}>Download All Leads</button>}
          </div>
            <div className={styles.btndiv}>
             <button onClick={toggle}  className={styles.addButton}>{ select ? "Unselect" : "Select"}</button>
            {select && <button onClick={sharSelected}   className={styles.addButton}>Share selected</button> }
            {!select &&<button onClick={shareAll}  className={styles.addButton}>Share All</button>}

            </div>
        </div>
        <table className={styles.table}>
        <thead>
         {data.length>0 && <tr>
            {select && <td></td>}
            <td>Firstname</td>
            <td>Phone</td>
            <td>Created At</td>
            <td>FileName</td>
            <td>Action</td>
          </tr>}
        </thead>
        <tbody>
          {data && data.map((leads:any) => (
            <tr 
            key={leads._id}
            >
              {select   && (
              <>
              <td  onClick={()=>{putSelectedIds(leads._id)}}>
                  <div className={`w-5 h-5 rounded-md 
                  bg-gray-400 cursor-pointer ${isSelected(leads._id) ? "bg-green-300" : ""}
                   `}></div>
              </td>
              </>
              )}
              <td>
              <div className={styles.user}>
                  {leads.firstName}
                </div>
              </td>
              <td >
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
                    <button onClick={()=>editLeadData(leads._id,leads)}  className={`${styles.button} ${styles.view}`}>
                      Edit
                    </button>
                    <button onClick={(e)=>deleteLead(e,leads._id)}  className={`${styles.button} ${styles.delete}`} >
                      Delete
                    </button>
                </div>
              </td>
            </tr>
           ))} 
        </tbody>
      </table>
        { totalPages > 1 && <Pagination router={router} page={page} totalPages={totalPages} path={`/dashboard/filter?`}/>}
    </div>
    </>

  )
}

export default leads