import { Button } from "antd";
import React, { useEffect, useState } from "react";
import { useStore } from "stores";
import styles from "./styles.module.scss";
import ModalLogin from "components/ModalLogin";
import ModalRegister from "components/ModelRegister";

const Welcome = () => {
  const { authStore } = useStore();
  const [loginModal, setLoginModal] = useState(false);
  const [registerModal, setRegisterModal] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      checkUserAuthorize(token);
    }
  }, []);

  const checkUserAuthorize = async (token: string) => {
    await authStore.checkUserAuthorize(token);
  };

  return (
    <div className={styles.welcome}>
      <h1>
        To see more content you need to{" "}
        <Button type="link" onClick={() => setLoginModal(true)}>
          login
        </Button>{" "}
        or{" "}
        <Button type="link" onClick={() => setRegisterModal(true)}>
          register
        </Button>{" "}
      </h1>

      <ModalLogin visible={loginModal} onCancel={() => setLoginModal(false)} />
      <ModalRegister
        visible={registerModal}
        onCancel={() => setRegisterModal(false)}
      />
    </div>
  );
};

export default Welcome;
