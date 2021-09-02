import { api } from "../config";

export const register = async (data: any): Promise<any> => {
  const response = await api.post("users/register", data);
  return response;
};
