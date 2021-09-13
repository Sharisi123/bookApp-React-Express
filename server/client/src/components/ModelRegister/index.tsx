import { Form, Input, Button } from "antd";
import history from "utils/history";
import styles from "./styles.module.scss";
import { useStore } from "stores";
import ModalWindow from "components/ModalWindow";

interface IProps {
  visible: boolean;
  onCancel: () => void;
}

const ModalRegister = ({ visible, onCancel }: IProps) => {
  const { authStore } = useStore();

  const onFinish = async (values: any) => {
    const response = await authStore.signUp({
      ...values,
      provider: "local",
      role: "reader",
    });

    if (response.status === 200 && !response.data.message) {
      history.push("/books");
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <ModalWindow title="Register" visible={visible} onCancel={onCancel}>
      <div className={styles.signUp}>
        <h2>You need to register</h2>
        <Form
          name="basic"
          initialValues={{ remember: true }}
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

          <Form.Item
            label="First name"
            name="firstName"
            rules={[
              { required: true, message: "Please input your first name!" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Last name"
            name="lastName"
            rules={[
              { required: true, message: "Please input your last name!" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Please input your email!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Phone number"
            name="phoneNumber"
            rules={[
              { required: true, message: "Please input your phone number!" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 10, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </ModalWindow>
  );
};

export default ModalRegister;
