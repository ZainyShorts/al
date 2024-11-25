

import styles from "./pagination.module.css";
interface paginationProps{
  page:any,
  totalPages:any,
  router:any
  path?:string
}
const Pagination:React.FC<paginationProps> = ({page,totalPages,router,path}) => {
 
  function prev()
  {
    router.push(`${path}page=${(parseInt(page) - 1).toString()}`)
  }
  function next()
  {
    router.push(`${path}page=${(parseInt(page) + 1).toString()}`)
  }

  return (
    <div className={styles.container}>
    { page == '1' && <button  className={styles.disabled}> Previous </button>}
    { page != '1' && <button onClick={prev} className={styles.addButton}> Previous </button>}
    <span className="mt-2">{page}/{totalPages == 0 ? 1 : totalPages}</span>
    { parseInt(page) ==  totalPages &&  <button   className={styles.disabled}>  Next </button> }
    { parseInt(page) <  totalPages &&  <button onClick={next}  className={styles.addButton}>  Next </button> }
    </div>
  );
};

export default Pagination;