import React, { Component } from "react";

import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getTranslations } from "../services";

class HomeBannerEl extends Component {
  render() {
    const langData = getTranslations(this.props.langauge, "banner");
    return (
      <div className="main-banner">
        <div className="container">
          <div className="row main-banner-row align-items-center">
            <div className="col-md-6 pb-5 pb-md-0 text-md-right text-center">
              <img
                src={langData && langData.logo}
                className="banner-logo"
                alt="logo"
              />
            </div>
            <div className="col-md-6 text-center">
              <div className="inner-text text-md-left text-center d-inline-block">
                <p className="h1">{langData && langData.USDE}</p>
                <h4 className="mb-5">
                  {langData && langData.Biggest_online_school}
                </h4>
                <Link to="/registration/" className="btn btn-outline-primary">
                  {langData && langData.REGISTER_NOW}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return state;
};
const HomeBanner = connect(mapStateToProps)(HomeBannerEl);
export { HomeBanner };
