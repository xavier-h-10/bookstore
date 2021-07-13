import React, {useContext, useState, useEffect, useRef} from 'react';
import {Table, Input, Button, Space, DatePicker} from 'antd';
import Highlighter from 'react-highlight-words';
import Icon, {SearchOutlined, DownOutlined} from '@ant-design/icons';
import {getOrder,getAllOrder} from "../../service/OrderService";
import 'moment/locale/zh-cn';
import locale from 'antd/es/date-picker/locale/zh_CN';
import "../../css/AdminPage.css";
import moment from 'moment';

const {RangePicker} = DatePicker;

const { Search } = Input;



class UserOrderTable extends React.Component {

  renderTime= date => {          //转换unix时间戳至指定格式
    let dateee = new Date(date).toJSON();
    return new Date(+new Date(dateee) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '')

  }

  constructor(props) {
    super(props);
    this.columns = [
      {
        title: '订单编号',
        dataIndex: 'orderId',
        width: '20%',
        align: "center",
      },
      {
        title: '创建时间',
        dataIndex: 'time',
        align: "center",
        width:'40%',
        // ...this.getColumnSearchProps('time'),
      },
      {
        title: '金额',
        dataIndex: 'price',
        width: '40%',
        align: "center",
        render: (record) => {
          return "￥" + record.toFixed(2);
        }
      },
    ];

    if(this.props.isadmin=="1")
    {
      this.columns.splice(1,0,{
        title: '用户名',
        dataIndex: 'username',
        width: '20%',
        align: "center",
      })
    }

    this.state = {
      order: null,
      order_1:null,
      // searchText: '',
      // searchedColumn: '',
      // sortedInfo:null,
      start_t:'',
      end_t:'',
    };
  }

  handleOrder = data => {    //处理读来的数据，方便表格对应dataIndex
    if(data.data!=undefined && data.data==null) return;
    this.setState({
      order: data,
    })
    let len = this.state.order.length;
    let tmp=this.state.order;
    for (let i = 0; i < len; i++) {
      tmp[i].username=tmp[i].user.name;
      tmp[i].time = this.renderTime(tmp[i].time);
      let len1 = this.state.order[i].orderItem.length;
      for (let j = 0; j < len1; j++) {
        tmp[i].orderItem[j].name = tmp[i].orderItem[j].book.name;
        tmp[i].orderItem[j].price = tmp[i].orderItem[j].book.price;
      }
    }
    this.setState({
      order: tmp,
      order_1:tmp,
    })
  }

  componentDidMount() {
    if(this.props.isadmin=="1")
    {
      getAllOrder(this.handleOrder);
    }
    else
    {
      getOrder(this.handleOrder);
    }
    console.log("getOrder:" + this.state.order);
  }

  handleSearchName= data=> {
    console.log(data);
    if(data==null || data=='' || data==undefined) {
      return;
    }
    let order_2=[];
    let len=this.state.order_1.length;
    console.log("len="+len);
    for(let i=0;i<len;i++)
    {
      let len1=this.state.order_1[i].orderItem.length;
      let f=false;
      for(let j=0;j<len1;j++) {
        if(this.state.order_1[i].orderItem[j].name.includes(data)) {
          f=true;
          break;
        }
      }
      if(f) {
   //     console.log(this.state.order_1[i]);
        order_2.push(this.state.order_1[i]);
      }
    }
    this.setState({
      order:order_2,
    })
  }

  handleResetButton=() => {    //处理复位
    console.log("reset called");
    this.setState({
      order:this.state.order_1,
    })
    console.log(this.state.order);
  }

  onChange=(data)=>{
    if(data==null || data==undefined || data.length<2) {
      return;
    }
    console.log("onChange:",data);

    let start_t=data[0].format('YYYY-MM-DD HH:mm:ss')
    let end_t=data[1].format('YYYY-MM-DD HH:mm:ss');
    console.log(start_t);
    console.log(end_t);
    this.setState({
      start_t:start_t,
      end_t:end_t,
    })
  }

