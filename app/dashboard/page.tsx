'use client'
import React, { useEffect } from 'react'
import styles from '../ui/dashboard/dashboard.module.css'
import Card from '../ui/dashboard/card/card'
import Events from '../ui/dashboard/events/events'
import Table from '../ui/dashboard/table/table'
import Chart from '../ui/dashboard/chart/chart'
import { useMyContext } from '../Context/MyContextProvider'

const Dashboard = () => {
  const {  noOFClients , noOFEmployees , noOfLeads , dashboardFetchDataLength , listOfFour , latestFourCreatedUsers ,getUserRole } = useMyContext()
  useEffect(()=>{
    dashboardFetchDataLength();
    latestFourCreatedUsers();
    // getUserRole();
  },[])
  const items = [
    {
      id: 1,
      title: "Employees",
      number: noOFEmployees,
      change: 12,
    },
    {
      id: 2,
      title: "Clients",
      number: noOFClients,
      change: -2,
    },
    {
      id: 3,
      title: "Total Leads",
      number: noOfLeads,
      change: 18,
    },
  ];

  return (
    <div className={styles.wrapper}>
      <div className={styles.main }>
        <div className={styles.cards}>
        {items.map((item) => (
            <Card items={item} key={item.id} />
          ))}
        </div>
        <Table listOfFour={listOfFour}/>
        <Chart/>
     </div>
     <div className={styles.side}>
          <Events/>
     </div>
  </div>
  )
}

export default Dashboard