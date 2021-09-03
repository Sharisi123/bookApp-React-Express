import { api } from "../config";

export const loginUser = async (data: any): Promise<any> => {
  const response = await api.post("users/login", data);
  return response;
};

export const loginUserWithGoogle = async (): Promise<any> => {
  const response = await api.get("users/google");
  return response;
};
