import { IGetAuthorsResponse } from "models/authorsResponse";
import { api } from "../config";

export const getAuthors = async (): Promise<IGetAuthorsResponse[]> => {
  const { data } = await api.get("/authors");
  return data;
};

export const getAuthorsById = async (
  id: string
): Promise<IGetAuthorsResponse> => {
  const { data } = await api.get("/authors/" + id);
  return data;
};

export const updateAuthorBooks = async (authorId: string, bookId: string) => {
  const { data } = await api.patch("/author/" + authorId, { bookId });
  return data;
};
