import React, { useContext, useState, useEffect, useRef } from 'react';
import { Table, Input, Button, Popconfirm, Form, Space,Image,Typography,InputNumber} from 'antd';
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';
import "../../css/AdminPage.css";
import {getBookById, getBooks,deleteBookById} from "../../service/BookService.js";
const EditableContext = React.createContext(null);

const EditableRow = ({ index, ...props }) => {
  const [form] = Form.useForm();
  return (
      <Form form={form} component={false}>
        <EditableContext.Provider value={form}>
          <tr {...props} />
        </EditableContext.Provider>
      </Form>
  );
};

const EditableCell = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;
  return (
      <td {...restProps}>
        {editing ? (
            <Form.Item
                name={dataIndex}
                style={{
                  margin: 0,
                }}
                rules={[
                  {
                    required: true,
                    message: `Please Input ${title}!`,
                  },
                ]}
            >
              {inputNode}
            </Form.Item>
        ) : (
            children
        )}
      </td>
  );
};


class BookTable_Admin extends React.Component {

  handleModifyDetail=(bookId)=>{
    window.location.href = "../admin/7?bookId="+bookId;
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

  constructor(props) {
    super(props);
    this.columns = [
      {
        title:'图书编号',
        dataIndex:'bookId',
        width:'10%',
        editable:false,
        className:'column-book',
      },
      {
        title: '书名',
        dataIndex: 'name',
        width: '15%',
        editable: true,
        className:'column-book',
        ...this.getColumnSearchProps('name'),
      },
      {
        title: '作者',
        dataIndex: 'author',
        width:'15%',
        editable: true,
        className:'column-book',
      },
      {
        title:'封面',
        dataIndex:'image',
        editable:true,
        width:'25%',
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
        editable: true,
        width:'5%',
        className:'column-book',
      },
      {
        title: '库存量',
        dataIndex: 'inventory',
        editable: true,
        width:'10%',
        className:'column-book',
      },
      {
        title: '操作',
        dataIndex: 'operation',
        className: 'column-book',
        width: '20%',
        render: (_, record) =>
        this.state.dataSource.length >= 1 ? (
            <div>
              <Popconfirm title="是否确定删除?"
                          onConfirm={() => this.handleDelete(record.bookId)}>
                <a>删除</a>
              </Popconfirm>
              <a style={{marginLeft:10}} onClick={()=>this.handleModifyDetail(record.bookId)}>修改详情</a>
            </div>
        ) : null,
      },

    ];

    this.state = {
      dataSource: null,
      count: 0,
      searchText: '',
      searchedColumn: '',
    };
  }

  handleAdd=()=>{
    window.location.href="/admin/3";
  };

  handleDelete = (key) => {
    console.log("handle delete:");
    console.log(key);
    const dataSource = [...this.state.dataSource];
    this.setState({
      dataSource: dataSource.filter((item) => item.bookId !== key),
    });
    deleteBookById(key);
  };

  handleSave = (row) => {
    const newData = [...this.state.dataSource];
    const index = newData.findIndex((item) => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, { ...item, ...row });
    this.setState({
      dataSource: newData,
    });
  };

  handleBooks =(data) => {
    console.log("handle books:");
    console.log(data);
    this.setState({
      dataSource:data,
      count:data.length,
    })
  };

  handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    this.setState({
      searchText: selectedKeys[0],
      searchedColumn: dataIndex,
    });
  };

  handleReset = clearFilters => {
    clearFilters();
    this.setState({ searchText: '' });
  };

  componentDidMount() {
    getBooks(this.handleBooks);
  }
  render() {
    const { dataSource } = this.state;
    const components = {
      body: {
        row: EditableRow,
        cell: EditableCell,
      },
    };
    const columns = this.columns.map((col) => {
      if (!col.editable) {
        return col;
      }

      return {
        ...col,
        onCell: (record) => ({
          record,
          editable: col.editable,
          dataIndex: col.dataIndex,
          title: col.title,
          handleSave: this.handleSave,
        }),
      };
    });

    return (
        <div>
          <Button
              onClick={this.handleAdd}
              type="primary"
              size={"large"}
              style={{
                marginBottom: 16,
              }}
          >
            添加图书
          </Button>
          <Table
              components={components}
              rowClassName={() => 'editable-row'}
              bordered
              dataSource={dataSource}
              columns={columns}
              pagination={{pageSize:5}}
          />
        </div>
    );
  }
}

export default BookTable_Admin;