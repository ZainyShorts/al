'use client'
import { useMyContext } from '@/app/Context/MyContextProvider';
import styles from '../../../ui/dashboard/users/singleUser/singleUser.module.css'

const manualDataSet = () =>{
  const { work , setWork , addManualWork} = useMyContext()

  const handleChange = (e:any) => {
    const { name, value } = e.target;
    setWork((prevState:any) => ({
      ...prevState,
      [name]: value
    }));
  };

  return (
    <>
    <div className={styles.container}>
        
        <div className={styles.formContainer}>
          <form className={styles.form}>
            
            <label>File Name</label>
            <input name="fileName" value={work.fileName} onChange={handleChange} type="text" placeholder="Required" />
            <label>Phone Number</label>
            <input name="phone" value={work.phone} onChange={handleChange} type="text" placeholder="Required" />
            <label>Title</label>
             <select 
              value={work.title}
              onChange={handleChange}
              name="title" id="title" >
              <option >Mr</option>
              <option >Ms</option>
              <option >Mrs</option>
            </select>

            <label>First Name</label>
            <input value={work.firstName} onChange={handleChange} placeholder="Required"  type="text" name="firstName"  />

            <label>Middle Name</label>
            <input value={work.middleName} onChange={handleChange} placeholder="Optional"  type="text" name="middleName" />
            
            <label>Last Name</label>
            <input value={work.lastName} onChange={handleChange} placeholder="Required"  type='text'  name="lastName" />

            <label>Address 1</label>
            <input type='text'  name="address1" placeholder='Optional' value={work.address1} onChange={handleChange} />
            <label>Address 2</label>
            <input type='text'  name="address2" placeholder='Optional' value={work.address2} onChange={handleChange} />
            <label>Address 3</label>
            <input type='text'  name="address3" placeholder='Optional' value={work.address3} onChange={handleChange}  />
            <label>City</label>
            <input type='text'  name="city" placeholder='Optional' value={work.city} onChange={handleChange}  />
            <label>State</label>
            <input type='text'  name="state" placeholder='Optional' value={work.state} onChange={handleChange}  />
            <label>Province</label>
            <input type='text'  name="province" placeholder='Optional' value={work.province} onChange={handleChange}  />
            <label>Postal Code</label>
            <input type='text'  name="postalCcode" placeholder='Optional' value={work.postalCode} onChange={handleChange} />
            <label>Country Code</label>
            <input type='text'  name="countryCode" placeholder='Required Format(+00)' value={work.countryCode} onChange={handleChange}  />
            <label>Gender</label>
             <select
             value={work.gender}
             onChange={handleChange}
              name="gender" id="gender" >
              <option >M</option>
              <option >F</option>
            </select>
            <label>Date of Birth</label>
            <input type='text'  name="dob" placeholder='Optional Format(YYYY-DD-MM)' value={work.dob} onChange={handleChange}  />
            <label>Alt Phone</label>
            <input type='text'  name="altPhone" placeholder='Optional' value={work.altPhone} onChange={handleChange}  />
            <label>ID Number</label>
            <input type='text'  name="idNumber" placeholder='Optional' value={work.idNumber} onChange={handleChange}  />
            <label>Email</label>
            <input type='text'  name="email" placeholder='Optional' value={work.email} onChange={handleChange}  />
            <label>Vehicle</label>
            <input type='text'  name="vehicle" placeholder='Optional' value={work.vehicle} onChange={handleChange} />
            <label>Bank Name</label>
            <input type='text'  name="bankName" placeholder='Optional' value={work.bankName} onChange={handleChange}  />
            <label>Status Name</label>
            <input type='text'  name="statusName" placeholder='Optional' value={work.statusName} onChange={handleChange}  />

            <button onClick={(e)=>addManualWork(e)}>Upload</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default manualDataSet;
