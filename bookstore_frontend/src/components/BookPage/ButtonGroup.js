import React from 'react';
import "../../css/BookPage.css";
import {ShoppingCartOutlined} from '@ant-design/icons';
import {Button, InputNumber} from "antd";
import {getBookById} from "../../service/BookService";

export class ButtonGroup extends React.Component {
  // constructor(props) {
  //   super(props);
  //   this.state={
  //     detail:null,
  //   }
  // }
  //
  // handleDetail = data => {
  //   this.setState({
  //     detail: data,
  //   });
  // }
  //
  // componentDidMount() {
  //   getBookById(this.props.bookId,this.handleDetail);
  // }
  // render() {
  //   return (
  //       <div className={"button-groups"}>
  //         <div style={{marginLeft: 80}}>
  //           <span> 数量：</span>
  //           <InputNumber min={1} max={100} defaultValue={1}
  //                        onChange={this.onChange_input}
  //                        className={"input-button"}/>
  //         </div>
  //         <Button type="primary" danger icon={<ShoppingCartOutlined/>}
  //                 size={"large"} className={"cart-button"}>
  //           加入购物车
  //         </Button>
  //         <Button danger size={"large"} className={"buy-button"}>
  //           立即购买
  //         </Button>
  //       </div>
  //   );
  // }

}

export default ButtonGroup;