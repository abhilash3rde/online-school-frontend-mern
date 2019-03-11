import React, { Component } from "react";
// import { Route, BrowserRouter, Redirect } from "react-router-dom";
import SelectMulti from "react-select";
import { connect } from "react-redux";
import ManageAdmins from "./ManageAdmins";
import ManageTeachers from "./ManageTeachers";
import ManageParents from "./ManageParents";
import { selectStyle } from "../services/Constants";
import { getTranslations } from "../services/";

class UserManagement extends Component {
  constructor(props) {
    super(props);
    this.userType = this.userType.bind(this);
    this.changeUserSelect = this.changeUserSelect.bind(this);
    this.state = {
      user_selector: {
        value: "admin",
        // label: "Admin"
        label: getTranslations(this.props.langauge, "labels").admin || "Admin"
      }
    };
  }
  componentDidMount() {
    console.log("user management");
  }
  changeUserSelect(user_selector) {
    this.setState({ user_selector });
  }
  userType(user) {
    if (user === "admin") return <ManageAdmins />;
    if (user === "teacher") return <ManageTeachers />;
    if (user === "parent") return <ManageParents />;
  }
  render() {
    const langData = getTranslations(this.props.langauge, "labels");
    // const langData = {}
    const { user_selector } = this.state;
    const userSelectOptions = [
      { value: "admin", label: langData.admin || "Admin" },
      { value: "teacher", label: langData.teacher || "Teacher" },
      { value: "parent", label: langData.parent || "Parent" }
    ];
    // return <div></div>
    return (
      <div>
        {/* <BrowserRouter basename="/Dashboard/User_management"> */}
        <div className="d-flex flex-column h-100">
          <div className="container-fluid">
            <div className="user-selector-wrapper">
              <div className="user-selector-select">
                <SelectMulti
                  id={"user_selector"}
                  styles={selectStyle}
                  value={user_selector}
                  onChange={this.changeUserSelect}
                  options={userSelectOptions}
                />
              </div>
            </div>
          </div>
          <div>{this.userType(user_selector.value)}</div>
        </div>
      </div>
    );
  }
}
// export { UserManagement };
const mapStateToProps = state => {
  return state;
};
export default connect(mapStateToProps)(UserManagement);
