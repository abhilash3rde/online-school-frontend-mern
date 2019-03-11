import React, { Component } from "react";
import { Redirect, Link } from "react-router-dom";
import classNames from "classnames";
import validator from "validator";
import { connect } from "react-redux";
import waterfall from "async-waterfall";
import { getTranslations } from "../services";
import { baseUrl } from "../services/Constants";
import eye from "../assets/icons/eye.svg";
import emptyLogo from "../assets/logo/SVG/logo-empty.svg";
import { setPasswordApi } from "../services/api";
class SetPassword extends Component {
  constructor(props) {
    super(props);
    this.handleTextChange = this.handleTextChange.bind(this);
    this.passwordToggle = this.passwordToggle.bind(this);
    this.submit = this.submit.bind(this);
    this.handleResize = this.handleResize.bind(this);
    this.unsetDashBoard = this.unsetDashBoard.bind(this);
    this.state = {
      password: "",
      isPassword: null,
      repassword: "",
      isrePassword: null,
      langData: getTranslations(props.langauge, "banner"),
      isLoading: false,
      showModal: false,
      showPassword: false,
      setPasswordSuccess: false,
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
        ["repassword", "password"].map(el => this.validation(el));
        done();
      },
      done => {
        this.mainSubmit();
      }
    ]);
  }
  mainSubmit() {
    const { repassword_isValid, password_isValid } = this.state;
    if (password_isValid || repassword_isValid) {
      return;
    }
    this.setPassword();
  }

  setPassword() {
    this.setState({ isLoading: true, showModal: true }, () => {
      const { repassword, password } = this.state;
      const token = window.location.pathname.replace("/users/setpassword/", "");
      let bodyString = {
        password: password,
        password2: repassword
      };

      setPasswordApi(bodyString, token)
        .then(res => res.json())
        .then(resJson => {
          console.log(resJson);
          if (resJson.success) {
            this.setState({
              modalData: {
                title: "Congratulations",
                msg: "Your Password is successfully set please go and login."
              },
              isLoading: false,
              setPasswordSuccess: true
            });
          } else if (resJson.message) {
            this.setState({
              modalData: {
                title: "Error",
                msg: resJson.message
              },
              isLoading: false
            });
          }
        })
        .catch(err => {
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
        if (field.length < 3) {
          this.setState({
            [valid]: true,
            [errMsg]: "not less than 3"
          });
          return;
        }
        this.setState({
          [valid]: false,
          [errMsg]: ""
        });
        break;
      case "repassword":
        if (field === "") {
          this.setState({
            [valid]: true,
            [errMsg]: "empty"
          });
          return;
        }
        if (field !== this.state.password) {
          this.setState({
            [valid]: true,
            [errMsg]: "Sorry, not Matched"
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
      repassword_isValid,
      repassword,
      repassword_errMsg,
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

    if (this.state.user && cookies.user !== "null") {
      return <Redirect to="/Dashboard" />;
    }
    if (this.state.setPasswordSuccess && !showModal) {
      return <Redirect to="/login" />;
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
              <h2 className="text-secondary">Set Password</h2>
              <form className=" text-left" onSubmit={this.submit}>
                <div
                  className={classNames("inputs", {
                    "has-errors": password_isValid
                  })}
                >
                  <label className="label" htmlFor="password">
                    Password
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
                <div
                  className={classNames("inputs", {
                    "has-errors": repassword_isValid
                  })}
                >
                  <label className="label" htmlFor="password">
                    Reenter Password
                  </label>
                  <input
                    type={showPassword ? "text" : "password"}
                    id="repassword"
                    className={classNames("input", {
                      varified: repassword_isValid === false
                    })}
                    placeholder="pa$$\/\/0rd"
                    value={repassword}
                    onChange={this.handleTextChange}
                  />
                  {repassword_isValid === false && (
                    <span className="verifiedCheck " />
                  )}
                  {repassword_isValid && (
                    <span className="error-msg">{repassword_errMsg}</span>
                  )}
                  {/* <span
										className={classNames('password-tgl', {
											show: showPassword
										})}
										onClick={this.passwordToggle}
									>
										<img src={eye} alt="eye" className="img-fluid" />
									</span> */}
                </div>
                <div className="text-center mt-2">
                  <button type="submit" className="btn btn-primary btn-w-1">
                    Set Password
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

export default connect(mapStateToProps)(SetPassword);
