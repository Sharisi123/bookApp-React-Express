import BookItem from "components/BookItem";
import Loader from "components/Loader";
import { IGetAuthorsResponse } from "models/authorsResponse";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useStore } from "stores";
import styles from "./styles.module.scss";
import cn from "classnames";

interface IProps {
  dark: boolean;
  darkStyles: string;
}

const AuthorProfile = ({ dark, darkStyles }: IProps) => {
  const { authorsStore, booksStore } = useStore();
  const [author, setAuthor] = useState<IGetAuthorsResponse | null>(null);
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  // @ts-ignore
  const { id } = useParams();

  useEffect(() => {
    getInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getInfo = async (): Promise<void> => {
    let arr = [];
    setLoading(true);
    const author = await authorsStore.getAuthorsById(id);
    setAuthor(author);

    for (const bookId of author.books) {
      console.log(bookId);
      const book = await booksStore.getBookById(bookId);
      arr.push(book);
    }
    // @ts-ignore
    setBooks(arr);
    setLoading(false);
  };

  return (
    <div
      className={cn(styles.authorProfile, {
        [darkStyles]: dark,
      })}
    >
      {loading ? (
        <Loader />
      ) : (
        <>
          <h2>
            {author?.firstName} {author?.lastName}
          </h2>
          <div className={styles.authorInfo}>
            <div>
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Unknown_person.jpg/434px-Unknown_person.jpg"
                alt="authorPhoto"
              />
            </div>
            <div className={styles.contacts}>
              <p>
                <strong>Email: </strong>
                {author?.email}
              </p>
              <p>
                <strong>Phone: </strong>
                {author?.phoneNumber}
              </p>
              <p>
                <strong>On site since: </strong>
                {author?.createdAt}
              </p>
            </div>
          </div>

          <div className={styles.books}>
            <h2>Книги</h2>
            <div>
              {books.map((item: any) => (
                <BookItem
                  key={item._id}
                  id={item._id}
                  title={item.title}
                  img={item.img}
                  date={item.realizeDate}
                  content={item.content}
                  authorId={item.authorId}
                />
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default AuthorProfile;
