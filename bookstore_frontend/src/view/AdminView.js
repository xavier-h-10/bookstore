import React from 'react';
import SideBar from '../components/AdminPage/SideBar.js';
import {Layout} from "antd";
import MyFooter from "../components/footer";
import BookTable_Admin from "../components/AdminPage/BookTable";
import "../css/AdminPage.css";
import HeadWrap_HomePage from "../components/HeadWrap";
import UserTable_Admin from "../components/AdminPage/UserTable";
import UserOrderTable from "../components/UserPage/UserOrderTable";
import BookStats from "../components/UserPage/BookStats";
import UserStats from "../components/UserPage/UserStats";
import AddBook from "../components/AdminPage/AddBook";
import ModifyBook from "../components/AdminPage/ModifyBook";

class AdminView extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const renderContent = () => {
      if(this.props.match.params.id==1) {
        return (
            <Layout className="adminview-layout" >
              <SideBar selected={"1"}/>
              <div className="booktable-wrapper">
                <div className="booktable-container" >
                  <UserTable_Admin className="booktable-admin" />
                </div>
              </div>
            </Layout>
        );
      }
      else if(this.props.match.params.id==2) {
        return (
            <Layout className="adminview-layout" >
              <SideBar selected={"2"}/>
              <div className="booktable-wrapper">
                <div className="booktable-container" >
                  <BookTable_Admin className="booktable-admin" />
                </div>
              </div>
            </Layout>
        );
      }
      else if(this.props.match.params.id==3) {
        return (
            <Layout className="adminview-layout" >
              <SideBar selected={"2"}/>
              <div className="addbook-wrapper">
                <div className="booktable-container" style={{paddingTop:30}}>
                  <AddBook className="booktable-admin" />
                </div>
              </div>
            </Layout>
        );
      }
      else if(this.props.match.params.id==4) {
        return (
            <Layout className="adminview-layout" >
            <div className="user-container">
          <Layout className="bookview-layout">
            <SideBar selected={"4"}/>
            <div className="userorder-container">
              <UserOrderTable isadmin={"1"}/>
            </div>
          </Layout>
        </div>
            </Layout>
        );
      }
      else if(this.props.match.params.id==5) {
        return (
            <Layout className="adminview-layout" >
              <div className="user-container">
                <Layout className="bookview-layout">
                  <SideBar selected={"5"}/>
                  <div className="userorder-container">
                    <BookStats isadmin={"1"}/>
                  </div>
                </Layout>
              </div>
            </Layout>
        );
      }
      else if(this.props.match.params.id==6) {
        return (
            <Layout className="adminview-layout" >
              <div className="user-container">
                <Layout className="bookview-layout">
                  <SideBar selected={"6"}/>
                  <div className="userorder-container">
                    <UserStats/>
                  </div>
                </Layout>
              </div>
            </Layout>
        );
      }
      else if(this.props.match.params.id==7) {
        console.log("print..");
        console.log(this.props.match.params);
        let params=new URLSearchParams(this.props.location.search);
        let bookId=params.get('bookId');
        return (
            <Layout className="adminview-layout" >
              <SideBar selected={"2"}/>
              <div className="addbook-wrapper">
                <div className="booktable-container" style={{paddingTop:30}}>
                  <ModifyBook className="booktable-admin" id={bookId} />
                </div>
              </div>
            </Layout>
        );
      }
      else {
        return null;
      }
    }
    return (
        <div className="admin-page">
          <HeadWrap_HomePage/>
          {renderContent()}
          <MyFooter/>
        </div>
    );
  }
};

export default AdminView;
