import React from 'react'
import styles from './ratio.module.css'
const RatioButton = () => {
  return (
    <>
        <div className={styles.radioInput}>
  <label className="pr-5" >Ascending</label>
  <input value="value-1" name="value-radio" id="value-1" type="radio"/>
  <div className={styles.plus1}>
    <div className={styles.plus2}></div>
  </div>
  <label className="pr-5" >Decending</label>
  <input value="value-2" name="value-radio" id="value-2" type="radio" />
  <div className={styles.plus1}>
    <div className={styles.plus2}></div>
  </div>
  <label className="pr-5" >Date</label>
  <input value="value-3" name="value-radio" id="value-3" type="radio"/>
  <div className={styles.plus1}>
    <div className={styles.plus2}></div>
  </div>
  <label className="pr-5" >Name</label>
  <input value="value-3" name="value-radio" id="value-3" type="radio"/>
  <div className={styles.plus1}>
    <div className={styles.plus2}></div>
  </div>
  <label className="pr-5" >Email</label>
  <input value="value-3" name="value-radio" id="value-3" type="radio"/>
  <div className={styles.plus1}>
    <div className={styles.plus2}></div>
  </div>
</div>
    </>
  )
}

export default RatioButton