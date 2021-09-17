import { Button, Input } from "antd";
import cn from "classnames";
import Loader from "components/Loader";
import { IChat } from "models/chats";
import React, { useEffect, useState } from "react";
import { useStore } from "stores";
import socket from "utils/socket";
import styles from "./styles.module.scss";

interface IProps {
  chat: IChat;
  user: any;
}

const ChatItem = ({ chat, user }: IProps) => {
  const { chatsStore } = useStore();
  const [chatMessage, setChatMessage] = useState("");
  const [messageHistory, setMessageHistory] = useState(chat.messages);
  const [messageLoading, setMessageLoading] = useState(false);

  useEffect(() => {
    chatsStore.joinRoom(chat._id);
    socket.on("incomingMessage", (message) => {
      // @ts-ignore
      setMessageHistory((prevState) => [...prevState, message]);
    });
  }, []);

  const sendMessage = () => {
    setMessageLoading(true);
    socket.emit(
      "chatMessage",
      {
        chatId: chat._id,
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
    <>
      {user && chat ? (
        <div className={styles.chatItem}>
          <h2>{chat.chatName}</h2>

          <div className={styles.chatContainer}>
            {messageHistory?.map((item) => (
              <div
                key={item._id}
                className={cn({
                  // @ts-ignore
                  [styles.myMessage]: item.userId !== user._id,
                  // @ts-ignore
                  [styles.notMyMessage]: item.userId === user._id,
                })}
              >
                {item.message}
              </div>
            ))}
          </div>

          <Input
            placeholder="send message"
            onChange={(e) => setChatMessage(e.target.value)}
            value={chatMessage}
          />

          <Button type="primary" onClick={sendMessage}>
            Send
          </Button>
        </div>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default ChatItem;
