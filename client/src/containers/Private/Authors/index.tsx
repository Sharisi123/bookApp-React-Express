import AuthorItem from "components/AuthorItem";
import Loader from "components/Loader";
import { IGetAuthorsResponse } from "models/authorsResponse";
import React, { useState } from "react";
import { useEffect } from "react";
import { useStore } from "stores";
import styles from "./styles.module.scss";

const Authors = () => {
  const { authorsStore } = useStore();
  const [authors, setAuthors] = useState<IGetAuthorsResponse[]>([]);
  const [loading, setLoading] = useState(false);

  const getAuthorsHandler = async () => {
    setLoading(true);
    const data = await authorsStore.getAuthors();

    // @ts-ignore
    setAuthors(data);
    setLoading(false);
  };

  useEffect(() => {
    getAuthorsHandler();
  }, []);

  return (
    <div className={styles.authors}>
      {loading ? (
        <Loader />
      ) : (
        <>
          <h1>Список авторов</h1>
          {authors.map((author) => (
            <AuthorItem
              key={author._id}
              authorId={author._id}
              firstName={author.firstName}
              lastName={author.lastName}
            />
          ))}
        </>
      )}
    </div>
  );
};

export default Authors;
