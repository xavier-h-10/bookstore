import React, {useContext, useState, useEffect, useRef} from 'react';
import {Table, Input, Button, Space, DatePicker,Divider} from 'antd';
import Highlighter from 'react-highlight-words';
import Icon, {SearchOutlined, DownOutlined} from '@ant-design/icons';
import {getAllOrder} from "../../service/OrderService";
import 'moment/locale/zh-cn';
import locale from 'antd/es/date-picker/locale/zh_CN';
import "../../css/AdminPage.css";
import moment from 'moment';
import bigDecimal from "js-big-decimal";
import * as echarts from 'echarts';


const {RangePicker} = DatePicker;

const { Search } = Input;

class UserStats extends React.Component {

  renderTime= date => {          //转换unix时间戳至指定格式
    let dateee = new Date(date).toJSON();
    return new Date(+new Date(dateee) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '')

  }

  constructor(props) {
    super(props);
    this.columns = [
      {
        title: '用户ID',
        dataIndex: 'userId',
        width: '20%',
        align: "center",
      },
      {
        title: '用户名',
        dataIndex: 'name',
        align: "center",
        width:'40%',
      },
      {
        title: '累计消费金额',
        dataIndex: 'price',
        align: "center",
        width:'40%',
        render: (record) => {
          return "￥" + record.round(2,bigDecimal.RoundingModes.HALF_EVEN).getValue();
        },
      },
    ];

    this.state = {
      order:[],
      result:null,
      start_t:'',
      end_t:'',
      myChart:null,
      user_map:null,
    };
  }

  handleOrder = data => {    //处理读来的数据，方便表格对应dataIndex
    this.setState({
      order:data,
    })
    let tmp=this.state.order;
    let user_map=new Map();
    let len=tmp.length;
    for (let i = 0; i < len; i++) {
      tmp[i].time = this.renderTime(tmp[i].time);
      tmp[i].userId=tmp[i].user.userId;
      tmp[i].name=tmp[i].user.name;
      user_map.set(tmp[i].userId,tmp[i].name);
    }

    this.setState({
      order: tmp,
      user_map:user_map,
      start_t:'1971-01-01 00:00:00',
      end_t:'2100-01-01 00:00:00',
    });

    this.onSearchByTime();
  }

  componentDidMount() {
    this.setState({
      myChart:echarts.init(document.getElementById('echart-item')),
    });

    getAllOrder(this.handleOrder);
  }

  handleResetButton=() => {    //处理复位
    console.log("reset called");
    this.setState({
      start_t:'1971-01-01 00:00:00',
      end_t:'2100-01-01 00:00:00',
    })
    this.onSearchByTime();
  }

  onChange=(data)=>{  //修改起始时间
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
    let len=this.state.order.length;
    let result=new Map();
    let tmp=new bigDecimal(0.0);

    for(let i=0;i<len;i++) {
      if(this.state.order[i].time>=this.state.start_t && this.state.order[i].time<=this.state.end_t) {
        if(!result.has(this.state.order[i].userId)) {
          result.set(this.state.order[i].userId,new bigDecimal(this.state.order[i].price));
        }
        else {
         tmp=result.get(this.state.order[i].userId);
          result.set(this.state.order[i].userId,tmp.add(new bigDecimal(this.state.order[i].price)));
        }
      }
    }
    console.log("userStats");
    console.log(result);
    let Result=Array.from(result);
    Result.sort(function(a,b){return bigDecimal.compareTo(b[1].value,a[1].value)});
    console.log(Result);

    let obj=[];
    let len2=Result.length;
    for(let i=0;i<len2;i++) {
      obj.push({
        userId:Result[i][0],
        price:Result[i][1],
        name:this.state.user_map.get(Result[i][0]),
      })
    }

    this.state.myChart.clear();

    let result1=[];
    let tmp_len=Math.min(obj.length,10);
    for(let i=0;i<tmp_len;++i) {
      result1.push({
        value:obj[i].price.round(2,bigDecimal.RoundingModes.HALF_EVEN).getValue(),
        name:obj[i].name,
      })
    }
    console.log("result1:");
    console.log(result1);
    // 绘制图表
    this.state.myChart.setOption({
      title: { text: '用户消费榜' },
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
        type: 'pie',
        radius:[20,140],
        center:['50%','50%'],
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
    })
  }

  render() {
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
            <div>统计时间范围</div>
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
              dataSource={this.state.result}
              columns={columns}
              rowKey="orderId"   //防止全部展开
              style={{marginTop:20}}
          />
          {/*<Divider/>*/}
          <Divider style={{marginTop:20}}/>

          <div id="echart-item" className="echart-item"></div>
        </div>


    );
  }
}

export default UserStats;

