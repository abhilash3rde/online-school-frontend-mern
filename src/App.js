import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { withCookies } from "react-cookie";

import Registration from "./components/Registration";
import "./App.scss";
import { getLanguage } from "./services";
import { SiteFooter } from "./components";
import MainHeader from "./components/MainHeader";
import Home from "./components/Home";
import Login from "./components/Login";
import DashboardMainScreen from "./components/DashboardMainScreen";
import ForgetPassword from "./components/ForgetPassword";
import Terms from "./components/Terms";
import Privacy from "./components/Privacy";
import Page404 from "./components/Page404";
import SetPassword from "./components/SetPassword";
class App extends Component {
  constructor(props) {
    super(props);
    this.setUser = this.setUser.bind(this);
    this.removeUser = this.removeUser.bind(this);
    this.setDashBoard = this.setDashBoard.bind(this);
    this.unsetDashBoard = this.unsetDashBoard.bind(this);
    this.languageChanger = this.languageChanger.bind(this);
    this.state = {
      lang: getLanguage(),
      isDashboard: false,
      userStatus: false
      // name: cookies.get('name') || null
    };
  }
  componentDidMount() {
    console.log("app");
  }
  languageChanger() {
    // this.setState({ lang: getLanguage() });
  }
  setDashBoard() {
    if (!this.state.isDashboard)
      this.setState({
        isDashboard: true
      });
  }
  unsetDashBoard() {
    if (this.state.isDashboard)
      this.setState({
        isDashboard: false
      });
  }
  setUser(user) {
    const { cookies } = this.props;
    if (user) cookies.set("user", user, { path: "/" });
  }
  removeUser() {
    const { cookies } = this.props;
    cookies.set("user", null, { path: "/" });
    this.unsetDashBoard();
  }
  // MyDashboard = (props) => {
  //   return (
  //     <DashboardMainScreen
  //       setDashBoard={this.setDashBoard} lang={lang}
  //       {...props}
  //     />
  //   );
  // }
  render() {
    const { isDashboard } = this.state;
    const {
      cookies: { cookies }
    } = this.props;
    return (
      <div className="App">
        <BrowserRouter>
          <div>
            <MainHeader
              languageChanger={this.languageChanger}
              cookies={cookies}
              isDashboard={isDashboard}
              removeUser={this.removeUser}
            />
            <Switch>
              <Route
                path="/"
                exact
                component={() => (
                  <Home
                    cookies={cookies}
                    unsetDashBoard={this.unsetDashBoard}
                  />
                )}
              />
              <Route
                path="/registration/"
                component={() => (
                  <Registration
                    unsetDashBoard={this.unsetDashBoard}
                    cookies={cookies}
                  />
                )}
              />
              <Route
                path="/login/"
                component={() => (
                  <Login
                    unsetDashBoard={this.unsetDashBoard}
                    setUser={this.setUser}
                    cookies={cookies}
                  />
                )}
              />
              <Route
                path="/users/setpassword/"
                component={() => (
                  <SetPassword
                    unsetDashBoard={this.unsetDashBoard}
                    setUser={this.setUser}
                    cookies={cookies}
                  />
                )}
              />
              <Route
                path="/forget-password/"
                component={() => (
                  <ForgetPassword
                    unsetDashBoard={this.unsetDashBoard}
                    setUser={this.setUser}
                    cookies={cookies}
                  />
                )}
              />
              <Route
                path="/Dashboard/"
                component={props => (
                  <DashboardMainScreen
                    setDashBoard={this.setDashBoard}
                    cookies={cookies}
                    {...props}
                  />
                )}
              />
              <Route
                path="/terms"
                exact
                component={props => (
                  <Terms
                    unsetDashBoard={this.unsetDashBoard}
                    setDashBoard={this.setDashBoard}
                    cookies={cookies}
                    {...props}
                  />
                )}
              />
              <Route
                path="/privacy"
                exact
                component={props => (
                  <Privacy
                    unsetDashBoard={this.unsetDashBoard}
                    setDashBoard={this.setDashBoard}
                    cookies={cookies}
                    {...props}
                  />
                )}
              />

              <Route component={Page404} />
            </Switch>
            {!isDashboard && <SiteFooter />}
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default withCookies(App);
