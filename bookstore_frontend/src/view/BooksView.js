import React from 'react';
import MyFooter from "../components/footer";
import {Layout} from 'antd';
import {withRouter} from 'react-router-dom';
import "../css/HomePage.css";
import HeadWrap from "../components/HeadWrap";
import SideBar from "../components/SideBar";
import BooksTable from "../components/BooksPage/BooksTable";

class BooksView extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
        <div className="book-page">
          <div className="book-container">
            <div className="head-container">
              <HeadWrap/>
            </div>
            <div className="detail-container">
              <Layout className="bookview-layout">
                <SideBar selected={'2'}/>
                <div className="home-layout">
                  <div className="booktable-wrapper">
                    <div className="booktable-container" >
                      <BooksTable/>
                    </div>
                  </div>
                  <div className="foot-container" style={{display: "block"}}>
                    <MyFooter/>
                  </div>
                </div>
              </Layout>
            </div>
          </div>
        </div>
    )
  }
};

export default withRouter(BooksView);