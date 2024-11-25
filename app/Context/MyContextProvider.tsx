'use client'
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createContext, useContext, ReactNode, useState } from 'react';
import toast from 'react-hot-toast';
import axios from 'axios';
import * as XLSX from 'xlsx';
import Leads from '../ui/dashboard/users/view/EmployeeView/Leads';
import Cookies from 'js-cookie';






type MyContextType = {
  //State
  email:string,
  password:string,
  username:string,
  msg:string,
  phone:string,
  address:string,
  access:string,
  role:string,
  noOFEmployees:number,
  noOFClients:number,
  noOfLeads:number,
  work:any,
  totalPages:any,
  user:any,
  format:string,
  data:any,
  fileName:any,
  viewSingleLead:any,
  clients:any,
  query:any,
  userRole:any,
  searching:any,
  level:any,
  group:any,
  
  //lists
  listOfRequests:any,
  listOfFour:any,
  listOfEmployees:any,
  listOfClients:any,
  loader:any,
  
  
  
  //setState
  setEmail:(value:string)=>void,
  setPassword:(value:string)=>void,
  setMsg:(value:string)=>void,
  setUsername:(value:string)=>void,
  setPhone:(value:string)=>void,
  setAddress:(value:string)=>void,
  setAccess:(value:string)=>void,
  setRole:(value:string)=>void,
  setFormat:(value:string)=>void,
  setData:(value:any)=>void,
  setFileName:(value:any)=>void,
  setUserRole:(value:any)=>void,
  setSearching:(value:boolean)=>void,
  setWork:any,
  setViewSingleLead:any,
  setLoader:any
  setClients:any,
  setQuery:any,
  setLevel:any,
  setGroup:any,
  //function
  Login:any,
  sendRequest:any,
  createUser:any,
  fetchRequests:any,
  deleteClientRequest:any,
  dashboardFetchDataLength:any,
  latestFourCreatedUsers:any,
  addManualWork:any,
  fetchAllEmployees:any,
  fetchAllClients:any,
  fetchSingleUser:any,
  updateUser:any,
  searchUsers:any,
  getUserData:any,
  LogOut:any,
  uploadExcelFileWork:any,
  fetchSingleUserWork:any,
  downloadSingleExcel:any,
  updateLead:any,
  deleteLead:any,
  searchleads:any,
  getTimeStamp:any,
  searchClientsForShare:any,
  assignLeads:any,
  delSingleClientSharredLead:any,
  fetchSingleClientLeads:any,
  getUserRole:any,
  //Router
  router:any,
  

  


};

const MyContext = createContext<MyContextType | undefined>(undefined);

type MyContextProviderProps = {
  children: ReactNode;
};


