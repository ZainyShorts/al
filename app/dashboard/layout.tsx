'use client'
import React, { useEffect } from "react";
import Navbar from "../ui/dashboard/navbar/navbar"
import Sidebar from "../ui/dashboard/sidebar/sidebar"
import styles from '../ui/dashboard/dashboard.module.css';
import Footer from "../ui/dashboard/footer/footer";
import { useMyContext } from "../Context/MyContextProvider";
import { usePathname } from "next/navigation";
import Loader from '../components/loading/Loading'
export default function Layout({children}: {children: React.ReactNode}) {
  const { user ,getUserData ,loader,getUserRole } = useMyContext()
  const pathname = usePathname()

  useEffect(()=>{
    getUserRole()
    getUserData();

  },[])

  const id = localStorage.getItem('id')

  if(pathname != '/dashboard/addData/preview' && pathname!= '/dashboard/viewExcel' )
  {

   return (
    <div className={styles.container}>
        <div className={styles.menu}>
            <Sidebar id={id}  user={user}/>
        </div>
        <div className={styles.content}>
            <Navbar />
            {loader && <Loader/>}
            {children}
            <Footer/>
        </div>
     </div>
   )
  }
else{
  return(
    <>
    <Navbar />
    {children}
    </>
  )
}
 }
 