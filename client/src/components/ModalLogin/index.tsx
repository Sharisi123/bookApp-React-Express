import React from "react";
import { Form, Input, Button } from "antd";
import history from "utils/history";
import styles from "./styles.module.scss";
import { useStore } from "stores";
import { GithubOutlined, GoogleOutlined } from "@ant-design/icons";
import ModalWindow from "components/ModalWindow";

interface IProps {
  visible: boolean;
  onOk?: () => void;
  onCancel: () => void;
}

const ModalLogin = ({ visible, onCancel }: IProps) => {
  const { authStore } = useStore();

  const onFinish = async (values: any) => {
    try {
      const response = await authStore.signIn(values);

      if (response.status === 200) {
        history.push("/books");
      }
    } catch (err) {
      console.log(err);
    }
  };
  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <ModalWindow title="Login" visible={visible} onCancel={onCancel}>
      <div className={styles.signIn}>
        <h2>You need to login</h2>
        <Form
          name="basic"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item>
            <Button type="default" onClick={authStore.loginUserWithGoogle}>
              <GoogleOutlined /> Login with Google
            </Button>
            <Button type="default" onClick={authStore.loginUserWithGithub}>
              <GithubOutlined /> Login with GitHub
            </Button>
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Sign in
            </Button>
          </Form.Item>
        </Form>
      </div>
    </ModalWindow>
  );
};

export default ModalLogin;
