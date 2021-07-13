import React from 'react';
import {Route, Redirect} from 'react-router-dom'
import {checkSession} from "../service/UserService";
import {Button, Modal} from 'antd';

export class PrivateRoute extends React.Component {


  constructor(props) {
    super(props);
    this.state = {
      isAuthorized: false,
      hasChecked: false,
      showModal: false,
      redirect: false,
      message: null,
    }
  }

  handleAccept = () => {
    this.setState({
      showModal: false,
      redirect: true,
    })
  };

  checkAuthority = data => {
    console.log("PrivateRoute check:");
    console.log(data);
    this.setState({
      message:data.message,
    })
    let isAuthorized = (data.status === 0);  //非管理员，显示modal
    if (!isAuthorized) {
      this.setState({showModal: true});
    }
    this.setState({
      isAuthorized: isAuthorized,
      hasChecked: true,
    })
  };


  renderRedirect = () => {
    return this.state.redirect ? (
            <Redirect to={{
              pathname: '/home',
              state: {from: this.props.location}
            }}/>
        ) :
        null;
  };

  renderModalButton = () => {
    return (
        <Button key="submit" type="primary" onClick={this.handleAccept}>
          确认
        </Button>
    )
  };

  renderModal = () => {
    if (this.state.showModal)
      return (
          <Modal title="提示" visible={true} footer={this.renderModalButton()}>
            <p>{this.state.message}</p>
          </Modal>
      );
    else return null;
  };

  componentDidMount() {
    checkSession(this.checkAuthority);
  }

  render() {
    const {component: Component, path = "/", exact = false, strict = false} = this.props;

    if (!this.state.hasChecked) return null;

    return <Route path={path} exact={exact} strict={strict} render={props => (
        this.state.isAuthorized ? (
                <Component {...props}/>
            ) :
            <div>
              {this.renderModal()}
              {this.renderRedirect()}
            </div>
    )}/>
  }
}

export default PrivateRoute;