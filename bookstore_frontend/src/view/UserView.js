import React from 'react';
import MyFooter from "../components/footer";
import {Layout} from 'antd';
import {withRouter} from 'react-router-dom';
import "../css/HomePage.css";
import HeadWrap from "../components/HeadWrap";
import SideBar from "../components/SideBar";
import BookStats from "../components/UserPage/BookStats";

class UserView extends React.Component {
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
              <SideBar selected={"5"}/>
              <div className="userorder-container">
                <BookStats isadmin={"0"}/>
              </div>
            </Layout>
            <MyFooter/>
          </div>
        </div>
    )
  }
};

export default withRouter(UserView);