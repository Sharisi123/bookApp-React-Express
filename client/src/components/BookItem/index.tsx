import React, { useState } from "react";
import { deleteBook, updateBook } from "api/api";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import styles from "./styles.module.scss";
import { Button, Input } from "antd";
import TextArea from "antd/lib/input/TextArea";

interface IProps {
  img: string;
  title: string;
  date: string;
  content: string;
  id: string;
  getBooksHandler: () => void;
}

const BookItem = ({
  img,
  title,
  date,
  content,
  id,
  getBooksHandler,
}: IProps) => {
  let [imgState, setImgState] = useState(img);
  let [titleState, setTitleState] = useState(title);
  let [dateState, setDateState] = useState(date);
  let [contentState, setContentState] = useState(content);
  let [isEdited, setIsEdited] = useState(false);
  let [loading, setLoading] = useState(false);

  const onEdit = () => {
    setIsEdited((edited) => !edited);
  };
  const onDelete = async () => {
    await deleteBook(id);
    getBooksHandler();
  };

  const updateBookHandler = async () => {
    setLoading(true);
    await updateBook(id, {
      img: imgState,
      title: titleState,
      realizeDate: dateState,
      content: contentState,
    });
    setLoading(false);
    onEdit();
    await getBooksHandler();
  };

  return (
    <div className={styles.bookItem}>
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
            <EditOutlined onClick={onEdit} />
            <DeleteOutlined onClick={onDelete} />
          </div>
        </div>
        <p>
          {isEdited ? (
            <TextArea
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
          <Button onClick={updateBookHandler} disabled={loading} type="primary">
            Update
          </Button>
        )}
      </div>
    </div>
  );
};

export default BookItem;
