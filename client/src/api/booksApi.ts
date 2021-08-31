import { IGetBookResponse } from "models/booksResponse";
import { api } from "../config";

export const getBooks = async (): Promise<IGetBookResponse[]> => {
  const { data } = await api.get("/books");
  return data;
};

export const setBooks = async (data: any): Promise<any> => {
  const response = await api.post("/books", data);
  return response;
};

export const updateBook = async (payload: any): Promise<any> => {
  const response = await api.put("/books", { payload });
  return response;
};

export const deleteBook = async (id: string): Promise<any> => {
  const response = await api.delete("/books/" + id);
  return response;
};
