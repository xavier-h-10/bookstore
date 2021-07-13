import React from 'react';
import Carousel_HomePage from '../components/HomePage/Carousel.js'
import MyFooter from "../components/footer";
import {Layout} from 'antd';
import {withRouter} from 'react-router-dom';
import "../css/HomePage.css";
// import BookList from "../components/HomePage/BookList";
import HeadWrap from "../components/HeadWrap";
import SideBar from "../components/SideBar";
import BarImg from "../resources/bar.jpg";
import Book from "../components/HomePage/Book";

class HomeView extends React.Component {
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
                <SideBar selected={"1"}/>
                <div className="home-layout">
                  <Carousel_HomePage/>
                  <div className="barimg-container">
                    <img className="home-bar" src={BarImg}/>
                  </div>
                  <div className="book1-container">
                    <Book className="book-wrapper"/>
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

export default withRouter(HomeView);