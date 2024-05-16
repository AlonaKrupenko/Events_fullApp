import { Link } from "react-router-dom";
import styles from "./styles.module.scss";
import React from "react";

const Header = () => {
  return (
    <div className={styles.headerWrapper}>
      <Link to="/">
        <h2 className={styles.headerTitle}>Events list</h2>
      </Link>
    </div>
  );
};

export default Header;
