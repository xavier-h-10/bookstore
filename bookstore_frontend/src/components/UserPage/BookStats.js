import React from 'react';
import {Table, Input, Button, Space, DatePicker,Divider} from 'antd';
import {SearchOutlined} from '@ant-design/icons';
import {getOrder, getAllOrder, getAllOrderByTime, getOrderByTime} from "../../service/OrderService";
import 'moment/locale/zh-cn';
import locale from 'antd/es/date-picker/locale/zh_CN';
import "../../css/AdminPage.css";
import moment from 'moment';
import bigDecimal from "js-big-decimal";
import * as echarts from 'echarts';

const {RangePicker} = DatePicker;

const { Search } = Input;

class BookStats extends React.Component {

  renderTime= date => {          //转换unix时间戳至指定格式
    let dateee = new Date(date).toJSON();
    return new Date(+new Date(dateee) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '')

  }

  constructor(props) {
    super(props);
    this.columns = [
      {
        title: '图书编号',
        dataIndex: 'bookId',
        width: '20%',
        align: "center",
      },
      {
        title: '名称',
        dataIndex: 'name',
        align: "center",
        width:'40%',
      },
      {
        title: '数量',
        dataIndex: 'amount',
        align: "center",
        width:'40%',
      },
    ];

    if(this.props.isadmin=="1") {
      this.state = {
        order:[],
        result:null,
        start_t:'0',
        end_t:'5000000000000',
        total_price:new bigDecimal(0.0),
        total_amount:0,
        myChart:null,
        text:"图书热销榜",
      };
    }
    else {
      this.state = {
        order:[],
        result:null,
        start_t:'0',
        end_t:'5000000000000',
        total_price:new bigDecimal(0.0),
        total_amount:0,
        myChart:null,
        text:"消费统计",
      };
    }

  }

  handleOrder = data => {    //处理读来的数据，方便表格对应dataIndex
    let tmp=data;
    let len=tmp.length;
    let price=new bigDecimal(tmp[len-1].price);
    let amount=tmp[len-1].amount;

    this.setState({
      order: tmp,
      total_price:price,
      total_amount:amount,
      // start_t:'0',
      // end_t:'5000000000',
    });

    this.onSearchByTime();
  }

  componentDidMount() {
    this.setState({
      myChart:echarts.init(document.getElementById('echart-item')),
    });
    if(this.props.isadmin=="1")
    {
      getAllOrderByTime(this.state.start_t,this.state.end_t,this.handleOrder);
    }
    else
    {
      getOrderByTime(this.state.start_t,this.state.end_t,this.handleOrder);
    }
  }

  handleResetButton=() => {    //处理复位
    console.log("reset called");
    this.setState({
      start_t:'0',
      end_t:'5000000000000',
    })
    this.handle();
  }

  onChange=(data)=>{  //修改起始时间
    if(data==null || data==undefined || data.length<2) {
      return;
    }
    console.log("onChange:",data);

    let start_t=data[0].format('YYYY-MM-DD HH:mm:ss')
    let end_t=data[1].format('YYYY-MM-DD HH:mm:ss');
    console.log("start_t:");
    console.log(Date.parse(data[0]._d));
    console.log("end_t:");
    console.log(Date.parse(data[1]._d));
    this.setState({
      start_t:Date.parse(data[0]._d).toString(),
      end_t:Date.parse(data[1]._d).toString(),
    })
  }

  onSearchByTime=()=>{
    if(this.state.start_t=='' || this.state.end_t=='') {
      return;
    }
    let tmp=this.state.order;
    let len=tmp.length;

    let obj=[];
    for(let i=0;i<len-1;i++) {
      obj.push({
        bookId:tmp[i].bookId,
        amount:tmp[i].amount,
        name:tmp[i].name,
      })
    }

    this.state.myChart.clear();

    let result1=[];
    let tmp_len=Math.min(obj.length,10);
    for(let i=0;i<tmp_len;++i) {
      result1.push({
        value:obj[i].amount,
        name:obj[i].name,
      })
    }

    console.log("result1:");
    console.log(result1);

    // 绘制图表
    this.state.myChart.setOption({
      title: { text: this.state.text },
      legend: {
        top: '5%',
        left: 'center'
      },
      grid:{
        x:'0%',
        y:'0%',
        bottom: '3%',
        containLabel: true
      },
      series: [{
        name: '销量',
        type: 'pie',
        radius:[20,140],
        center:['50%','50%'],
        // roseType:'area',
        itemStyle:{
          borderRadius:5
        },
        data: result1
      }]
    });
    this.state.myChart.resize();

    this.setState({
      start_t:'',
      end_t:'',
      result:obj,
      total_price:new bigDecimal(tmp[len-1].price),
      total_amount:tmp[len-1].amount,
    })
  }

  handle=()=>{
    if(this.props.isadmin=="1") {
      getAllOrderByTime(this.state.start_t,this.state.end_t,this.handleOrder);
    }
    else {
      getOrderByTime(this.state.start_t,this.state.end_t,this.handleOrder);
    }
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

    return (
        <div className="userorder-table">

          <Space size="large" style={{marginBottom:10}}>
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
                onClick={()=>this.handle()}
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
              dataSource={this.state.result}
              columns={columns}
              rowKey="orderId"   //防止全部展开
              style={{marginTop:20}}
          />
          {/*<Divider/>*/}
          <div>
            <div style={{fontSize:20,float:"left"}}>购书总本数：</div>
            <div className="statsprice-container" style={{marginLeft:10,float:"left"}}>
              {this.state.total_amount}
            </div>
            <div style={{fontSize:20,marginLeft:10,marginTop:5}}>本</div>
          </div>
          <div style={{marginTop:20}}>
            <div style={{fontSize:20,marginTop:5,float:"left"}}>购书总金额：</div>
            <div className="statsprice-container" style={{marginLeft:10,float:"left"}}>
              ￥{this.state.total_price.round(2,bigDecimal.RoundingModes.HALF_EVEN).getValue()}
            </div>
          </div>
          <Divider style={{marginTop:20}}/>

          <div id="echart-item" style={{minHeight:500}}></div>
        </div>

    );
  }
}

export default BookStats;

