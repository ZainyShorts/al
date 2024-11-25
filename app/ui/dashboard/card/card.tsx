import React from 'react'
import styles from "./card.module.css";
import { MdSupervisedUserCircle } from 'react-icons/md';

interface Card{
    items:any;
}
const Card:React.FC<Card> = ({items}) => {
  return (

    <div className={styles.container}>
      <MdSupervisedUserCircle size={24} />
      <div className={styles.texts}>
        <span className={styles.title}>{items.title}</span>
        <span className={styles.number}>{items.number}</span>
        <span className={styles.detail}>
          <span className={items.change > 0 ? styles.positive : styles.negative}>
            {items.change}%
          </span>{" "}
          {items.change > 0 ? "more" : "less"} than previous week
        </span>
      </div>
    </div>
  )
};

export default Card