import React from "react";
import styles from "./styles.module.scss";
import { NavLink } from "react-router-dom";
import { useStore } from "stores";
import { Button } from "antd";
import { observer } from "mobx-react";

const Header = observer(() => {
  const { authStore } = useStore();

  return (
    <div className={styles.header}>
      {authStore.user ? (
        <>
          <div className={styles.menu}>
            <ul>
              <li>
                <NavLink exact to="/books" activeClassName={styles.active}>
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

            <div className={styles.info}>
              {/*/@ts-ignore  */}
              <span>{authStore.user.username}</span>
              <Button onClick={authStore.signOut}>SingOut</Button>
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
});

export default Header;
