'use client'
import styles from './menuLink.module.css'
import { usePathname } from 'next/navigation'
import { useRouter } from 'next/navigation'

interface MenuLink{
    item:any,
    // userRole:string,
}

const MenuLink:React.FC<MenuLink> = ({item})=> {
  const pathname = usePathname()
  const router = useRouter()
  const naivgate = (path:string) =>{
    
      router.push(path);
  }
  // alert(userRole)
  // if(userRole == "Admin")
  // {
    return (
      <>
      <div onClick={()=>naivgate(item.path)} className={`${styles.container} ${pathname === item.path && styles.active}`}>
      {item.icon}
      {item.title}
      </div>
      </>
      )
  // }else if(userRole == "Employee"){
  //   return (
  //    <>
  //   {!item.path.includes("/client") &&
  //    <div onClick={()=>naivgate(item.path)} className={`${styles.container} ${pathname === item.path && styles.active}`}>
  //    {item.icon}
  //    {item.title}
  //    </div>
  //    }
  //    </>
  //    )
  // }
}

export default MenuLink