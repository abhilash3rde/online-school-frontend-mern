import React, { Component } from "react";
import moment from "moment";
import SelectMulti from "react-select";
import FullCalendar from "fullcalendar-reactwrapper";
// import Calendar from 'react_google_calendar'
import classNames from "classnames";
import waterfall from "async-waterfall";
import Icon from "react-icons-kit";
import debounce from "debounce";
import { ic_chevron_left, ic_chevron_right } from "react-icons-kit/md/";
import { colors, selectStyle } from "../services/Constants";

export class Calander extends Component {
  constructor() {
    super();
    this.navigateToWeek = this.navigateToWeek.bind(this);
    this.handleCalenderNext = this.handleCalenderNext.bind(this);
    this.handleCalenderPrev = this.handleCalenderPrev.bind(this);
    this.handleExamCheckBoxChange = this.handleExamCheckBoxChange.bind(this);
    this.handleLessonCheckBoxChange = this.handleLessonCheckBoxChange.bind(
      this
    );
    this.handleOLessonCheckBoxChange = this.handleOLessonCheckBoxChange.bind(
      this
    );
    this.handleFilterSearch = this.handleFilterSearch.bind(this);
    this.viewsChange = this.viewsChange.bind(this);
    this.state = {
      events: [
        {
          title: "Math",
          start: "2019-05-01",
          className: ["live", "math"]
        },
        {
          title: "All Day Event",
          start: "2019-05-01",
          className: ["live", "math"]
        },
        {
          title: "Long Event",
          start: "2019-05-07",
          end: "2019-05-10"
        },
        {
          id: 999,
          title: "Repeating Event",
          start: "2019-05-09T16:00:00"
        },
        {
          id: 999,
          title: "Repeating Event",
          start: "2019-05-16T16:00:00"
        },
        {
          title: "Conference",
          start: "2019-05-11",
          end: "2019-05-13"
        },
        {
          title: "Meeting",
          start: "2019-05-12T10:30:00",
          end: "2019-05-12T12:30:00"
        },
        {
          title: "Birthday Party",
          start: "2019-05-13T07:00:00"
        },
        {
          title: "Click for Google",
          url: "http://google.com/",
          start: "2019-05-28"
        }
      ],
      year: new Date().getFullYear(),
      month: new Date().getMonth() + 1,
      day: new Date().getDay(),
      filterExams: true,
      filterLessons: true,
      filterOnlineLessons: true,
      filterDesciplinesText: "",
      views: [
        {
          label: "Year",
          value: "year"
        },
        {
          label: "Month",
          value: "month"
        },
        {
          label: "Week",
          value: "week"
        }
      ],
      selectedView: {
        label: "Year",
        value: "year"
      }
    };
  }
  componentDidMount() {
    // $(this.refs.full-calender).calendar()
  }
  viewsChange = selectedView => {
    this.setState({ selectedView });
  };
  afterEventRender() {
    let arr = [];
    waterfall([
      done => {
        this.state.events.map(ev => {
          arr.push(ev.start.substring(0, 10));
        });
        return done();
      },
      done => {
        let dayEl = document.getElementsByClassName("fc-day-top");
        // console.log(arr)
        for (let j = 0; j < dayEl.length; j++) {
          if (
            arr.includes(
              document
                .getElementsByClassName("fc-day-top")
                [j].getAttribute("data-date")
            )
          ) {
            document.getElementsByClassName("fc-day-top")[j].classList +=
              " has-event";
          }
        }
      }
    ]);
  }
  navigateToWeek(date) {
    this.setState({
      year: date.get("year"),
      month: date.get("month") + 1,
      day: date.get("date"),
      selectedView: {
        label: "Week",
        value: "week"
      }
    });
  }
  yearView(mode, defaultDate) {
    let months = [
      "01",
      "02",
      "03",
      "04",
      "05",
      "06",
      "07",
      "08",
      "09",
      "10",
      "11",
      "12"
    ];
    let header = {
      left: null,
      center: null,
      right: null
    };
    // const { year, month, day } = defaultDate;
    let year = defaultDate.year;
    let month =
      defaultDate.month < 10 ? "0" + defaultDate.month : defaultDate.month;
    let day = defaultDate.day < 10 ? "0" + defaultDate.day : defaultDate.day;
    // let day = defaultDate.day;
    if (mode === "year") {
      header.center = "title";
      return (
        <div className="year-view-wrapper calander-wrapper">
          {months.map((el, index) => (
            <FullCalendar
              key={index}
              id={`year-view-${index}`}
              header={header}
              defaultDate={`${year}-${el}-01`}
              navLinks={true}
              navLinkDayClick={(date, jsEvent) => {
                // console.log("day", date.format()); // date is a moment
                // console.log("coords", jsEvent.pageX, jsEvent.pageY);
                this.navigateToWeek(date);
              }}
              eventColor="#378006"
              eventAfterAllRender={() => {
                this.afterEventRender();
              }}
              firstDay={1}
              titleFormat={"MMMM"}
              dayNamesShort={["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"]}
              editable={false}
              eventLimit={true}
              // events={this.state.events}
            />
          ))}

          {/* <div ref="full-calender"
         data-provide="calendar"></div> */}
        </div>
      );
    }
    if (mode === "month") {
      console.log({
        year,
        month,
        day
      });
      return (
        <div className="month-view-wrapper calander-wrapper">
          <FullCalendar
            id={`month-view`}
            header={header}
            defaultDate={`${year}-${month}-${day}`}
            navLinks={true}
            navLinkDayClick={(date, jsEvent) => {
              // console.log("day", date.format()); // date is a moment
              // console.log("coords", jsEvent.pageX, jsEvent.pageY);
              this.navigateToWeek(date);
            }}
            eventAfterAllRender={() => {
              this.afterEventRender();
            }}
            firstDay={1}
            titleFormat={"MMMM"}
            dayNamesShort={["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]}
            editable={false}
            eventLimit={true}
            events={this.state.events}
          />
        </div>
      );
    }
    if (mode === "week")
      return (
        <div className="month-view-wrapper week-view-wrapper calander-wrapper">
          <FullCalendar
            id={`month-view`}
            header={header}
            defaultDate={`${year}-${month}-${day}`}
            navLinks={true}
            navLinkDayClick={(date, jsEvent) => {
              console.log("day", date.format()); // date is a moment
              console.log("coords", jsEvent.pageX, jsEvent.pageY);
            }}
            eventAfterAllRender={() => {
              this.afterEventRender();
            }}
            titleFormat={"MMMM"}
            dayNamesShort={["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]}
            editable={false}
            columnFormat={`ddd D`}
            // columnHeaderHtml={function(mom) {
            //   if (mom.weekday() === 5) {
            //     return '<b>Friday!</b>';
            //   } else {
            //     return '<i>' + mom.format('LLL') + '</i>';
            //   }
            // }}
            // columnFormatRaw={true}
            // columnFormat='ddd [<span class="my-custom-day-number">]D[</span>]'
            // columnHeaderFormat={"dddd"}
            // columnHeaderText={month => {
            //   alert("ll");
            //   if (month.weekday() === 5) {
            //     return "Friday!";
            //   } else {
            //     return month.format("LLL");
            //   }
            // }}
            eventLimit={true}
            firstDay={1}
            // defaultView="basicWeek"
            defaultView="agendaWeek"
            events={this.state.events}
          />
        </div>
      );
  }
  handleExamCheckBoxChange() {
    this.setState(prevState => ({
      filterExams: !prevState.filterExams
    }));
    // this.setState({
    //   filterExams: !this.state.filterExams
    // })
  }
  handleLessonCheckBoxChange() {
    this.setState(prevState => ({
      filterLessons: !prevState.filterLessons
    }));
  }
  handleOLessonCheckBoxChange() {
    this.setState(prevState => ({
      filterOnlineLessons: !prevState.filterOnlineLessons
    }));
  }
  handleFilterSearch = debounce(fliterSearch => {
    this.setState({ fliterSearch }, () => {});
  }, 500);
  handleCalenderNext() {
    const {
      selectedView: { value },
      year,
      month,
      day
    } = this.state;
    console.log(value);
    let date = new Date(`${year}-${month}-${day}`);
    let today = moment(date);
    switch (value) {
      case "year":
        date = today.add(1, "y");
        break;
      case "month":
        date = today.add(1, "months");
        // console.log(date)
        break;
      case "week":
        date = today.add(7, "d");
        break;

      default:
        break;
    }

    this.setState({
      year: date.get("year"),
      month: date.get("month") + 1,
      day: date.get("date")
    });
  }
  handleCalenderPrev() {
    const {
      selectedView: { value },
      year,
      month,
      day
    } = this.state;
    console.log(value);
    let date = new Date(`${year}-${month}-${day}`);
    let today = moment(date);
    switch (value) {
      case "year":
        date = today.subtract(1, "y");
        break;
      case "month":
        date = today.subtract(1, "months");
        // console.log(date)
        break;
      case "week":
        date = today.subtract(7, "d");
        break;

      default:
        break;
    }

    this.setState({
      year: date.get("year"),
      month: date.get("month") + 1,
      day: date.get("date")
    });
  }
  renderHeader(date, view) {
    const { secondary } = colors;
    const {
      filterExams,
      filterLessons,
      filterOnlineLessons,
      fliterSearch,
      selectedView,
      views
    } = this.state;
    let today = moment(date);
    let title = "";
    switch (view) {
      case "year":
        title = today.get("year");
        break;
      case "month":
        title = today.format("MMMM, YYYY");
        break;
      case "week":
        title = today.format("MMMM, YYYY");
        break;

      default:
        break;
    }
    return (
      <div className="calander-header">
        <div className="calander-inner">
          <div className="calander-navigations">
            <div className="icons">
              <div onClick={this.handleCalenderPrev}>
                <Icon
                  style={{ color: secondary }}
                  size={20}
                  icon={ic_chevron_left}
                />
              </div>
              <div onClick={this.handleCalenderNext}>
                <Icon
                  style={{ color: secondary }}
                  size={20}
                  icon={ic_chevron_right}
                />
              </div>
            </div>
            <div className="title">{title}</div>
          </div>
          <div className="calander-filters">
            <div className={classNames("inputs agree-input")}>
              <input
                className="input-checkbox"
                id="filterExams"
                type="checkbox"
                checked={filterExams}
                onChange={this.handleExamCheckBoxChange}
              />
              <span className="checkbox-span" />
              <label className="label checkbox-label" htmlFor="filterExams">
                Exams
              </label>
            </div>
            <div className={classNames("inputs agree-input")}>
              <input
                className="input-checkbox"
                id="filterLessons"
                type="checkbox"
                checked={filterLessons}
                onChange={this.handleLessonCheckBoxChange}
              />
              <span className="checkbox-span" />
              <label className="label checkbox-label" htmlFor="filterLessons">
                Lessons
              </label>
            </div>
            <div className={classNames("inputs agree-input")}>
              <input
                className="input-checkbox"
                id="filterOnlineLessons"
                type="checkbox"
                checked={filterOnlineLessons}
                onChange={this.handleOLessonCheckBoxChange}
              />
              <span className="checkbox-span" />
              <label
                className="label checkbox-label"
                htmlFor="filterOnlineLessons"
              >
                Online Lessons
              </label>
            </div>
            <div className={classNames("inputs")}>
              <input
                className="input"
                id="fliterSearch"
                type="text"
                placeholder="Filter disciplines..."
                // value={fliterSearch}
                onChange={e => {
                  this.handleFilterSearch(e.target.value);
                }}
              />
            </div>
            <div className={classNames("inputs")}>
              <SelectMulti
                id={"views"}
                styles={selectStyle}
                value={selectedView}
                isMulti={false}
                onChange={this.viewsChange}
                options={views}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
  render() {
    const {
      year,
      month,
      day,
      selectedView: { value }
    } = this.state;

    let date = new Date(`${year}-${month}-${day}`);

    return (
      <div>
        {this.renderHeader(date, value)}
        {value === "year" && this.yearView("year", { year, month, day })}
        {value === "month" && this.yearView("month", { year, month, day })}
        {value === "week" && this.yearView("week", { year, month, day })}
      </div>
    );
  }
}
