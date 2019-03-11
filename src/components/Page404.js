import React, { Component } from "react";

export default class Page404 extends Component {
  render() {
    return (
      <div className="container not-found-container">
        <div className="row h100">
          <div className="col-12 h100">
            <div className="font-ar text-secondary h100 d-flex align-items-center justify-content-center flex-column">
              <h1 className="font-tin">404</h1>
              <h2>Page not found</h2>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
