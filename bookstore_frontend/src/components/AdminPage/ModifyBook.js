import React, { useContext, useState, useEffect, useRef } from 'react';
import {
  Input,
  Button,
  Form,
} from 'antd';
import "../../css/AdminPage.css";
import {updateBook, getBookById, getBooks} from "../../service/BookService";
const EditableContext = React.createContext(null);

const { TextArea } = Input;

const formItemLayout = {
  labelCol: {
    xs: {span: 24},
    sm: {span: 8},
  },
  wrapperCol: {
    xs: {span: 24},
    sm: {span: 16},
  },
};

const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

const ModifyBook=(data)=>{
  const onFinishFailed = (errorInfo) => {
    console.log('ModifyBook Failed:', errorInfo);
  };

  const handleSubmit =(values) => {
    console.log('ModifyBook Received values of form:',values);
    updateBook(values);
    window.location.href = "../admin/2";
  }

  let book=null;

  const [form] = Form.useForm();

  const handleBook=(detail)=>{
    book=detail;
    console.log("handlebook called");
 //   console.log(book);
    form.setFieldsValue({
      name:book.name,
      author:book.author,
      price:book.price.toFixed(2),
      inventory:book.inventory,
      description:book.description,
      brief:book.brief,
      type:book.type,
      image:book.image,
      isbn:book.isbn,
      bookId:book.bookId,
    })
  }

  useEffect(()=>{
    getBookById(data.id,handleBook);
  });

    return (
        <div>
          <h3 style={{marginLeft: 50}}>修改图书信息</h3>
          <div className="addbook-container">
            <Form
                {...formItemLayout}
                form={form}
                name="modifybook"
                onFinish={handleSubmit}
                onFinishFailed={onFinishFailed}
                scrollToFirstError
                className="addbook-form"
            >

              <Form.Item
                  name="bookId"
                  label="图书编号"
                  // rules={[
                  //   {
                  //     required: false,
                  //     whitespace: true,
                  //   },
                  // ]}
              >
                <Input disabled="true"/>
              </Form.Item>

              <Form.Item
                  name="name"
                  label="名称"
                  hasFeedback
                  rules={[
                    {
                      required: true,
                      message: '请输入图书名称。',
                      whitespace: true,
                    },
                  ]}
              >
                <Input/>
              </Form.Item>

              <Form.Item
                  name="author"
                  label="作者"
                  hasFeedback
                  rules={[
                    {
                      required: true,
                      message: '请输入图书作者。',
                    },
                  ]}
              >
                <Input/>
              </Form.Item>

              <Form.Item
                  name="price"
                  label="价格"
                  dependencies={['password']}
                  hasFeedback
                  rules={[
                    {
                      required: true,
                      pattern: new RegExp(/^(([1-9]\d*)|\d)(\.\d{1,2})?$/, 'g'),
                      message: '请输入正确的图书价格(最多两位小数)。',
                    },
                  ]}
              >
                <Input/>
              </Form.Item>

              <Form.Item
                  name="isbn"
                  label="ISBN"
                  hasFeedback
                  rules={[
                    {
                      required: true,
                      message: '请输入图书的ISBN号(13位数字)。',
                      whitespace: true,
                      pattern: new RegExp(/\d{13}$/, 'g'),
                    },
                  ]}
              >
                <Input/>
              </Form.Item>

              <Form.Item
                  name="inventory"
                  label="库存量"
                  hasFeedback
                  rules={[
                    {
                      required: true,
                      message: '请输入正确的库存量(正整数)。',
                      whitespace: true,
                      pattern: new RegExp(/^[1-9]\d*$/, 'g'),
                    },
                  ]}
              >
                <Input/>
              </Form.Item>
              <Form.Item
                  name="description"
                  label="详情"
                  hasFeedback
                  rules={[
                    {
                      required: true,
                      message: '请输入书籍详情。',
                      whitespace: true,
                    },
                  ]}
              >
                <TextArea/>
              </Form.Item>
              <Form.Item
                  name="image"
                  label="封面地址"
                  hasFeedback
                  rules={[
                    {
                      required: true,
                      message: '请输入正确的封面地址。',
                      pattern: new RegExp(
                          "^(http|https|ftp)\://([a-zA-Z0-9\.\-]+(\:[a-zA-Z0-9\.&amp;%\$\-]+)*@)*((25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9])\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9]|0)\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9]|0)\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[0-9])|localhost|([a-zA-Z0-9\-]+\.)*[a-zA-Z0-9\-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(\:[0-9]+)*(/($|[a-zA-Z0-9\.\,\?\'\\\+&amp;%\$#\=~_\-]+))*$"),
                      whitespace: true,
                    },
                  ]}
              >
                <TextArea/>
              </Form.Item>

              <Form.Item
                  name="type"
                  label="类别"
                  hasFeedback
                  rules={[
                    {
                      required: true,
                      message: '请输入书籍类别。',
                      whitespace: true,
                    },
                  ]}
              >
                <Input/>
              </Form.Item>

              <Form.Item
                  name="brief"
                  label="简介"
                  hasFeedback
                  rules={[
                    {
                      required: true,
                      message: '请输入书籍简介。',
                      whitespace: true,
                    },
                  ]}
              >
                <TextArea/>
              </Form.Item>

              <Form.Item {...tailFormItemLayout}>
                <Button type="primary" htmlType="submit" block="true">
                  提交
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>

    );
};

export default ModifyBook;