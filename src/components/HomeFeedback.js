import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
class HomeFeedbackEl extends Component {
  constructor(props) {
    super(props);
    this.state = {
      feedbackArr: [
        {
          name: "Hans Zimmer",
          role: "Parent",
          content:
            "Despite the fact that there are several analogues in the Ukrainian market, we can provide the largest list of necessary functions. All this is due to the fact that we always follow the interests of our users.",
          img: "http://via.placeholder.com/150x150",
          students: [
            {
              img: "http://via.placeholder.com/50x50"
            }
          ]
        },
        {
          name: "Elena Temnikova",
          role: "Parent",
          content:
            "Despite the fact that there are several analogues in the Ukrainian market, we can provide the largest list of necessary functions. All this is due to the fact that we always follow the interests of our users.",
          img: "http://via.placeholder.com/150x150",
          students: [
            {
              img: "http://via.placeholder.com/50x50"
            },
            {
              img: "http://via.placeholder.com/50x50"
            }
          ]
        },
        {
          name: "Tony Stark",
          role: "Teacher",
          content:
            "Despite the fact that there are several analogues in the Ukrainian market, we can provide the largest list of necessary functions. All this is due to the fact that we always follow the interests of our users.",
          img: "http://via.placeholder.com/150x150",
          students: [
            {
              img: "http://via.placeholder.com/50x50"
            },
            {
              img: "http://via.placeholder.com/50x50"
            },
            {
              img: "http://via.placeholder.com/50x50"
            },
            {
              img: "http://via.placeholder.com/50x50"
            },
            {
              img: "http://via.placeholder.com/50x50"
            },
            {
              img: "http://via.placeholder.com/50x50"
            },
            {
              img: "http://via.placeholder.com/50x50"
            },
            {
              img: "http://via.placeholder.com/50x50"
            },
            {
              img: "http://via.placeholder.com/50x50"
            },
            {
              img: "http://via.placeholder.com/50x50"
            },
            {
              img: "http://via.placeholder.com/50x50"
            },
            {
              img: "http://via.placeholder.com/50x50"
            },
            {
              img: "http://via.placeholder.com/50x50"
            },
            {
              img: "http://via.placeholder.com/50x50"
            },
            {
              img: "http://via.placeholder.com/50x50"
            }
          ]
        }
      ]
    };
  }

  feedbacks = arr =>
    arr.map((feedback, index) => (
      <div className="col-md-4" key={"feedback" + index}>
        <div className="full-card text-center">
          <div className="full-card-upper text-secondary">
            <img
              className="img-fluid full-card-img"
              alt={feedback.name}
              src={feedback.img}
            />
            <h6>{feedback.name}</h6>
            <small>{feedback.role}</small>
            <p className="full-card-content">{feedback.content}</p>
          </div>
          <div className="full-card-footer">
            <p className="very-small">Students:</p>
            <div className="card-student-thumb">
              {feedback.students.length > 5
                ? feedback.students.map((student, index) => {
                    if (index < 5)
                      return (
                        <img
                          key={index}
                          className="img-fluid"
                          alt={"student-img"}
                          src={student.img}
                        />
                      );
                    else {
                      if (index === 5) {
                        return (
                          <div key={index} className="student-thumb-number">
                            +{feedback.students.length - index}
                          </div>
                        );
                      } else return null;
                    }
                  })
                : feedback.students.map((student, index) => (
                    <img
                      key={index}
                      className="img-fluid"
                      alt={"student-img"}
                      src={student.img}
                    />
                  ))}
            </div>
          </div>
        </div>
      </div>
    ));
  render() {
    return (
      <section className="section-gap">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-xl-5 col-lg-8 text-center text-secondary">
              <h2 className="font-weight-normal">Feedback</h2>
              <h6 className="mb-5">
                Our main aim is high quality education and happy clients.
              </h6>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-xl-8">
              <div className="row">
                {this.feedbacks(this.state.feedbackArr)}
              </div>
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
const HomeFeedback = connect(mapStateToProps)(HomeFeedbackEl);

export { HomeFeedback };
