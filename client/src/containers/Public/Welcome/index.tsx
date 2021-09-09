import { Button } from "antd";
import React, { useEffect } from "react";
import { useStore } from "stores";
import styles from "./styles.module.scss";

const Welcome = () => {
  const { authStore } = useStore();

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
        <Button type="link" onClick={() => authStore.setLoginModal(true)}>
          login
        </Button>{" "}
        or{" "}
        <Button type="link" onClick={() => authStore.setRegisterModal(true)}>
          register
        </Button>{" "}
      </h1>
    </div>
  );
};

export default Welcome;
