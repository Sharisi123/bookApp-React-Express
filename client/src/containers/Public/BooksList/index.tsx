import { getBooks } from "api/booksApi";
import BookItem from "components/BookItem";
import { IGetBookResponse } from "models/booksResponse";
import { useEffect, useState } from "react";
import styles from "./styles.module.scss";

const List = () => {
  let [booksList, setBooksList] = useState<IGetBookResponse[]>([]);

  const getBooksHandler = async () => {
    const books = await getBooks();
    setBooksList(books);
  };

  useEffect(() => {
    getBooksHandler();
  }, []);

  return (
    <div className={styles.list}>
      {booksList.map((item) => (
        <BookItem
          key={item._id}
          id={item._id}
          title={item.title}
          img={item.img}
          date={item.realizeDate}
          content={item.content}
          getBooksHandler={getBooksHandler}
          authorId={item.authorId}
        />
      ))}
    </div>
  );
};

export default List;
