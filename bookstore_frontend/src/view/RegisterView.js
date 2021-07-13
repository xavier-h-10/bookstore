import React from 'react';
import {withRouter} from "react-router-dom";
import MyFooter from "../components/footer"
import RegisterForm from "../components/RegisterPage/RegisterForm.js";
import {Layout, Divider} from 'antd';
import 'antd/dist/antd.css'
import logo from '../resources/logo.svg'

const {Header, Content, Footer} = Layout;

class RegisterView extends React.Component {
  render() {
    return (
        <div className="register-page">
          <div className="register-container">
            <div className="logo-container">
              <img className="logo-image" src={logo} alt="logo"/>
              <span class="title-text">用户注册</span>
            </div>
            <Content className="RegisterBox-container">
              <div className="RegisterBox-wrap">
                <div className="RegisterForm-container">
                  <RegisterForm/>
                </div>
              </div>
            </Content>
            <Footer>
              <MyFooter/>
            </Footer>
          </div>
        </div>
    );

  }
}

export default withRouter(RegisterView);