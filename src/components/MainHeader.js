import React, { Component } from "react";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";
// import { Cookies } from "react-cookie"
import { Icon } from "react-icons-kit";
import { bell } from "react-icons-kit/iconic/";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { setLangauge } from "../actions";
import globe from "../assets/icons/globe-white.svg";
import user from "../assets/icons/user-white.svg";
import { languageArray } from "../services/Constants";
import { logoutApi } from "../services/api";
import { getTranslations, updateLangTag, getLanguage } from "../services";
class MainHeader extends Component {
  constructor(props) {
    super(props);
    this.notificationtoggle = this.notificationtoggle.bind(this);
    this.acctoggle = this.acctoggle.bind(this);
    this.lantoggle = this.lantoggle.bind(this);
    this.changeLang = this.changeLang.bind(this);
    this.logOut = this.logOut.bind(this);
    this.state = {
      landropdownOpen: false,
      accdropdownOpen: false,
      notificationOpen: false,
      activeLang: this.props.language,
      lang: languageArray,
      isDashboard: this.props.isDashboard
    };
  }
  acctoggle() {
    this.setState(prevState => ({
      accdropdownOpen: !prevState.accdropdownOpen
    }));
  }
  lantoggle() {
    this.setState(prevState => ({
      landropdownOpen: !prevState.landropdownOpen
    }));
  }
  notificationtoggle() {
    this.setState(prevState => ({
      notificationOpen: !prevState.notificationOpen
    }));
  }
  changeLang(index) {
    updateLangTag(this.state.lang[index].code);
    this.props.setLangauge(this.state.lang[index].code);
    // this.props.languageChanger();
  }
  logOut() {
    logoutApi()
      .then(res => res.json())
      .then(resJson => {
        console.log("logout", resJson);
      });
    this.props.removeUser();
  }
  render() {
    const { isDashboard, langauge } = this.props;
    const langData = getTranslations(langauge, "header");
    const {
      lang,
      landropdownOpen,
      accdropdownOpen,
      notificationOpen
    } = this.state;
    return (
      <header className="main-header">
        <div className={isDashboard ? "container-fluid" : "container"}>
          <div className="top-header-row row justify-content-between">
            <div className="logo">
              <Link to="/">
                <img
                  src={langData && langData.logo}
                  className="App-logo"
                  alt="logo"
                />
              </Link>
            </div>
            <div className="right-header d-flex align-items-center">
              <Dropdown isOpen={landropdownOpen} toggle={this.lantoggle}>
                <DropdownToggle tag="span" outline={0}>
                  <div className="icon">
                    <img alt="lang" src={globe} />
                  </div>
                </DropdownToggle>
                <DropdownMenu right>
                  {lang.map((lang, index) => (
                    <DropdownItem
                      key={index}
                      onClick={() => {
                        this.changeLang(index);
                      }}
                    >
                      <span>
                        <img alt={lang.code} src={lang.img} />{" "}
                      </span>
                      {lang.name}
                    </DropdownItem>
                  ))}
                </DropdownMenu>
              </Dropdown>
              {isDashboard && (
                <Dropdown
                  isOpen={notificationOpen}
                  toggle={this.notificationtoggle}
                >
                  <DropdownToggle tag="span" outline={0}>
                    <div className="icon">
                      <Icon icon={bell} />
                    </div>
                  </DropdownToggle>
                  <DropdownMenu right>
                    <DropdownItem
                      onClick={() => {
                        // this.logOut();
                        // console.log(this.props);
                      }}
                    >
                      Dummy
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              )}
              {this.props.isDashboard ? (
                <Dropdown isOpen={accdropdownOpen} toggle={this.acctoggle}>
                  <DropdownToggle tag="span" outline={0}>
                    <div className="icon">
                      <img alt="user" src={user} />
                    </div>
                  </DropdownToggle>
                  <DropdownMenu right>
                    <DropdownItem
                      onClick={() => {
                        this.logOut();
                        console.log(this.props);
                      }}
                    >
                      Log Out
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              ) : (
                <Link to="/login/">
                  <div className="icon">
                    <img alt="user" src={user} />
                  </div>
                </Link>
              )}
            </div>
          </div>
        </div>
      </header>
    );
  }
}
const mapStateToProps = state => {
  console.log(state, "from header");
  return state;
};
export default connect(
  mapStateToProps,
  { setLangauge }
)(MainHeader);
