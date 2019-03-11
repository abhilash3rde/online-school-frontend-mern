import React, { Component } from "react";
import classNames from "classnames";
import { Route, Switch, NavLink, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import DashboardMenus from "./DashboardMenus";
import {
  Dashboard,
  Chat,
  Calander,
  ContentManagement,
  ProgramManagement
} from "./";
import UserManagement from "./UserManagement";
import Page404 from "./Page404";

class DashboardMainScreen extends Component {
  constructor(props) {
    super(props);
    this.setDashboard = this.setDashboard.bind(this);
    this.state = {
      activeDashboardMenu: "Dashboard",
      isSidebarOpen: window.innerWidth > 1600 ? true : false
    };
  }
  componentDidMount() {
    this.setDashboard();
    console.log("dashboard main screen");
  }
  setDashboard() {
    this.props.setDashBoard();
  }
  render() {
    const {
      location: { pathname },
      cookies
    } = this.props;
    if (!cookies.user || cookies.user === "null") {
      return <Redirect to="/login/" />;
    }
    return (
      <div>
        <div className="main-dashboard-wrapper">
          <DashboardMenus />
          <div
            className={classNames("dashboard-content-area", {
              "front-page": pathname === "/Dashboard",
              "calander-page": pathname === "/Dashboard/calander"
            })}
          >
            <Switch base="">
              <Route
                path="/dashboard/"
                exact
                component={props => (
                  <Dashboard
                    cookies={cookies}
                    user={JSON.parse(cookies.user)}
                    {...props}
                  />
                )}
              />
              <Route
                path="/dashboard/User_management/"
                component={props => {
                  return <UserManagement {...props} />;
                }}
              />
              <Route path="/dashboard/calander/" component={Calander} />
              <Route
                path="/dashboard/content_management/"
                exact
                component={ContentManagement}
              />
              <Route
                path="/dashboard/Study_program_management/"
                exact
                component={ProgramManagement}
              />
              <Route component={Page404} />
            </Switch>
            <Chat
              cookies={cookies}
              emitMsg={this.props.emitMsg}
              joinRoom={this.props.joinRoom}
              sendMsg={this.props.sendMsg}
              user={JSON.parse(cookies.user)}
            />
          </div>
        </div>
      </div>
    );
  }
}
export default DashboardMainScreen;
