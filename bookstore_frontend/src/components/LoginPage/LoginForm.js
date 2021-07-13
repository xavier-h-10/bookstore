import React from 'react';
import {Form, Input, Button, Checkbox} from 'antd';
import {login} from "../../service/UserService";
import 'antd/dist/antd.css';
import '../../css/LoginPage.css'

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};

class LoginForm extends React.Component {

  onFinishFailed = (errorInfo) => {
    console.log('Login Failed:', errorInfo);
  };

  handleSubmit =(values) => {
    console.log('Login Received values of form:',values);
    login(values);
  }

  render() {
    return (
        <Form   {...layout}
                name="basic"
                initialValues={{remember: true}}
                onFinish={this.handleSubmit}
             //   onFinishFailed={this.onFinishFailed}
        >
          <div className="LoginInput" align="center">
            <Form.Item
                label="用户名"
                name="username"
                rules={[{required: true, message: '请输入用户名。'}]}
            >
              <Input/>
            </Form.Item>
          </div>

          <div className="LoginInput" align="center">
            <Form.Item
                label="密码"
                name="userPassword"
                rules={[{required: true, message: '请输入密码。'}]}
            >
              <Input.Password/>
            </Form.Item>
          </div>

          <div className="LoginRemember" align="center">
            <Form.Item
                {...tailLayout}
                name="remember"
                valuePropName="checked"
            >
              <Checkbox>
                记住用户名和密码
              </Checkbox>
            </Form.Item>
          </div>


          <div className="LoginSubmit" align="center">
            <Form.Item {...tailLayout}>
              <Button type="primary" htmlType="submit" className="SubmitButton"
                      style={{right: 43}}>
                登录
              </Button>
            </Form.Item>
          </div>
        </Form>

    );
  };

};

export default LoginForm;
