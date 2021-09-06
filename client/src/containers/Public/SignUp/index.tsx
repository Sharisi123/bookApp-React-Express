import { Form, Input, Button, Select, AutoComplete } from "antd";
import { Option } from "antd/lib/mentions";
import { register } from "api/registerApi";
import { useState } from "react";
import history from "utils/history";
import styles from "./styles.module.scss";

const SingUp = () => {
  const [selectValue, setSelectValue] = useState("reader");

  const onFinish = async (values: any) => {
    const response = await register({
      ...values,
      role: selectValue,
    });

    if (response.status === 200 && !response.data.message) {
      history.push("/login");
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className={styles.signUp}>
      <Form
        name="basic"
        wrapperCol={{ span: 16 }}
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
          rules={[{ required: true, message: "Please input your first name!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Last name"
          name="lastName"
          rules={[{ required: true, message: "Please input your last name!" }]}
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

        <Form.Item label="Select your role">
          <Select
            style={{ width: 300 }}
            placeholder="Select a role"
            onChange={(value: string) => setSelectValue(value)}
            defaultValue="reader"
          >
            <Option value="author">Author</Option>
            <Option value="reader">Reader</Option>
          </Select>
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default SingUp;
