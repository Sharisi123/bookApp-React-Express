import { getBooks } from "api/api";
import BookItem from "components/BookItem";
import { IGetBookResponce } from "models/api";
import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";

const List = () => {
  let [booksList, setBooksList] = useState<IGetBookResponce[]>([]);

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
        />
      ))}
    </div>
  );
};

export default List;
