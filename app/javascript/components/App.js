import React, { Component } from "react";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import ServiceForm from "./forms/service-form";
import ApplicationForm from "./forms/application-form";
import Header from "./header";
import Main from "./main-page";
import Storage from "./storage";
import Login from "./login";
import Singup from "./signup";
import axios from "axios";

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
        <Switch>
          <Route exact path="/singup">
            <Singup handleLogin={this.handleLogin} isLog={isLoggedIn} />
          </Route>
          <Route exact path="/login">
            <Login handleLogin={this.handleLogin} isLog={isLoggedIn} />
          </Route>
          <Route exact path="/" component={Main} />
          <Route exact path="/service-add" component={ServiceForm} />
          <Route exact path="/application-add" component={ApplicationForm} />
          <Route exact path="/storage" component={Storage} />
        </Switch>
      </Router>
    );
  }
}
export default App;
