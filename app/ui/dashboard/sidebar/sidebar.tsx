'use client'
import React, { useEffect } from 'react'
import styles from './sidebar.module.css'
import { RiRobot2Fill } from "react-icons/ri";
import { IoIosAddCircle } from "react-icons/io";
import { FaFilter ,  FaFile } from "react-icons/fa";
import { MdDashboard, MdSupervisedUserCircle, MdQuestionAnswer, MdShoppingBag, MdAttachMoney, MdWork, MdAnalytics, MdPeople, MdOutlineSettings, MdHelpCenter, MdLogout } from 'react-icons/md';
import MenuLink from './menuLink/menuLink';
import Image from 'next/image';
import { useMyContext } from '@/app/Context/MyContextProvider';
import { FaKey } from "react-icons/fa";
import { IoIosSettings } from "react-icons/io";

interface SideBarProps  {
  user:any,
  id:any
}
const sidebar:React.FC<SideBarProps> = ({user,id}) => {
  const { router , LogOut ,  userRole } = useMyContext()

  const menuItemsAdmin = [
    {
      title: "Pages",
      list: [
        {
          title: "Dashboard",
          path: "/dashboard",
          icon: <MdDashboard />,
        },
        {
          title: "Data Requests",
          path: "/dashboard/dataRequests?page=1",
          icon: <MdQuestionAnswer />,
        },
        {
          title: "Employees",
          path: "/dashboard/employees?page=1",
          icon: <MdSupervisedUserCircle />,
        },
        {
          title: "Clients",
          path: "/dashboard/clients?page=1",
          icon: <MdSupervisedUserCircle />,
        },
      ],
    },
    {
      title: "Work",
      list: [
        {
          title: "Add Leads",
          path: "/dashboard/addData",
          icon: <IoIosAddCircle />,
        },
        // {
        //   title: "View Leads",
        //   path: "/dashboard/view",
        //   icon: <MdAnalytics />,
        // },
        {
          title: "Filter Leads",
          path: "/dashboard/filter?page=1",
          icon: <FaFilter />,
        },
      ],
    },
    // {
    //   title: "Bot",
    //   list: [
    //     {
    //       title: "Api Key",
    //       path: "/dashboard/apiKey",
    //       icon: <FaKey />,
    //     },
    //     {
    //       title: "Vici Dailer Reports",
    //       path: "/dashboard/reports",
    //       icon: <FaFile />,
    //     },
    //     {
    //       title: "Scripted ChatBot",
    //       path: "/dashboard/bot",
    //       icon: <RiRobot2Fill />,
    //     },
        
        
    //     {
    //       title: "Settings",
    //       path: "/dashboard/settings",
    //       icon: <IoIosSettings />,
    //     },
    //   ],
    // },
    // {
    //   title: "Future ",
    //   list: [
    //     {
    //       title: "Ai ChatBot",
    //       path: "/dashboard/aibot",
    //       icon: <RiRobot2Fill />,
    //     },
    //   ],
    // },
    {
      title: "Exist ",
      list: [
      ],
    },
  ];
  
const menuItemsEmployee =[
  {
    title: "Pages",
    list: [
      {
        title: "Clients",
        path: "/dashboard/clients?page=1",
        icon: <MdSupervisedUserCircle />,
      },
    ],
  },
  {
    title: "Work",
    list: [
      {
        title: "Add Leads",
        path: "/dashboard/addData",
        icon: <IoIosAddCircle />,
      },
      {
        title: "View Leads",
        path: `/dashboard/employees/${id}?view=leads&page=1`,
        icon: <MdAnalytics />,
      },
      {
        title: "Filter Leads",
        path: "/dashboard/filter?page=1",
        icon: <FaFilter />,
      },
    ],
  },
  // {
  //   title: "Other",
  //   list: [
  //     {
  //       title: "Report",
  //       path: "/dashboard/settings",
  //       icon: <FaFile />,
  //     },
  //     {
  //       title: "Chat Bot",
  //       path: "/dashboard/bot",
  //       icon: <RiRobot2Fill />,
  //     },
  //   ],
  // },
   {
    title: "Exist",
    list: [
      // {
      //   title: "Report",
      //   path: "/dashboard/settings",
      //   icon: <FaFile />,
      // },
      // {
      //   title: "Chat Bot",
      //   path: "/dashboard/bot",
      //   icon: <RiRobot2Fill />,
      // },
    ],
  },
]
const menuItemsClient =[
  {
    title: "Pages",
    list: [
      {
        title: "View Leads",
        path: `/dashboard/clients/${id}?view=leads&page=1`,
        icon: <MdAnalytics />,
      },
    ],
  },
  // {
  //   title: "Work",
  //   list: [
  //     {
  //       title: "Add Leads",
  //       path: "/dashboard/addData",
  //       icon: <IoIosAddCircle />,
  //     },
  //     {
  //       title: "View Leads",
  //       path: `/dashboard/employees/${id}?view=leads&page=1`,
  //       icon: <MdAnalytics />,
  //     },
  //     {
  //       title: "Filter Leads",
  //       path: "/dashboard/filter",
  //       icon: <FaFilter />,
  //     },
  //   ],
  // },
  // {
  //   title: "Other",
  //   list: [
  //     {
  //       title: "Report",
  //       path: "/dashboard/settings",
  //       icon: <FaFile />,
  //     },
  //     {
  //       title: "Chat Bot",
  //       path: "/dashboard/bot",
  //       icon: <RiRobot2Fill />,
  //     },
  //   ],
  // },
   {
    title: "Exist",
    list: [
      // {
      //   title: "Report",
      //   path: "/dashboard/settings",
      //   icon: <FaFile />,
      // },
      // {
      //   title: "Chat Bot",
      //   path: "/dashboard/bot",
      //   icon: <RiRobot2Fill />,
      // },
    ],
  },
]

  // useEffect(()=>{
  //   getUserRole()
  // },[])
  
  return (
    <div className={styles.container}>
      <div className={styles.user}>
        <Image
          onClick={()=>router.push('/login')}
          className={styles.userImage}
        //   src={user.img || "/one.png"}
        src={"/logo.png"}
          alt=""
          width="150"
          height="50"
        />
        <div className={styles.userDetail}>
          <span className={styles.username}>Codevengers</span>
          <span className={styles.userTitle}>Administrator</span>
        </div>
      </div>
      <ul className={styles.list}>
        {userRole == "Admin" && (
          <>
       { menuItemsAdmin.map((cat) => (
          <li key={cat.title}>
            <span className={styles.cat}>{cat.title}</span>
            {cat.list.map((item) => (
              <MenuLink item={item} key={item.title} />
            ))}
          </li>
         ))}
          </>
        )}
        {userRole == "Employee" && (
          <>
       { menuItemsEmployee.map((cat) => (
          <li key={cat.title}>
            <span className={styles.cat}>{cat.title}</span>
            {cat.list.map((item) => (
              <MenuLink item={item} key={item.title} />
            ))}
          </li>
         ))}
          </>
        )}
        {userRole == "Client" && (
          <>
       { menuItemsClient.map((cat) => (
          <li key={cat.title}>
            <span className={styles.cat}>{cat.title}</span>
            {cat.list.map((item) => (
              <MenuLink item={item} key={item.title} />
            ))}
          </li>
         ))}
          </>
        )}
        
      </ul>
      <form
        onSubmit={(e)=>{LogOut(e)}}
      >
        <button className={styles.logout}>
          <MdLogout />
          Logout
        </button>
      </form>
    </div>
  )
}

export default sidebar