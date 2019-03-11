import React, { Component } from "react";
import {
  // MainHeader,
  HomeBanner,
  HomeDisciplines,
  HomeBenefits,
  HomeFeedback
  // SiteFooter
} from "./";
class Home extends Component {
  constructor(props) {
    super(props);
    this.unsetDashBoard = this.unsetDashBoard.bind(this);
  }

  componentDidMount() {
    this.unsetDashBoard();
  }
  unsetDashBoard() {
    this.props.unsetDashBoard();
  }
  render() {
    return (
      <>
        <HomeBanner />
        <HomeDisciplines />
        <HomeBenefits />
        <HomeFeedback />
      </>
    );
  }
}
export default Home;
