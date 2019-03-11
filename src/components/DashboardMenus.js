import React, { Component } from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { getTranslations } from "../services/";
import classNames from "classnames";

class DashboardMenus extends Component {
  constructor() {
    super();
    this.toggleSideBar = this.toggleSideBar.bind(this);
    this.state = {
      activeDashboardMenu: "Dashboard",
      isSidebarOpen: window.innerWidth > 1600 ? true : false
    };
  }

  toggleSideBar() {
    console.log(this.props.location);
    this.setState(prevState => ({
      isSidebarOpen: !prevState.isSidebarOpen
    }));
  }
  renderMenus = arr =>
    arr.map((el, index) => {
      const { isSidebarOpen } = this.state;
      return (
        <NavLink
          key={index}
          exact
          activeClassName={"active"}
          onClick={() => {
            this.setState({
              activeDashboardMenu: el.key
            });
          }}
          to={el.link}
        >
          <div className={"dashboard-menu"}>
            <div className="dashboard-menu-icon">
              <img alt={"icon"} src={el.icon} />
            </div>
            {
              <div
                className={classNames("dashboard-menu-title animated", {
                  fadeIn: isSidebarOpen,
                  fadeOut: !isSidebarOpen
                })}
              >
                <span>{el.name}</span>
              </div>
            }
          </div>
        </NavLink>
      );
    });
  render() {
    const dashboardMenus = getTranslations(
      this.props.langauge,
      "dashboardMenus"
    );
    const { isSidebarOpen } = this.state;
    return (
      <div
        className={classNames("dashboard-sidebar left", {
          opened: isSidebarOpen
        })}
      >
        <div className="dashboard-menus-wrapper">
          {this.renderMenus(dashboardMenus)}
        </div>
        <div
          className="dashboard-sidebar-opener"
          onClick={() => {
            this.toggleSideBar();
          }}
        />
      </div>
    );
  }
}
const mapStateToProps = state => {
  return state;
};

export default connect(mapStateToProps)(DashboardMenus);
