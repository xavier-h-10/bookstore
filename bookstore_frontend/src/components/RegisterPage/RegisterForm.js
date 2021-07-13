import React, {useState} from 'react';
import {Form, Input, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete} from 'antd';
import {register,registerCheck} from "../../service/UserService";
import 'antd/dist/antd.css';
import '../../css/RegisterPage.css'
import reqwest from 'reqwest';

const {Option} = Select;

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

const RegisterForm = () => {
  const [form] = Form.useForm();
  const onFinishFailed = (errorInfo) => {
    console.log('Register Failed:', errorInfo);
  };

  const handleSubmit =(values) => {
    console.log('Register Received values of form:',values);
    register(values);
  }

  let checkUser=false;
  //
  // const handleCheck=(value) => {
  //   console.log("handle check called  "+value);
  //   checkUser=value;
  // }
  //
  // const checkAccount= async (rule,value,callback) => {
  //   if(!value) {
  //     return Promise.reject("请输入您的用户名。");
  //   }
  //   let p=new Promise(function(resolve,reject) {
  //     let timer=setTimeout(function() {
  //       registerCheck(value,handleCheck);
  //       resolve();
  //     },1000);
  //   });
  //   p.then(function(){
  //     console.log("checkUser called="+checkUser);
  //     if(checkUser==true) {
  //       return Promise.reject("此用户名已被注册，请更换其他用户名。");
  //     } else {
  //       return Promise.resolve();
  //     }
  //   })
  //   // await registerCheck(value, handleCheck);
  //   // console.log("checkUser called="+checkUser);
  //   // if(checkUser==true) {
  //   //   return Promise.reject("此用户名已被注册，请更换其他用户名。");
  //   // } else {
  //   //   return Promise.resolve();
  //   // }
  // }


  const [autoCompleteResult, setAutoCompleteResult] = useState([]);

  return (
      <Form
          {...formItemLayout}
          form={form}
          name="register"
          onFinish={handleSubmit}
          onFinishFailed={onFinishFailed}
          scrollToFirstError
      >

        <Form.Item
            name="username"
            label="用户名"
            rules={[
              {
                required: true,
                whitespace: true,
                message: '请输入您的用户名。',
              },
              // {validator: checkAccount}
              ({getFieldValue})=>({
                validator(_,value,callback) {
                  console.log("validator called");
                  if(!value) {
                    callback("");
                  }
                  reqwest({
                    url:`http://localhost:8080/registerCheck?username=${value}`,
                    method:'get',
                    type:'json',
                  }).then(data=>{
                    console.log("get data:"+data);
                    if(data==false) {
                      console.log("yes called");
                      callback();
                    }
                    else {
                      console.log("reject called");
                     // return Promise.reject("此用户名已被注册，请更换其他用户名。");
                      callback("此用户名已被注册，请更换其他用户名。");
                    }
                  })
                  console.log("validator end");
                  return false;

                }
              }),
            ]}
            hasFeedback
        >
          <Input/>
        </Form.Item>

        <Form.Item
            name="password"
            label="密码"
            rules={[
              {
                required: true,
                message: '请输入您的密码。',
              },
              ({getFieldValue}) => ({
                validator(_, value) {
                  if (value.length>=8 || !value) {
                    return Promise.resolve();
                  }

                  return Promise.reject(new Error('密码长度至少为8位。'));
                },
              }),
            ]}
            hasFeedback
        >
          <Input.Password/>
        </Form.Item>

        <Form.Item
            name="confirm"
            label="确认密码"
            dependencies={['password']}
            hasFeedback
            rules={[
              {
                required: true,
                message: '请确认您的密码。',
              },
              ({getFieldValue}) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }

                  return Promise.reject(new Error('两次输入的密码不相等。'));
                },
              }),
            ]}
        >
          <Input.Password/>
        </Form.Item>

        <Form.Item
            name="name"
            label="姓名"
            rules={[
              {
                required: true,
                message: '请输入您的姓名。',
                whitespace: true,
              },
            ]}
            hasFeedback
        >
          <Input/>
        </Form.Item>

        <Form.Item
            name="email"
            label="电子邮箱"
            rules={[
              {
                type: 'email',
                message: '输入的邮箱地址不合法。',
              },
              {
                required: true,
                message: '请输入您的邮箱地址。',
              },
            ]}
            hasFeedback
        >
          <Input/>
        </Form.Item>

        <Form.Item
            name="agreement"
            valuePropName="checked"
            rules={[
              {
                validator: (_, value) =>
                    value ? Promise.resolve() : Promise.reject(
                        new Error('请阅读并同意用户协议。')),
              },
            ]}
            {...tailFormItemLayout}
        >
          <Checkbox>
            我已阅读并同意 <a href="">以下协议。</a>
          </Checkbox>
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit" block="true">
            完成注册
          </Button>
        </Form.Item>
      </Form>

  );

};

export default RegisterForm;
