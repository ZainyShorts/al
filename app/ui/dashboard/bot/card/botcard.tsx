import React from 'react'
import styles from './botcard.module.css';
import { MdSupervisedUserCircle } from 'react-icons/md';
import Image from 'next/image';
interface Botcard{
    items:any;
    click:any
}
const Botcard:React.FC<Botcard> = ({items,click}) => {
  return (

    <div className={styles.card}>
  <div className={styles.cardBorderTop}>
  </div>
  <div className={styles.img}>
    <Image src={'/bot.png'} alt='AI bot' width={100} height={100} />
  </div>
  {/* <span className={styles.span}> Person</span>
  <p className={styles.job}> Job Title</p> */}
  <button onClick={click} className={styles.button}> {items.title}
  </button>
</div>
  )
};

export default Botcard