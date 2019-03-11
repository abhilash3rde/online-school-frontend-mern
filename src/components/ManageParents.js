import React, { Component } from "react";
import classNames from "classnames";
import validator from "validator";
import waterfall from "async-waterfall";
import { connect } from "react-redux";
import {
  getAllParentsApi,
  getStudentsApi,
  getPasswordApi,
  editParentApi,
  getStudentPassword,
  createStudentApi,
  editStudentApi,
  registerApi,
  changePlan
} from "../services/api";
import { Card } from "./";
import eye from "../assets/icons/eye.svg";
import emptyLogo from "../assets/logo/SVG/logo-empty.svg";
import noChild from "../assets/icons/user-infoC.svg";
import child from "../assets/icons/user-blue.svg";
import whiteChild from "../assets/icons/user-white.svg";
import { Regex, getUserByIdfromList } from "../services/Constants";
import { getTranslations } from "../services/";

class ManageParents extends Component {
  constructor() {
    super();
    this.parentTextChange = this.parentTextChange.bind(this);
    this.studentTextChange = this.studentTextChange.bind(this);
    this.passwordToggle = this.passwordToggle.bind(this);
    this.passwordToggleStudent = this.passwordToggleStudent.bind(this);
    this.handleEditPasswordChange = this.handleEditPasswordChange.bind(this);
    this.handleEditEmailChange = this.handleEditEmailChange.bind(this);
    this.handleEditPasswordChangeStudent = this.handleEditPasswordChangeStudent.bind(
      this
    );
    this.handleEditEmailChangeStudent = this.handleEditEmailChangeStudent.bind(
      this
    );
    this.handleParentSubmit = this.handleParentSubmit.bind(this);
    this.handleStudentSubmit = this.handleStudentSubmit.bind(this);
    this.getStudent = this.getStudent.bind(this);
    this.selectParentCard = this.selectParentCard.bind(this);
    this.selectStudentCard = this.selectStudentCard.bind(this);
    this.editSubmitParent = this.editSubmitParent.bind(this);
    this.editSubmitStudent = this.editSubmitStudent.bind(this);
    this.filterParentList = this.filterParentList.bind(this);
    this.filterStudentList = this.filterStudentList.bind(this);
    this.validatePassword = this.validatePassword.bind(this);
    this.validateEmail = this.validateEmail.bind(this);
    this.displaySelectedParentDetail = this.displaySelectedParentDetail.bind(
      this
    );
    this.displaySelectedStudentDetail = this.displaySelectedStudentDetail.bind(
      this
    );
    this.state = {
      parentList: [],
      parentListDisplay: [],
      studentList: [],
      studentListDisplay: [],
      showPassword: false,
      showPasswordStudent: false,
      editEmail: "",
      editEmailIsValid: null,
      editEmailErr: "",
      editPassword: "",
      editPasswordIsValid: null,
      editPasswordErr: "",
      editEmailStudent: "",
      editEmailStudentIsValid: null,
      editEmailStudentErr: "",
      editPasswordStudent: "",
      editPasswordStudentIsValid: null,
      editPasswordStudentErr: "",
      parentText: "",
      studentText: "",
      isSelected: false,
      selectedParent: {},
      selectedStudent: {},
      isTeacherFormLoading: false,
      isStudentFormLoading: false
    };
  }
  componentDidMount() {
    this.getParents();
  }

