import React from 'react';
import logo from "../resources/logo.svg";
import SearchBar_HomePage from "./SearchPage/SearchBar";
import UserAvatar from "./UserAvatar";
import {Divider} from "antd"
import "../css/HomePage.css"

class HeadWrap_HomePage extends React.Component {
  render() {
    return (
        <div className="headwrap-container">
          <div className="logohead-container" style={{display: 'inline-block'}}>
            <a href="../home">
              <img className="logohead-image" src={logo} alt="logo"/>
            </a>
          </div>
          <div style={{display: 'inline-block', left: 100}}
               className="searchbar_homepage-container">
            <SearchBar_HomePage/>
          </div>
          <Divider type="vertical"/>
          <div style={{display: 'inline-block'}}>
            <UserAvatar/>
          </div>
        </div>

    );
  }
}

export default HeadWrap_HomePage;