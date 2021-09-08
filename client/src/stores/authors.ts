import { observable, action, makeObservable } from "mobx";
import { api } from "config";
import { IGetAuthorsResponse } from "models/authorsResponse";

const endpoint = "authors";

class Store {
  constructor() {
    makeObservable(this);
  }
  @observable isRegistered = false;

  @action
  getAuthors = async (): Promise<IGetAuthorsResponse[]> => {
    const { data } = await api.get(`/${endpoint}`);
    return data;
  };

  @action
  getAuthorsById = async (id: string): Promise<IGetAuthorsResponse> => {
    const { data } = await api.get(`/${endpoint}/${id}`);
    return data;
  };

  @action
  updateAuthorBooks = async (authorId: string, bookId: string) => {
    const { data } = await api.patch(`/${endpoint}/${authorId}`, { bookId });
    return data;
  };
}
export default new Store();
