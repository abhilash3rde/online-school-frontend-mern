import React, { Component } from "react";
import classNames from "classnames";
import validator from "validator";
import { connect } from "react-redux";
import waterfall from "async-waterfall";
// import { baseUrl } from "../components";
import { getTranslations } from "../services";
import { forgotPasswordApi } from "../services/api";
// import emptyLogo from "../assets/logo/SVG/logo-empty.svg";
import { Link } from "react-router-dom";
import { Regex } from "../services/Constants";
// import { Redirect, Link } from "react-router-dom";

class ForgetPassword extends Component {
  constructor(props) {
    super(props);
    this.passwordToggle = this.passwordToggle.bind(this);
    this.submitForgetEmail = this.submitForgetEmail.bind(this);
    this.state = {
      fotget_email: "",
      fotget_email_isValid: null,
      fotget_email_errMsg: "",
      langData: getTranslations(props.langauge, "banner"),
      user: this.props.cookies.user || null,
      modalData: null,
      showPassword: false,
      showModal: false,
      isLoading: false
    };
  }
  componentDidMount() {
    this.unsetDashBoard();
  }
  unsetDashBoard() {
    this.props.unsetDashBoard();
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
      case "fotget_email":
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
  passwordToggle() {
    this.setState(prevState => ({
      showPassword: !prevState.showPassword
    }));
  }

  submitForgetEmail(event) {
    event.preventDefault();
    // forgotPasswordApi({
    //   email:
    // })
    waterfall([
      done => {
        this.validation("fotget_email");
        return done();
      },
      done => {
        if (!this.state.fotget_email_errMsg) {
          this.setState({
            showModal: true,
            isLoading: true
          });
          forgotPasswordApi({
            email: this.state.fotget_email
          })
            .then(res => res.json())
            .then(resJson => {
              console.log({ resJson });
              this.setState({
                isLoading: false
              });
              if (resJson.success) {
                this.setState(prevState => ({
                  fotget_email: "",
                  fotget_email_isValid: null,
                  isLoading: false,
                  modalData: {
                    title: "Success",
                    msg: `Email sent to ${prevState.fotget_email}.`
                  }
                }));
              }
            });
        }
        return done();
      }
    ]);
  }
  render() {
    const {
      fotget_email,
      fotget_email_isValid,
      fotget_email_errMsg,
      showModal,
      isLoading,
      modalData
    } = this.state;
    const { langauge } = this.props;
    const langData = getTranslations(langauge, "banner");

    return (
      <div className="container">
        <div className="row row main-banner-row align-items-center">
          <div className="col-lg-6 pb-5 pb-lg-0 text-lg-right text-center">
            <img
              src={langData && langData.logo}
              className="banner-logo"
              alt="logo"
            />
          </div>
          <div className="col-lg-6 text-center">
            <div className="card-shadow banner-form">
              <h2 className="text-secondary">Forget Password</h2>
              <form className=" text-left" onSubmit={this.submitForgetEmail}>
                <div
                  className={classNames("inputs", {
                    "has-errors": fotget_email_isValid
                  })}
                >
                  <label className="label" htmlFor="fotget_email">
                    Email
                  </label>
                  <input
                    type="email"
                    id="fotget_email"
                    className={classNames("input", {
                      varified: fotget_email_isValid === false
                    })}
                    placeholder="example_login"
                    value={fotget_email}
                    onChange={this.handleTextChange}
                  />
                  {fotget_email_isValid === false && (
                    <span className="verifiedCheck" />
                  )}
                  {fotget_email_isValid && (
                    <span className="error-msg">{fotget_email_errMsg}</span>
                  )}
                </div>
                <div className="">
                  <p className="label font-weight-normal">
                    <Link to="/login">or Login</Link>
                  </p>
                </div>
                <div className="text-center mt-2">
                  <button type="submit" className="btn btn-primary btn-w-1">
                    Reset Password
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
                  className={"card-modal-close"}
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
                  <img
                    alt={"logo"}
                    src={require("../assets/logo/SVG/logo-empty.svg")}
                  />
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
export default connect(mapStateToProps)(ForgetPassword);
