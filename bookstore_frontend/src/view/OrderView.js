import React from 'react';
import {withRouter} from 'react-router-dom';
import {Layout, Divider, Button} from 'antd';
import MyFooter from "../components/footer.js";
import "../css/OrderPage.css";
import HeadWrap_CartPage from "../components/OrderPage/HeadWrap";
import OrderTable from "../components/OrderPage/OrderTable";
import {submitCart} from "../service/CartService";
import SideBar from "../components/SideBar";

class OrderView extends React.Component {

  handleSubmit =() => {
    console.log("handleSubmit Order");
    submitCart();
    window.location.href="/success";

  }

  render() {
    return (
        <div className="order-container">
          <HeadWrap_CartPage/>
          {/*<Divider style={{marginTop: 40}}/>*/}
          <Layout className="bookview-layout">
              <SideBar selected={"3"}/>
            <div className="ordercontent-container">
              <div className="order-title">送货清单</div>
              <div className="order-content">
                <div className="order-table">
                  <OrderTable/>
                  <div className="cartfoot-container" style={{marginBottom: 16}}>
                    <Button type="primary" className="orderbutton-container"
                            onClick={this.handleSubmit}
                    >
                      支付订单
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </Layout>

          <MyFooter/>
        </div>
    );
  }
}

export default withRouter(OrderView);