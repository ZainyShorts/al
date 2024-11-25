import Image from "next/image";
import styles from '../../ui/dashboard/users/singleUser/singleUser.module.css'
import { FaEye } from "react-icons/fa";


const apiKeyPage = () => {
 

  
  
  return (
    <div className={styles.container}>
      <div className={styles.infoContainer}>
        <div className={styles.imgContainer}>
          <Image className={styles.keyImage} src={"/key.jpg"} alt="" fill />
        </div>
      </div>
      <div className={styles.formContainer}>
        <form className={styles.form}>
          <label className="flex  items-center" >Open Ai <FaEye className="cursor-pointer ml-2"  /> </label>
          <input type="text" name="username" placeholder="Add api key here" />
          <label className="flex  items-center">Vici Dailer <FaEye className="cursor-pointer ml-2"  /> </label>
          <input type="text" name="email" placeholder="Add api key here" />
          <label className="flex  items-center">Speech <FaEye className="cursor-pointer ml-2"  /> </label>
          <input type="text" name="phone" placeholder="Add api key here"   />
          
          <button >Save</button>
        </form>
      </div>
    </div>
  );
};

export default apiKeyPage;