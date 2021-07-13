import React from 'react';
import {Input, Space} from 'antd';
import "../../css/HomePage.css"

const {Search} = Input;

const onSearch = value => {
  console.log("search "+value);
  if(value) {
    window.location.href="../search?name="+value;
  }
}

class SearchBar_HomePage extends React.Component {
  render() {
    return (
        <div className="searchbar-container">
          <Space direction="vertical" style={{width: 700}}>
            <Search
                placeholder="请输入要查找的书籍"
                allowClear
                enterButton="搜索"
                size="large"
                onSearch={onSearch}
            />
          </Space>
        </div>
    );
  }
}

export default SearchBar_HomePage;