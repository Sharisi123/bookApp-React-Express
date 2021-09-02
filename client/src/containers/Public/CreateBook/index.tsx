import { Button, Form, Input, Select } from "antd";
import TextArea from "antd/lib/input/TextArea";
import { getAuthors, updateAuthorBooks } from "api/authorsApi";
import { setBooks } from "api/booksApi";
import Loader from "components/Loader";
import { IGetAuthorsResponse } from "models/authorsResponse";
import _ from "lodash";
import { useRef, useState, useEffect } from "react";
import styles from "./styles.module.scss";

const Create = () => {
  const [authors, setAuthors] = useState<IGetAuthorsResponse[]>([]);
  const [authorSelect, setAuthorSelect] = useState("");
  const [loading, setLoading] = useState(false);

  const formRef = useRef(null);

  const getAuthorsHandler = async () => {
    setLoading(true);
    const data = await getAuthors();
    setAuthors(data);
    setLoading(false);
  };

  useEffect(() => {
    getAuthorsHandler();
  }, []);

  const onHandleSelect = (value: string) => {
    console.log(value);

    setAuthorSelect(value);
  };

  const onFinish = async (values: any) => {
    console.log(values);

    const id = _.camelCase(values.title) + Date.now();
    const data = {
      ...values,
      _id: id,
      authorId: authorSelect,
    };
    await setBooks(data);
    await updateAuthorBooks(authorSelect, id);
    // @ts-ignore
    formRef.current!.resetFields();
  };

  const onReset = () => {
    // @ts-ignore
    formRef.current!.resetFields();
  };

  const onFill = () => {
    // @ts-ignore
    formRef.current!.setFieldsValue({
      title: "Book",
      img: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/39/Book.svg/1200px-Book.svg.png",
      realizeDate: "2021",
      content: "lorem",
    });
  };

  return (
    <div className={styles.container}>
      {loading ? (
        <Loader />
      ) : (
        <div className={styles.create}>
          <h1>Book create</h1>
          <Form name="control-ref" ref={formRef} onFinish={onFinish}>
            <Form.Item name="title" label="Title" rules={[{ required: true }]}>
              <Input />
            </Form.Item>

            <Form.Item
              name="img"
              label="Img source"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="realizeDate"
              label="Realize date"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="content"
              label="Description"
              rules={[{ required: true }]}
            >
              <TextArea />
            </Form.Item>

            <Form.Item label="Select author" rules={[{ required: true }]}>
              <Select onChange={onHandleSelect}>
                {authors.map((item) => (
                  <Select.Option value={item._id} key={item._id}>
                    {item.firstName} {item.lastName}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>

              <Button htmlType="button" onClick={onReset}>
                Reset
              </Button>

              <Button type="link" htmlType="button" onClick={onFill}>
                Fill form
              </Button>
            </Form.Item>
          </Form>
        </div>
      )}
    </div>
  );
};

export default Create;