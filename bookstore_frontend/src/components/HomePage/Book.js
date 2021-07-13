import React from 'react';
import {Card, Col, Row} from 'antd';
import {getBooks} from "../../service/BookService";

const {Meta} = Card;

class Book extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      books:[],
      browser:false,
      pageIndex:1,   // need to complete page index
    }
  }

  handleBooks = data => {
    this.setState({
      books: data,
    })
  }

  componentDidMount() {
    getBooks(this.handleBooks);
  }

  renderBook = () => {
    let content = [];
    let now = 0;
    console.log("renderBook length:",this.state.books.length);
    for (let i = 0; i < (this.state.books.length); i++) {
          content.push(
              <Col span={6}>
                <Card
                    bordered={false}
                    cover={<img src={this.state.books[i].image}/>}
                    onClick={e => {
                      window.location.href="./detail?id="+this.state.books[i].bookId;
                    }}
                >
                  <Meta title={this.state.books[i].name}
                        description={"¥" + this.state.books[i].price.toFixed(2)}/>
                </Card>
              </Col>
          );
    }
    return content;
  };

  render() {
    return (
        <div className="book1-wrapper">
          <Row gutter={16}>
            <this.renderBook/>
          </Row>
        </div>
    );
  }
}

export default Book;