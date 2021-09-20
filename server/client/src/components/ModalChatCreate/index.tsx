import React from "react";
import { Modal, Button, Form, Input } from "antd";
import { useStore } from "stores";

interface IProps {
  isModalVisible: boolean;
  setIsModalVisible: (arg0: boolean) => void;
  users: any;
  selectedUsers: string[];
}

const ModalChatCreate = ({
  isModalVisible,
  setIsModalVisible,
  users,
  selectedUsers,
}: IProps) => {
  const { chatsStore } = useStore();

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const onFinish = (values: any) => {
    let currentUsers = selectedUsers.map((username) =>
      users.find((item: any) => (item.username === username ? item._id : null))
    );
    const usersIds = currentUsers.map((item) => item._id);
    chatsStore.createNewChat({
      chatName: values.chatName,
      users: usersIds,
    });

    setIsModalVisible(false);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <>
      <Modal
        // @ts-ignore
        title={`Creating chat with ${selectedUsers.join(", ")}`}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={false}
      >
        <Form
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Enter a chat name"
            name="chatName"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Create chat
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default ModalChatCreate;
