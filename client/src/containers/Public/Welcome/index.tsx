import { Button } from "antd";
import ModalLogin from "components/ModalLogin";
import ModalRegister from "components/ModelRegister";
import React from "react";
import { useStore } from "stores";
import styles from "./styles.module.scss";

const Welcome = () => {
  const { authStore } = useStore();

  return (
    <div className={styles.welcome}>
      <h1>
        To see more content you need to{" "}
        <Button type="link" onClick={() => authStore.setLoginModal(true)}>
          login
        </Button>{" "}
        or{" "}
        <Button type="link" onClick={() => authStore.setRegisterModal(true)}>
          register
        </Button>{" "}
      </h1>

      {/* <ModalRegister
        visible={authStore.isRegisterModalVisible}
        onCancel={() => authStore.setRegisterModal(false)}
      />
      <ModalLogin
        visible={authStore.isLoginModalVisible}
        onCancel={() => authStore.setLoginModal(false)}
      /> */}
    </div>
  );
};

export default Welcome;
