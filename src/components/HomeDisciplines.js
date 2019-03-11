import React, { Component } from "react";
import Flickity from "react-flickity-component";
import { getTranslations } from "../services";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
class HomeDisciplinesEl extends Component {
  constructor(props) {
    super(props);
    this.flResize = this.flResize.bind(this);
    this.state = {
      // langData: getTranslations(props.langauge, "discipline"),
      slideArr: [
        {
          img: "http://via.placeholder.com/300x300",
          title: "Math",
          grade: "1-11 grades",
          content: "35 Teachers, 6780 Students"
        },
        {
          img: "http://via.placeholder.com/300x300",
          title: "Math",
          grade: "1-11 grades",
          content: "35 Teachers, 6780 Students"
        },
        {
          img: "http://via.placeholder.com/300x300",
          title: "Math",
          grade: "1-11 grades",
          content: "35 Teachers, 6780 Students"
        },
        {
          img: "http://via.placeholder.com/300x300",
          title: "Math",
          grade: "1-11 grades",
          content: "35 Teachers, 6780 Students"
        },
        {
          img: "http://via.placeholder.com/300x300",
          title: "Math",
          grade: "1-11 grades",
          content: "35 Teachers, 6780 Students"
        },
        {
          img: "http://via.placeholder.com/300x300",
          title: "Math",
          grade: "1-11 grades",
          content: "35 Teachers, 6780 Students"
        },
        {
          img: "http://via.placeholder.com/300x300",
          title: "Math",
          grade: "1-11 grades",
          content: "35 Teachers, 6780 Students"
        }
      ]
    };
  }
  componentDidMount() {
    this.flkty.on("change", index => {
      this.flkty.positionCells();
    });
  }
  flResize() {
    this.flkty.resize();
  }
  disciplinesSlider = arr => {
    const settings = {
      loop: true,
      items: 4,
      margin: 0,
      nav: true,
      dots: false,
      center: true,
      responsive: {
        1000: {
          items: 4
        },
        700: {
          items: 2,
          nav: true
        },
        0: {
          items: 1,
          nav: false
        }
      }
    };

    const flickityOptions = {
      initialIndex: 0,
      pageDots: false,
      cellAlign: "center",
      initialIndex: 2,
      imagesLoaded: true,
      wrapAround: true
    };
    return (
      <Flickity
        className={"carousel"} // default ''
        elementType={"div"} // default 'div'
        options={flickityOptions} // takes flickity options {}
        disableImagesLoaded={false} // default false
        reloadOnUpdate={false} // default false
        flickityRef={c => (this.flkty = c)}
      >
        {arr.map((slide, index) => (
          <div className="h-slide-wrapper" key={"h-slide-" + index}>
            <div className="h-slide-image">
              <img
                alt={slide.title}
                onLoad={() => {
                  this.flResize();
                }}
                src={slide.img}
                className="img-fluid"
              />
            </div>
            <div className="h-slide-text">
              <div className="h-slide-text-upper">
                <h5>{slide.title}</h5>
                <p>{slide.grade}</p>
              </div>
              <div className="h-slide-text-lower">
                <h5>{slide.content}</h5>
              </div>
            </div>
          </div>
        ))}
      </Flickity>
      // <OwlCarousel className="owl-theme" {...settings}>
      //   {arr.map((slide, index) => (
      //     <div className="h-slide-wrapper" key={"h-slide-" + index}>
      //       <div className="h-slide-image">
      //         <img alt={slide.title} src={slide.img} className="img-fluid" />
      //       </div>
      //       <div className="h-slide-text">
      //         <div className="h-slide-text-upper">
      //           <h5>{slide.title}</h5>
      //           <p>{slide.grade}</p>
      //         </div>
      //         <div className="h-slide-text-lower">
      //           <h5>{slide.content}</h5>
      //         </div>
      //       </div>
      //     </div>
      //   ))}
      // </OwlCarousel>
    );
  };

  render() {
    const { slideArr } = this.state;
    const { langauge } = this.props;
    const langData = getTranslations(langauge, "discipline");
    return (
      <div className="home-disciplines section-gap">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-xl-5 col-lg-8 text-center text-secondary">
              <h2 className="font-weight-normal">
                {langData && langData.more_than}
              </h2>
              <h6>{langData && langData.our_service}</h6>
            </div>
          </div>
        </div>
        <div className="disciplines-slider">
          {this.disciplinesSlider(slideArr)}
        </div>
        <div className="text-center mt-5 pt-3">
          <Link to="/registration/" className="btn btn-primary btn-w-1">
            TRY NOW
          </Link>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return state;
};
const HomeDisciplines = connect(mapStateToProps)(HomeDisciplinesEl);

export { HomeDisciplines };