const MyContextProvider: React.FC<MyContextProviderProps> = ({ children }) => {
  
  const url = process.env.NEXT_PUBLIC_URL;
  const method1 = process.env.NEXT_PUBLIC_METHOD1;
  const method2 = process.env.NEXT_PUBLIC_METHOD2;
  // navigating router 
  const router = useRouter()

  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const [username,setUsername] = useState('')
  const [msg,setMsg] = useState('')

  //
  const [user,setUser] = useState({})

  //Loader toggle
  const [loader,setLoader] = useState(false)

  //createUser
  const[phone,setPhone] = useState<string>('')
  const[address,setAddress] = useState<string>('')
  const[role,setRole ] = useState<string>('Employee')
  const[access,setAccess] = useState('Yes')
  const [userRole,setUserRole]=useState("");
  const [level,setLevel]=useState(1);
  const [group,setGroup]=useState("AGENTS")

  //Dashboard
  const[noOFEmployees,setNoOfEmployee]=useState(0);
  const[noOFClients,setNoOfClients] = useState(0)
  const[noOfLeads,setNoOfLeads] = useState(0)
  const[listOfFour,setListOfFour] = useState([])
  //Request
  const [listOfRequests,setListofRequests]=useState([])

  //Employee
  const [listOfEmployees,setListOfEmployees]=useState([]);
  const [totalPages,setTotalPages]=useState(0)

  //Clients
  const [listOfClients,setListOfClients]=useState([]);

  //upload work
  const [format , setFormat] = useState('');
  const [data, setData] = useState([]);
  const [fileName,setFileName] = useState('')

  //Work
  let userId;
  const [work,setWork] = useState({
    'userId':userId,
    'fileName':'',
    'phone':'',
    'title':'Mr',
    'firstName':'',
    'middleName':'',
    'lastName':'',
    'address1':'',
    'address2':'',
    'address3':'',
    'city':'',
    'state':'',
    'province':'',
    'postalCode':'',
    'countryCode':'',
    'email':'',
    'gender':'M',
    'idNumber':'',
    'dob':'',
    'altPhone':'',
    'vehicle':'',
    'bankName':'',
    'statusName':''
  })
  const [viewSingleLead,setViewSingleLead]=useState([]);

  //share
  const [clients,setClients]=useState([]);
  const [query,setQuery]=useState("");

  //searching
  const [searching,setSearching] = useState(false)


  // useEffect(()=>{
  //   getUserRole()
  //   return(()=>{
  //     setUserRole("")
  //   })
  // },[])

  const getUserRole = async()=>{
    try{
      const res = await axios.get(`${url}${method2}/getUserRole`,{
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type':'application/json'
        }
      });
    console.log(res.data.role)
    if(res.data.success == true)
    {
      setUserRole(res.data.role)
    }
  }
  catch(e)
  {
      toast.error('Server error')
  }
  finally
  {
    setLoader(false)
  }
  }

  //User Apis
  const Login = async(e:any) =>{
    e.preventDefault()
    setLoader(true)
    try
    { 
      const res = await axios.post(`${url}${method1}/signIn`,{email,password});

      if(res.data.success == true)
      {
        setEmail('')
        setPassword('')
        // setUserRole(res.data.role)
        toast.success('Logged in')
        localStorage.setItem('token',res.data.token);
        // Cookies.set('token', res.data.token)
        router.push('/dashboard')
      }else{
        toast.error(res.data.msg)
      }
    }
    catch(e)
    {
        toast.error('Server error')
    }
    finally
    {
      setLoader(false)
    }
  }

  const createUser = async(e:any) =>{
    e.preventDefault()
    setLoader(true)
    try
    { 
      const res = await axios.post(`${url}${method1}/createUser`,{username,email,password,phone,address,access,role,group,level},{


        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type':'application/json'
        }
      });
      if(res.data.success == true)
      {
        try{
          await axios.post(`http://drc.cloudcall.co.za/vicidial/non_agent_api.php?source=test&function=add_user&user=6666&pass=goautodial44123&agent_user=${username}&agent_pass=${password}&agent_user_level=${level}&agent_full_name=${username}&agent_user_group=${group}`)
        }catch(e)
        {
          console.log(e)
        }
        setEmail('')
        setPassword('')
        setPhone('')
        setAddress('')
        setUsername('')
        toast.success('User created')
        router.push('/dashboard')
      }else{
        toast.error(res.data.msg)
      }
    }
    catch(e)
    {
        toast.error('Server error')
    }finally
    {
      setLoader(false)
    }
  }

  const fetchSingleUser = async(id:string)=>{
    setLoader(true)
    try
    { 
      const res = await axios.get(`${url}${method2}/fetchSingleUser?id=${id}`,{

        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type':'application/json'
        }
      });
      // // console.log(res)(res)
      if(res.data.success == true)
      {
        setEmail(res.data.users.email)
        setPhone(res.data.users.phone)
        setAddress(res.data.users.address)
        setUsername(res.data.users.username)
        setAccess(access)
      }
    }
    catch(e)
    {
        toast.error('Failed to load user data')
    }finally
    {
      setLoader(false)
    }
  }

  const updateUser = async (e:any,id:string) =>{
    e.preventDefault()
    setLoader(true);
    try
    { 
      const res = await axios.post(`${url}${method1}/updateUser`,{id,email,address,phone,access,username},{

        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type':'application/json'
        }
      });
      if(res.data.success == true)
      {
        toast.success('User data updated');
        router.push('/dashboard')
        setEmail('')
        setPhone('')
        setAddress('')
        setUsername('')
        setAccess('Yes')
      }else{
        toast.error('Failed to update user data')
      }
    }
    catch(e)
    {
        toast.error('Failed to update user data')
    }
    finally
    {
      setLoader(false)
    }
  }

  const fetchAllEmployees = async(page:string)=>{
    setLoader(true)
    try{
      const res = await axios.get(`${url}${method2}/fetchAllEmployee?page=${page}`,{

        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type':'application/json'
        }
      });

      if(res.data.success == true)
      {
        setListOfEmployees(res.data.users)
        setTotalPages(res.data.totalPages)
      }
    }catch(e)
    {
      toast.error('Error in fetching data from databse')
    }
    finally
    {
      setLoader(false)
    }
  }
  const fetchAllClients = async(page:string)=>{
    setLoader(true)
    try{
      const res = await axios.get(`${url}${method2}/fetchAllClients?page=${page}`,{
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type':'application/json'
        }
      });
      // // console.log(res)(res)

      if(res.data.success == true)
      {
        setListOfClients(res.data.users)
        setTotalPages(res.data.totalPages)
      }
    }catch(e)
    {
      toast.error('Error in fetching data from databse')
    }
    finally
    {
      setLoader(false)
    }
  }

  //search Employee And Clients
  const searchUsers = async(search:string,role:string,page:string)=>{
    // setLoader(true)
    setSearching(true)
    try{
     
      if(search.length < 1){
        setSearching(false)
        if(role=='Employee'){
          setListOfEmployees([])
          fetchAllEmployees(page);
        }
        else{
          setListOfClients([])
          fetchAllClients(page)
        }
        return;
      }
      const res = await axios.get(`${url}${method2}/searchUser?role=${role}&search=${search}`,{
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type':'application/json'
        }
      });
        // // console.log(res)(res.data.users)
      if(res.data.success == true)
      {
        if(role == 'Employee')
        {
          setListOfEmployees(res.data.users)
        }
        else{
          setListOfClients(res.data.users)
        }
      }
    }catch(e)
    {
      toast.error('Error in fetching data from databse')
    }
    finally
    {
      // setLoader(false)
    }
  }

  const searchClientsForShare = async(search:string,onchange:string)=>{
    // setLoader(true)
    try{
      setQuery(onchange)
      if(search.length < 1){
          setClients([])
        return;
      }
      const res = await axios.get(`${url}${method2}/searchClient?role=Client&search=${search}`,{
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type':'application/json'
        }
      });
      if(res.data.success == true)
      {
          setClients(res.data.users)        
      }
    }catch(e)
    {
      toast.error('Error in fetching data from databse')
    }
    finally
    {
      // setLoader(false)
    }
  }
  const assignLeads = async(clientId:any,leads:any) =>{
    setLoader(true)
    try{

        const res = await axios.post(`${url}${method1}/share`,{clientId,leads},{
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type':'application/json'
          }
        });
        if(res.data.success == true)
        {

          toast.success('Leads Assigned');
          setQuery("")
          setClients([])
          router.push('/dashboard');
        }else{
          toast.success('Server down');
        }
      }catch(e)
      {
        toast.error('Error in fetching data from databse')
      }
      finally
    {
      setLoader(false)
    }
  }

  const searchleads = async(search:string)=>{
    // setLoader(true)
    try{
        if(search.length<1){
          setSearching(false)
        }
        setSearching(true)
        const res = await axios.get(`${url}${method2}/searchleads?search=${search}&userId=${localStorage.getItem('id')}`,{
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type':'application/json'
          }
        });
        
        // // console.log(res)(res.data.leads)
        if(res.data.success == true)
        {
          setData(res.data.leads)
          
        }
      // }
      }catch(e)
      {
        toast.error('Error in fetching data from databse')
      }
      finally
    {
      // setLoader(false)
    }
  }

  //Dashboard Apis
  const dashboardFetchDataLength = async()=>{
    setLoader(true)
    try
    {
      const res = await axios.get(`${url}${method2}/dashboardFetchDataLength`,{
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type':'application/json'
        }
      })
      // // console.log(res)(res)
      if(res.data.success == true)
      {
        setNoOfEmployee(res.data.employees)
        setNoOfClients(res.data.clients)
        setNoOfLeads(res.data.work)
      }else{
        toast.error('Error')
      }
    }catch(e)
    {
      toast.error('Error')
    }
    finally
    {
      setLoader(false)
    }
  }

  const latestFourCreatedUsers = async()=>{
    setLoader(true)
    try
    {
      const res = await axios.get(`${url}${method2}/latestFourCreatedUsers`,{
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type':'application/json'
        }
      })
      // console.log(res)(res)
      if(res.data.success == true)
      {
        setListOfFour(res.data.users)
      }
    }catch(e)
    {
      toast.error('Error')
    }
    finally
    {
      setLoader(false)
    }
  }

  // Request Model Apis
  const sendRequest = async(e:any)=>{
    e.preventDefault()
    setLoader(true)
    try
    { // console.log(res)(`${url}${method1}/sendRequest`)
      const res = await axios.post(`${url}${method1}/sendRequest`,{username,email,msg});
      if(res.data.success == true)
      {
        setUsername('')
        setEmail('')
        setMsg('')
        toast.success(res.data.msg)
      }else{
        toast.error(res.data.msg)
      }
    }
    catch(e)
    {
        toast.error('Server error try again')
    }
    finally
    {
      setLoader(false)
    }
  }

  const fetchRequests = async(page:string)=>{
    setLoader(true)
    try
    {
      const res = await axios.get(`${url}${method2}/fetchRequest?page=${page}`,{

        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type':'application/json'
        }
      })
      if(res.data.success == true)
      {
        setListofRequests(res.data.requests)
        setTotalPages(res.data.totalPages)
      }else{
        toast.error('Error in fetching data from database')
      }

    }
    catch(e)
    {
      toast.error('Error in fetching data from database')
    }
    finally
    {
      setLoader(false)
    }
  }

  const deleteClientRequest = async(e:any,id:string)=>{
    setLoader(true)
    try
    {
      const res = await axios.post(`${url}${method1}/deleteRequestById`,{id},{
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type':'application/json'
        }
      })
      // console.log(res)(res)
      if(res.data.success == true)
      {
        toast.success('Request deleted successfully')
        setListofRequests(res.data.requests);
      }else{
        toast.error('Error')
      }
    }catch(e)
    {
      toast.error('Error')
    }
    finally
    {
      setLoader(false)
    }
  }

  //Work
  const addManualWork = async(e:any)=>{
    e.preventDefault();
    setLoader(true)
    
    try
    {
      const res = await axios.post(`${url}${method1}/addManualWork`,{work},{
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type':'application/json'
        }
      })

      if(res.data.success == true)
      {
        // setWork({
        //   'userId': '',
        //   'fileName':'',
        //   'title':'',
        //   'firstName':'',
        //   'middleName':'',
        //   'lastName':'',
        //   'address1':'',
        //   'address2':'',
        //   'address3':'',
        //   'city':'',
        //   'state':'',
        //   'province':'',
        //   'postalCode':'',
        //   'countryCode':'',
        //   'email':'',
        //   'gender':'M',
        //   'idNumber':'',
        //   'dob':'',
        //   'altPhone':'',
        //   'vehicle':'',
        //   'bankName':'',
        //   'statusName':''
        // })
        toast.success(res.data.msg)
        router.push('/dashboard/addData')
        
      }else{
        toast.error(res.data.msg)
      }
    }
    catch(e)
    {
      toast.error('Server Error try again later')
    }
    finally
    {
      setLoader(false)
    }
  }

  const updateLead = async(e:any,docId:string)=>{
    e.preventDefault();
    setLoader(true)
    
    try
    {
      const res = await axios.post(`${url}${method1}/updateLead`,{work,docId},{
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type':'application/json'
        }
      })

      if(res.data.success == true)
      {
        toast.success(res.data.msg)
        router.push('/dashboard')
        
      }else{
        toast.error(res.data.msg)
      }
    }
    catch(e)
    {
      toast.error('Server Error try again later')
    }
    finally
    {
      setLoader(false)
    }
  }

  const uploadExcelFileWork = async()=>{
    if(fileName == ""){
      toast.error('Enter file name')
      return;
    }
    setLoader(true)
    try
    {
      const res = await axios.post(`${url}${method1}/uploadExcelFileWork`,{data,fileName},{
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type':'application/json'
        }
      })
      if(res.data.success == false)
      {
        toast.error(res.data.msg);
      }
      else{
        toast.success(res.data.msg)
        setData([])
        setFileName('')
        router.push("/dashboard")
      }
    }
    catch(e)
    {
      toast.error('Something wrong')
    }
    finally
    {
      setLoader(false)
    }
  }
  
  const fetchSingleUserWork = async(userId:string,page:string)=>{
    setLoader(true)
    try
    {
      const res = await axios.post(`${url}${method2}/fetchSingleUserWork`,{userId,page},{
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type':'application/json'
        }
      })
      if(res.data.success == true)
      {
        // console.log(res)(res.data)
        setData(res.data.leads)
        setTotalPages(res.data.totalPages)
      }
    }
    catch(e)
    {
      toast.error('Failed to fetch leads')
    }
    finally
    {
      setLoader(false)
    }
  }
  const fetchSingleClientLeads = async(clientId:string,page:string)=>{
    setLoader(true)
    try
    {
      // console.log(res)(clientId)
      const res = await axios.get(`${url}${method2}/fetchLeadsByClientId?clientId=${clientId}&page=${page}`,{
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type':'application/json'
        }
      })
      // console.log(res)(res.data)
      if(res.data.success == true)
      {
        setData(res.data.leads)
        setTotalPages(res.data.totalPages)
      }
    }
    catch(e)
    {
      toast.error('Failed to fetch leads')
    }finally{
      setLoader(false)

    }
  }


  const deleteLead = async(e:any,id:string) =>{
    e.preventDefault(); 
    setLoader(true)
    try
    {
      const res = await axios.post(`${url}${method1}/deleteLead`,{id},{
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type':'application/json'
        }
      })

      if(res.data.success == true)
      {
        toast.success(res.data.msg)
        router.push('/dashboard')
        
      }else{
        toast.error(res.data.msg)
      }
    }
    catch(e)
    {
      toast.error('Failed to delete')
    }
    finally
    {
      setLoader(false)
    }
  }

  const delSingleClientSharredLead = async(e:any,clientId:string,leadId:string) =>{
    e.preventDefault(); 
    setLoader(true)
    try
    {
      // console.log(res)(clientId)
      // console.log(res)(leadId)
      const res = await axios.post(`${url}${method1}/delSharedLead`,{clientId,leadId},{
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type':'application/json'
        }
      })

      if(res.data.success == true)
      {
        toast.success("Lead removed")
        setData((prevIds:any) => prevIds.filter((id:any) => id._id !== leadId));
        // router.push('/dashboard/clients?page=1')
        
      }else{
        toast.error("Error whille removing lead")
      }
    }
    catch(e)
    {
      toast.error('Failed to delete')
    }
    finally
    {
      setLoader(false)
    }
  }
  //logout
  const LogOut = (e:any) =>{
    e.preventDefault()
    router.push('/')
    toast.success('Session end');
    localStorage.removeItem('token')
    localStorage.removeItem('id')
    Cookies.remove('token');
    
    
  }


  async function getUserData()
  {
    setLoader(true)
    try
    { 
      const res = await axios.get(`${url}${method2}/getUserData`,{
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type':'application/json'
        }
      });
      if(res.data.success == true)
      {
        userId = res.data.user._id;
        setUser(res.data.user)
        localStorage.setItem("id",res.data.user._id)
      }
    }
    catch(e)
    {
      toast.error('Failed to load user data')
      // localStorage.removeItem('token')
      // router.push('/')
    }
    finally
    {
      setLoader(false)
    }
  }


  //download
  function downloadSingleExcel(data:any) {
    // Sample JSON data
    setLoader(true)
    const jsonData = [
        { phone_number: data[0].phone,
         title: data[0].title,
         first_name: data[0].firstName,
         middle_initial:data[0].middleName,
         last_name:data[0].lastName,
         address1:data[0].address1,
         address2:data[0].address2,
         address3:data[0].address3,
         city:data[0].city,
         state:data[0].state,
         province:data[0].province,
         postal_code:data[0].postalCode,
         country_code:data[0].countryCode,
         gender:data[0].gender,
         date_of_birth:data[0].dob,
         altPhone:data[0].altPhone,
         email:data[0].email,
         ID_Number:data[0].idNumber,
         Vehicle:data[0].vehicle,
         Bank_name:data[0].bankName,
         Status_name:data[0].statusName
         },
    ];

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
    a.download = `${data[0].fileName}.xlsx`;
    a.click();

    // Cleanup
    window.URL.revokeObjectURL(url);
    
      setLoader(false)
    
}

