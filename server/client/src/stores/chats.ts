import { observable, action, makeObservable } from "mobx";
import { api } from "config";
import socket from "utils/socket";
import { IChat, ICreateChat } from "models/chats";
const endpoint = "chats";

class Store {
  constructor() {
    makeObservable(this);
  }

  @observable isRegistered = false;

  @action
  joinRoom = async (roomName: string): Promise<void> => {
    await socket.emit("join", roomName);
  };

  @action
  async getUserChats(userId: string): Promise<IChat[]> {
    const { data } = await api.get(`${endpoint}`, {
      params: {
        userId,
      },
    });
    return data;
  }

  @action
  getCurrentChat = async (chatId: string): Promise<any> => {
    const { data } = await api.get(`${endpoint}/${chatId}`);
    return data;
  };
  @action
  createNewChat = async ({ users, chatName }: ICreateChat): Promise<any> => {
    const { data } = await api.post(`${endpoint}/createChat`, {
      users,
      chatName,
    });
    return data;
  };
}
export default new Store();
