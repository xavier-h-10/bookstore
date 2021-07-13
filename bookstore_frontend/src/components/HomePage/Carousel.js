import React from 'react';
import 'antd/dist/antd.css';
import {Carousel, Layout} from 'antd';
import {Image} from 'antd';
import {Row, Col} from 'antd';
import {getHomeContent} from "../../service/HomeService";
import "../../css/HomePage.css";

const {Content} = Layout;

class Carousel_HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      homeContent: [],
    }
  }

  handleContent = data => {
    this.setState({
      homeContent: data,
    });
  }

  componentDidMount() {
    getHomeContent(this.handleContent);
  }

  render() {

    if(this.state.homeContent.length<7)
      return null;

    return (
        <Row className="carousel-container" style={{
          display: "inline-block",
          margin: "auto",
          paddingTop: 30,
          paddingLeft: 70
        }}>
          <Col span={16} style={{display: "inline-block"}}>
            <Carousel autoplay centerMode centerPadding='0px'
                      className="carousel-content">
              <div>
                <Image
                    className="carousel-content"
                    src={this.state.homeContent[0].image}
                />
              </div>
              <div>
                <Image
                    className="carousel-content"
                    src={this.state.homeContent[1].image}
                />
              </div>
              <div>
                <Image
                    className="carousel-content"
                    src={this.state.homeContent[2].image}
                />
              </div>
              <div>
                <Image
                    className="carousel-content"
                    src={this.state.homeContent[3].image}
                />
              </div>
            </Carousel>
          </Col>
          <Col span={8}
               style={{display: "inline-block", paddingLeft: 10, align: "top"}}
               className="carouselright-container">
            <div className="carouselright-content">
              <Image
                  className="carouselright-content"
                  src={this.state.homeContent[4].image}
              />
            </div>
            <div className="carouselright-content" style={{paddingTop: 10}}>
              <Col span={12} style={{display: "inline-block"}}
                   className="carouseldown-content">
                <Image
                    className="carouseldown-content"
                    src={this.state.homeContent[5].image}
                />
              </Col>
              <Col span={12} style={{display: "inline-block", paddingLeft: 10}}
                   className="carouseldown-content">
                <Image
                    className="carouseldown-content"
                    src={this.state.homeContent[6].image}
                />
              </Col>
            </div>
          </Col>
        </Row>
    );
  }
}

export default Carousel_HomePage;
