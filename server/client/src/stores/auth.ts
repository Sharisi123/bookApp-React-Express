import { observable, action, makeObservable, runInAction } from "mobx";
import { api } from "config";
import history from "utils/history";

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

    api.defaults.headers.Authorization = `Bearer ${data.token}`;
    if (data.token) {
      localStorage.setItem("jwt", data.token);
    }

    runInAction(() => {
      this.user = data.user;
    });

    if (this.user) {
      history.replace("/books");
    }
    return data;
  }

  @action
  async signUp(dataFields: any) {
    const { data } = await api.post(`/${endpoint}/register`, dataFields);
    return data;
  }

  @action
  setLoginModal(value: boolean) {
    this.isLoginModalVisible = value;
  }

  @action
  setRegisterModal(value: boolean) {
    this.isRegisterModalVisible = value;
  }

  @action
  signOut() {
    this.user = null;
    localStorage.removeItem("jwt");
  }

  @action
  loginUserWithGoogle() {
    document.location.href = `http://localhost:5001/api/${endpoint}/google`;
  }

  @action
  loginUserWithGithub() {
    document.location.href = `http://localhost:5001/api/${endpoint}/github`;
  }

  @action
  async checkUserAuthorize(token: string) {
    api.defaults.headers.Authorization = `Bearer ${token}`;
    const { data } = await api.post(`/${endpoint}/authenticate`);
    runInAction(() => {
      this.user = data;
    });
    if (this.user) {
      history.replace("/books");
    }

    return data;
  }

  @action
  async getUsers() {
    const { data } = await api.get(`${endpoint}`);
    return data;
  }
}
export default new Store();
