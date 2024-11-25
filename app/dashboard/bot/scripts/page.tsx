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
          "audio":"sample1.mp3",
          "path":"/audio/audio1.mp3",
          "script":"Next.js is a versatile React framework that simplifies building server-rendered applications, offering seamless integration between client and server-side rendering. With its intuitive API and robust features, Next.js enables rapid development of scalable and performant web applications. Whether you're a beginner or an experienced developer, Next.js provides a cohesive environment for crafting dynamic and interactive web experiences.",
          "date":"5.11.24"
      },
      {
          "_id":"2",
          "audio":"sample2.mp3",
          "path":"/audio/audio2.mp3",
          "script":"Databases serve as organized repositories for storing and managing structured data, facilitating efficient retrieval, manipulation, and analysis. They form the backbone of modern software applications, offering reliability, scalability, and data integrity. From traditional relational databases like MySQL and PostgreSQL to newer NoSQL solutions such as MongoDB and Redis, a diverse array of database systems cater to varied needs, powering applications across industries and scales.",
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
              <td>Audio</td>
              <td>Script</td>
              <td>Created At</td>
              <td>PLay</td>
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
                    {leads.audio}
                  </div>
                </td>
                <td>
                  <CiText size={25} className='cursor-pointer ' onClick={() => openScript(leads.script)} />
                </td>
                <td>
                  {/* {formatDateFromMongoDB(leads.createdAt)} */}
                  {leads.date}

                </td>

                <td>
                  <div className={styles.buttons}>
                    <button id='btn' onClick={() => playAudio(leads.path)} className={`${styles.button} ${styles.view}`}>
                      {leads.path == currentAudio && isPlaying ? 'Pause' : 'Play'}
                      <audio id='audioPlayer' />
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