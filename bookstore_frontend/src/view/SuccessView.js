import React from 'react';
import MyFooter from "../components/footer";
import HeadWrap_SuccessPage from "../components/SuccessPage/HeadWrap";
import {CheckCircleFilled} from "@ant-design/icons";
import {Button} from "antd";
import "../css/SuccessPage.css";

class CartView extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
        <div className="success-page">
          <HeadWrap_SuccessPage/>
          <div className="success-container">
            <CheckCircleFilled style={{fontSize: 70, color: "#47A4FA"}}/>
            <div className="success-font">
              恭喜，您的订单已经提交成功！
            </div>
            <Button size={"large"} onClick={() => {
              window.location.href = "./home"
            }}>返回首页</Button>
          </div>
          <MyFooter/>
        </div>
    );
  }
}

export default (CartView);
