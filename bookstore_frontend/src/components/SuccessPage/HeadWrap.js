import React from 'react';
import logo from "../../resources/logo.svg";
import UserAvatar from "../UserAvatar";
import {Divider, Steps} from "antd";
import {
  ShoppingCartOutlined,
  ShoppingOutlined,
  SmileOutlined
} from '@ant-design/icons';
import "../../css/CartPage.css";
import "../../css/HomePage.css";

const {Step} = Steps;

class HeadWrap_SuccessPage extends React.Component {
  render() {
    return (
        <div className="headwrap-container">
          <div className="logohead-container" style={{display: 'inline-block'}}>
            <a href="./home">
              <img className="logohead-image" src={logo} alt="logo"/>
            </a>
          </div>
          <div style={{display: 'inline-block', left: 100}}
               className="stepbar-container">
            <Steps>
              <Step status="finish" title="我的购物车"
                    icon={<ShoppingCartOutlined/>}/>
              <Step status="finish" title="填写订单" icon={<ShoppingOutlined/>}/>
              <Step status="process" title="完成订单" icon={<SmileOutlined/>}/>
            </Steps>
          </div>
          <div style={{display: 'inline-block'}}
               className="cartavatar-container">
            <UserAvatar/>
          </div>
        </div>
    );
  }
}

export default HeadWrap_SuccessPage;