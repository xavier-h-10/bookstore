import React from 'react';
import {Descriptions, Button, InputNumber, Divider, message} from 'antd';
import "../../css/BookPage.css";
import img from "../../resources/book/book_1.jpg"
import {ShoppingCartOutlined} from "@ant-design/icons";
import {getBookById} from "../../service/BookService";
import {addCartItem} from "../../service/CartService";

export class BookDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      detail:null,
      amount:1,
      success:false,
    }
  }

  handleDetail = data => {
    this.setState({
      detail: data,
        });
  }

  componentDidMount() {
    getBookById(this.props.bookId,this.handleDetail);
  }

  onChange_input = value => {
    console.log("value");
    this.state.amount=value;
  }

  onAddCartItem = (e) => {
    message
      .loading("加入购物车中...")
      .then(
          () => {
            console.log("addCartItem: "+this.props.bookId+" "+this.state.amount);
            addCartItem(this.props.bookId,this.state.amount,1);
          }
      )
      .then(
            ()=> {
              message.success("加入购物车成功!")
            });
  };


render() {
    if(this.state.detail==null)
      return null;
    console.log(this.state.detail);

    return (
        <div className={"content"}>
          <div className={"book-detail"} style={{display: 'inline-block'}}>
            <div className={"book-image"} style={{display: 'inline-block'}}>
              <img alt="image" src={this.state.detail.image}
                   style={{width: "400px", height: "400px"}}/>
            </div>
            <div className={"descriptions"}
                 style={{display: 'inline-block', left: 500}}>
              <Descriptions>
                <Descriptions.Item contentStyle={{fontSize: 100}}
                                   className={"title"}
                                   span={3}>{this.state.detail.name} </Descriptions.Item>
                <Descriptions.Item className={"book-brief"}
                                   span={3}>{this.state.detail.brief}</Descriptions.Item>
                <Descriptions.Item label={"作      者"}
                                   span={3}>{this.state.detail.author}</Descriptions.Item>
                <Descriptions.Item label={"分      类"}
                                   span={3}>{this.state.detail.type}</Descriptions.Item>
                <Descriptions.Item className={"price"} label={"价      格"}
                                   span={3}>{'¥' + this.state.detail.price.toFixed(2)}
                  <div className={"original-price"}>
                    ¥158.00
                  </div>
                </Descriptions.Item>
                <Descriptions.Item label={"状      态 "}
                                   className={"book-condition"}
                                   span={3}>{this.state.detail.inventory !== 0 ?
                    <span>有货 <span
                        className={"inventory"}>库存{this.state.detail.inventory}件</span></span>
                    : <span className={"status"}>无货</span>}</Descriptions.Item>
                <Descriptions.Item label={"ISBN"}
                                   span={3}>{this.state.detail.isbn}</Descriptions.Item>
                <Descriptions.Item label={"作品简介"}
                                   span={3}>{this.state.detail.description}</Descriptions.Item>
                <Descriptions.Item className={"input-button"}
                                   style={{display: 'block'}}>
                  <div> 数量：</div>
                  <InputNumber min={1} max={this.state.detail.inventory} defaultValue={1}
                               onChange={this.onChange_input}
                               className={"input-button"}/>
                </Descriptions.Item>
                <Descriptions.Item className={"button-groups"}
                                   style={{display: 'block'}}>
                  <Button type="primary" danger icon={<ShoppingCartOutlined/>}
                          size={"large"} className={"cart-button"} onClick={this.onAddCartItem}>
                    加入购物车
                  </Button>
                  {/*<Button danger size={"large"} className={"buy-button"}>*/}
                  {/*  立即购买*/}
                  {/*</Button>*/}
                </Descriptions.Item>
              </Descriptions>
            </div>
          </div>
        </div>
    );
  }
}

export default BookDetail;