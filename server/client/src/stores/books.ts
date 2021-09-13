import { observable, action, makeObservable } from "mobx";
import { api } from "config";
import { IGetBookResponse } from "models/booksResponse";

const endpoint = "books";

class Store {
  constructor() {
    makeObservable(this);
  }
  @observable isRegistered = false;

  @action
  async getBooks(): Promise<IGetBookResponse[]> {
    const { data } = await api.get(`/${endpoint}`);
    return data;
  }

  @action
  async getBookById(id: string): Promise<IGetBookResponse[]> {
    const { data } = await api.get(`/${endpoint}/${id}`);
    return data;
  }

  @action
  async setBooks(dataFields: any): Promise<any> {
    const { data } = await api.post(`/${endpoint}`, dataFields);
    return data;
  }

  @action
  async updateBook(payload: any): Promise<any> {
    const { data } = await api.patch(`/${endpoint}`, { payload });
    return data;
  }

  @action
  async deleteBook(id: string): Promise<any> {
    const { data } = await api.delete(`/${endpoint}/${id}`);
    return data;
  }
}
export default new Store();
