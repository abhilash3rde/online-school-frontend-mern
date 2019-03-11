import React, { Component } from "react";
import classNames from "classnames";
import validator from "validator";
import waterfall from "async-waterfall";
import { connect } from "react-redux";
import { Card } from "./";
import {
  getPasswordApi,
  getAllAdminsApi,
  editAdminApi,
  registerApi,
  changeRole
} from "../services/api";
import eye from "../assets/icons/eye.svg";
import emptyLogo from "../assets/logo/SVG/logo-empty.svg";
import { Regex, getUserByIdfromList } from "../services/Constants";
import { getTranslations } from "../services/";

class ManageAdmins extends Component {
  constructor() {
    super();
    this.selectCard = this.selectCard.bind(this);
    this.handleEditPasswordChange = this.handleEditPasswordChange.bind(this);
    this.handleEditEmailChange = this.handleEditEmailChange.bind(this);
    this.handleAdminSearchChange = this.handleAdminSearchChange.bind(this);
    this.passwordToggle = this.passwordToggle.bind(this);
    this.filterList = this.filterList.bind(this);
    this.editSubmit = this.editSubmit.bind(this);
    this.displaySelectedAdminDetail = this.displaySelectedAdminDetail.bind(
      this
    );
    this.state = {
      adminList: [
        // {
        //   name: "Tony Stark",
        //   id: "admin1",
        //   info: "tonystark_admin1",
        //   email: "tonystark@starkindustry.com",
        //   phone: "+380987654321",
        //   role: "admin"
        // },
        // {
        //   name: "Tony Stark",
        //   id: "admin2",
        //   info: "tonystark_admin1",
        //   email: "tonystark@starkindustry.com",
        //   phone: "+380987654321",
        //   role: "admin"
        // }
      ],
      adminListDisplay: [],
      selectedUser: {},
      showPassword: false,
      editEmail: "",
      editEmailIsValid: null,
      editEmailErr: "",
      editPassword: "",
      editPasswordIsValid: null,
      editPasswordErr: "",
      adminSearch: "",
      isLoading: false,
      showModal: false,
      modalData: {},
      isSmallLoading: false
    };
  }
  componentDidMount() {
    this.getAdmins();
  }