  validateEmail(email, errMsg, validState) {
    console.log({ email, errMsg, validState });
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
      // !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)
      // !/^\\w+([\\.-]?\\w+)+@\\w+([\\.:]?\w+)+(\\.[a-zA-Z0-9]{2,3})+$/.test(email)
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

  changeStudentPlan(plan, email) {
    changePlan(plan, email)
      .then(res => res.json())
      .then(resJson => {
        console.log({ resJson });
        this.getStudent(this.state.selectedParent.email);
      });
  }
  renderTeachersInCards(arr, isStudent = false) {
    return arr.map((el, index) => {
      const { selectedParent, selectedStudent } = this.state;
      const { email, phoneNumber, id, _id, role, firstName, lastName } = el;
      const btnsetting = (name, role, selectedUserKey) => {
        let selectedThis = false;
        if (selectedStudent !== null) {
          selectedThis = selectedStudent._id === selectedUserKey;
        }
        return {
          "btn-secondary": role === name && !selectedThis,
          "btn-light": role === name && selectedThis,
          "btn-outline-secondary": role !== name && !selectedThis,
          "btn-outline-light": role !== name && selectedThis
        };
      };
      let childIcon = child,
        studentLenght = 0;
      if (selectedParent !== null) {
        childIcon = selectedParent.id === id ? whiteChild : child;
      }
      if (role === "parent") {
        studentLenght = el.students.length;
      }
      return (
        <div
          key={index}
          className={classNames("user-card  font-ar", {
            "text-white bg-secondary": isStudent
              ? selectedStudent._id === _id
              : selectedParent.id === id,
            "text-secondary": isStudent
              ? selectedStudent._id !== _id
              : selectedParent.id !== id
          })}
          onClick={() => {
            isStudent ? this.selectStudentCard(el) : this.selectParentCard(el);
          }}
        >
          <div className="user-card-info">
            <div className="user-card-name">
              <p className="h5 font-weight-bold">
                {firstName + " " + lastName}
              </p>
            </div>
            <div className="user-card-email font-weight-bold">
              <p>{email}</p>
              <p>{phoneNumber}</p>
            </div>
          </div>
          <div className="user-card-role has-student-icons">
            {!isStudent && (
              <div>
                <img
                  src={studentLenght > 0 ? childIcon : noChild}
                  className="children"
                  alt="stu"
                />
                <img
                  src={studentLenght > 1 ? childIcon : noChild}
                  className="children"
                  alt="stu"
                />
                <img
                  src={studentLenght > 2 ? childIcon : noChild}
                  className="children"
                  alt="stu"
                />
                <img
                  src={studentLenght > 3 ? childIcon : noChild}
                  className="children"
                  alt="stu"
                />
              </div>
            )}
            {isStudent && (
              <>
                <span
                  className={classNames(
                    "btn small btn-small-1 ",
                    btnsetting("Paid plan", el.package, el._id)
                  )}
                  onClick={e => {
                    // e.preventDefault()
                    e.stopPropagation();
                    this.changeStudentPlan("Paid plan", email);
                  }}
                >
                  Paid Plan
                </span>
                <span
                  className={classNames(
                    "btn small btn-small-1 ",
                    btnsetting("Free Plan", el.package, el._id)
                  )}
                  onClick={e => {
                    // e.preventDefault()
                    e.stopPropagation();
                    this.changeStudentPlan("Free Plan", email);
                  }}
                >
                  Free Plan
                </span>
              </>
            )}
          </div>
        </div>
      );
    });
  }
  filterParentList() {
    const { parentList, parentText: query } = this.state;
    let users = []; //= adminList
    parentList.map(el => {
      let item = el;
      item.fullName = `${el.firstName} ${el.lastName} ${el.email}`; // el.firstName + " " + el.lastName;
      users.push(item);
      return null;
    });
    users = users.filter(function(user) {
      return user.fullName.toLowerCase().indexOf(query.toLowerCase()) !== -1; // returns true or false
    });
    this.setState({ parentListDisplay: users });
  }

  filterStudentList() {
    const { studentList, studentText: query } = this.state;
    let users = []; //= adminList
    studentList.map(el => {
      let item = el;
      item.fullName = `${el.firstName} ${el.lastName} ${el.email}`; //el.firstName + " " + el.lastName;
      users.push(item);
      return null;
    });
    users = users.filter(function(user) {
      return user.fullName.toLowerCase().indexOf(query.toLowerCase()) !== -1; // returns true or false
    });
    this.setState({ studentListDisplay: users });
  }
  getParents(cb) {
    getAllParentsApi()
      .then(res => res.json())
      .then(resJson => {
        console.log(resJson);
        const { status, Unverified, verified } = resJson;

        if (status) {
          this.setState(
            {
              parentList: []
            },
            () => {
              console.log(resJson);
              if (Unverified.constructor === Array) {
                // this.setState()
                this.setState(
                  prevState => ({
                    parentList: [...prevState.parentList, ...Unverified]
                  }),
                  () => {
                    this.filterParentList();
                    if (typeof cb === "function") {
                      cb();
                    }
                  }
                );
              }
              if (verified.constructor === Array) {
                this.setState(
                  prevState => ({
                    parentList: [...prevState.parentList, ...verified]
                  }),
                  () => {
                    this.filterParentList();
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
  getStudent(parentId, cb) {
    getStudentsApi({
      email: parentId
    })
      .then(res => res.json())
      .then(resJson => {
        console.log({ resJson }, `student -> ${parentId}`);
        if (resJson.status) {
          if (resJson.students) {
            console.log(resJson.students[0].students);
            this.setState({ studentList: resJson.students[0].students }, () => {
              this.filterStudentList();
              if (typeof cb === "function") {
                cb();
              }
            });
          }
        }
      });
  }
  parentTextChange(event) {
    this.setState({ parentText: event.target.value }, () => {
      this.filterParentList();
    });
  }
  studentTextChange(event) {
    this.setState({ studentText: event.target.value }, () => {
      this.filterStudentList();
    });
  }
  passwordToggle() {
    this.setState(prevState => ({
      showPassword: !prevState.showPassword
    }));
  }
  passwordToggleStudent() {
    this.setState({ showPasswordStudent: !this.state.showPasswordStudent });
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
  handleEditPasswordChangeStudent(event) {
    this.setState({ editPasswordStudent: event.target.value }, () => {
      this.validatePassword(
        this.state.editPasswordStudent,
        "editPasswordStudentErr",
        "editPasswordStudentIsValid"
      );
    });
  }
  handleEditEmailChangeStudent(event) {
    this.setState({ editEmailStudent: event.target.value }, () => {
      this.validateEmail(
        this.state.editEmailStudent,
        "editEmailStudentErr",
        "editEmailStudentIsValid"
      );
    });
  }
  displaySelectedParentDetail(email) {
    this.setState({
      isTeacherFormLoading: true
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
            isTeacherFormLoading: false
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
          isTeacherFormLoading: false
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
  displaySelectedStudentDetail(email) {
    getStudentPassword({
      email
    })
      .then(res => res.json())
      .then(resJson => {
        this.setState(
          { editPasswordStudent: resJson.user ? resJson.user : "" },
          () => {
            this.validatePassword(
              this.state.editPasswordStudent,
              "editPasswordStudentErr",
              "editPasswordStudentIsValid"
            );
          }
        );
      });
    this.setState(
      {
        editEmailStudent: email
      },
      () => {
        this.validateEmail(
          this.state.editEmailStudent,
          "editEmailStudentErr",
          "editEmailStudentIsValid"
        );
      }
    );
  }
  selectParentCard(key) {
    console.log({ key });
    const { selectedParent } = this.state;
    if (selectedParent.id === key.id) {
      this.setState({
        selectedParent: {},
        selectedStudent: {},
        editEmail: "",
        editPassword: "",
        editEmailStudent: "",
        editPasswordStudent: "",
        editEmailErr: "",
        editEmailIsValid: null,
        editPasswordErr: "",
        editPasswordIsValid: null
      });
      return;
    }
    console.log("for password", key.email);
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
    this.getStudent(key.email);

    this.setState(
      {
        selectedParent: key,
        selectedStudent: {},
        editEmail: key.email,
        selectedStudent: {},
        editEmailStudent: "",
        editPasswordStudent: "",
        editEmailStudentErr: null,
        editPasswordStudentErr: null
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
  selectStudentCard(key) {
    const { selectedStudent } = this.state;
    if (selectedStudent._id === key._id) {
      this.setState({
        selectedStudent: {},
        editEmailStudent: "",
        editPasswordStudent: "",
        editPasswordStudentErr: "",
        editEmailStudentErr: "",
        editPasswordStudentIsValid: null,
        editEmailStudentIsValid: null
      });
      return;
    }
    getStudentPassword({
      email: key.email
    })
      .then(res => res.json())
      .then(resJson => {
        // console.log({resJson}, "student password");
        this.setState(
          { editPasswordStudent: resJson.user ? resJson.user : "" },
          () => {
            this.validatePassword(
              this.state.editPasswordStudent,
              "editPasswordStudentErr",
              "editPasswordStudentIsValid"
            );
          }
        );
      });
    this.setState(
      {
        selectedStudent: key,
        editEmailStudent: key.email
      },
      () => {
        this.validateEmail(
          this.state.editEmailStudent,
          "editEmailStudentErr",
          "editEmailStudentIsValid"
        );
      }
    );
  }

  register(role, email, password, parentEmail) {
    console.log({
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
        email,
        password,
        role
      };
      if (role === "student") {
        bodyString.parentname = parentEmail;
        console.log({ bodyString });
        createStudentApi(bodyString)
          .then(res => res.json())
          .then(resJson => {
            console.log("user created", resJson);

            if (resJson.status) {
              this.getParents();
              this.setState(
                {
                  modalData: {
                    title: "Success",
                    msg: `${role} is created`
                  }
                },
                () => {
                  this.getStudent(parentEmail);
                }
              );
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
      } else {
        registerApi(bodyString)
          .then(res => res.json())
          .then(resJson => {
            console.log("user created", resJson);

            if (resJson.status) {
              this.getParents();
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
      }

      this.setState({ isLoading: false });
    });
  }
  editSubmitParent(email, newemail, password) {
    this.setState({
      isTeacherFormLoading: true
    });
    const { selectedParent } = this.state;
    editParentApi({
      email,
      newemail,
      password
    })
      .then(res => res.json())
      .then(resJson => {
        console.log({ resJson });
        this.getParents(() => {
          let passedEmail = getUserByIdfromList(
            this.state.parentList,
            selectedParent._id
          ).email;
          this.displaySelectedParentDetail(passedEmail);
        });
      })
      .catch(err => {
        console.log({ err });
        this.getParents(() => {
          let passedEmail = getUserByIdfromList(
            this.state.parentList,
            selectedParent._id
          ).email;
          this.displaySelectedParentDetail(passedEmail);
        });
      });
  }
  handleParentSubmit(mode) {
    const {
      editEmailIsValid,
      editPasswordIsValid,
      editEmail,
      editPassword,
      selectedParent
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
            this.register("parent", editEmail, editPassword);
          } else {
            this.editSubmitParent(
              selectedParent.email,
              editEmail,
              editPassword
            );
          }
          this.setState({
            editEmail: "",
            editPassword: "",
            selectedStudent: {},
            editEmailStudent: "",
            editPasswordStudent: "",
            editEmailStudentIsValid: null,
            editPasswordStudentIsValid: null,
            editEmailIsValid: null,
            editPasswordIsValid: null
          });
        }
      }
    ]);
  }
  handleStudentSubmit(mode) {
    const {
      editEmailStudentIsValid,
      editPasswordStudentIsValid,
      editEmailStudent,
      editPasswordStudent,
      selectedParent,
      selectedStudent
    } = this.state;
    waterfall([
      done => {
        this.validateEmail(
          editEmailStudent,
          "editEmailStudentErr",
          "editEmailStudentIsValid"
        );
        this.validatePassword(
          editPasswordStudent,
          "editPasswordStudentErr",
          "editPasswordStudentIsValid"
        );
        return done();
      },
      done => {
        if (editEmailStudentIsValid && editPasswordStudentIsValid) {
          if (mode === "create") {
            this.register(
              "student",
              editEmailStudent,
              editPasswordStudent,
              selectedParent.email
            );
          } else {
            this.editSubmitStudent(
              selectedStudent.email,
              editEmailStudent,
              editPasswordStudent
            );
          }
          this.setState({
            // selectedStudent: {},
            editEmailStudent: "",
            editPasswordStudent: "",
            editEmailStudentIsValid: null,
            editPasswordStudentIsValid: null
          });
        }
      }
    ]);
  }
  editSubmitStudent(email, newemail, password) {
    const { selectedParent, selectedStudent } = this.state;
    editStudentApi({
      email,
      newemail,
      password
    })
      .then(res => res.json())
      .then(resJson => {
        console.log({ resJson });
        this.getStudent(selectedParent.email, () => {
          let passedEmail = getUserByIdfromList(
            this.state.studentList,
            selectedStudent._id
          ).email;
          this.displaySelectedStudentDetail(passedEmail);
        });
      })
      .catch(err => {
        console.log({ err });
        this.getStudent(selectedParent.email, () => {
          let passedEmail = getUserByIdfromList(
            this.state.studentList,
            selectedStudent._id
          ).email;
          this.displaySelectedStudentDetail(passedEmail);
        });
      });
  }
  editParentForm(mode = "create") {
    const { langauge } = this.props;
    const langData = getTranslations(langauge, "labels");
    const {
      showPassword,
      editEmail,
      editPassword,
      editEmailErr,
      editEmailIsValid,
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
            type={showPassword ? "text" : "password"}
            name="edit-teacher-password"
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

        <div className="text-center pt-3">
          <button
            onClick={e => {
              e.stopPropagation();
              this.handleParentSubmit(mode);
            }}
            className="btn btn-primary btn-w-1"
          >
            {langData && langData.save}
          </button>
        </div>
      </div>
    );
  }
  editStudentForm(mode = "create") {
    const { langauge } = this.props;
    const langData = getTranslations(langauge, "labels");
    const {
      showPasswordStudent,
      editEmailStudent,
      editPasswordStudent,
      editEmailStudentIsValid,
      editEmailStudentErr,
      editPasswordStudentIsValid,
      editPasswordStudentErr
    } = this.state;
    return (
      <div>
        <div
          className={classNames("inputs", {
            "has-errors": editEmailStudentIsValid === false
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
            value={editEmailStudent}
            onChange={this.handleEditEmailChangeStudent}
          />
          {editEmailStudentIsValid === false && (
            <span className="error-msg">{editEmailStudentErr}</span>
          )}
        </div>
        <div
          className={classNames("inputs", {
            "has-errors": editPasswordStudentIsValid === false
          })}
        >
          <label className="label" htmlFor="edit-teacher-password">
            {langData && langData.password}
          </label>
          <input
            type={showPasswordStudent ? "text" : "password"}
            name="edit-teacher-password"
            id="edit-teacher-password"
            className={classNames("input", {})}
            placeholder="pa$$\/\/0rd"
            value={editPasswordStudent}
            onChange={this.handleEditPasswordChangeStudent}
          />
          <span
            className={classNames("password-tgl", {
              show: showPasswordStudent
            })}
            onClick={this.passwordToggleStudent}
          >
            <img src={eye} alt="eye" className="img-fluid" />
          </span>
          {editPasswordStudentIsValid === false && (
            <span className="error-msg">{editPasswordStudentErr}</span>
          )}
        </div>

        <div className="text-center pt-3">
          <button
            className="btn btn-primary btn-w-1"
            onClick={e => {
              e.stopPropagation();
              this.handleStudentSubmit(mode);
            }}
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
      parentText,
      studentText,
      parentListDisplay,
      selectedParent: { id: parentId, students: studentArr },
      selectedStudent: { _id: studentId },
      studentListDisplay,
      studentList,
      showModal,
      isStudentFormLoading,
      isTeacherFormLoading
    } = this.state;
    let parentRole = parentId ? "edit" : "create";
    let studentRole = studentId ? "edit" : "create";
    return (
      <div className="container-fluid ">
        <div className="row">
          <div className="col-lg-4 pt-2 pt-lg-0 pb-2 pb-lg-0">
            <Card
              title={langData && langData.parents}
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
                    value={parentText}
                    onChange={this.parentTextChange}
                  />
                </div>
                {this.renderTeachersInCards(parentListDisplay)}
              </div>
            </Card>
          </div>
          <div className="col-lg-4 pt-2 pt-lg-0 pb-2 pb-lg-0">
            <Card
              title={langData && langData.students}
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
                    value={studentText}
                    onChange={this.studentTextChange}
                  />
                </div>
                {parentId &&
                  this.renderTeachersInCards(studentListDisplay, true)}
              </div>
            </Card>
          </div>
          <div className="col-lg-4 pt-2 pt-lg-0 pb-2 pb-lg-0">
            <div
              className={classNames("card-shadow mt-4 inner-form-card", {
                "has-spinner": isTeacherFormLoading
              })}
            >
              {langData && (
                <h2
                  onClick={() => {
                    console.log(this.state.studentId, studentList);
                  }}
                  className="text-secondary text-center"
                >
                  {parentId ? langData.editparent : langData.createparent}
                </h2>
              )}
              {this.editParentForm(parentRole)}
            </div>
            {parentId && (studentId || studentList.length < 4) && (
              <div className="pt-2">
                <div
                  className={classNames("card-shadow mt-4 inner-form-card", {
                    "has-spinner": isStudentFormLoading
                  })}
                >
                  {langData && (
                    <h2 className="text-secondary text-center">
                      {studentId
                        ? langData.editstudent || "Edit Student"
                        : langData.createstudent || "Create Student"}
                    </h2>
                  )}
                  {this.editStudentForm(studentRole)}
                </div>
              </div>
            )}
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
export default connect(mapStateToProps)(ManageParents);
