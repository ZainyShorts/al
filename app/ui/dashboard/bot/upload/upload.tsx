
import Link from 'next/link';
import { FaFileAudio } from "react-icons/fa";
import styles from './upload.module.css'
import { CiText } from "react-icons/ci";

const Upload = () => {
    const naviagte = (msg:String) => alert(msg);
    
  return (
    <>
    <div className={styles.container}>
  <Link href={'/dashboard/bot/training/script'}>
    <label className={styles.customFileUpload}>
        <div className={styles.icon}>
        <CiText className={styles.svg} size={50} />
        </div>
        <div className={styles.text}>
        <span className={styles.span}>Upload Script</span>
        </div>
    </label>
  </Link>
<br/>
{/* <Link href={'/dashboard/addData/manual'}> */}
<label onClick={()=>naviagte('Record feature not available')} className={styles.customFileUpload}>
    <div className={styles.icon}>
    <FaFileAudio  size={60} className={styles.svg}/>
    </div>
    <div className={styles.text}>
    <span className={styles.span}>Record Script</span>
    </div>
</label>
{/* </Link> */}
    </div>
    </>
  )
}

export default Upload