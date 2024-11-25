import React from 'react'
import styles from './search.module.css'
import { MdSearch } from 'react-icons/md'

interface search{
    placholder?:string,
    func?:any,
    role?:string,
    page?:any
}
const Search:React.FC<search> = ({placholder,func,role,page}) => {
  return (
    <div className={styles.container}>
        <MdSearch />
      <input
        onChange={(e)=>{func(e.target.value,role,page)}}
        type="text"
        placeholder={placholder}
        className={styles.input}
      />
    </div>
  )
}

export default Search