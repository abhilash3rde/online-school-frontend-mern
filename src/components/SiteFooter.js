import React, { Component } from "react";

import logo from "../assets/logo/SVG/logo(en).svg";
class SiteFooter extends Component {
  render() {
    return (
      <footer className=" bg-primary text-white">
        <div className="container">
          <div className="row justify-content-between">
            <div className="footer-left">
              <div className="footer-logo">
                <img src={logo} alt="logo" className="footer-logo-img" />
              </div>
              <div className="footer-address">
                <p>
                  88 Khreschatyk street, Kyiv, Ukraine
                  <br />
                  +380 98 765 4321
                </p>
              </div>
            </div>
            <div className="footer-right pr-0 pl-0 col-md-4 justify-content-md-end justify-content-center">
              <div className="icon">
                <button>
                  <img
                    alt={"insta"}
                    src={require("../assets/icons/instagram.svg")}
                  />
                </button>
              </div>
              <div className="icon">
                <button>
                  <img
                    alt={"twitter"}
                    src={require("../assets/icons/twitter.svg")}
                  />
                </button>
              </div>
              <div className="icon">
                <button>
                  <img
                    alt={"facebook"}
                    src={require("../assets/icons/facebook.svg")}
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="footer-copy bg-secondary">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <p className="copy">
                  © Designed by{" "}
                  <a href="https://alexandrtovmach.com/">Alexandr Tovmach</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    );
  }
}
export { SiteFooter };
