import React, { Component } from "react";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import ServiceForm from "./forms/service-form";
import ApplicationForm from "./forms/application-form";
import Header from "./header";
import Main from "./main-page";
import Storage from "./storage";
import Login from "./login";
import Singup from "./signup";
import Footer from './footer';
import axios from "axios";
import MyMap from './map'
import MasterForm from './forms/master-from'
import UserApplications from "./user-applications";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      user: {},
    };
  }

  componentDidMount() {
    this.loginStatus();
  }

  loginStatus = () => {
    axios
      .get("http://localhost:3000/logged_in", { withCredentials: true })
      .then((response) => {
        if (response.data.logged_in) {
          this.handleLogin(response.data);
        } else {
          this.handleLogout();
        }
      })
      .catch((error) => console.log("api errors:", error));
  };

  handleLogin = (data) => {
    this.setState({
      isLoggedIn: true,
      user: data.user,
    });
  };

  handleLogout = () => {
    this.setState({
      isLoggedIn: false,
      user: {},
    });
  };

  render() {
    const { isLoggedIn, user } = this.state;
    return (
      <Router>
        <Header isLog={isLoggedIn} user={user} logout={this.handleLogout} />
        <Route exact path="/reg">
          <Singup handleLogin={this.handleLogin} isLog={isLoggedIn} />
        </Route>
        <Route exact path="/login">
          <Login handleLogin={this.handleLogin} isLog={isLoggedIn} />
        </Route>
        <Route exact path="/user-app">
          <UserApplications user={user} />
        </Route>
        <Switch>
          <Route exact path="/" component={Main} />
          <Route exact path="/service-add" component={ServiceForm} />
          <Route exact path="/application-add" component={ApplicationForm} />
          <Route exact path="/storage" component={Storage} />
          <Route exact path="/masters" component={MasterForm} />
        </Switch>
        <Footer />
        <MyMap />
      </Router>
    );
  }
}
export default App;
