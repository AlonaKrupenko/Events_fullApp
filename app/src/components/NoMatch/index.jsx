import React from "react";
import styles from "./styles.module.scss";

const NoMatch = ({ title, description, id, date, organizer }) => {
  return (
    <div className={styles.container}>
      <h4>Page not found</h4>
    </div>
  );
};

export default NoMatch;
