import React from "react";
import history from "utils/history";
import styles from "./styles.module.scss";

interface IProps {
  firstName: string;
  lastName: string;
  authorId: string;
}

const AuthorItem = ({ firstName, lastName, authorId }: IProps) => {
  const handleClick = () => {
    history.push("/authors/" + authorId);
  };

  return (
    <div className={styles.authorItem} onClick={handleClick}>
      <h2>
        {firstName} {lastName}
      </h2>
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Unknown_person.jpg/434px-Unknown_person.jpg"
        alt="authorPhoto"
      />
    </div>
  );
};

export default AuthorItem;
