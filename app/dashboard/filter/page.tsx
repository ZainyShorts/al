'use client'
import React, { useEffect, useState } from 'react'
import styles from './filter.module.css'
import Checkbox from './component/checkbox/Checkbox'
import Countrycode from './component/countrycode/Countrycode'
import Search from './component/Search/search'
import Leads from './component/table/Leads'
import axios from 'axios'
import { useSearchParams } from 'next/navigation'
import { useMyContext } from '@/app/Context/MyContextProvider'
import * as XLSX from 'xlsx';
import toast from 'react-hot-toast'

const Filter = () => {

  const { router , setLoader } = useMyContext()
  const pageParams = useSearchParams()
  const page = pageParams.get('page')

  useEffect(()=>{
    if(page)
    {
      filterHanlder(page)
    }
    // else{
    //   router.push('/dashboard')
    // }
  },[page])

   const [gender,setGender]=useState('')
   const [maleCheck,setMaleCheck]=useState(false)
   const [femaleCheck,setFemaleCheck]=useState(false)
   const [title,setTitle]=useState('')
   const [mrchech,setMrCheck]=useState(false)
   const [msCheck,setMsCheck]=useState(false)
   const [mrsCheck,setMrsCheck] = useState(false)
   const[startDate,setStartDate]=useState('')
   const[endDate,seetEndDate]=useState('')
   const[countryCode,setCountryCode]=useState('')


   //search states;
   const[email,setEmail]=useState('')
   const[phone,setPhone]=useState('')
   const[fileName,setFileName]=useState('')
   const[city,setCity]=useState('')
   const[state,setState]=useState('')
   const[province,setProvince]=useState('')
   const[bankName,setBankName]=useState('')
   const[postalCode,setPostalCode]=useState('')
   const[age,setAge]=useState('')
   const[name,setName]=useState('')
   const[vehicle,setVichle]=useState('')
   const[idNumber,setIdNumber]=useState('')

   const[data,setData]=useState<any>([])
   const [totalPages,setTotalPages]=useState(0)
   

   const changeHanlder = (e:any) =>{
    if(e.target.name == 'M')
    {
      setGender('M')
      setMaleCheck(true)
      setFemaleCheck(false)
      return;
    }else if(e.target.name == 'F'){
      setGender('F')
      setMaleCheck(false)
      setFemaleCheck(true)
      return;
    }
    else if(e.target.name == 'MR')
    {
      setTitle('MR')
      setMrCheck(true)
      setMsCheck(false)
      setMrsCheck(false)
      return;
    }
    else if(e.target.name == 'MS')
    {
      setTitle('MS')
      setMrCheck(false)
      setMsCheck(true)
      setMrsCheck(false)
      return;
    }
    else(e.target.name == 'MRS')
    {
      setTitle('MRS')
      setMrCheck(false)
      setMsCheck(false)
      setMrsCheck(true)
      return;
    }
  }

  const filterHanlder = async(page?:string) =>{
    
    // if(page)
    // {
    //   router.push(`/dashboard/filter?page=1`)
    // }
    try
    {
      setLoader(true)
      let query:any={};

      if(startDate.length>0 && endDate.length>0)
      {
        let currentDate = "2024-04-13";
        let currentDateObj = new Date(endDate);
        currentDateObj.setDate(currentDateObj.getDate() + 1);
        currentDate = currentDateObj.toISOString().split('T')[0];
        query["createdAt"]= {$gte: startDate,$lte: currentDate}
      
      }

      if(email.length>0 )
      {
        query["email"] = email;
      }
      if(phone.length>0)
      {
        query["phone"] = phone;
      }
      if(fileName.length>0)
      {
        query["fileName"] = fileName;
      }
      if(city.length>0)
      {
        query["city"] = city;
      }
      if(state.length>0)
      {
        query["state"] = state;
      }
      if(province.length>0)
      {
        query["province"] = province;
      }
      if(bankName.length>0)
      {
        query["bankName"] = bankName;
      }
      if(postalCode.length>0)
      {
        query["postalCode"] = postalCode;
      }
      if(age.length>0)
      {
        const currentDate = new Date();
        const birthYear = currentDate.getFullYear() - parseInt(age);
        const dob = new Date(birthYear, currentDate.getMonth(), currentDate.getDate());
    
        query["dob"] = dob;
      }

      if(name.length>0)
      {
        query["name"] = name;
      }
      if(countryCode.length>0)
      {
        query["countryCode"] = countryCode;
      }
      if(vehicle.length>0)
      {
        query["vehicle"] = vehicle;
      }
      if(idNumber.length>0)
      {
        query["idNumber"] = idNumber;
      }
      if(gender.length>0)
      {
        query["gender"] = gender;
      }
      if(title.length>0)
      {
        query["title"] = title;
      }
      if(vehicle.length>0)
      {
        query["vehicle"] = vehicle;
      }

      if(idNumber.length>0)
      {
        query["idNumber"] = idNumber;
      }
       
      const res = await axios.post(`http://localhost:4000/api/get/filterLeads?page=${page}`,{query},{

        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type':'application/json'
        }
      })
      setData(res.data.data)
      setTotalPages(res.data.totalPages)
    }
    catch(e)
    {
      toast.error("Error")
    }
    finally
    {
      setLoader(false)
    }
  }

  async function downloadAllFilteeredLeads(e:any)
{
  e.preventDefault();
  setLoader(true)
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
             console.log(lead)
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

  return (
    <div className={styles.container}>
        <div className={styles.left}>
            <div className={styles.filterHeder}>
                <h1 onClick={()=>filterHanlder('1')} className={styles.filterHeaderText}>Filter</h1>
            </div>
          
            
            <div className={styles.filterLayout}>

                <h1 className='pl-5 pt-10'>Gender:</h1>
                <div className='flex flex-col  justify-center items-center pr-20 pt-2'>
                  <label className={styles.clCheckbox}>
                      <div className='flex w-10'>
                      <input checked={maleCheck} name={'M'} value={'M'} onChange={(e)=>changeHanlder(e)} className={styles.input} type="checkbox"/>
                      <span className={styles.span}></span>
                      <label>M</label>
                      </div>
                  </label>
                  <span className='py-1'/>
                  <label className={styles.clCheckbox}>
                      <div className='flex w-10'>
                      <input checked={femaleCheck} name={'F'} value={'F'} onChange={(e)=>changeHanlder(e)} className={styles.input} type="checkbox"/>
                      <span className={styles.span}></span>
                      <label>F</label>
                      </div>
                  </label>
                  <span className='py-1'/>
                  <label className={styles.clCheckbox}>
                      <div className='flex w-10'>
                      <input checked={gender == "" ? true : false}  name={'both'} value={''} onChange={(e)=>{setGender('');setMaleCheck(false);setFemaleCheck(false)}} className={styles.input} type="checkbox"/>
                      <span className={styles.span}></span>
                      <label>Both</label>
                      </div>
                  </label>                
                </div>
                <h1 className='pl-5 pt-10'>Title:</h1>
                <div className='flex flex-col  justify-center items-center pr-20 pt-2'>
                <label className={styles.clCheckbox}>
                      <div className='flex w-10'>
                      <input checked={mrchech} name={'MR'} value={'Mr'} onChange={(e)=>changeHanlder(e)} className={styles.input} type="checkbox"/>
                      <span className={styles.span}></span>
                      <label>Mr</label>
                      </div>
                  </label>
                  <span className='py-1'/>
                  <label className={styles.clCheckbox}>
                      <div className='flex w-10'>
                      <input checked={msCheck} name={'MS'} value={'Ms'} onChange={(e)=>changeHanlder(e)} className={styles.input} type="checkbox"/>
                      <span className={styles.span}></span>
                      <label>Ms</label>
                      </div>
                  </label>
                  <span className='py-1'/>
                  <label className={styles.clCheckbox}>
                      <div className='flex w-10'>
                      <input checked={mrsCheck} name={'MRS'} value={'Mrs'} onChange={(e)=>changeHanlder(e)} className={styles.input} type="checkbox"/>
                      <span className={styles.span}></span>
                      <label>Mrs</label>
                      </div>
                  </label>
                  <span className='py-1'/>
                  <label className={styles.clCheckbox}>
                      <div className='flex w-10'>
                      <input checked={title == "" ? true : false}  value={''} onChange={(e)=>{setTitle('');setMrCheck(false);setMsCheck(false);setMrsCheck(false)}} className={styles.input} type="checkbox"/>
                      <span className={styles.span}></span>
                      <label>All</label>
                      </div>
                  </label>
                </div>
                <h1 className='pl-5 pt-10'>Date:</h1>
                <div className='flex flex-col  justify-center items-center pr-20 pt-2'>
                  <div>
                  <input onChange={(e)=>{setStartDate(e.target.value)}} type='date' className=' ml-12  placeholder:text-black w-5 '/>
                  <label className='ml-5'>{startDate ? startDate.slice(2) : `Start Date`}</label>
                  </div>
                  <span className='py-1'/>
                  <div>
                  <input onChange={(e)=>{seetEndDate(e.target.value)}}  type='date' className={`${endDate.length == 0 ? 'ml-10' :'ml-12'} placeholder:text-black w-5`}  />
                  <label className='ml-5'>{endDate ? endDate.slice(2) : `End Date`}</label>
                  </div>
                </div>
                <h1 className='pl-5 pt-10'>Country code:</h1>
                <div className='flex flex-col justify-center pl-10 pt-2 '>
                        <select 
                        className='w-40 text-gray bg-transparent outline-none border-2 rounded-md '
                        
                    onChange={(e)=>{setCountryCode(e.target.value)}}
                    name="title" id="title" >
                    <option value={''} selected >Country Code</option>
                    <option value={'+43'} >🇦🇹 Austria (+43)</option>
                    <option value={'+32'} >🇧🇪 Belgium (+32)</option>
                    <option value={'+359'}  >🇧🇬 Bulgaria (+359)</option>
                    <option value={'+385'}  >🇭🇷 Croatia (+385)</option>
                    <option value={'+420'}  >🇨🇿 Czech (+420)</option>
                    <option value={'+45'}  >🇩🇰 Denmark (+45)</option>
                    <option value={'+372'}  >🇪🇪 Estonia (+372)</option>
                    <option value={'+358'}  >🇫🇮 Finland (+358)</option>
                  </select>
                </div>
            </div>
        </div>
        <span  className='px-5' />
        <div className={styles.right}>
          <div className='flex justify-evenly items-center mt-5'>
            <Search state={email} setState={setEmail} placholder={'Email'} />
            <Search state={phone} setState={setPhone} placholder={'Phone'} />
            <Search state={fileName} setState={setFileName} placholder={'File name'} />
          </div>
          <div className='flex justify-evenly items-center'>
            <Search state={city} setState={setCity} placholder={'City'} />
            <Search state={state} setState={setState} placholder={'State'} />
            <Search state={province} setState={setProvince} placholder={'Province'} />
          </div>
          <div className='flex justify-evenly items-center'>
            <Search state={bankName}  setState={setBankName} placholder={'Bank name'} />
            <Search state={postalCode} setState={setPostalCode} placholder={'Postal code'} />
            <Search state={age} setState={setAge} placholder={'Age'} />
          </div>
          <div className='flex justify-evenly items-center'>
            <Search state={name} setState={setName} placholder={'Name'} />
            <Search state={vehicle} setState={setVichle} placholder={'Vehicle'} />
            <Search state={idNumber} setState={setIdNumber} placholder={'ID Number'} />
          </div>
            <hr className='mt-5'/>
            <div className={styles.resultBox}>
             {data && <Leads data={data} page={page} totalPages={totalPages} func={downloadAllFilteeredLeads} />}
            </div>
        </div>
    </div>
  )
}

export default Filter