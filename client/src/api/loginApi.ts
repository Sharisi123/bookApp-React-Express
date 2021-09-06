import { api } from "../config";

export const loginUser = async (data: any): Promise<any> => {
  const response = await api.post("users/login", data);
  return response;
};

export const loginUserWithGoogle = (): void => {
  document.location.href = "http://localhost:4200/api/users/google";
};

export const loginUserWithGithub = (): void => {
  document.location.href = "http://localhost:4200/api/users/github";
};