  onSearchByTime=()=>{
    if(this.state.start_t=='' || this.state.end_t=='') {
      return;
    }
    let order_2=[];
    let len=this.state.order_1.length;
    console.log("len="+len);
    for(let i=0;i<len;i++)
    {
      if(this.state.order_1[i].time>=this.state.start_t && this.state.order_1[i].time<=this.state.end_t) {
        order_2.push(this.state.order_1[i]);
      }
    }

    this.setState({
      order:order_2,
      start_t:'',
      end_t:'',
    })
  }

  render() {
    console.log("want to see");
    console.log(this.state.order);
    const columns = this.columns.map((col) => {
      if (!col.editable) {
        return col;
      }

      return {
        ...col,
        onCell: (record) => ({
          record,
          dataIndex: col.dataIndex,
          title: col.title,
        }),
      };
    });

    const expandedRowRender = (record) => {
      const columns = [
        {
          title: '图书编号',
          dataIndex: 'bookId',
          key: 'bookId',
          align: "center",
          width: '25%',
        },
        {
          title: '书名',
          dataIndex: 'name',
          key: 'name',
          align: "center",
          width: '25%',
        },
        {
          title: '价格',
          dataIndex: 'price',
          key: 'price',
          align: "center",
          width: '25%',
          render: (record) => {
            return "￥" + record.toFixed(2);
          },
        },
        {
          title: '数量',
          dataIndex: 'amount',
          key: 'amount',
          align: "center",
          width: '25%',
        },
      ];
      return <Table columns={columns} dataSource={record.orderItem}
                    pagination={false}/>;
    }
    return (
        <div className="userorder-table">
          <Space size="large" style={{marginBottom:10}}>
            <div>书籍名称</div>
            <Search
                placeholder="根据书籍名称筛选订单"
                enterButton="搜索"
                style={{ size:'small'}}
                style={{width:438}}
                onSearch={this.handleSearchName}
            />
          </Space>

          <Space size="large" style={{marginBottom:10,marginTop:20}}>
            <div>成交时间</div>
            <RangePicker
                ranges={{
                  '今天': [moment().startOf('day'), moment().endOf('day')],
                  '本月': [moment().startOf('month'), moment().endOf('month')],
                }}
                showTime
                format="YYYY-MM-DD HH:mm:ss"
                style={{ size:'small'}}
                locale={locale}
                onChange={this.onChange}
            />
            <Button
                type="primary"
                // onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
                icon={<SearchOutlined/>}
                style={{width: 90}}
                onClick={this.onSearchByTime}
                >
              搜索
          </Button>
          <Button
               onClick={this.handleResetButton}
              style={{width: 90}}
          >
             复位
             </Button>
          </Space>


    <Table
        bordered
        dataSource={this.state.order}
        expandedRowRender={record => expandedRowRender(record)}
        columns={columns}
        rowKey="orderId"   //防止全部展开
        style={{marginTop:20}}
    />
  </div>
  );
  }
}

export default UserOrderTable;



// getColumnSearchProps = dataIndex => ({
//   filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
//       <div style={{ padding: 8 }}>
//         <RangePicker
//             value={selectedKeys[0]}
//             onChange={dateString => setSelectedKeys(dateString ? [dateString] : [])}
//             onPressEnter={() => this.handleSearch(selectedKeys, confirm)}
//             showTime
//             format="YYYY/MM/DD HH:mm:ss"
//             style={{ size:'small',marginBottom: 8 }}
//             locale={locale}
//         />
//         <Space>
//           <Button
//               type="primary"
//               onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
//               icon={<SearchOutlined />}
//               size="small"
//               style={{ width: 90 }}
//           >
//             搜索
//           </Button>
//           <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
//             复位
//           </Button>
//         </Space>
//       </div>
//   ),
//   filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
//   onFilter: (value, record) =>
//       record[dataIndex]
//           ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
//           : '',
//   // onFilterDropdownVisibleChange: visible => {
//   //   if (visible) {
//   //     setTimeout(() => this.searchInput.select(), 100);
//   //   }
//   // },
//   render: text =>
//       this.state.searchedColumn === dataIndex ? (
//           <Highlighter
//               highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
//               searchWords={[this.state.searchText]}
//               autoEscape
//               textToHighlight={text ? text.toString() : ''}
//           />
//       ) : (
//           text
//       ),
// });
//