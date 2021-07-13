import React from 'react';
import {Route, Redirect} from 'react-router-dom'
import {checkSession} from "../service/UserService";
import {Modal, Button} from "antd";

export class LoginRoute extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isAuthorized: false,
      hasChecked: false,
      showModal: false,
      redirect: false,
    }
  }

  handleAccept = () => {
    this.setState({
      showModal: false,
      redirect: true,
    })
  };

  renderRedirect = () => {
    return this.state.redirect ? (
            <Redirect to={{
              pathname: '/Home',
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
          <Modal title="Basic Modal" visible={true} footer={this.renderModalButton()}>
            <p>您已登录，请勿重复登录。</p>
          </Modal>
      );
    else return null;
  };

  checkAuthority = data => {
    console.log(data);
    let isAuthorized = (data.status === 0);
    if (isAuthorized) {
      this.setState({showModal: true});
    }
    this.setState({
      isAuthorized: isAuthorized,
      hasChecked: true
    })
  };

  componentDidMount() {
    checkSession(this.checkAuthority);
  }

  render() {
    const {component: Component, path = "/", exact = false, strict = false} = this.props;

    if (!this.state.hasChecked) return null;

    return <Route path={path} exact={exact} strict={strict} render={props => (
        !this.state.isAuthorized ? (
            <Component {...props}/>
        ) : (
            <div>
              {this.renderModal()}
              {this.renderRedirect()}
            </div>
        )
    )}/>
  }
}

export default LoginRoute;