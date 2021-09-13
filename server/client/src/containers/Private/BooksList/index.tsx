import BookItem from "components/BookItem";
import { IGetBookResponse } from "models/booksResponse";
import { useEffect, useState } from "react";
import { useStore } from "stores";
import styles from "./styles.module.scss";
import cn from "classnames";
interface IProps {
  dark: boolean;
  darkStyles: string;
}

const BookList = ({ dark, darkStyles }: IProps) => {
  const { booksStore } = useStore();
  let [booksList, setBooksList] = useState<IGetBookResponse[]>([]);

  useEffect(() => {
    if (!booksList.length) {
      getBooksHandler();
    }
  }, []);

  const getBooksHandler = async () => {
    const books = await booksStore.getBooks();
    setBooksList(books);
  };

  return (
    <div
      className={cn(styles.list, {
        [darkStyles]: dark,
      })}
    >
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

export default BookList;
