import React, { Component } from "react";
import { Redirect, Link } from "react-router-dom";
import classNames from "classnames";
import { connect } from "react-redux";
import validator from "validator";
import waterfall from "async-waterfall";
import { getTranslations } from "../services";
import { baseUrl, Regex } from "../services/Constants";
import eye from "../assets/icons/eye.svg";
import emptyLogo from "../assets/logo/SVG/logo-empty.svg";
import { loginApi } from "../services/api";
class Login extends Component {
  constructor(props) {
    super(props);
    this.handleTextChange = this.handleTextChange.bind(this);
    this.passwordToggle = this.passwordToggle.bind(this);
    this.submit = this.submit.bind(this);
    this.setCookies = this.setCookies.bind(this);
    this.handleResize = this.handleResize.bind(this);
    this.unsetDashBoard = this.unsetDashBoard.bind(this);
    this.state = {
      login_email: "",
      password: "",
      isEmail: null,
      isPassword: null,
      langData: getTranslations(props.langauge, "banner"),
      isLoading: false,
      showModal: false,
      showPassword: false,
      user: this.props.cookies.user || null,
      smallScreen: window.innerWidth < 992 ? true : false,
      modalData: null
    };
  }

  componentDidMount() {
    this.unsetDashBoard();
    window.addEventListener("resize", this.handleResize);
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.handleResize);
  }
  unsetDashBoard() {
    this.props.unsetDashBoard();
  }

  handleResize() {
    this.setState({
      smallScreen: window.innerWidth < 992 ? true : false
    });
  }
  setCookies(user) {
    const {
      cookies: { cookies },
      setUser
    } = this.props;
    setUser(user);
    this.setState({ user: cookies.user || null });
  }
  handleTextChange = event => {
    if (event) {
      if (event.target) {
        if (event.target.id) {
          let id = event.target.id;
          let value = event.target.value;
          this.setState({ [id]: value }, () => {
            this.validation(id);
          });
        }
      }
    }
  };

  passwordToggle() {
    this.setState(prevState => ({
      showPassword: !prevState.showPassword
    }));
  }
  submit(event) {
    event.preventDefault();
    waterfall([
      done => {
        ["login_email", "password"].map(el => this.validation(el));
        done();
      },
      done => {
        this.mainSubmit();
      }
    ]);
  }
  mainSubmit() {
    const { login_email_isValid, password_isValid } = this.state;
    if (password_isValid || login_email_isValid) {
      return;
    }
    this.login();
  }

  login() {
    // const url = `${baseUrl}/users/login`;
    this.setState({ isLoading: true, showModal: true }, () => {
      const { login_email, password } = this.state;

      let bodyString = {
        email: login_email,
        password: password
      };

      loginApi(bodyString)
        .then(res => res.json())
        .then(resJson => {
          console.log(resJson);
          if (resJson.status) {
            this.setCookies(resJson.user);
            this.setState({
              // userStatus: true,
              modalData: {
                title: "success"
                // msg: err
              },
              isLoading: false
            });
          } else if (resJson.error) {
            this.setState({
              modalData: {
                title: "Error",
                msg: resJson.error
              },
              isLoading: false
            });
          }
        })
        .catch(err => {
          // console.log({ err });
          this.setState({
            modalData: {
              title: "Error",
              msg: err
            },
            isLoading: false
          });
        });
    });
  }
  validation = id => {
    const field = this.state[id];
    const valid = id + "_isValid";
    const errMsg = id + "_errMsg";

    switch (id) {
      case "password":
        if (field === "") {
          this.setState({
            [valid]: true,
            [errMsg]: "empty"
          });
          return;
        }

        this.setState({
          [valid]: false,
          [errMsg]: ""
        });
        break;
      case "login_email":
        if (field === "") {
          this.setState({
            [valid]: true,
            [errMsg]: "empty"
          });
          return;
        }
        if (
          !Regex.email.test(field)
          // !validator.isEmail(field)
        ) {
          this.setState({
            [valid]: true,
            [errMsg]: "Sorry, wrong email"
          });
          return;
        }
        this.setState({
          [valid]: false,
          [errMsg]: ""
        });
        break;

      default:
        break;
    }
  };
  render() {
    const {
      login_email_isValid,
      login_email,
      login_email_errMsg,
      password,
      password_isValid,
      password_errMsg,
      isLoading,
      modalData,
      showPassword,
      smallScreen,
      showModal
    } = this.state;
    const { langauge, cookies } = this.props;
    const langData = getTranslations(langauge, "banner");
    const langLabels = getTranslations(langauge, "labels");

    if (this.state.user && cookies.user !== "null") {
      return <Redirect to="/Dashboard" />;
    }
    return (
      <div className="container">
        <div className="row row main-banner-row align-items-center">
          {!smallScreen && (
            <div className="col-lg-6 pb-5 pb-lg-0 text-lg-right text-center">
              <img
                src={langData && langData.logo}
                className="banner-logo"
                alt="logo"
              />
            </div>
          )}
          <div className="col-lg-6 text-center">
            <div className="card-shadow banner-form">
              <h2 className="text-secondary">
                {langLabels && langLabels.login}
              </h2>
              <form className=" text-left" onSubmit={this.submit}>
                <div
                  className={classNames("inputs", {
                    "has-errors": login_email_isValid
                  })}
                >
                  <label className="label" htmlFor="login_email">
                    {langLabels && langLabels.login}
                  </label>
                  <input
                    type="email"
                    id="login_email"
                    className={classNames("input", {
                      varified: login_email_isValid === false
                    })}
                    placeholder="example_login"
                    value={login_email}
                    onChange={this.handleTextChange}
                  />
                  {login_email_isValid === false && (
                    <span className="verifiedCheck" />
                  )}
                  {login_email_isValid && (
                    <span className="error-msg">{login_email_errMsg}</span>
                  )}
                </div>
                <div
                  className={classNames("inputs", {
                    "has-errors": password_isValid
                  })}
                >
                  <label className="label" htmlFor="password">
                    {langLabels && langLabels.password}
                  </label>
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    className={classNames("input", {
                      varified: password_isValid === false
                    })}
                    placeholder="pa$$\/\/0rd"
                    value={password}
                    onChange={this.handleTextChange}
                  />
                  {password_isValid === false && (
                    <span className="verifiedCheck has-eye" />
                  )}
                  {password_isValid && (
                    <span className="error-msg">{password_errMsg}</span>
                  )}
                  <span
                    className={classNames("password-tgl", {
                      show: showPassword
                    })}
                    onClick={this.passwordToggle}
                  >
                    <img src={eye} alt="eye" className="img-fluid" />
                  </span>
                </div>
                <div className="">
                  <p className="label font-weight-normal">
                    <Link to="/forget-password">
                      {langLabels && langLabels.forgotpassword}
                    </Link>
                  </p>
                </div>
                <div className="text-center mt-2">
                  <button type="submit" className="btn btn-primary btn-w-1">
                    {langLabels && langLabels.login}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        {showModal && (
          <div
            className={classNames("card-modal-wrapper animated slow ", {
              loading: isLoading,
              fadeIn: showModal
            })}
            onClick={() => {
              if (!isLoading) {
                this.setState({
                  showModal: false
                });
              }
            }}
          >
            <div
              onClick={e => {
                e.stopPropagation();
              }}
              className="card-modal-inner"
            >
              {!isLoading && (
                <div
                  className="card-modal-close"
                  onClick={() => {
                    this.setState({
                      showModal: false
                    });
                  }}
                >
                  close
                </div>
              )}
              {isLoading && (
                <div className="modal-loader">
                  <img alt={"logo"} src={emptyLogo} />
                </div>
              )}
              {!isLoading && modalData && (
                <div
                  className={classNames(
                    "card-modal-data animated slow text-secoundary",
                    {
                      fadeIn: !isLoading
                    }
                  )}
                >
                  <h2 className="font-weight-bold">{modalData.title}</h2>
                  <h5>{modalData.msg}</h5>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return state;
};
export default connect(mapStateToProps)(Login);
