import React from 'react';
import {Router, Route, Switch, Redirect} from 'react-router-dom';
import LoginView from "../view/LoginView";
import HomeView from "../view/HomeView";
import RegisterView from "../view/RegisterView";
import BookView from "../view/BookView";
import BooksView from "../view/BooksView";
import AdminView from "../view/AdminView";
import CartView from "../view/CartView";
import OrderView from "../view/OrderView";
import SuccessView from "../view/SuccessView";
import UserOrderView from "../view/UserOrderView";
import SearchView from "../view/SearchView";
import UserView from "../view/UserView";
import {history} from "../utils/history";
import PrivateRoute from "./PrivateRoute";
import LoginRoute from "./LoginRoute";

class BasicRoute extends React.Component {
  constructor(props) {
    super(props);
    history.listen((location, action) => {
      console.log(location, action);
    });
  }

  render() {
    return (
        <Router history={history}>
          <Switch>
            {/*<Route exact path="/" component={HomeView} />*/}
            <LoginRoute exact path={"/login"} component={LoginView}/>
            <Route exact path="/" component={HomeView}/>
            <Route exact path="/home" component={HomeView}/>
            <Route exact path="/register" component={RegisterView}/>
            <Route exact path="/detail" component={BookView}/>
            <Route exact path="/book_all" component={BooksView}/>
            <PrivateRoute exact path="/admin/:id" component={AdminView}/>
            <Route exact path="/search" component={SearchView}/>
            <Route exact path="/cart" component={CartView}/>
            <Route exact path="/order" component={OrderView}/>
            <Route exact path="/success" component={SuccessView}/>
            <Route exact path="/user_order" component={UserOrderView}/>
            <Route exact path="/user" component={UserView}/>
            <Redirect from={'/*'} to={{pathname: "/home"}}/>
          </Switch>
        </Router>
    )
  }
}

export default BasicRoute;
// 需要写private route