  validateEmail(email, errMsg, validState) {
    // console.log({email, errMsg, validState})
    if (email === "") {
      this.setState({
        [errMsg]: "empty",
        [validState]: false
      });
      return;
    }
    if (!Regex.email.test(email)) {
      this.setState({
        [errMsg]: "Sorry, wrong email",
        [validState]: false
      });
      return;
    }
    this.setState({
      [errMsg]: "",
      [validState]: true
    });
  }
  validatePassword(password, errMsg, validState) {
    if (password === "") {
      this.setState({
        [errMsg]: "empty",
        [validState]: false
      });
      return;
    }
    this.setState({
      [errMsg]: "",
      [validState]: true
    });
  }
  displaySelectedAdminDetail(email) {
    this.setState({
      isSmallLoading: true
    });
    getPasswordApi({
      email
    })
      .then(res => res.json())
      .then(resJson => {
        console.log(resJson);
        this.setState(
          { editPassword: resJson.password ? resJson.password : "" },
          () => {
            this.setState({
              isSmallLoading: false
            });
            this.validatePassword(
              this.state.editPassword,
              "editPasswordErr",
              "editPasswordIsValid"
            );
          }
        );
      })
      .catch(err => console.error(err));
    this.setState(
      {
        editEmail: email
      },
      () => {
        this.validateEmail(
          this.state.editEmail,
          "editEmailErr",
          "editEmailIsValid"
        );
      }
    );
  }
  selectCard(key) {
    const { selectedUser } = this.state;
    if (selectedUser.id === key.id) {
      this.setState({
        selectedUser: {},
        editPassword: "",
        editPasswordIsValid: null,
        editPasswordErr: "",
        editEmail: "",
        editEmailIsValid: null,
        editEmailErr: ""
      });
      return;
    }
    getPasswordApi({
      email: key.email
    })
      .then(res => res.json())
      .then(resJson => {
        console.log(resJson);
        this.setState(
          { editPassword: resJson.password ? resJson.password : "" },
          () => {
            this.validatePassword(
              this.state.editPassword,
              "editPasswordErr",
              "editPasswordIsValid"
            );
          }
        );
      })
      .catch(err => console.error(err));
    this.setState(
      {
        selectedUser: key,
        editEmail: key.email
      },
      () => {
        this.validateEmail(
          this.state.editEmail,
          "editEmailErr",
          "editEmailIsValid"
        );
      }
    );
  }
  filterList() {
    const { adminList, adminSearch: query } = this.state;
    let users = []; //= adminList
    adminList.map(el => {
      let item = el;
      item.fullName = `${el.firstName} ${el.lastName} ${el.email}`; //el.firstName + " " + el.lastName;
      users.push(item);
      return null;
    });
    users = users.filter(function(user) {
      return user.fullName.toLowerCase().indexOf(query.toLowerCase()) !== -1; // returns true or false
    });
    this.setState({ adminListDisplay: users });
  }
  getAdmins(cb) {
    getAllAdminsApi()
      .then(res => res.json())
      .then(resJson => {
        console.log(resJson);
        const { status, Unverified, verified } = resJson;

        if (status) {
          console.log(resJson);
          this.setState(
            {
              adminList: []
            },
            () => {
              if (Unverified.constructor === Array) {
                // this.setState()
                this.setState(
                  prevState => ({
                    adminList: [...prevState.adminList, ...Unverified]
                  }),
                  () => {
                    this.filterList();
                    if (typeof cb === "function") {
                      cb();
                    }
                  }
                );
              }
              if (verified.constructor === Array) {
                this.setState(
                  prevState => ({
                    adminList: [...prevState.adminList, ...verified]
                  }),
                  () => {
                    this.filterList();
                    if (typeof cb === "function") {
                      cb();
                    }
                  }
                );
              }
            }
          );
        }
      })
      .catch(err => console.log(err));
  }
  changeUserRole(role, email) {
    changeRole(role, email)
      .then(res => res.json())
      .then(resJson => {
        console.log({ resJson });
        this.getAdmins();
        this.setState({
          editEmail: "",
          editEmailIsValid: null,
          editPassword: "",
          editPasswordIsValid: null,
          selectCard: {}
        });
      });
  }
  renderAdminInCards(arr) {
    const { langauge } = this.props;
    const langData = getTranslations(langauge, "labels");
    return arr.map((el, index) => {
      const { info, email, phoneNumber, role, id, firstName, lastName } = el;
      const { selectedUser } = this.state;
      const btnsetting = (name, role, selectedUserKey) => {
        let selectedThis = false;
        if (selectedUser !== null) {
          selectedThis = selectedUser.id === selectedUserKey;
        }
        return {
          "btn-secondary": role === name && !selectedThis,
          "btn-light": role === name && selectedThis,
          "btn-outline-secondary": role !== name && !selectedThis,
          "btn-outline-light": role !== name && selectedThis
        };
      };
      return (
        <div
          key={index}
          className={classNames("user-card  font-ar", {
            "text-white bg-secondary": selectedUser.id === id,
            "text-secondary": selectedUser.id !== id
          })}
          onClick={() => {
            this.selectCard(el);
          }}
        >
          <div className="user-card-info">
            <div className="user-card-name">
              <p className="h5 font-weight-bold">
                {firstName + " " + lastName}
              </p>
              <p className="small-info font-tin font-italic">{info}</p>
            </div>
            <div className="user-card-email font-weight-bold">
              <p>{email}</p>
              <p>{phoneNumber}</p>
            </div>
          </div>
          <div className="user-card-role">
            <span
              className={classNames(
                "btn small btn-small-1 ",
                btnsetting("admin", role, id)
              )}
              onClick={e => {
                // e.preventDefault();
                e.stopPropagation();
                this.changeUserRole("admin", email);
              }}
            >
              {langData && langData.admin}
            </span>
            <span
              className={classNames(
                "btn small btn-small-1 ",
                btnsetting("teacher", role, id)
              )}
              onClick={e => {
                // e.preventDefault();
                e.stopPropagation();
                this.changeUserRole("teacher", email);
              }}
            >
              {langData && langData.teacher}
            </span>
            <span
              className={classNames(
                "btn small btn-small-1 ",
                btnsetting("parent", role, id)
              )}
              onClick={e => {
                // e.preventDefault();
                e.stopPropagation();
                this.changeUserRole("parent", email);
              }}
            >
              {langData && langData.parent}
            </span>
          </div>
        </div>
      );
    });
  }

