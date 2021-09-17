import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import { Button, Dropdown, Tabs, Menu } from "antd";
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
  const [chats, setChats] = useState<any>([]);
  const [users, setUsers] = useState();
  const [user] = useState(toJS(authStore.user));
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedUsername, setSelectedUsername] = useState("");
  const [usersIds, setUserIds] = useState<string[]>([]);
  useEffect(() => {
    socket.on("newChat", (newChat) => {
      setChats((prevState: any) => [...prevState, newChat]);
    });

    getChats();
    loadUsers();
  }, []);

  const loadUsers = async () => {
    const users = await authStore.getUsers();
    console.log(users);
    // @ts-ignore
    const filteredUsers = users.filter((item) => item._id !== user?._id);
    setUsers(filteredUsers);
  };

  const getChats = async () => {
    // @ts-ignore
    const allUserChats = await chatsStore.getUserChats(user._id);
    console.log(allUserChats);
    setChats(allUserChats);
  };

  const handleMenuClick = (e: any) => {
    setSelectedUsername(e.domEvent.nativeEvent.target.innerText);
    // @ts-ignore
    setUserIds([e.key, user._id]);
    setIsModalVisible(true);
  };

  const menu = (
    <Menu onClick={handleMenuClick}>
      {users ? (
        // @ts-ignore
        users?.map((item: any) => (
          <Menu.Item key={item._id} icon={<UserOutlined />}>
            {item.username}
          </Menu.Item>
        ))
      ) : (
        <Loader />
      )}
    </Menu>
  );

  return (
    <div className={styles.chats}>
      {ReactDOM.createPortal(
        <ModalChatCreate
          companionName={selectedUsername}
          isModalVisible={isModalVisible}
          setIsModalVisible={setIsModalVisible}
          usersIds={usersIds}
        />,
        // @ts-ignore
        document.getElementById("root")
      )}
      <Dropdown overlay={menu}>
        <Button>
          Create new chat <DownOutlined />
        </Button>
      </Dropdown>
      <Tabs tabPosition="left">
        {chats.map((item: any) => (
          <TabPane tab={item.chatName} key={item._id}>
            <ChatItem chat={item} user={user} key={item._id} />
          </TabPane>
        ))}
      </Tabs>
    </div>
  );
};

export default Chats;
