import React from 'react'
import Image from 'next/image'
import styles from '../../ui/dashboard/dashboard.module.css'
import Events from '@/app/ui/dashboard/events/events'
import Link from 'next/link'
export default function Layout({children}: {children: React.ReactNode}) {
    
  return (
    <>
    <div className={styles.container}>
        <div className={styles.left}>
            <div className={styles.filterHeder}>
               <Link  href={"/dashboard/bot"}> <Image  alt='Bot' src={"/bot.png"} width={100} height={100}   className={styles.filterHeaderText}/></Link>
            </div>
          
            

                <div className='flex flex-col  h-full  items-center justify-evenly pt-10'>

                <Link href={"/dashboard/aibot/ai-training"}  className={styles.button}> Train Bot    </Link>     

                <Link href={"/dashboard/aibot/scripts"}  className={styles.button}> View Scripts    </Link>        

                <Link href={"/dashboard/aibot/training"}   className={styles.button}> Add Leads    </Link>           

                <Link href={"/dashboard/aibot/training"}   className={styles.button}> Start Bot    </Link>   

                <Link href={"/dashboard/aibot/reports"}   className={styles.button}> Report       </Link>  

                </div>

            
        </div>
        <span  className='px-5' />
        <div className={styles.right}>

         {children}

    </div>
          
          <div className={`${styles.side} pl-10 pt-10`}>
          <Events/>
       </div>


    </div>
    </>

  )
}