  passwordToggle() {
    this.setState(prevState => ({
      showPassword: !prevState.showPassword
    }));
  }
  handleEditPasswordChange(event) {
    this.setState({ editPassword: event.target.value }, () => {
      this.validatePassword(
        this.state.editPassword,
        "editPasswordErr",
        "editPasswordIsValid"
      );
    });
  }
  handleEditEmailChange(event) {
    this.setState({ editEmail: event.target.value }, () => {
      this.validateEmail(
        this.state.editEmail,
        "editEmailErr",
        "editEmailIsValid"
      );
    });
  }
  handleAdminSearchChange(event) {
    this.setState({ adminSearch: event.target.value }, () => {
      this.filterList();
    });
  }
  editSubmit(email, newemail, password) {
    const { selectedUser } = this.state;
    this.setState({
      isSmallLoading: true
    });
    editAdminApi({
      email,
      newemail,
      password
    })
      .then(res => res.json())
      .then(resJson => {
        this.getAdmins(() => {
          console.log(
            "callback",
            getUserByIdfromList(this.state.adminList, selectedUser._id).email
          );
          let passedEmail = getUserByIdfromList(
            this.state.adminList,
            selectedUser._id
          ).email;
          this.displaySelectedAdminDetail(passedEmail);
        });
      })
      .catch(err => {
        console.log({ err });
        this.getAdmins(() => {
          let passedEmail = getUserByIdfromList(
            this.state.adminList,
            selectedUser._id
          ).email;
          this.displaySelectedAdminDetail(passedEmail);
        });
      });
  }

