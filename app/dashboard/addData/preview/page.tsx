// pages/index.js
'use client'
import styles from './preview.module.css'
import { useMyContext } from '../../../Context/MyContextProvider';
const Home = () => {
  const {data,uploadExcelFileWork,fileName,setFileName} = useMyContext()
  
   
  

  return (
    <div className={styles.container}>
      <div  className='flex justify-between items-center'>
      <input className={styles.inputField} value={fileName} onChange={(e)=>setFileName(e.target.value)} type="text" placeholder="FileName (required)"  required />
      <button onClick={uploadExcelFileWork} className={styles.button}>Upload File</button>
      </div>
    {data.length > 0 && (
      <div className={styles.excelContainer}>
        <div className={styles.tableContainer}>
          <table className={styles.table}>

            <thead>
              <tr className='text-white px-10' >
                {data[0].map((cell:any, index:any) => (
                  <th className={styles.th} key={index} >{cell}</th>
                 ))} 
              </tr>
            </thead>
            <tbody>
              {data.slice(1).map((row:any, rowIndex:any) => (
                <tr className={styles.tr} key={rowIndex}>
                  {row.map((cell:any, cellIndex:any) => (
                    <>
                    { cell != "" 
                    ? 
                    <td className={styles.td} key={cellIndex}>{cell}</td>
                    :
                    <td className={styles.tdEmpty} key={cellIndex}>Empty</td>
                    }
                    </>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    )}
  </div>
  );
};

export default Home;
