import React from "react";
import styles from "./styles.module.scss";
import { NavLink } from "react-router-dom";
import { useStore } from "stores";
import { Button } from "antd";
import { observer } from "mobx-react";

interface IProps {
  changeTheme: () => void;
}

const Header = observer(({ changeTheme }: IProps) => {
  const { authStore } = useStore();

  return (
    <div className={styles.header}>
      {authStore.user ? (
        <div className={styles.menu}>
          <Button onClick={changeTheme}>Change Theme</Button>
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
            <li>
              <NavLink to="/chats" activeClassName={styles.active}>
                Chats
              </NavLink>
            </li>
          </ul>

          <div className={styles.info}>
            {/*/@ts-ignore  */}
            <p>{authStore.user.username}</p>
            <Button onClick={authStore.signOut}>SingOut</Button>
          </div>
        </div>
      ) : (
        <div className={styles.menu}>
          <Button onClick={changeTheme}>Change Theme</Button>
        </div>
      )}
    </div>
  );
});

export default Header;
