import React, { Component } from "react";
import classNames from "classnames";
import waterfall from "async-waterfall";
import validator from "validator";
import { connect } from "react-redux";
import {
  getAllTeachersApi,
  getPasswordApi,
  editTeacherApi,
  declineTeacherApi,
  approveTeacherApi,
  registerApi,
  changeRole
} from "../services/api";
import { Card } from "./";
import eye from "../assets/icons/eye.svg";
import emptyLogo from "../assets/logo/SVG/logo-empty.svg";
import { Regex, getUserByIdfromList } from "../services/Constants";
import { getTranslations } from "../services/";

class ManageTeachers extends Component {
  constructor() {
    super();
    this.unApprovedTextChange = this.unApprovedTextChange.bind(this);
    this.approvedTextChange = this.approvedTextChange.bind(this);
    this.passwordToggle = this.passwordToggle.bind(this);
    this.handleEditPasswordChange = this.handleEditPasswordChange.bind(this);
    this.handleEditEmailChange = this.handleEditEmailChange.bind(this);
    this.selectApprovedCard = this.selectApprovedCard.bind(this);
    this.editSubmit = this.editSubmit.bind(this);
    this.register = this.register.bind(this);
    this.filterList = this.filterList.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.unApproveFilterList = this.unApproveFilterList.bind(this);
    this.displaySelectedTeacherDetail = this.displaySelectedTeacherDetail.bind(
      this
    );
    this.mounted = false;
    this.state = {
      teacherList: [
        {
          name: "Leonardo da Vinci",
          disceplines: [
            { value: "art", label: "art" },
            { value: "astronomy", label: "astronomy" },
            { value: "history of Italy", label: "history of Italy" }
          ],
          email: "greatleobetterthandicaprio@truth.com",
          phone: "+380987654321",
          role: "teacher",
          status: true
        },
        {
          name: "Tony Stark",
          disceplines: [
            { value: "art", label: "art" },
            { value: "astronomy", label: "astronomy" },
            { value: "history of Italy", label: "history of Italy" }
          ],
          email: "tonystark@starkindustry.com",
          phone: "+380987654321",
          role: "teacher",
          status: false
        }
      ],
      showPassword: false,
      approvedTeacherList: [],
      unapprovedTeacherList: [],
      approvedTeacherListDisplay: [],
      unapprovedTeacherListDisplay: [],
      editEmail: "",
      editEmailIsValid: null,
      editEmailErr: "",
      editPassword: "",
      editPasswordIsValid: null,
      editPasswordErr: "",
      unapprovedText: "",
      approvedText: "",
      isSelected: false,
      selectedTeacher: {},
      isLoading: false,
      showModal: false,
      modalData: {},
      isSmallLoading: false
    };
  }
  componentDidMount() {
    this.getTeachers();
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
    if (
      // !validator.isEmail(email)
      !Regex.email.test(email)
      // !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)
      // !/^\\w+([\\.-]?\\w+)+@\\w+([\\.:]?\w+)+(\\.[a-zA-Z0-9]{2,3})+$/.test(email)
      // !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)
    ) {
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

  displaySelectedTeacherDetail(email) {
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
          {
            editPassword: resJson.password ? resJson.password : "",
            isSmallLoading: false
          },
          () => {
            this.validatePassword(
              this.state.editPassword,
              "editPasswordErr",
              "editPasswordIsValid"
            );
          }
        );
      })
      .catch(err => {
        console.error(err);
        this.setState({
          isSmallLoading: false
        });
      });
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
  changeUserRole(role, email) {
    changeRole(role, email)
      .then(res => res.json())
      .then(resJson => {
        console.log({ resJson });
        this.getTeachers();
        this.setState({
          editEmail: "",
          editEmailIsValid: null,
          editPassword: "",
          editPasswordIsValid: null,
          selectApprovedCard: {}
        });
      });
  }
  renderTeachersInCards(arr, aproved) {
    const { langauge } = this.props;
    const langData = getTranslations(langauge, "labels");
    return arr.map((el, index) => {
      const {
        selectedTeacher: { id: selectedId }
      } = this.state;
      const { firstName, lastName, email, phone, role, status } = el;
      const { selectedTeacher } = this.state;
      const btnsetting = (name, role, selectedUserKey) => {
        let selectedThis = false;
        if (selectedTeacher !== null) {
          selectedThis = selectedTeacher.id === selectedUserKey;
        }
        return {
          "btn-secondary": role === name && !selectedThis,
          "btn-light": role === name && selectedThis,
          "btn-outline-secondary": role !== name && !selectedThis,
          "btn-outline-light": role !== name && selectedThis
        };
      };
      if (!aproved && status === "Declined") {
        return (
          <div
            key={index}
            className="user-card unapproved text-secondary font-ar"
          >
            <div className="user-card-info">
              <div className="user-card-name">
                <p className="h5 font-weight-bold">
                  {firstName + " " + lastName}
                </p>
                <p className="small-info font-tin font-italic">
                  {/* {disceplines.map((dis, index) => {
                    return index < disceplines.length - 1
                      ? `${dis.label}, `
                      : dis.label;
                  })} */}
                </p>
              </div>
              <div className="user-card-email font-weight-bold">
                <p>{email}</p>
                <p>{phone}</p>
              </div>
            </div>
            <div className="user-card-role">
              <span
                onClick={() => {
                  this.approveTeacher(email);
                }}
                className={"btn small btn-small-1 btn-green"}
              >
                {langData && langData.approve}
              </span>
              <span
                onClick={() => {
                  this.declineTeacher(email);
                }}
                className={"btn small btn-small-1 btn-red"}
              >
                {langData && langData.decline}
              </span>
            </div>
          </div>
        );
      }
      if (aproved && status) {
        return (
          <div
            key={index}
            className={classNames("user-card font-ar", {
              "text-white bg-secondary": selectedId === el.id,
              "text-secondary": selectedId !== el.id
            })}
            onClick={() => {
              this.selectApprovedCard(el);
            }}
          >
            <div className="user-card-info">
              <div className="user-card-name">
                <p className="h5 font-weight-bold">
                  {firstName + " " + lastName}
                </p>
                <p className="small-info font-tin font-italic">
                  {/* {disceplines.map((dis, index) => {
                    return index < disceplines.length - 1
                      ? `${dis.label}, `
                      : dis.label;
                  })} */}
                </p>
              </div>
              <div className="user-card-email font-weight-bold">
                <p>{email}</p>
                <p>{phone}</p>
              </div>
            </div>
            <div className="user-card-role">
              <span
                className={classNames(
                  "btn small btn-small-1 ",
                  btnsetting("admin", role, el.id)
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
                  btnsetting("teacher", role, el.id)
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
                  btnsetting("parent", role, el.id)
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
      }

      return null;
    });
  }
  filterList(approve = true) {
    const { approvedTeacherList, approvedText } = this.state;
    let users = []; //= adminList
    let userList = approvedTeacherList;
    let query = approvedText;
    let display = "approvedTeacherListDisplay";
    userList.map(el => {
      let item = el;
      item.fullName = `${el.firstName} ${el.lastName} ${el.email}`; //el.firstName + " " + el.lastName;
      users.push(item);
      return null;
    });
    users = users.filter(function(user) {
      return user.fullName.toLowerCase().indexOf(query.toLowerCase()) !== -1; // returns true or false
    });
    this.setState({ approvedTeacherListDisplay: users });
    console.log(display);
  }
  unApproveFilterList(approve = true) {
    const { unapprovedTeacherList, unapprovedText } = this.state;
    let users = []; //= adminList
    let userList = unapprovedTeacherList;
    let query = unapprovedText;
    userList.map(el => {
      let item = el;
      item.fullName = `${el.firstName} ${el.lastName} ${el.email}`; //el.firstName + " " + el.lastName;
      users.push(item);
      return null;
    });
    users = users.filter(function(user) {
      return user.fullName.toLowerCase().indexOf(query.toLowerCase()) !== -1; // returns true or false
    });
    this.setState({ unapprovedTeacherListDisplay: users });
  }
  getTeachers(cb) {
    getAllTeachersApi()
      .then(res => res.json())
      .then(resJson => {
        console.log(resJson);
        const { status, Unverified, verified } = resJson;

        if (status) {
          // varifiedTeacher = verified;
          // unvarifiedTeacher = Unverified;
          if (verified.constructor === Array) {
            this.setState(
              {
                approvedTeacherList: verified
              },
              () => {
                this.filterList();
                if (typeof cb === "function") {
                  cb();
                }
              }
            );
          }
          if (Unverified.constructor === Array) {
            this.setState(
              {
                unapprovedTeacherList: Unverified
              },
              () => {
                console.log(Unverified);
                this.unApproveFilterList(false);
              }
            );
          }
        }
      })
      .catch(err => console.log(err));
  }
  approveTeacher(teacherEmail) {
    approveTeacherApi({
      email: teacherEmail
    })
      .then(res => res.json())
      .then(resJson => {
        console.log(resJson);
        this.getTeachers();
      })
      .catch(err => console.error(err));
  }
  declineTeacher(teacherEmail) {
    declineTeacherApi({
      email: teacherEmail
    })
      .then(res => res.json())
      .then(resJson => {
        console.log(resJson);
        this.getTeachers();
      })
      .catch(err => console.error(err));
  }
  unApprovedTextChange(event) {
    this.setState({ unapprovedText: event.target.value }, () => {
      this.unApproveFilterList();
    });
  }
  approvedTextChange(event) {
    this.setState({ approvedText: event.target.value }, () => {
      this.filterList();
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
  selectApprovedCard(key) {
    const { selectedTeacher } = this.state;
    if (selectedTeacher.id === key.id) {
      this.setState({
        selectedTeacher: {},
        editEmail: "",
        editPassword: "",
        editEmailErr: "",
        editPasswordErr: "",
        editEmailIsValid: null,
        editPasswordIsValid: null
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
            console.log();
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
        selectedTeacher: key,
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
            this.getTeachers();
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
  editSubmit(email, newemail, password) {
    const { selectedTeacher } = this.state;
    this.setState({
      isSmallLoading: true
    });
    editTeacherApi({
      email,
      newemail,
      password
    })
      .then(res => res.json())
      .then(resJson => {
        console.log({ resJson });
        this.getTeachers(() => {
          console.log({ state: this.state });
          let passedEmail = getUserByIdfromList(
            this.state.approvedTeacherList,
            selectedTeacher._id
          ).email;
          this.displaySelectedTeacherDetail(passedEmail);
        });
      })
      .catch(err => {
        console.log({ err });
        let passedEmail = getUserByIdfromList(
          this.state.approvedTeacherList,
          selectedTeacher._id
        ).email;
        this.displaySelectedTeacherDetail(passedEmail);
      });
  }
  handleSubmit(mode) {
    const {
      editEmail,
      editPassword,
      selectedTeacher,
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
            this.register("teacher", editEmail, editPassword);
          } else {
            this.editSubmit(selectedTeacher.email, editEmail, editPassword);
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
  editTeacherForm(mode = "create") {
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
          <label className="label" htmlFor="edit-teacher-email">
            {langData && langData.email}
          </label>
          <input
            type="email"
            name="edit-teacher-email"
            id="edit-teacher-email"
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
          <label className="label" htmlFor="edit-teacher-password">
            {langData && langData.password}
          </label>
          <input
            name="edit-teacher-password"
            type={showPassword ? "text" : "password"}
            id="edit-teacher-password"
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
    const { langauge } = this.props;
    const langData = getTranslations(langauge, "labels");
    const {
      selectedTeacher,
      unApprovedText,
      approvedText,
      unapprovedTeacherListDisplay,
      approvedTeacherListDisplay,
      showModal,
      isSmallLoading
    } = this.state;
    let mode = selectedTeacher.id ? "edit" : "create";
    return (
      <div className="container-fluid ">
        <div className="row">
          <div className="col-lg-4 pt-2 pt-lg-0 pb-2 pb-lg-0">
            <Card
              title={langData && langData.newteachers}
              className="full-height-card"
            >
              <div className={"manage-card-inner-body"}>
                <div className={"inputs"}>
                  <label className="label" htmlFor="unapproved_user_search">
                    {langData && langData.searchuser}
                  </label>
                  <input
                    type="text"
                    name="unapproved_user_search"
                    id="unapproved_user_search"
                    className={"input"}
                    placeholder={langData && langData.enterNameHere}
                    value={unApprovedText}
                    onChange={this.unApprovedTextChange}
                  />
                </div>
                {unapprovedTeacherListDisplay &&
                  this.renderTeachersInCards(
                    unapprovedTeacherListDisplay,
                    false
                  )}
              </div>
            </Card>
          </div>
          <div className="col-lg-4 pt-2 pt-lg-0 pb-2 pb-lg-0">
            <Card
              title={langData && langData.teachers}
              className="full-height-card"
            >
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
                    placeholder={langData && langData.enterNameHere}
                    value={approvedText}
                    onChange={this.approvedTextChange}
                  />
                </div>
                {this.renderTeachersInCards(approvedTeacherListDisplay, true)}
              </div>
            </Card>
          </div>
          <div className="col-lg-4 pt-2 pt-lg-0 pb-2 pb-lg-0">
            <div
              className={classNames("card-shadow inner-form-card", {
                "has-spinner": isSmallLoading
              })}
            >
              {langData && (
                <h2 className="text-secondary text-center">
                  {selectedTeacher.id
                    ? langData.editteacher
                    : langData.createteacher}
                </h2>
              )}
              {this.editTeacherForm(mode)}
            </div>
          </div>
        </div>
        {showModal && this.renderPopUp()}
      </div>
    );
  }
}
const mapStateToProps = state => {
  return state;
};
export default connect(mapStateToProps)(ManageTeachers);
