import React from "react";
import styles from "./styles.module.scss";
import { Link } from "react-router-dom";

const EventCard = ({ title, description, id, date, organizer }) => {
  return (
    <div className={styles.card}>
      <h4 className={styles.cardHeader}>{title}</h4>
      <p className={styles.organizer}>{`Provided by ${organizer}`}</p>
      <p className={styles.cardDescription}>{description}</p>
      <p className={styles.date}>{`Date: ${date}`}</p>
      <div className={styles.buttonsBlock}>
        <Link to={`/view/${id}`} className={styles.link}>
          <button className={styles.button}>View</button>
        </Link>
        <Link to={`/register/${id}`} className={styles.link}>
          <button className={styles.button}>Register</button>
        </Link>
      </div>
    </div>
  );
};

export default EventCard;
