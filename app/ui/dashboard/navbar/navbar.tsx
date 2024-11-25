"use client";
import { usePathname } from "next/navigation";
import styles from "./navbar.module.css";
import { FaFileExcel } from "react-icons/fa";
import * as XLSX from 'xlsx';

const Navbar = () => {

  function templateDownload(){
  
    
 
      const lead = { 
        phone_number: "Required", 
         title: "Required",
         first_name: "Required",
         middle_initial:"Optional",
         last_name:"Optional",
         address1:"Optional",
         address2:"Optional",
         address3:"Optional",
         city:"Optional",
         state:"Optional",
         province:"Optional",
         postal_code: "Optional",
         country_code:"Required",
         gender:"Required",
         date_of_birth:"Optional",
         altPhone:"Optional",
         email:"Optional",
         ID_Number:"Optional",
         Vehicle:"Optional",
         Bank_name:"Optional",
         Status_name:"Optional",
         }
         const jsonData = [];
         jsonData.push(lead)

        
  
    // Convert JSON to worksheet
    const worksheet = XLSX.utils.json_to_sheet(jsonData);
  
    // Create a workbook
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
  
    // Convert workbook to binary XLSX file
    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
  
    // Create Blob from binary XLSX data
    const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
  
    // Create download link and trigger click event
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `Template.xlsx`;
    a.click();
  
    // Cleanup
    window.URL.revokeObjectURL(url);
  }


  const pathname = usePathname();
  return (
    <div className={styles.container}>
      <div className={styles.title}>{pathname.split("/").pop()}</div>
      <div className={styles.menu}>
        <div className={styles.icons}>
          <FaFileExcel className="cursor-pointer" onClick={templateDownload} size={20} />
        </div>
      </div>
    </div>
  );
};

export default Navbar;