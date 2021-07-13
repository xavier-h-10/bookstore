import React from "react";
import {Avatar, Dropdown, Menu} from 'antd';
import {UserOutlined} from '@ant-design/icons';
import {login, logout,getUser} from "../service/UserService";
import "../css/HomePage.css"

class UserAvatar extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      username: "Hi, please login",
    }
  }

  handleUser = data => {
    if(data.name!=undefined) {
      this.setState({
        username: "Hi, "+data.name,
      })
    }
  }

  componentDidMount() {
    getUser(this.handleUser);
  }

  handleLogout =() => {
   // console.log('Received values of form:',values);
    logout();
  }

  render() {
    const menu = (
        <Menu>
          {/*<Menu.Item>*/}
          {/*  <a target="_blank" rel="noopener noreferrer"*/}
          {/*     href="http://www.alipay.com/">*/}
          {/*    用户信息*/}
          {/*  </a>*/}
          {/*</Menu.Item>*/}
          <Menu.Item>
            <a onClick={this.handleLogout}>
              登出
            </a>
          </Menu.Item>
          {/*<Menu.Item>*/}
          {/*  <a href="../register">*/}
          {/*    注册*/}
          {/*  </a>*/}
          {/*</Menu.Item>*/}
        </Menu>
    );
    return (
        <div id="avatar" className="avatar-container">
          <Dropdown overlay={menu} placement="bottomRight">
            <Avatar icon={<UserOutlined/>} size={"large"}
                    style={{cursor: "pointer", backgroundColor: '#87d068'}}/>
          </Dropdown>
          <span className="avatar-name">{this.state.username}</span>
        </div>
    );
  }
}

export default UserAvatar;