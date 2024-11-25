import React from 'react'
import styles from './checkbox.module.css'

interface checkBoxProps{
    title:string,
    setState:any,
    name?:any
}
const Checkbox:React.FC<checkBoxProps> = ({title,setState,name}) => {
  const changeHanlder = (e:any) =>{
    if(e.target.name == 'M')
    {
      setState('M')
      return;
    }else if(e.target.name == 'F'){
      setState('F')
      return;
    }
  }
  return (
    <label className={styles.clCheckbox}>
        <div className='flex w-10'>
        <input checked={false} name={name} onChange={(e)=>changeHanlder(e)} className={styles.input} type="checkbox"/>
        <span className={styles.span}></span>
        <label>{title}</label>
        </div>
    </label>
  )
}

export default Checkbox