function getTimeStamp(time:string){
  const timev = new Date(time).getTime()
          const date = new Date(timev);
          const hours = date.getHours();
          const minutes = date.getMinutes();
          // const seconds = date.getSeconds();
          // :${seconds.toString().padStart(2, '0')}
          const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
          return formattedTime;
}



  const contextValue: MyContextType = {
    //state
    email,
    password,
    username,
    msg,
    phone,
    address,
    role,
    access,
    listOfRequests,
    noOFEmployees,
    noOFClients,
    noOfLeads,
    listOfFour,
    work,
    listOfEmployees,
    totalPages,
    listOfClients,
    user,
    format,
    data,
    fileName,
    viewSingleLead,
    loader,
    clients,
    query,
    assignLeads,
    userRole,
    searching,
    level,
    group,
    

    //setState 
    setEmail,
    setQuery,
    setPassword,
    setUsername,
    setMsg,
    setAddress,
    setPhone,
    setAccess,
    setRole,
    setWork,
    setFormat,
    setData,
    setFileName,
    setViewSingleLead,
    setLoader,
    setClients,
    setUserRole,
    setSearching,
    setLevel,
    setGroup,

    //function
    Login,
    sendRequest,
    createUser,
    fetchRequests,
    deleteClientRequest,
    dashboardFetchDataLength,
    latestFourCreatedUsers,
    addManualWork,
    fetchAllEmployees,
    fetchAllClients,
    fetchSingleUser,
    updateUser,
    searchUsers,
    getUserData,
    LogOut,
    uploadExcelFileWork,
    fetchSingleUserWork, 
    downloadSingleExcel,
    updateLead,
    deleteLead,
    searchleads,
    getTimeStamp,
    searchClientsForShare,
    delSingleClientSharredLead,
    fetchSingleClientLeads,
    getUserRole,
    //router
    router,
   
    
  };

  


  return <MyContext.Provider value={contextValue}>{children}
  </MyContext.Provider>;
};

const useMyContext:any = () => {
  const context = useContext(MyContext);
  if (!context) {
     throw new Error('Out of MyContextProvider Range');
  }
  return context;
};

export { MyContextProvider, useMyContext };