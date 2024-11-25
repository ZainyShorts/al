'use client'
import React,{useState} from 'react'
import { FaFileAudio } from "react-icons/fa";
import { CiText } from "react-icons/ci";
import styles from './script.module.css'
import Modal from '@/app/components/modal/Modal';

const page = () => {

    const [audio,setAudio] = useState(false)
    const [audioSrc,setAudioSrc]=useState(String)

    const [txtFile,setTxtFile]=useState(false)

    const [isOpen,setIsOpen]= useState(false);

    const [script,setScript] = useState(String);

    function changeModalState(){
      if(isOpen)
      {
        setIsOpen(false)

      }else{
        setIsOpen(true)
      }
    }


    const handleFileChange = (e:any) => {
        e.preventDefault();
        const file = e.target.files[0];
        if (file) {
          setAudioSrc(URL.createObjectURL(file))
          setAudio(true);

        } else {
          setAudio(false);
        }
      };

    const handletxtFile = async (e:any) =>{
        e.preventDefault();
        const file = e.target.files[0];
        // const data = await fs.promises.readFile(file, 'utf-8');
        const reader = new FileReader();
        if(file){
          reader.onload = (e:any) => {
            setScript(e.target.result);
          };
          reader.readAsText(file);
          setTxtFile(true);

        }else{
          setTxtFile(false)
        }
      }

    
  return (
    <>
    <Modal isOpen={isOpen} onClose={()=>setIsOpen(false)} >
    <textarea
           onChange={(e)=>setScript(e.target.value)}
          value={script}
          className={styles.textArea}
          name="address"
          id="address"
          rows={6}
          placeholder=""
        ></textarea>
    </Modal>
    <div className='flex justify-center pl-20  items-center h-full'>
    <div className={styles.container}>
   { txtFile == false 
   && 
   <label  className={`${styles.customFileUpload} relative`}>
        <div className={styles.icon}>
        <CiText className={styles.svg} size={50} />
        </div>
        <div className={styles.text}>
        <span className={styles.span}>Upload Script</span>
        <input onChange={(e)=>handletxtFile(e)} accept=".txt" className="absolute inset-0 opacity-0 w-full h-full cursor-pointer" type="file" />
        </div>
    </label>
    }
    {
      txtFile  == true 
        &&
        <>
        <div onClick={changeModalState} className={`${styles.icon} flex-col cursor-pointer pr-20`}>
        <CiText className={styles.svg} size={100} />
        <div className={styles.text}>
             ViewScript
        </div>
        </div>
        </>
      
    }

    
    </div>
    
    </div>
    <button className={styles.button}  type="submit">Upload</button>
    </>
  )
}

export default page