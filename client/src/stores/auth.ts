import { observable, action, makeObservable, runInAction } from "mobx";
import { api } from "config";

const endpoint = "users";

class Store {
  constructor() {
    makeObservable(this);
  }
  @observable user = null;
  @observable isLoginModalVisible = false;
  @observable isRegisterModalVisible = false;

  @action
  async signIn(dataFields: any) {
    const { data } = await api.post(`/${endpoint}/login`, dataFields);
    return data;
  }

  @action
  async signUp(dataFields: any) {
    const { data } = await api.post(`/${endpoint}/register`, dataFields);
    return data;
  }

  @action
  async setLoginModal(value: boolean) {
    this.isLoginModalVisible = value;
  }

  @action
  async setRegisterModal(value: boolean) {
    this.isRegisterModalVisible = value;
  }

  @action
  signOut() {
    this.user = null;
  }

  @action
  loginUserWithGoogle() {
    document.location.href = `${process.env.REACT_APP_HOST}/${endpoint}/google`;
  }

  @action
  loginUserWithGithub() {
    document.location.href = `${process.env.REACT_APP_HOST}/${endpoint}/github`;
  }

  @action
  async getUser(accessToken: string) {
    const { data } = await api.get(`/${endpoint}?${accessToken}`);
    runInAction(() => {
      this.user = data;
    });
  }
}
export default new Store();
