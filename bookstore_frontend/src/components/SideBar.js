import React from 'react';
import {Menu, Layout, Icon, Breadcrumb, Divider, Space} from 'antd';
import '../css/HomePage.css';

import {
  FileOutlined,
  UserOutlined,
  ReadOutlined,
  ShoppingCartOutlined,
  HomeOutlined,
  UserSwitchOutlined,
} from '@ant-design/icons';

const {Header, Content, Footer, Sider} = Layout;
const {SubMenu} = Menu;

class SideBar extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      collapsed:false,
      selected:props.selected,
    }
    console.log("sidebar:"+props.selected);
  }

  onCollapse = collapsed => {
    console.log(collapsed);
    this.setState({collapsed});
  };

  render() {
    console.log("hello"+this.state.selected);
    return (
        <Sider theme="light" className="sider-container">
          <Menu theme="light" defaultSelectedKeys={[this.state.selected]} mode="inline">
            <Menu.Item key="1" icon={<HomeOutlined />} style={{
              height: 50,
              paddingTop: 8,
              marginTop: 0,
              marginBottom: 0
            }}>
              <a href="/home">
                首页
              </a>
            </Menu.Item>
            <Menu.Item key="2" icon={<ReadOutlined/>} style={{
              height: 50,
              paddingTop: 8,
              marginTop: 0,
              marginBottom: 0
            }}>
              <a href="/book_all">
                书籍浏览
              </a>
            </Menu.Item>
            <Menu.Item key="3" icon={<ShoppingCartOutlined/>} style={{
              height: 50,
              paddingTop: 8,
              marginTop: 0,
              marginBottom: 0
            }}>
              <a href="/cart">
                我的购物车
              </a>
            </Menu.Item>
            <Menu.Item key="4" icon={<FileOutlined/>} style={{
              height: 50,
              paddingTop: 8,
              marginTop: 0,
              marginBottom: 0
            }}>
              <a href="/user_order">
                我的订单
              </a>
            </Menu.Item>
            <Menu.Item key="5" icon={<UserOutlined/>} style={{
              height: 50,
              paddingTop: 8,
              marginTop: 0,
              marginBottom: 0
            }}>
              <a href="/user">
                我的购书统计
              </a>
            </Menu.Item>
            <Menu.Item key="6" icon={<UserSwitchOutlined/>} style={{
              height: 50,
              paddingTop: 8,
              marginTop: 0,
              marginBottom: 0
            }}>
              <a href="/admin/1">
                管理员后台
              </a>
            </Menu.Item>
          </Menu>
        </Sider>
    );
  }
}

export default SideBar;
