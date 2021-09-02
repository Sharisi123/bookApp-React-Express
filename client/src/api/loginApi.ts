import { api } from "../config";

export const loginUser = async (data: any): Promise<any> => {
  const response = await api.post("users/login", data);
  return response;
};
