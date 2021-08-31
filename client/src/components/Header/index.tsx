import React from "react";
import styles from "./styles.module.scss";
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <div className={styles.header}>
      <ul>
        <li>
          <NavLink exact to="/" activeClassName={styles.active}>
            Book List
          </NavLink>
        </li>
        <li>
          <NavLink to="/authors" activeClassName={styles.active}>
            Authors
          </NavLink>
        </li>
        <li>
          <NavLink to="/create" activeClassName={styles.active}>
            Create book
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Header;
