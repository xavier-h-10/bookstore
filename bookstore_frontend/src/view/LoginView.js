import React from 'react';
import LoginForm from '../components/LoginPage/LoginForm.js'
import {withRouter} from 'react-router-dom';
import logo from '../resources/logo.svg'
import {Layout} from 'antd';
import MyFooter from "../components/footer.js";
import "../css/LoginPage.css";

const {Header, Content, Footer} = Layout;

class LoginView extends React.Component {
  render() {
    return (
        <div className="login-page">
          <div className="login-container">
            <div className="logo-container">
              <img className="logo-image" src={logo} alt="logo"/>
              <span class="title-text">用户登录</span>
            </div>
            <Content className="content-container">
              <div className="LoginBox-wrap">
                <div className="LoginForm-container">
                  <LoginForm/>
                  <a className="register-click" href="/register">立即注册</a>
                </div>
              </div>
            </Content>
            <Footer>
              <MyFooter/>
            </Footer>
          </div>
        </div>
    )
  }
}

export default withRouter(LoginView);