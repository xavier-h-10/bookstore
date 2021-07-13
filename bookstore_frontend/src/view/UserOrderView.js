import React from 'react';
import HeadWrap from "../components/HeadWrap";
import {Layout} from "antd";
import SideBar from "../components/SideBar";
import UserOrderTable from "../components/UserPage/UserOrderTable";
import "../css/UserOrderPage.css";
import MyFooter from "../components/footer";

class UserOrderView extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
        <div className="user-page">
            <div className="head-container">
              <HeadWrap/>
            </div>
            <div className="user-container">
              <Layout className="bookview-layout">
                <SideBar selected={"4"}/>
                <div className="userorder-container">
                  <UserOrderTable isadmin={"0"}/>
                </div>
              </Layout>
              <MyFooter/>
            </div>
        </div>
    );
  }
}

export default UserOrderView;
