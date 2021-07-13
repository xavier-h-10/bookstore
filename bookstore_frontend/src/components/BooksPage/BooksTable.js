import React from 'react';
import {Table, Tag, Space, Image, Popconfirm, Input, Button} from 'antd';
import {getBooksByPage} from "../../service/BookService";
import {SearchOutlined} from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import "../../css/AdminPage.css";

class BooksTable extends  React.Component {
  constructor(props) {
    super(props);

    this.columns= [
      {
        title:'图书编号',
        dataIndex:'bookId',
        width:'10%',
        className:'column-book',
      },
      {
        title: '书名',
        dataIndex: 'name',
        width: '15%',
        className:'column-book',
        ...this.getColumnSearchProps('name'),
      },
      {
        title: '作者',
        dataIndex: 'author',
        width:'15%',
        className:'column-book',
      },
      {
        title:'封面',
        dataIndex:'image',
        width:'20%',
        className:'column-book',
        render:(record)=> {
          console.log("render image:");
          console.log(record);
          return <Image className="image-small" src={record}/>
        },
      },
      {
        title: 'ISBN编号',
        dataIndex: 'isbn',
        width:'5%',
        className:'column-book',
      },
      {
        title: '库存量',
        dataIndex: 'inventory',
        width:'10%',
        className:'column-book',
      },
    ];

    this.state = {
      dataSource: null,
      count: 0,
      searchText: '',
      searchedColumn: '',
    };
  }

  getColumnSearchProps = dataIndex => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
        <div style={{ padding: 8 }}>
          <Input
              ref={node => {
                this.searchInput = node;
              }}
              placeholder={`搜索书名`}
              value={selectedKeys[0]}
              onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
              onPressEnter={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
              style={{ width: 188, marginBottom: 8, display: 'block' }}
          />
          <Space>
            <Button
                type="primary"
                onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
                icon={<SearchOutlined />}
                size="small"
                style={{ width: 90 }}
            >
              搜索
            </Button>
            <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
              复位
            </Button>
          </Space>
        </div>
    ),
    filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
    onFilter: (value, record) =>
        record[dataIndex]
            ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
            : '',
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => this.searchInput.select(), 100);
      }
    },
    render: text =>
        this.state.searchedColumn === dataIndex ? (
            <Highlighter
                highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
                searchWords={[this.state.searchText]}
                autoEscape
                textToHighlight={text ? text.toString() : ''}
            />
        ) : (
            text
        ),
  });

  handleBooks =(data) => {
    console.log("handle books:");
    console.log(data);
    let ans=[];
    for(let i=0;i<(data.pageNum-1)*5;i++) {
      ans.push(null);
    }
    for(let i=0;i<data.list.length;i++){
      ans.push(data.list[i]);
    }
    let res=data.total-ans.length;
    for(let i=0;i<res;i++) {
      ans.push(null);
    }
    this.setState({
      dataSource:ans,
      count:data.total,
    })
  };

  handleChange= (page, pageSize) => {
    this.setState({
      query: {
        pageNumber: page,
        pageSize: pageSize
      }
    }, () => {
     getBooksByPage(page.current,this.handleBooks);
      console.log("handlechange called");
  })
};

  componentDidMount() {
    getBooksByPage(1,this.handleBooks);
  }

  render() {
    return (
        <div>
          <Table
              bordered
              dataSource={this.state.dataSource}
              columns={this.columns}
              pagination={{pageSize:5}}
              style={{marginLeft:75}}
              onChange={this.handleChange}
              total={this.state.count}
          />
        </div>
    );
  }

}

export default BooksTable;