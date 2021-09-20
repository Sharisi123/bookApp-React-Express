import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import { Button, Dropdown, Tabs, Menu, Checkbox } from "antd";
import ChatItem from "components/ChatItem";
import { useStore } from "stores";
import { toJS } from "mobx";
import { DownOutlined, UserOutlined } from "@ant-design/icons";
import Loader from "components/Loader";
import ModalChatCreate from "components/ModalChatCreate";
import ReactDOM from "react-dom";
import socket from "utils/socket";
const { TabPane } = Tabs;

const Chats = () => {
  const { chatsStore, authStore } = useStore();
  const [user] = useState(toJS(authStore.user));
  const [chats, setChats] = useState<any>([]);
  const [users, setUsers] = useState();
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [dropdownVisible, setDropdownVisible] = useState(false);

  useEffect(() => {
    // @ts-ignore
    socket.emit("userJoin", user._id);
    socket.on("newChat", (newChat) => {
      setChats((prevState: any) => [...prevState, newChat]);
    });

    getChats();
    loadUsers();

    return () => {
      // @ts-ignore
      socket.emit("userLeave", user._id);
    };
  }, []);

  const loadUsers = async () => {
    const users = await authStore.getUsers();
    // @ts-ignore
    const filteredUsers = users.filter((item) => item._id !== user?._id);
    setUsers(filteredUsers);
  };

  const getChats = async () => {
    // @ts-ignore
    const userChats = await chatsStore.getUserChats(user._id);
    setChats(userChats);
  };

  const checkBoxChangeHandler = (checkedValues: any) => {
    setSelectedUsers(checkedValues);
  };

  const dropdownButtonHandler = () => {
    setIsModalVisible(true);
  };

  const menu = (
    <Menu mode="inline" className={styles.menu}>
      <Checkbox.Group
        style={{ width: "100%" }}
        // @ts-ignore
        onChange={checkBoxChangeHandler}
      >
        {users ? (
          // @ts-ignore
          users?.map((item: any) => (
            <Menu.Item key={item._id} icon={<UserOutlined />}>
              <Checkbox value={item.username}>{item.username}</Checkbox>
            </Menu.Item>
          ))
        ) : (
          <Loader />
        )}
        <div className={styles.buttonCenter}>
          <Button
            onClick={dropdownButtonHandler}
            // @ts-ignore
            disabled={!selectedUsers.length}
          >
            Create chat
          </Button>
        </div>
      </Checkbox.Group>
    </Menu>
  );

  return (
    <div className={styles.chats}>
      {ReactDOM.createPortal(
        <ModalChatCreate
          selectedUsers={selectedUsers}
          users={users}
          isModalVisible={isModalVisible}
          setIsModalVisible={setIsModalVisible}
        />,
        // @ts-ignore
        document.getElementById("root")
      )}

      <Dropdown
        overlay={menu}
        visible={dropdownVisible}
        onVisibleChange={(flag) => setDropdownVisible(flag)}
      >
        <Button>
          Create new chat <DownOutlined />
        </Button>
      </Dropdown>

      <div className={styles.tabs}>
        <Tabs tabPosition="left" destroyInactiveTabPane={true}>
          {chats.map((item: any) => (
            <TabPane tab={item.chatName} key={item._id}>
              <ChatItem chatId={item._id} user={user} />
            </TabPane>
          ))}
        </Tabs>
      </div>
    </div>
  );
};

export default Chats;
