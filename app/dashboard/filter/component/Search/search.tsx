import styles from './search.module.css'

interface search{
    placholder?:string,
    setState?:any,
    state?:any
}
const Search:React.FC<search> = ({placholder,setState,state}) => {
  return (
    <div className={styles.container}>
      <input
        type="text"
        value={state}
        placeholder={placholder}
        className={styles.input}
        onChange={(e)=>setState(state,e.target.value)}
      />
    </div>
  )
}

export default Search