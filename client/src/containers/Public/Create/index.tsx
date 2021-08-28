// @ts-nocheck
import { Button, Form, Input } from "antd";
import TextArea from "antd/lib/input/TextArea";
import { setBooks } from "api/api";
import React, { useRef } from "react";
import styles from "./styles.module.scss";

const Create = () => {
  const formRef = useRef(null);

  const onFinish = async (values: any) => {
    await setBooks(values);
    formRef.current!.resetFields();
  };

  const onReset = () => {
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
      <div className={styles.create}>
        <h1>Book create</h1>
        <Form name="control-ref" ref={formRef} onFinish={onFinish}>
          <Form.Item name="title" label="Title" rules={[{ required: true }]}>
            <Input />
          </Form.Item>

          <Form.Item name="img" label="Img source" rules={[{ required: true }]}>
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
    </div>
  );
};

export default Create;
