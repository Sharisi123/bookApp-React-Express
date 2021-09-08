import React from "react";
import styles from "./styles.module.scss";
import { NavLink } from "react-router-dom";
import { useStore } from "stores";
import { Button } from "antd";
import ModalLogin from "components/ModalLogin";
import { observer } from "mobx-react";
import ModalRegister from "components/ModelRegister";

const Header = observer(() => {
  const { authStore } = useStore();

  return (
    <div className={styles.header}>
      {!authStore.user ? (
        <div className={styles.login}>
          {/* <Button type="default" onClick={() => authStore.setLoginModal(true)}>
            Login
          </Button> */}
          <ModalLogin
            visible={authStore.isLoginModalVisible}
            onCancel={() => authStore.setLoginModal(false)}
          />

          {/* <Button
            type="default"
            onClick={() => authStore.setRegisterModal(true)}
          >
            Register
          </Button> */}
          <ModalRegister
            visible={authStore.isRegisterModalVisible}
            onCancel={() => authStore.setRegisterModal(false)}
          />
        </div>
      ) : (
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
      )}
    </div>
  );
});

export default Header;
