'use client'
import React from "react";
import styles from "../../../ui/dashboard/users/add/add.module.css";
import {useMyContext}  from "../../../Context/MyContextProvider";

const page = () => {
  const { createUser ,  role , username , setUsername , email , setEmail , password , setPassword , access , setAccess, phone , setPhone , address , setAddress, setGroup ,group,level,setLevel} = useMyContext()

  return (
    <div className={styles.container}>
      <form className={styles.form}>
        <input value={username} onChange={(e)=>setUsername(e.target.value)} type="text" placeholder="username (required)" name="username"  required />
        <input value={email} onChange={(e)=>setEmail(e.target.value)} type="text" placeholder="email (required)" name="email" required />
        <input value={password} onChange={(e)=>setPassword(e.target.value)} type="text" placeholder="password (required)" name="password" required/>
        <input value={phone} onChange={(e)=>setPhone(e.target.value)} type="text" placeholder="phone (optional)" name="phone"  />
        <input value={level} onChange={(e)=>setLevel(e.target.value)} type="number" placeholder="Level (required)" name="level"  />
        <select value={group} onChange={(e)=>setGroup(e.target.value)}  name="group" id="group" >
          <option value={'AGENTS'} >Agents</option>
          <option value={'No'} >in future will add more</option>
        </select>
        <select value={access} onChange={(e)=>setAccess(e.target.value)}  name="Access" id="Access" >
        
          <option value={'Yes'} >Login Access Yes</option>
          <option value={'No'} >Login Access No</option>
        </select>
        <select  name="Role" id="Role" >
          <option >{role}</option>
        </select>
        <textarea
          value={address} onChange={(e)=>setAddress(e.target.value)}
          name="address"
          id="address"
          rows={6}
          placeholder="Address (optional)"
        ></textarea>
        <button onClick={createUser} type="submit">Submit</button>
      </form>
    </div>
  );
};

export default page;
