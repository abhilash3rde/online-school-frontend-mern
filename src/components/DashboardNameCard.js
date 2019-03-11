import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getTranslations } from "../services/";
class DashboardNameCard extends Component {
  render() {
    const langData = getTranslations(this.props.langauge, "labels");
    return (
      <div className="dashboard-card">
        <div className="container-fluid">
          <div className="row justify-content-between align-items-center">
            <div className="col-md-8 text-secondary">
              <p className="h1 font-weight-bold">
                {langData && langData.hello}
              </p>
              <h4>{this.props.title}</h4>
            </div>
            <div className="col-md-4 text-md-right">
              <Link
                className="btn btn-primary btn-w-2"
                to="/Dashboard/calander"
              >
                {langData && langData.opencalendar}
                {/* OPEN CALENDAR */}
              </Link>
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
export default connect(mapStateToProps)(DashboardNameCard);
