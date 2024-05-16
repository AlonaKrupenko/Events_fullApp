import React from "react";
import styles from "./styles.module.scss";

const ParticipantCard = ({ participant }) => {
  return (
    <div className={styles.participantCard}>
      <b className={styles.participantName}>{participant.fullName}</b>
      <p className={styles.participantEmail}>{participant.email}</p>
    </div>
  );
};

export default ParticipantCard;
