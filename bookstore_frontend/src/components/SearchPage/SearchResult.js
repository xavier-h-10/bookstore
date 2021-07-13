import React from 'react';
import {Layout, Col, Card, Row} from 'antd';
import '../../css/AdminPage.css';
import '../../css/SearchPage.css'
import {getBookByName} from "../../service/BookService";
import MyFooter from "../footer";

const {Header, Content, Footer, Sider} = Layout;

const {Meta} = Card;

class SearchResult extends React.Component {
  constructor(props) {
    console.log("name="+props.name);
    super(props);
    this.state = {
      books: null,
      number: 0,
    }
  }

  handleBooks = data => {
    console.log("get search data:");
    console.log(data);
    this.setState({
      books: data,
    });
  }

  handleNumber=()=>{
    if(!this.state.books) return null;
    console.log("set number:",this.state.books.length);
    this.setState({
      number:this.state.books.length,
    });
  }
  renderBook = () => {
    let content = [];
    if(!this.state.books) return null;
    console.log("renderBook length:", this.state.books.length);
    for (let i = 0; i < (this.state.books.length); i++) {
      content.push(
          <Col span={6}>
            <Card
                bordered={false}
                cover={<img src={this.state.books[i].image}/>}
                onClick={e => {
                  window.location.href = "./detail?id="
                      + this.state.books[i].bookId;
                }}
            >
              <Meta title={this.state.books[i].name}
                    description={"¥" + this.state.books[i].price}/>
            </Card>
          </Col>
      );
    }
    return content;
  };

  componentDidMount() {
    getBookByName(this.props.name, this.handleBooks);

  }

  render() {
    return (
        <div className="search-container">
          <div className="search-breadhead">
            <a className="first">
              全部商品
            </a>
            <a className="second">搜索"{this.props.name}"</a>
          </div>
          <div className="search-information">
            <strong>"{this.props.name}"</strong>
            找到以下相关商品
          </div>
          <div className="book1-wrapper" style={{paddingTop:30}}>
            <Row gutter={16}>
              <this.renderBook/>
            </Row>
          </div>
          <div className="foot-container" style={{display: "block"}}>
            <MyFooter/>
          </div>
        </div>
    );
  }
}

export default SearchResult;
