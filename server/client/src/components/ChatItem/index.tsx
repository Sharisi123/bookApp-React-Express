import { Button, Input } from "antd";
import cn from "classnames";
import Loader from "components/Loader";
import { IChat } from "models/chats";
import React, { useEffect, useState } from "react";
import { useStore } from "stores";
import socket from "utils/socket";
import styles from "./styles.module.scss";

interface IProps {
  chatId: string;
  user: any;
  users: any;
}

const ChatItem = ({ chatId, user, users }: IProps) => {
  const { chatsStore } = useStore();
  const [chatMessage, setChatMessage] = useState("");
  const [chat, setChat] = useState<IChat | null>(null);
  const [messageHistory, setMessageHistory] = useState<
    IChat["messages"] | null
  >(null);
  const [messageLoading, setMessageLoading] = useState(false);

  useEffect(() => {
    getChat(chatId);
    socket.emit("chatJoin", chatId);

    socket.on("message", (message) => {
      console.log("new message", message);

      // @ts-ignore
      setMessageHistory((prevState) => [...prevState, message]);
    });
    return () => {
      socket.emit("chatLeave", chatId);
    };
  }, []);

  const getChat = async (chatId: string) => {
    const chat = await chatsStore.getChatById(chatId);
    setChat(chat);
    setMessageHistory(chat.messages);
  };

  const sendMessage = () => {
    setMessageLoading(true);
    console.log(user.username);

    socket.emit(
      "message",
      {
        username: user.username,
        chatId: chatId,
        // @ts-ignore
        userId: user._id,
        message: chatMessage,
        createdAt: Date.now(),
      },
      (message: IChat["messages"]) =>
        // @ts-ignore
        setMessageHistory((prevState) => [...prevState, message])
    );
    setChatMessage("");
    setMessageLoading(false);
  };

  return (
    <div className={styles.chatItem}>
      {user && chat ? (
        <div className={styles.chatItem}>
          <div className={styles.chatInfo}>
            <h2>Чат: {chat.chatName}</h2>
            <h3>Кол-во участников: {chat.users.length}</h3>
          </div>
          <div className={styles.chatContainer}>
            {messageHistory?.map((item) => (
              <div
                className={cn({
                  // @ts-ignore
                  [styles.myMessage]: item.userId !== user._id,
                  // @ts-ignore
                  [styles.notMyMessage]: item.userId === user._id,
                })}
              >
                <div key={item._id} className={styles.message}>
                  {item.message}
                </div>
                {item.username}
              </div>
            ))}
          </div>

          <div className={styles.controls}>
            <Input
              placeholder="send message"
              onChange={(e) => setChatMessage(e.target.value)}
              value={chatMessage}
            />

            <Button type="primary" onClick={sendMessage}>
              Send
            </Button>
          </div>
        </div>
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default ChatItem;
