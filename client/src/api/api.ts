import axios from "axios";
import { IGetBookResponce } from "models/api";

export const getBooks = async (): Promise<IGetBookResponce[]> => {
  const { data } = await axios.get("api/books");
  return data;
};

export const setBooks = async (data: any): Promise<any> => {
  const responce = await axios.post("api/create", data);
  return responce;
};

export const updateBook = async (id: string, payload: any): Promise<any> => {
  const response = await axios.put("api/update", { id, payload });
  return response;
};

export const deleteBook = async (id: string): Promise<any> => {
  const response = await axios.delete("api/delete?id=" + id);
  return response;
};
