import React, { useEffect, useState } from "react";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import styles from "./styles.module.scss";
import { Button, Input } from "antd";
import TextArea from "antd/lib/input/TextArea";
import Loader from "components/Loader";
import { NavLink } from "react-router-dom";
import { useStore } from "stores";

interface IProps {
  img: string;
  title: string;
  date: string;
  content: string;
  id: string;
  authorId: string;
  getBooksHandler?: () => void;
  viewMode?: boolean;
}

const BookItem = ({
  img,
  title,
  date,
  content,
  id,
  authorId,
  getBooksHandler,
  viewMode,
}: IProps) => {
  const { booksStore, authorsStore } = useStore();

  const [imgState, setImgState] = useState(img);
  const [titleState, setTitleState] = useState(title);
  const [dateState, setDateState] = useState(date);
  const [contentState, setContentState] = useState(content);
  const [authorName, setAuthorName] = useState("");
  const [isEdited, setIsEdited] = useState(false);
  const [isButtonDisable, setIsButtonDisable] = useState(false);
  const [loading, setLoading] = useState(false);

  const onEdit = () => {
    setIsEdited((edited) => !edited);
  };
  const onDelete = async () => {
    await booksStore.deleteBook(id);

    getBooksHandler && (await getBooksHandler());
  };

  const getAuthorName = async () => {
    setLoading(true);
    const data = await authorsStore.getAuthorsById(authorId);
    // @ts-ignore
    setAuthorName(data.firstName + " " + data.lastName);
    setLoading(false);
  };

  useEffect(() => {
    getAuthorName();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const updateBookHandler = async () => {
    setIsButtonDisable(true);
    await booksStore.updateBook({
      img: imgState,
      title: titleState,
      realizeDate: dateState,
      content: contentState,
      authorId,
      id,
    });
    setIsButtonDisable(false);
    onEdit();
    getBooksHandler && (await getBooksHandler());
  };

  return (
    <div className={styles.bookItem}>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div>
            {isEdited ? (
              <Input
                value={imgState}
                onChange={(e) => setImgState(e.target.value)}
              />
            ) : (
              <img src={img} alt="bookLogo" />
            )}
          </div>
          <div className={styles.content}>
            <div className={styles.headLine}>
              <h1>
                {isEdited ? (
                  <Input
                    value={titleState}
                    onChange={(e) => setTitleState(e.target.value)}
                  />
                ) : (
                  title
                )}
              </h1>
              <div>
                {!viewMode ? (
                  <>
                    <EditOutlined onClick={onEdit} />
                    <DeleteOutlined onClick={onDelete} />
                  </>
                ) : null}
              </div>
            </div>

            <p>
              Автор: <NavLink to={`/authors/${authorId}`}>{authorName}</NavLink>
            </p>

            <p className={styles.content}>
              {isEdited ? (
                <TextArea
                  style={{ minHeight: "150px" }}
                  value={contentState}
                  onChange={(e) => setContentState(e.target.value)}
                />
              ) : (
                content
              )}
            </p>
            <span>
              {isEdited ? (
                <Input
                  value={dateState}
                  onChange={(e) => setDateState(e.target.value)}
                />
              ) : (
                date
              )}
            </span>
            {isEdited && (
              <Button
                onClick={updateBookHandler}
                disabled={isButtonDisable}
                type="primary"
              >
                Update
              </Button>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default BookItem;
