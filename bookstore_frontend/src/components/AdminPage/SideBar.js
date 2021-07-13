import React from 'react';
import {Menu, Layout, Icon, Breadcrumb, Divider, Space} from 'antd';
import '../../css/AdminPage.css';

import {
  PieChartOutlined,
  FileOutlined,
  UserOutlined,
  ReadOutlined,
  DashboardOutlined, AccountBookOutlined,
} from '@ant-design/icons';


const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

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
    this.setState({ collapsed });
  };

  render() {
    return (

        <Sider theme="light" className="siderAdmin-container" style={{display:"inline-block"}}>
          <div className="logoAdmin-container">
            <Space style={{height:50}} align="center">
              <Divider type="vertical" />
              <span style={{paddingLeft:30}}>
                  后台管理系统
                </span>
            </Space>
          </div>
          <Menu theme="light" defaultSelectedKeys={[this.state.selected]} mode="inline">
            <Menu.Item key="1" icon={<UserOutlined/>} style={{
              height: 50,
              paddingTop: 8,
              marginTop: 0,
              marginBottom: 0
            }}>
              <a href="/admin/1">
                用户管理
              </a>
            </Menu.Item>
            <Menu.Item key="2" icon={<ReadOutlined/>} style={{
              height: 50,
              paddingTop: 8,
              marginTop: 0,
              marginBottom: 0
            }}>
              <a href="/admin/2">
                书籍管理
              </a>
            </Menu.Item>
            <Menu.Item key="4" icon={<FileOutlined/>} style={{
              height: 50,
              paddingTop: 8,
              marginTop: 0,
              marginBottom: 0
            }}>
              <a href="/admin/4">
                订单管理
              </a>
            </Menu.Item>
            <Menu.Item key="5" icon={<DashboardOutlined />} style={{
              height: 50,
              paddingTop: 8,
              marginTop: 0,
              marginBottom: 0
            }}>
              <a href="/admin/5">
                销量统计
              </a>
            </Menu.Item>
            <Menu.Item key="6" icon={<AccountBookOutlined />} style={{
              height: 50,
              paddingTop: 8,
              marginTop: 0,
              marginBottom: 0
            }}>
              <a href="/admin/6">
                用户消费统计
              </a>
            </Menu.Item>
          </Menu>
        </Sider>
    );
  }
}

export default SideBar;