  register(role, email, password) {
    console.log({
      role,
      email,
      password
    });
    this.setState({ isLoading: true, showModal: true }, () => {
      if (
        !(
          role === "admin" ||
          role === "parent" ||
          role === "student" ||
          role === "teacher"
        )
      ) {
        console.log("wrong role");
        this.setState({ isLoading: false });
        return;
      }
      let bodyString = {
        role,
        email,
        password
      };
      registerApi(bodyString)
        .then(res => res.json())
        .then(resJson => {
          console.log("user created", resJson);
          if (resJson.status) {
            this.getAdmins();
            this.setState({
              modalData: {
                title: "Success",
                msg: `${role} is created`
              }
            });
          } else {
            if (resJson.error) {
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
        });

      this.setState({ isLoading: false });
    });
  }

  handleSubmit(mode) {
    const {
      editEmail,
      editPassword,
      selectedUser,
      editPasswordIsValid,
      editEmailIsValid
    } = this.state;
    waterfall([
      done => {
        this.validateEmail(editEmail, "editEmailErr", "editEmailIsValid");
        this.validatePassword(
          editPassword,
          "editPasswordErr",
          "editPasswordIsValid"
        );
        return done();
      },
      done => {
        if (editEmailIsValid && editPasswordIsValid) {
          if (mode === "create") {
            this.register("admin", editEmail, editPassword);
          } else {
            this.editSubmit(selectedUser.email, editEmail, editPassword);
          }
          this.setState({
            editEmail: "",
            editPassword: "",
            editEmailIsValid: null,
            editPasswordIsValid: null
          });
        }
      }
    ]);
  }
  editAdminForm(mode = "create") {
    const { langauge } = this.props;
    const langData = getTranslations(langauge, "labels");
    const {
      showPassword,
      editEmail,
      editPassword,
      editEmailIsValid,
      editEmailErr,
      editPasswordIsValid,
      editPasswordErr
    } = this.state;
    return (
      <div>
        <div
          className={classNames("inputs", {
            "has-errors": editEmailIsValid === false
          })}
        >
          <label className="label" htmlFor="edit-admin-email">
            {langData && langData.email}
          </label>
          <input
            type="email"
            name="edit-admin-email"
            id="edit-admin-email"
            className={classNames("input", {})}
            placeholder="example@mail.com"
            value={editEmail}
            onChange={this.handleEditEmailChange}
          />
          {editEmailIsValid === false && (
            <span className="error-msg">{editEmailErr}</span>
          )}
        </div>
        <div
          className={classNames("inputs", {
            "has-errors": editPasswordIsValid === false
          })}
        >
          <label className="label" htmlFor="edit-admin-password">
            {langData && langData.password}
          </label>
          <input
            type={showPassword ? "text" : "password"}
            name="edit-admin-password"
            id="edit-admin-password"
            className={classNames("input", {})}
            placeholder="pa$$\/\/0rd"
            value={editPassword}
            onChange={this.handleEditPasswordChange}
          />
          <span
            className={classNames("password-tgl", {
              show: showPassword
            })}
            onClick={this.passwordToggle}
          >
            <img src={eye} alt="eye" className="img-fluid" />
          </span>
          {editPasswordIsValid === false && (
            <span className="error-msg">{editPasswordErr}</span>
          )}
        </div>

        <div className="text-center mt-5 pt-3">
          <button
            onClick={e => {
              e.stopPropagation();
              this.handleSubmit(mode);
              // if (mode === "create") {
              //   this.register("admin", editEmail, editPassword);
              //   this.setState({
              //     editEmail: "",
              //     editPassword: ""
              //   });
              //   return;
              // }
              // this.editSubmit(selectedUser.email, editEmail, editPassword);
              // this.setState({
              //   editEmail: "",
              //   editPassword: ""
              // });
            }}
            className="btn btn-primary btn-w-1"
          >
            {langData && langData.save}
          </button>
        </div>
      </div>
    );
  }
  renderPopUp() {
    const { isLoading, modalData, showModal } = this.state;
    return (
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
    );
  }
  render() {
    const langData = getTranslations(this.props.langauge, "labels");
    console.log({ langData });
    const {
      selectedUser,
      adminListDisplay,
      adminSearch,
      showModal,
      isSmallLoading
    } = this.state;
    let mode = selectedUser.id ? "edit" : "create";
    return (
      <div className="container-fluid ">
        <div className="row align-items-center">
          <div className="col-lg-5 col-xl-4 pt-2 pt-lg-0 pb-2 pb-lg-0">
            <Card title={langData.admin} className="full-height-card">
              <div>
                <div className={"inputs"}>
                  <label className="label" htmlFor="user_search">
                    {langData && langData.searchuser}
                  </label>
                  <input
                    type="text"
                    name="user_search"
                    id="user_search"
                    className={"input"}
                    placeholder={`${langData.enterNameHere}...`}
                    value={adminSearch}
                    onChange={this.handleAdminSearchChange}
                  />
                </div>
                {/* {this.renderAdminInCards(adminList)} */}
                {this.renderAdminInCards(adminListDisplay)}
              </div>
            </Card>
          </div>
          <div className="col-lg-7 col-xl-8 pt-2 pt-lg-0 pb-2 pb-lg-0">
            <div
              className={classNames("card-shadow inner-form-card", {
                "has-spinner": isSmallLoading
              })}
            >
              {langData && (
                <h2 className="text-secondary text-center">
                  {selectedUser.id ? langData.editAdmin : langData.createAdmin}
                </h2>
              )}
              {this.editAdminForm(mode)}
            </div>
          </div>
        </div>
        {showModal && this.renderPopUp()}
      </div>
    );
  }
}
const mapStateToProps = state => {
  // cpnms
  return state;
};
export default connect(mapStateToProps)(ManageAdmins);
