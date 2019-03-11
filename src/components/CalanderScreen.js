import React, { Component } from "react";
import { DashboardNameCard, DashboardStatusArea, Calander } from "./";
export class CalanderScreen extends Component {
  componentDidMount() {
    console.log(this.props);
  }
  render() {
    return (
      <>
        <div className="">{<Calander />}</div>
      </>
    );
  }
}
