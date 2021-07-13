import React from 'react';
import MyFooter from "../components/footer";
import HeadWrap_CartPage from "../components/CartPage/HeadWrap";
import CartTable from "../components/CartPage/CartTable";
import SideBar from "../components/SideBar";
import {Layout} from "antd";

class CartView extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
        <div>
          <HeadWrap_CartPage/>
          <Layout className="bookview-layout">
            <SideBar selected={"3"}/>
            <div>
              <CartTable/>
              <div className="foot-container" style={{display: "block"}}>
                <MyFooter/>
              </div>
            </div>
          </Layout>
        </div>
    );
  }
}

export default (CartView);
