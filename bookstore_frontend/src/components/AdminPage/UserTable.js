import React from 'react';
import {Menu, Layout, Divider, Space, Table, Switch} from 'antd';
import '../../css/AdminPage.css';
import {getAllUsers, updateUserStatus} from "../../service/UserService";

const {Header, Content, Footer, Sider} = Layout;

class UserTable_Admin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: null,
    }
  }

  handleUsers = data => {
    this.setState({
      users: data,
    });
  }

  handleChange = (checked,userId) => {
    console.log("UserTable handleChange:"+checked+" "+userId);
      updateUserStatus(userId,checked);
     // this.handleUsers();
  }
  handleChange1 = (checked) => {
    console.log("switch to "+checked);
    // this.handleUsers();
  }

  componentDidMount() {
    getAllUsers(this.handleUsers);
  }

  render() {
    const columns = [
      {
        title: '用户ID',
        dataIndex: 'userId',
        key: 'userId',
      },
      {
        title: '姓名',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '电子邮箱',
        dataIndex: 'email',
        key: 'email',
      },
      {
        title: '操作',
        dataIndex: 'enabled',
        key: 'enabled',
        render: (text, record) => (
            <Space size="middle">
              <Switch checkedChildren="启用" unCheckedChildren="禁用"
                      defaultChecked={record.enabled}
                      onChange={(checked)=>this.handleChange(checked,record.userId)}
              />
            </Space>
        ),
      },
    ];
    return (
        <Table columns={columns} dataSource={this.state.users}/>
    );
  }
}

export default UserTable_Admin;
