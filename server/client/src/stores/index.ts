import { createContext, useContext } from "react";
import { configure, observable } from "mobx";

import authStore from "./auth";
import booksStore from "./books";
import authorsStore from "./authors";
import chatsStore from "./chats";

configure({ enforceActions: "observed" });

class RootStore {
  @observable authStore = authStore;
  @observable booksStore = booksStore;
  @observable authorsStore = authorsStore;
  @observable chatsStore = chatsStore;
}

const rootStore = new RootStore();

export const StoreContext = createContext<RootStore>(rootStore);

export const useStore = (): RootStore => {
  const store = useContext(StoreContext);
  if (!store) {
    throw new Error("You have forgot to use StoreProvider, shame on you.");
  }
  return store;
};

export default new RootStore();
