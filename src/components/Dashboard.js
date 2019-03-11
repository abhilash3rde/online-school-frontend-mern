import React, { Component } from "react";
import DashboardStatusArea from "./DashboardStatusArea";
import DashboardNameCard from "./DashboardNameCard";
class Dashboard extends Component {
  componentDidMount() {
    console.log(this.props);
  }
  render() {
    const {
      setActiveDashboard,
      user: { firstName, lastName }
    } = this.props;
    return (
      <>
        <div className="">
          <DashboardNameCard title={firstName + " " + lastName} />
          <DashboardStatusArea setActiveDashboard={setActiveDashboard} />
        </div>
      </>
    );
  }
}
export { Dashboard };
