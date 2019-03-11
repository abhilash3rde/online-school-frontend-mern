import React, { Component } from "react";
import classNames from "classnames";
import { Card } from "./";
import eye from "../assets/icons/eye.svg";

export class ManageAdmins extends Component {
  constructor() {
    super();
    this.selectCard = this.selectCard.bind(this);
    this.handleEditPasswordChange = this.handleEditPasswordChange.bind(this);
    this.handleEditEmailChange = this.handleEditEmailChange.bind(this);
    this.state = {
      adminList: [
        {
          name: "Tony Stark",
          info: "tonystark_admin1",
          email: "tonystark@starkindustry.com",
          phone: "+380987654321",
          role: "admin"
        }
      ],
      isSelected: false,
      showPassword: false,
      editEmail: "",
      editPassword: ""
    };
  }
  selectCard() {
    this.setState(prevState => ({
      isSelected: !prevState.isSelected
    }));
  }
  renderAdminInCards(arr) {
    return arr.map((el, index) => {
      const { name, info, email, phone, role } = el;
      const { isSelected } = this.state;
      const btnsetting = (name, role, selected) => {
        return {
          "btn-secondary": role === name && !selected,
          "btn-light": role === name && selected,
          "btn-outline-secondary": role !== name && !selected,
          "btn-outline-light": role !== name && selected
        };
      };
      return (
        <div
          key={index}
          className={classNames("user-card  font-ar", {
            "text-white bg-secondary": isSelected,
            "text-secondary": !isSelected
          })}
          onClick={this.selectCard}
        >
          <div className="user-card-info">
            <div className="user-card-name">
              <p className="h5 font-weight-bold">{name}</p>
              <p className="small-info font-tin font-italic">{info}</p>
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
                btnsetting("admin", role, isSelected)
              )}
            >
              ADMIN
            </span>
            <span
              className={classNames(
                "btn small btn-small-1 ",
                btnsetting("teacher", role, isSelected)
              )}
            >
              TEACHER
            </span>
            <span
              className={classNames(
                "btn small btn-small-1 ",
                btnsetting("parent", role, isSelected)
              )}
            >
              PARENT
            </span>
          </div>
        </div>
      );
    });
  }

  handleEditPasswordChange(event) {
    this.setState({ editPassword: event.target.value });
  }
  handleEditEmailChange(event) {
    this.setState({ editEmail: event.target.value });
  }
  editAdminForm(mode) {
    const { showPassword, editEmail, editPassword } = this.state;
    return (
      <div>
        <div
          className={classNames("inputs", {
            "has-errors": false
          })}
        >
          <label className="label" htmlFor="edit-admin-email">
            Email
          </label>
          <input
            type="email"
            id="edit-admin-email"
            className={classNames("input", {})}
            placeholder="example@mail.com"
            value={editEmail}
            onChange={this.handleEditEmailChange}
          />
          {/*email_pf_isValid && (
          <span className="error-msg">{email_pf_errMsg}</span>
        )*/}
        </div>
        <div
          className={classNames("inputs", {
            "has-errors": false
          })}
        >
          <label className="label" htmlFor="edit-admin-password">
            Password
          </label>
          <input
            type={showPassword ? "text" : "password"}
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
          {/*email_pf_isValid && (
          <span className="error-msg">{email_pf_errMsg}</span>
        )*/}
        </div>

        <div className="text-center mt-5 pt-3">
          <button className="btn btn-primary btn-w-1">Save</button>
        </div>
      </div>
    );
  }
  render() {
    const { isSelected } = this.state;
    return (
      <div className="container-fluid ">
        <div className="row align-items-center">
          <div className="col-lg-4">
            <Card title="admin" className="full-height-card">
              <div>
                <div className={"inputs"}>
                  <label className="label" htmlFor="user_search">
                    Search user
                  </label>
                  <input
                    type="text"
                    id="user_search"
                    className={"input"}
                    placeholder="Enter name here..."
                    value={this.state.phone_tf}
                    onChange={this.handleTextChange}
                  />
                  {this.state.phone_tf_isValid && (
                    <span className="error-msg">
                      {this.state.phone_tf_errMsg}
                    </span>
                  )}
                </div>
                {this.renderAdminInCards(this.state.adminList)}
              </div>
            </Card>
          </div>
          <div className="col-lg-8">
            <div className="card-shadow inner-form-card">
              <h2 className="text-secondary text-center">
                {isSelected ? "Edit Admin" : "Create Admin"}
              </h2>
              {this.editAdminForm()}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export class ManageTeachers extends Component {
  constructor() {
    super();
    this.unApprovedTextChange = this.unApprovedTextChange.bind(this);
    this.approvedTextChange = this.approvedTextChange.bind(this);
    this.passwordToggle = this.passwordToggle.bind(this);
    this.handleEditPasswordChange = this.handleEditPasswordChange.bind(this);
    this.handleEditEmailChange = this.handleEditEmailChange.bind(this);
    this.selectApprovedCard = this.selectApprovedCard.bind(this);
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
      editEmail: "",
      editPassword: "",
      unApprovedText: "",
      approvedText: "",
      isSelected: false,
      selectedTeacher: {}
    };
  }

  renderTeachersInCards(arr, aproved) {
    return arr.map((el, index) => {
      const { isSelected } = this.state;
      const { name, email, phone, role, status, disceplines } = el;
      const btnsetting = (name, role, selected) => {
        return {
          "btn-secondary": role === name && !selected,
          "btn-light": role === name && selected,
          "btn-outline-secondary": role !== name && !selected,
          "btn-outline-light": role !== name && selected
        };
      };
      if (!aproved && !status) {
        return (
          <div
            key={index}
            className="user-card unapproved text-secondary font-ar"
          >
            <div className="user-card-info">
              <div className="user-card-name">
                <p className="h5 font-weight-bold">{name}</p>
                <p className="small-info font-tin font-italic">
                  {disceplines.map((dis, index) => {
                    return index < disceplines.length - 1
                      ? `${dis.label}, `
                      : dis.label;
                  })}
                </p>
              </div>
              <div className="user-card-email font-weight-bold">
                <p>{email}</p>
                <p>{phone}</p>
              </div>
            </div>
            <div className="user-card-role">
              <span className={"btn small btn-small-1 btn-green"}>APPROVE</span>
              <span className={"btn small btn-small-1 btn-red"}>DECLINE</span>
            </div>
          </div>
        );
      }
      if (aproved && status) {
        return (
          <div
            key={index}
            className={classNames("user-card font-ar", {
              "text-white bg-secondary": isSelected,
              "text-secondary": !isSelected
            })}
            onClick={this.selectApprovedCard}
          >
            <div className="user-card-info">
              <div className="user-card-name">
                <p className="h5 font-weight-bold">{name}</p>
                <p className="small-info font-tin font-italic">
                  {disceplines.map((dis, index) => {
                    return index < disceplines.length - 1
                      ? `${dis.label}, `
                      : dis.label;
                  })}
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
                  btnsetting("admin", role, isSelected)
                )}
              >
                ADMIN
              </span>
              <span
                className={classNames(
                  "btn small btn-small-1 ",
                  btnsetting("teacher", role, isSelected)
                )}
              >
                TEACHER
              </span>
              <span
                className={classNames(
                  "btn small btn-small-1 ",
                  btnsetting("parent", role, isSelected)
                )}
              >
                PARENT
              </span>
            </div>
          </div>
        );
      }

      return null;
    });
  }
  unApprovedTextChange(event) {
    this.setState({ unApprovedText: event.target.value });
  }
  approvedTextChange(event) {
    this.setState({ approvedText: event.target.value });
  }
  passwordToggle() {
    this.setState(prevState => ({
      showPassword: !prevState.showPassword
    }));
  }
  handleEditPasswordChange(event) {
    this.setState({ editPassword: event.target.value });
  }
  handleEditEmailChange(event) {
    this.setState({ editEmail: event.target.value });
  }
  selectApprovedCard() {
    this.setState({
      isSelected: !this.state.isSelected
    });
  }
  editTeacherForm(mode) {
    const { showPassword, editEmail, editPassword } = this.state;
    return (
      <div>
        <div
          className={classNames("inputs", {
            "has-errors": false
          })}
        >
          <label className="label" htmlFor="edit-teacher-email">
            Email
          </label>
          <input
            type="email"
            id="edit-teacher-email"
            className={classNames("input", {})}
            placeholder="example@mail.com"
            value={editEmail}
            onChange={this.handleEditEmailChange}
          />
          {/*email_pf_isValid && (
          <span className="error-msg">{email_pf_errMsg}</span>
        )*/}
        </div>
        <div
          className={classNames("inputs", {
            "has-errors": false
          })}
        >
          <label className="label" htmlFor="edit-teacher-password">
            Password
          </label>
          <input
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
          {/*email_pf_isValid && (
          <span className="error-msg">{email_pf_errMsg}</span>
        )*/}
        </div>

        <div className="text-center mt-5 pt-3">
          <button className="btn btn-primary btn-w-1">Save</button>
        </div>
      </div>
    );
  }
  render() {
    const {
      isSelected,
      unApprovedText,
      approvedText,
      teacherList
    } = this.state;
    return (
      <div className="container-fluid ">
        <div className="row">
          <div className="col-lg-4">
            <Card title="New Teachers" className="full-height-card">
              <div className={"manage-card-inner-body"}>
                <div className={"inputs"}>
                  <label className="label" htmlFor="unapproved_user_search">
                    Search user
                  </label>
                  <input
                    type="text"
                    id="unapproved_user_search"
                    className={"input"}
                    placeholder="Enter name here..."
                    value={unApprovedText}
                    onChange={this.unApprovedTextChange}
                  />
                </div>
                {this.renderTeachersInCards(teacherList, false)}
              </div>
            </Card>
          </div>
          <div className="col-lg-4">
            <Card title="Teachers" className="full-height-card">
              <div>
                <div className={"inputs"}>
                  <label className="label" htmlFor="user_search">
                    Search user
                  </label>
                  <input
                    type="text"
                    id="user_search"
                    className={"input"}
                    placeholder="Enter name here..."
                    value={approvedText}
                    onChange={this.approvedTextChange}
                  />
                </div>
                {this.renderTeachersInCards(teacherList, true)}
              </div>
            </Card>
          </div>
          <div className="col-lg-4">
            <div className="card-shadow inner-form-card">
              <h2 className="text-secondary text-center">
                {isSelected ? "Edit teacher" : "Create Teacher"}
              </h2>
              {this.editTeacherForm()}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export class ManageParents extends Component {
  constructor() {
    super();
    this.unApprovedTextChange = this.unApprovedTextChange.bind(this);
    this.approvedTextChange = this.approvedTextChange.bind(this);
    this.passwordToggle = this.passwordToggle.bind(this);
    this.handleEditPasswordChange = this.handleEditPasswordChange.bind(this);
    this.handleEditEmailChange = this.handleEditEmailChange.bind(this);
    this.selectApprovedCard = this.selectApprovedCard.bind(this);
    this.state = {
      teacherList: [
        {
          name: "Hans Zimmer",
          students: [
            {
              name: "Mark Zimmer",
              plan: "paid",
              email: "markus1999@gmail.com",
              phone: "+380987654321",
              role: "student",
              status: false
            },
            {
              name: "Geremy Zimmer",
              plan: "free",
              phone: "+380987654321",
              role: "student",
              status: false
            }
          ],
          email: "greatleobetterthandicaprio@truth.com",
          phone: "+380987654321",
          role: "parent",
          status: true
        },
        {
          name: "John Murphy",
          students: [
            {
              name: "Mark Murphy",
              plan: "paid",
              email: "markus1999@gmail.com",
              phone: "+380987654321",
              role: "student",
              status: false
            }
          ],
          email: "johnmurphy@soundcloud.com",
          phone: "+380987654321",
          role: "parent",
          status: true
        }
      ],
      showPassword: false,
      editEmail: "",
      editPassword: "",
      unApprovedText: "",
      approvedText: "",
      isSelected: false,
      selectedTeacher: {}
    };
  }

  renderTeachersInCards(arr, aproved) {
    return arr.map((el, index) => {
      const { isSelected } = this.state;
      const { name, email, phone, role, status, disceplines } = el;
      const btnsetting = (name, role, selected) => {
        return {
          "btn-secondary": role === name && !selected,
          "btn-light": role === name && selected,
          "btn-outline-secondary": role !== name && !selected,
          "btn-outline-light": role !== name && selected
        };
      };
      if (!aproved && !status) {
        return (
          <div
            key={index}
            className="user-card unapproved text-secondary font-ar"
          >
            <div className="user-card-info">
              <div className="user-card-name">
                <p className="h5 font-weight-bold">{name}</p>
              </div>
              <div className="user-card-email font-weight-bold">
                <p>{email}</p>
                <p>{phone}</p>
              </div>
            </div>
            <div className="user-card-role has-student-icons">
              <div />
              <div />
            </div>
          </div>
        );
      }
      if (aproved && status) {
        return (
          <div
            key={index}
            className={classNames("user-card font-ar", {
              "text-white bg-secondary": isSelected,
              "text-secondary": !isSelected
            })}
            onClick={this.selectApprovedCard}
          >
            <div className="user-card-info">
              <div className="user-card-name">
                <p className="h5 font-weight-bold">{name}</p>
                <p className="small-info font-tin font-italic">
                  {disceplines.map((dis, index) => {
                    return index < disceplines.length - 1
                      ? `${dis.label}, `
                      : dis.label;
                  })}
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
                  btnsetting("admin", role, isSelected)
                )}
              >
                ADMIN
              </span>
              <span
                className={classNames(
                  "btn small btn-small-1 ",
                  btnsetting("teacher", role, isSelected)
                )}
              >
                TEACHER
              </span>
              <span
                className={classNames(
                  "btn small btn-small-1 ",
                  btnsetting("parent", role, isSelected)
                )}
              >
                PARENT
              </span>
            </div>
          </div>
        );
      }

      return null;
    });
  }
  unApprovedTextChange(event) {
    this.setState({ unApprovedText: event.target.value });
  }
  approvedTextChange(event) {
    this.setState({ approvedText: event.target.value });
  }
  passwordToggle() {
    this.setState({ showPassword: !this.state.showPassword });
  }
  handleEditPasswordChange(event) {
    this.setState({ editPassword: event.target.value });
  }
  handleEditEmailChange(event) {
    this.setState({ editEmail: event.target.value });
  }
  selectApprovedCard() {
    this.setState({
      isSelected: !this.state.isSelected
    });
  }
  editTeacherForm(mode) {
    const { showPassword, editEmail, editPassword } = this.state;
    return (
      <div>
        <div
          className={classNames("inputs", {
            "has-errors": false
          })}
        >
          <label className="label" htmlFor="edit-teacher-email">
            Email
          </label>
          <input
            type="email"
            id="edit-teacher-email"
            className={classNames("input", {})}
            placeholder="example@mail.com"
            value={editEmail}
            onChange={this.handleEditEmailChange}
          />
          {/*email_pf_isValid && (
          <span className="error-msg">{email_pf_errMsg}</span>
        )*/}
        </div>
        <div
          className={classNames("inputs", {
            "has-errors": false
          })}
        >
          <label className="label" htmlFor="edit-teacher-password">
            Password
          </label>
          <input
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
          {/*email_pf_isValid && (
          <span className="error-msg">{email_pf_errMsg}</span>
        )*/}
        </div>

        <div className="text-center mt-5 pt-3">
          <button className="btn btn-primary btn-w-1">Save</button>
        </div>
      </div>
    );
  }
  render() {
    const {
      isSelected,
      unApprovedText,
      approvedText,
      teacherList
    } = this.state;
    return (
      <div className="container-fluid ">
        <div className="row">
          <div className="col-lg-4">
            <Card title="New Teachers" className="full-height-card">
              <div className={"manage-card-inner-body"}>
                <div className={"inputs"}>
                  <label className="label" htmlFor="unapproved_user_search">
                    Search user
                  </label>
                  <input
                    type="text"
                    id="unapproved_user_search"
                    className={"input"}
                    placeholder="Enter name here..."
                    value={unApprovedText}
                    onChange={this.unApprovedTextChange}
                  />
                </div>
                {this.renderTeachersInCards(teacherList, false)}
              </div>
            </Card>
          </div>
          <div className="col-lg-4">
            <Card title="Teachers" className="full-height-card">
              <div>
                <div className={"inputs"}>
                  <label className="label" htmlFor="user_search">
                    Search user
                  </label>
                  <input
                    type="text"
                    id="user_search"
                    className={"input"}
                    placeholder="Enter name here..."
                    value={approvedText}
                    onChange={this.approvedTextChange}
                  />
                </div>
                {this.renderTeachersInCards(teacherList, true)}
              </div>
            </Card>
          </div>
          <div className="col-lg-4">
            <div className="card-shadow inner-form-card">
              <h2 className="text-secondary text-center">
                {isSelected ? "Edit teacher" : "Create Teacher"}
              </h2>
              {this.editTeacherForm()}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
