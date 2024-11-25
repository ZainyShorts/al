
'use client'
import Image from "next/image";
import styles from "./events.module.css";
import { MdPlayCircleFilled } from "react-icons/md";
import { RiRobot2Fill } from "react-icons/ri";
import { usePathname } from "next/navigation";
const Events = () => {
  const pathname = usePathname();

  return (
    <div className={styles.container}>
    <div className={styles.item}>
      <div className={styles.bgContainer}>
        <Image className={styles.bg} src="/astronaut.png" alt="" fill />
      </div>
      <div className={styles.text}>
        <span className={styles.notification}>🔥 Available Now</span>
       { !pathname.includes('/dashboard/bot') ? <h3 className={styles.title}>
          How to use the new version of the admin dashboard?
        </h3> : <h3 className={styles.title}>
          How to use the and train your bot?
        </h3>}
        <span className={styles.subtitle}>Takes 4 to 5 minutes to learn</span>
        { !pathname.includes('/dashboard/bot') ? <p className={styles.desc}>
          If you watch this video you will learn all the functionality that this dashboard gives you.
        </p>:<p className={styles.desc}>
          If you watch this video you will learn know how powerful this bot is 🤖.
        </p>}
        <button className={styles.button}>
          <MdPlayCircleFilled />
          Watch
        </button>
      </div>
    </div>
   {!pathname.includes('/dashboard/bot') && <div className={styles.item}>
    <div className={styles.bgContainer}>
        <Image className={styles.bg} src="/robot.png" alt="" fill />
      </div>
      <div className={styles.text}>
        <span className={styles.notification}>🚀 Coming Soon</span>
        <h3 className={styles.title}>
        Prepare for a revolutionary experience as our advanced chatbot gears up.
        </h3>
        <span className={styles.subtitle}>Boost your productivity</span>
        
        <button className={styles.button}>
          <RiRobot2Fill />
          Waiting ... 
        </button>
      </div>
    </div>}
  </div>
  )
}

export default Events