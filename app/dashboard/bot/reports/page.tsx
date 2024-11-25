'use client'
import React,{useState,useRef} from 'react'
import styles from '../../../ui/dashboard/users/users.module.css'
import { formatDateFromMongoDB } from '@/app/utils/dateFormat'
import { CiText } from "react-icons/ci";
import Modal from '@/app/components/modal/Modal';
const page = () => {

    const [data ,setData] = useState([
      {
          "_id":"1",
          "phone":"03364569588",
          "name":"Zain",
          "status":"✅",
          "date":"5.11.24"
      },
      {
          "_id":"2",
          "phone":"03174668133",
          "name":"ali",
          "status":"❌",
          "date":"5.09.24"
      },
  ])

   function openScript(script:string){
    setContent(script);
    setIsOpen(true)
   }

   const [content,setContent]=useState("")

    const [isPlaying, setIsPlaying] = useState(false);
    const [currentAudio, setCurrentAudio] = useState('');
  
    const playAudio = (path: string) => {
      const audioPlayer = document.getElementById("audioPlayer") as HTMLAudioElement;
  
    //   if (audioPlayer.src === path && isPlaying) {
    //     audioPlayer.pause();
    //     setIsPlaying(false);
    //     setCurrentAudio('')
    //   } else {
        audioPlayer.src = path;
        audioPlayer.play();
        setIsPlaying(true);
        setCurrentAudio(path);
    //   }
    };

    function delObj(id:string){
     
    setData(data.filter(obj => obj._id !== id))
    }

    const pauseAudio = () => {
        const audioPlayer = document.getElementById("audioPlayer") as HTMLAudioElement;
        audioPlayer.pause();
        setIsPlaying(false);
      };

      const [isOpen,setIsOpen]=useState(false);
  return (
    <><Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
      <textarea
        value={content}
        className={styles.textArea}
        name="address"
        id="address"
        rows={6}
        placeholder=""
      ></textarea>
    </Modal>
    <div className={styles.container}>
        <div className={styles.top}>


          <div className={styles.btndiv}>

          </div>
        </div>
        <table className={styles.table}>
          <thead>
            <tr>
              <td>Phone</td>
              <td>Name</td>
              <td>Created At</td>
              <td>Status</td>
              <td>Detail</td>
              <td>Delete</td>
            </tr>
          </thead>
          <tbody>
            {data && data.map((leads: any) => (
              <tr
                key={leads._id}
              >

                <td>
                  <div className={styles.user}>
                    {leads.phone}
                  </div>
                </td>
                <td>
                <div className={styles.user}>
                    {leads.name}
                  </div>
                </td>
                <td>
                  {/* {formatDateFromMongoDB(leads.createdAt)} */}
                  {leads.date}

                </td>

                <td>
                <div className={styles.user}>
                    {leads.status}
                  </div>
                </td>
                <td>
                  <div className={styles.buttons}>
                    <button onClick={() => alert("No further Progress yet")} className={`${styles.button} ${styles.view}`}>
                      View
                    </button>
                  </div>
                </td>
                <td>
                  <div className={styles.buttons}>
                    <button onClick={() => delObj(leads._id)} className={`${styles.button} ${styles.delete}`}>
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div></>
  )
}

export default page