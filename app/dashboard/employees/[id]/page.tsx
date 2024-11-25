'use client'
import { useParams } from "next/navigation";
import { useSearchParams } from "next/navigation";
import Profile from '../../../ui/dashboard/users/view/EmployeeView/Profile';
import Leads from "@/app/ui/dashboard/users/view/EmployeeView/Leads";


const singleUserPage = () => {
  const { id } = useParams(); 
  const pageParams = useSearchParams()
  const view = pageParams.get('view')
  const page = pageParams.get('page')


 


  if(view == 'profile')
  {
    return <Profile id={id} view={view}/>
  }
  else
  {
    if (id !== null && page !== null) 
      return <Leads id={id} page={page}   />
  }
  

};

export default singleUserPage;