import BookItem from "components/BookItem";
import { IGetBookResponse } from "models/booksResponse";
import { useEffect, useState } from "react";
import { useStore } from "stores";
import styles from "./styles.module.scss";
import qs from "qs";

const List = () => {
  const { booksStore } = useStore();
  let [booksList, setBooksList] = useState<IGetBookResponse[]>([]);

  const getBooksHandler = async () => {
    const books = await booksStore.getBooks();
    setBooksList(books);
  };

  useEffect(() => {
    const parsedQs = qs.parse(window.location.search, {
      ignoreQueryPrefix: true,
    });

    if (parsedQs) {
      const token = qs.stringify(parsedQs, { encodeValuesOnly: true });
      console.log(token);
    }

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
