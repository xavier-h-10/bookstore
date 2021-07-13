import React from 'react';
import {Table, Button} from "antd";
//import {getOrder} from "../../service/orderService";
import {getRealCartItems} from "../../service/CartService";
import "../../css/OrderPage.css";

const columns = [
  {
    title: '商品信息',
    dataIndex: 'name',
  },
  {
    title: '价格（元）',
    dataIndex: 'price',
  },
  {
    title: '数量',
    dataIndex: 'number',
  },
  {
    title: '小计',
    dataIndex: 'total'
  },
];

class OrderTable extends React.Component {
  state = {
    selectedRowKeys: [],
    loading: false,
    item:[],
  };

  start = () => {
    this.setState({loading: true});
    // ajax request after empty completing
    setTimeout(() => {
      this.setState({
        selectedRowKeys: [],
        loading: false,
      });
    }, 1000);
  };
  //
  onSelectChange = selectedRowKeys => {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    this.setState({ selectedRowKeys });
  };

  handleCartItems = data => {
    console.log("handleCartItems:");
    console.log(data);
    let tmp=[];
    for(let i in data)
    {
      tmp.push(
          {
            id: i,    // must add id in order to apply rowSelection
            name: data[i].book.name,
            price: data[i].book.price.toFixed(2),
            number: data[i].amount,
            total: (data[i].book.price*data[i].amount).toFixed(2),
            bookId: data[i].bookId,
          }
      );
    }
    this.setState({
      item:tmp,
    })
  }
  componentDidMount() {
    getRealCartItems(this.handleCartItems);
  }

  render() {
    const {loading, selectedRowKeys} = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };
    selectedRowKeys.length = 1;

    const hasSelected = selectedRowKeys.length > 0;
    return (
        <div className="ordertable-container">

          <Table columns={columns} dataSource={this.state.item}/>


        </div>
    );
  }
}

export default OrderTable;