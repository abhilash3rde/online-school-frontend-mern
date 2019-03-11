import React, { Component } from "react";
import { TabContent, TabPane, Nav, NavItem, NavLink } from "reactstrap";
import classNames from "classnames";
import validator from "validator";
import SelectMulti from "react-select";
import waterfall from "async-waterfall";
import { connect } from "react-redux";
import debounce from "debounce";
import { Redirect, Link } from "react-router-dom";
import { getTranslations } from "../services";
import { baseUrl, selectStyle, Regex } from "../services/Constants";
import { registerApi, sendEmailApi } from "../services/api";

class Registration extends Component {
  constructor(props) {
    super(props);
    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleCheckBoxChange = this.handleCheckBoxChange.bind(this);
    this.parantSubmit = this.parantSubmit.bind(this);
    this.teacherSubmit = this.teacherSubmit.bind(this);
    this.unsetDashBoard = this.unsetDashBoard.bind(this);
    this.handleResize = this.handleResize.bind(this);
    this.state = {
      activeTab: "1",
      first_name_pf: "",
      first_name_pf_isValid: null,
      first_name_pf_errMsg: "",
      last_name_pf: "",
      last_name_pf_isValid: null,
      last_name_pf_errMsg: "",
      email_pf: "",
      email_pf_isValid: null,
      email_pf_errMsg: "",
      phone_pf: "",
      phone_pf_isValid: null,
      phone_pf_errMsg: "",
      agree_pf: false,
      agree_pf_isValid: null,
      agree_pf_errMsg: "",
      first_name_tf: "",
      first_name_tf_isValid: null,
      first_name_tf_errMsg: "",
      last_name_tf: "",
      last_name_tf_isValid: null,
      last_name_tf_errMsg: "",
      email_tf: "",
      email_tf_isValid: null,
      email_tf_errMsg: "",
      phone_tf: "",
      phone_tf_isValid: null,
      phone_tf_errMsg: "",
      agree_tf: false,
      agree_tf_isValid: null,
      agree_tf_errMsg: "",
      selectedDisciplines: null,
      selectedDisciplines_isValid: null,
      selectedDisciplines_errMsg: "",
      isLoading: false,
      showModal: false,
      modalData: null,
      isRegisterd: false,
      smallScreen: window.innerWidth < 992 ? true : false,
      user: this.props.cookies.user || null
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
  toggleTab(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }
  disciplinesChange = selectedDisciplines => {
    this.setState({ selectedDisciplines }, () => {
      this.validation("selectedDisciplines");
    });
    console.log(`Option selected:`, selectedDisciplines);
  };
  handleTextChange = event => {
    if (event) {
      if (event.target) {
        if (event.target.id) {
          let id = event.target.id;
          let value = event.target.value;
          this.setState({ [id]: value }, () => {
            this.nexValidate(id);
            // this.validation(id);
          });
        }
      }
    }
  };
  nexValidate = debounce(id => {
    this.validation(id);
  }, 200);
  parantSubmit(event) {
    event.preventDefault();
    waterfall([
      done => {
        [
          "first_name_pf",
          "last_name_pf",
          "email_pf",
          "phone_pf",
          "agree_pf"
        ].map(el => this.validation(el));
        return done();
      },
      done => {
        const {
          first_name_pf_isValid,
          last_name_pf_isValid,
          email_pf_isValid,
          phone_pf_isValid,
          agree_pf_isValid
        } = this.state;
        if (
          first_name_pf_isValid ||
          last_name_pf_isValid ||
          email_pf_isValid ||
          phone_pf_isValid ||
          agree_pf_isValid
        ) {
          return;
        }
        this.register("parent");
      }
    ]);
  }
  teacherSubmit(event) {
    event.preventDefault();
    waterfall([
      done => {
        [
          "first_name_tf",
          "last_name_tf",
          "email_tf",
          "phone_tf",
          "agree_tf",
          "selectedDisciplines"
        ].map(el => this.validation(el));
        return done();
      },
      done => {
        const {
          first_name_tf_isValid,
          last_name_tf_isValid,
          email_tf_isValid,
          phone_tf_isValid,
          agree_tf_isValid
        } = this.state;
        if (
          first_name_tf_isValid ||
          last_name_tf_isValid ||
          email_tf_isValid ||
          phone_tf_isValid ||
          agree_tf_isValid
        ) {
          // alert('check validation');
          return;
        }
        this.register("teacher");
      }
    ]);
  }
  register(member) {
    const url = `${baseUrl}/users/register`;
    this.setState({ isLoading: true, showModal: true }, () => {
      if (!(member === "parent" || member === "teacher")) {
        console.log("something wrong");
        this.setState({ isLoading: false });
        return;
      }
      let bodyString = null;
      const {
        email_pf,
        first_name_pf,
        last_name_pf,
        phone_pf,
        email_tf,
        first_name_tf,
        last_name_tf,
        phone_tf,
        selectedDisciplines
      } = this.state;

      if (member === "parent") {
        bodyString = {
          firstName: first_name_pf,
          lastName: last_name_pf,
          email: email_pf,
          phoneNumber: phone_pf,
          role: member
        };
      }
      if (member === "teacher") {
        bodyString = {
          firstName: first_name_tf,
          lastName: last_name_tf,
          email: email_tf,
          phoneNumber: phone_tf,
          role: member,
          discipline: selectedDisciplines
        };
      }
      registerApi(bodyString)
        .then(res => res.json())
        .then(resJson => {
          console.log({ resJson }, "aaaaaa");
          if (resJson.status) {
            console.log({ email_tf, email_pf });
            sendEmailApi({
              email: member === "teacher" ? email_tf : email_pf
            })
              .then(res => res.json())
              .then(resJson => {
                console.log({ resJson }, "bbbb");
                if (resJson.success) {
                  this.setState({
                    modalData: {
                      title: "Congratulations",
                      msg:
                        "Your request to registration on our service has been received. Please check your email for verification message and go with provided instructions."
                    }
                  });
                } else {
                  if (resJson.message) {
                    this.setState({
                      modalData: {
                        title: "Error",
                        msg: resJson.message
                      }
                    });
                  } else {
                    this.setState({
                      modalData: {
                        title: "Error",
                        msg: "something wrong"
                      }
                    });
                  }
                }
              });
          } else {
            if (resJson.messages) {
              this.setState({
                modalData: {
                  title: "Error",
                  msg: resJson.messages[0].msg
                }
              });
            } else if (resJson.error) {
              this.setState({
                modalData: {
                  title: "Error",
                  msg: resJson.error
                }
              });
            } else {
              this.setState({
                modalData: {
                  title: "Error",
                  msg: "something wrong"
                }
              });
            }
          }
          this.setState({ isLoading: false });
        })
        .catch(err => {
          console.log({ err });
        });
      this.setState({ isLoading: false });
    });
  }
  validation = id => {
    const field = this.state[id];
    const valid = id + "_isValid";
    const errMsg = id + "_errMsg";

    if (
      id === "first_name_pf" ||
      id === "last_name_pf" ||
      id === "first_name_tf" ||
      id === "last_name_tf"
    ) {
      if (field === "") {
        this.setState({
          [valid]: true,
          [errMsg]: "empty"
        });
        return;
      }
      if (
        // !/^[a-zA-Z]+$/.test(field)
        !validator.isAlpha(field, ["en-US"]) &&
        !validator.isAlpha(field, ["uk-UA"]) &&
        !validator.isAlpha(field, ["ru-RU"])
      ) {
        this.setState({
          [valid]: true,
          [errMsg]: "only letters"
        });
        return;
      }
      if (field.length < 2) {
        this.setState({
          [valid]: true,
          [errMsg]: "Too Short"
        });
        return;
      }
      this.setState({
        [valid]: false,
        [errMsg]: ""
      });
      return;
    }

    if (id === "email_pf" || id === "email_tf") {
      if (field === "") {
        this.setState({
          [valid]: true,
          [errMsg]: "empty"
        });
        return;
      }
      if (
        // !/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/.test(
        //   field
        // )
        // !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(field)
        // !/^\\w+([\\.-]?\\w+)+@\\w+([\\.:]?\w+)+(\\.[a-zA-Z0-9]{2,3})+$/.test(field)
        // !validator.isEmail(field)
        !Regex.email.test(field)
      ) {
        // alert('hi')
        this.setState({
          [valid]: true,
          [errMsg]: "Sorry, wrong email"
        });
        return;
      }
      // console.log(validator.isEmail(field), "aa")
      this.setState({
        [valid]: false,
        [errMsg]: ""
      });
      return;
    }
    if (id === "phone_pf" || id === "phone_tf") {
      if (field === "") {
        this.setState({
          [valid]: true,
          [errMsg]: "empty"
        });
        return;
      }
      if (
        // !/^([0-9]( |-)?)?(\(?[0-9]{3}\)?|[0-9]{3})( |-)?([0-9]{3}( |-)?[0-9]{4}|[a-zA-Z0-9]{7})$/.test(

        !/^\+380\d{9}$/.test(field)
        // !validator.isMobilePhone(field)
      ) {
        this.setState({
          [valid]: true,
          [errMsg]: "Sorry, wrong number"
        });
        return;
      }
      this.setState({
        [valid]: false,
        [errMsg]: ""
      });
      return;
    }
    if (id === "selectedDisciplines") {
      if (field) {
        if (field.length > 0) {
          this.setState({
            [valid]: false,
            [errMsg]: ""
          });
          return;
        }
      }
      this.setState({
        [valid]: true,
        [errMsg]: "please select"
      });
      return;
    }
    if (id === "agree_pf" || id === "agree_tf") {
      console.log(field);
      if (!field) {
        this.setState({
          [valid]: true,
          [errMsg]: "must be checked"
        });
        return;
      }

      this.setState({
        [valid]: false,
        [errMsg]: ""
      });
      return;
    }

    return;
  };
  handleCheckBoxChange = event => {
    if (event) {
      if (event.target) {
        if (event.target.id) {
          let id = event.target.id;
          this.setState({ [event.target.id]: event.target.checked }, () => {
            this.validation(id);
          });
        }
      }
    }
  };
  render() {
    const langData = getTranslations(this.props.langauge, "banner");
    if (this.state.isRegisterd) return <Redirect to="/login/" />;
    const {
      activeTab,
      first_name_pf_isValid,
      first_name_pf,
      first_name_pf_errMsg,
      last_name_pf_isValid,
      last_name_pf,
      last_name_pf_errMsg,
      email_pf_isValid,
      email_pf,
      email_pf_errMsg,
      phone_pf_isValid,
      phone_pf,
      phone_pf_errMsg,
      agree_pf_isValid,
      agree_pf,
      agree_pf_errMsg,
      first_name_tf_isValid,
      first_name_tf,
      first_name_tf_errMsg,
      last_name_tf_isValid,
      last_name_tf,
      last_name_tf_errMsg,
      email_tf_isValid,
      email_tf,
      email_tf_errMsg,
      phone_tf_isValid,
      phone_tf,
      phone_tf_errMsg,
      agree_tf_isValid,
      agree_tf,
      agree_tf_errMsg,
      selectedDisciplines_isValid,
      selectedDisciplines,
      selectedDisciplines_errMsg,
      showModal,
      isLoading,
      modalData,
      isRegisterd,
      smallScreen,
      user
    } = this.state;
    const disciplinesOptions = [
      { value: "Math", label: "Math" },
      { value: "Art_graphics", label: "Art graphics" },
      { value: "History_of_Ukraine", label: "History of Ukraine" },
      { value: "Astronomy", label: "Astronomy" }
    ];
    if (isRegisterd || (user && user !== "null")) {
      return <Redirect to="/Dashboard" />;
    }
    return (
      <div className="container">
        <div className="row row main-banner-row ">
          {!smallScreen && (
            <div className="col-lg-6 pb-5 pb-lg-0 banner-logo-padding text-lg-right text-center">
              <img
                src={langData && langData.logo}
                className="banner-logo"
                alt="logo"
              />
            </div>
          )}
          <div className="col-lg-6 text-center">
            <div className="card-shadow banner-form">
              <h2 className="text-secondary">Registration</h2>
              <Nav tabs>
                <NavItem>
                  <NavLink
                    tag="h4"
                    className={classNames({
                      active: activeTab === "1"
                    })}
                    onClick={() => {
                      this.toggleTab("1");
                    }}
                  >
                    Parent
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    tag="h4"
                    className={classNames({
                      active: activeTab === "2"
                    })}
                    onClick={() => {
                      this.toggleTab("2");
                    }}
                  >
                    Teacher
                  </NavLink>
                </NavItem>
              </Nav>
              <TabContent activeTab={activeTab}>
                <TabPane tabId="1">
                  <div
                    className={classNames("text-left animated", {
                      // zoomIn: activeTab === "1"
                    })}
                  >
                    <form onSubmit={this.parantSubmit}>
                      <div
                        className={classNames("inputs", {
                          "has-errors": first_name_pf_isValid
                        })}
                      >
                        <label className="label" htmlFor="first_name_pf">
                          First name
                        </label>
                        <input
                          type="text"
                          id="first_name_pf"
                          className={classNames("input", {
                            varified: first_name_pf_isValid === false
                          })}
                          maxLength={12}
                          placeholder="Enter here..."
                          value={first_name_pf}
                          onChange={this.handleTextChange}
                        />
                        {first_name_pf_isValid === false && (
                          <span className="verifiedCheck" />
                        )}

                        {first_name_pf_isValid && (
                          <span className="error-msg">
                            {first_name_pf_errMsg}
                          </span>
                        )}
                      </div>
                      <div
                        className={classNames("inputs", {
                          "has-errors": last_name_pf_isValid
                        })}
                      >
                        <label className="label" htmlFor="last_name_pf">
                          Last name
                        </label>
                        <input
                          type="text"
                          id="last_name_pf"
                          className={classNames("input", {
                            varified: last_name_pf_isValid === false
                          })}
                          maxLength={12}
                          placeholder="Enter here..."
                          value={last_name_pf}
                          onChange={this.handleTextChange}
                        />
                        {last_name_pf_isValid === false && (
                          <span className="verifiedCheck" />
                        )}

                        {last_name_pf_isValid && (
                          <span className="error-msg">
                            {last_name_pf_errMsg}
                          </span>
                        )}
                      </div>
                      <div
                        className={classNames("inputs", {
                          "has-errors": email_pf_isValid
                        })}
                      >
                        <label className="label" htmlFor="email_pf">
                          Email
                        </label>
                        <input
                          type="text"
                          id="email_pf"
                          className={classNames("input", {
                            varified: email_pf_isValid === false
                          })}
                          placeholder="example@mail.com"
                          value={email_pf}
                          onChange={this.handleTextChange}
                        />
                        {email_pf_isValid === false && (
                          <span className="verifiedCheck" />
                        )}

                        {email_pf_isValid && (
                          <span className="error-msg">{email_pf_errMsg}</span>
                        )}
                      </div>
                      <div
                        className={classNames("inputs", {
                          "has-errors": phone_pf_isValid
                        })}
                      >
                        <label className="label" htmlFor="phone_pf">
                          Phone
                        </label>
                        <input
                          type="tel"
                          id="phone_pf"
                          maxLength="14"
                          className={classNames("input", {
                            varified: phone_pf_isValid === false
                          })}
                          placeholder="+380XXXXXXXXX"
                          value={phone_pf}
                          onChange={this.handleTextChange}
                        />
                        {phone_pf_isValid === false && (
                          <span className="verifiedCheck" />
                        )}

                        {phone_pf_isValid && (
                          <span className="error-msg">{phone_pf_errMsg}</span>
                        )}
                      </div>
                      <div
                        className={classNames("inputs agree-input", {
                          "has-errors": agree_pf_isValid
                        })}
                      >
                        <input
                          className="input-checkbox"
                          id="agree_pf"
                          type="checkbox"
                          checked={agree_pf}
                          onChange={this.handleCheckBoxChange}
                        />
                        <span className="checkbox-span" />
                        <label
                          className="label checkbox-label"
                          htmlFor="agree_pf"
                        >
                          I agree with <Link to="/terms">Terms</Link> and{" "}
                          <Link to="/privacy">Policies</Link>
                        </label>

                        {agree_pf_isValid && (
                          <span className="error-msg">{agree_pf_errMsg}</span>
                        )}
                      </div>
                      <div className="text-center mt-2">
                        <button
                          type="submit"
                          className="btn btn-primary btn-w-1"
                        >
                          Register
                        </button>
                      </div>
                    </form>
                  </div>
                </TabPane>
                <TabPane tabId="2">
                  <div
                    className={classNames("text-left animated", {
                      // zoomIn: activeTab === "2"
                    })}
                  >
                    <form onSubmit={this.teacherSubmit}>
                      <div
                        className={classNames("inputs", {
                          "has-errors": first_name_tf_isValid
                        })}
                      >
                        <label className="label" htmlFor="first_name_tf">
                          First name
                        </label>
                        <input
                          type="text"
                          id="first_name_tf"
                          className={classNames("input", {
                            varified: first_name_tf_isValid === false
                          })}
                          placeholder="Enter here..."
                          maxLength={12}
                          value={first_name_tf}
                          onChange={this.handleTextChange}
                        />
                        {first_name_tf_isValid === false && (
                          <span className="verifiedCheck" />
                        )}

                        {first_name_tf_isValid && (
                          <span className="error-msg">
                            {first_name_tf_errMsg}
                          </span>
                        )}
                      </div>
                      <div
                        className={classNames("inputs", {
                          "has-errors": last_name_tf_isValid
                        })}
                      >
                        <label className="label" htmlFor="last_name_tf">
                          Last name
                        </label>
                        <input
                          type="text"
                          id="last_name_tf"
                          className={classNames("input", {
                            varified: last_name_tf_isValid === false
                          })}
                          maxLength={12}
                          placeholder="Enter here..."
                          value={last_name_tf}
                          onChange={this.handleTextChange}
                        />
                        {last_name_tf_isValid === false && (
                          <span className="verifiedCheck" />
                        )}
                        {last_name_tf_isValid && (
                          <span className="error-msg">
                            {last_name_tf_errMsg}
                          </span>
                        )}
                      </div>
                      <div
                        className={classNames("inputs", {
                          "has-errors": email_tf_isValid
                        })}
                      >
                        <label className="label" htmlFor="email_tf">
                          Email
                        </label>
                        <input
                          type="text"
                          id="email_tf"
                          className={classNames("input", {
                            varified: email_tf_isValid === false
                          })}
                          placeholder="example@mail.com"
                          value={email_tf}
                          onChange={this.handleTextChange}
                        />
                        {email_tf_isValid === false && (
                          <span className="verifiedCheck" />
                        )}

                        {email_tf_isValid && (
                          <span className="error-msg">{email_tf_errMsg}</span>
                        )}
                      </div>
                      <div
                        className={classNames("inputs", {
                          "has-errors": phone_tf_isValid
                        })}
                      >
                        <label className="label" htmlFor="phone_tf">
                          Phone
                        </label>
                        <input
                          type="tel"
                          id="phone_tf"
                          maxLength="14"
                          className={classNames("input", {
                            varified: phone_tf_isValid === false
                          })}
                          placeholder="+380XXXXXXXXX"
                          value={phone_tf}
                          onChange={this.handleTextChange}
                        />
                        {phone_tf_isValid === false && (
                          <span className="verifiedCheck" />
                        )}

                        {phone_tf_isValid && (
                          <span className="error-msg">{phone_tf_errMsg}</span>
                        )}
                      </div>
                      <div
                        className={classNames("inputs select-input", {
                          "has-errors": selectedDisciplines_isValid
                        })}
                      >
                        <label className="label" htmlFor="selectedDisciplines">
                          Disciplines
                        </label>
                        <SelectMulti
                          id={"selectedDisciplines"}
                          styles={selectStyle}
                          value={selectedDisciplines}
                          isMulti={true}
                          onChange={this.disciplinesChange}
                          options={disciplinesOptions}
                        />
                        {selectedDisciplines_isValid && (
                          <span className="error-msg">
                            {selectedDisciplines_errMsg}
                          </span>
                        )}
                      </div>
                      <div
                        className={classNames("inputs agree-input", {
                          "has-errors": agree_tf_isValid
                        })}
                      >
                        <input
                          className="input-checkbox"
                          id="agree_tf"
                          type="checkbox"
                          checked={agree_tf}
                          onChange={this.handleCheckBoxChange}
                        />
                        <span className="checkbox-span" />
                        <label
                          className="label checkbox-label"
                          htmlFor="agree_tf"
                        >
                          I agree with <Link to="/terms">Terms</Link> and{" "}
                          <Link to="/privacy">Policies</Link>
                        </label>
                        {agree_tf_isValid && (
                          <span className="error-msg">{agree_tf_errMsg}</span>
                        )}
                      </div>
                      <div className="text-center mt-2">
                        <button
                          type="submit"
                          className="btn btn-primary btn-w-1"
                        >
                          Register
                        </button>
                      </div>
                    </form>
                  </div>
                </TabPane>
              </TabContent>
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
export default connect(mapStateToProps)(Registration);
