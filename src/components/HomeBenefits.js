import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
class HomeBenefitsEl extends Component {
  constructor(props) {
    super(props);
    this.state = {
      benefitsArr: [
        {
          title: "Analitics",
          content: "We provide very flexible system for analise.",
          img: "http://via.placeholder.com/100x100"
        },
        {
          title: "Analitics",
          content: "We provide very flexible system for analise.",
          img: "http://via.placeholder.com/100x100"
        },
        {
          title: "Analitics",
          content: "We provide very flexible system for analise.",
          img: "http://via.placeholder.com/100x100"
        },
        {
          title: "Analitics",
          content: "We provide very flexible system for analise.",
          img: "http://via.placeholder.com/100x100"
        },
        {
          title: "Analitics",
          content: "We provide very flexible system for analise.",
          img: "http://via.placeholder.com/100x100"
        },
        {
          title: "Analitics",
          content: "We provide very flexible system for analise.",
          img: "http://via.placeholder.com/100x100"
        }
      ]
    };
  }
  benefits = arr =>
    arr.map((benefit, index) => (
      <div className="col-sm-4" key={"benefit-" + index}>
        <div className="plain-card text-center text-secondary">
          <h5>{benefit.title}</h5>
          <p>{benefit.content}</p>
          <img className="img-fluid" alt="analytics" src={benefit.img} />
        </div>
      </div>
    ));
  render() {
    return (
      <section className="section-gap">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-5 text-secondary">
              <h2 className="font-weight-normal">Our benefits</h2>
              <p>
                Despite the fact that there are several analogues in the
                Ukrainian market, we can provide the largest list of necessary
                functions. All this is due to the fact that we always follow the
                interests of our users.
              </p>
            </div>
            <div className="col-lg-7">
              <div className="row">{this.benefits(this.state.benefitsArr)}</div>
            </div>
          </div>
        </div>
        <div className="text-center mt-5 pt-3">
          <Link to="/registration/" className="btn btn-primary btn-w-1">
            TRY NOW
          </Link>
        </div>
      </section>
    );
  }
}
const mapStateToProps = state => {
  return state;
};
const HomeBenefits = connect(mapStateToProps)(HomeBenefitsEl);

export { HomeBenefits };
