import React, { Component } from "react";
import classNames from "classnames";
import { Collapse } from "reactstrap";
import SelectMulti from "react-select";
import { Card } from "./";
import { selectStyleInput } from "../services/Constants";
import {
  getAllTeachersApi,
  getAllLessons,
  getTaskByTitleApi,
  changeLessonTypeApi
} from "../services/api";
import Icon from "react-icons-kit";
import validator from "validator";
import { ic_expand_less } from "react-icons-kit/md";
import { ic_expand_more } from "react-icons-kit/md";
export class ContentManagement extends Component {
  constructor(props) {
    super(props);
    this.toggleSearchCollapse = this.toggleSearchCollapse.bind(this);
    this.toggleFilterCollapse = this.toggleFilterCollapse.bind(this);
    this.renderFilterOptions = this.renderFilterOptions.bind(this);
    this.disciplinesChange = this.disciplinesChange.bind(this);
    this.teacherChange = this.teacherChange.bind(this);
    this.statusChange = this.statusChange.bind(this);
    this.tagChange = this.tagChange.bind(this);
    this.renderLessonsInCard = this.renderLessonsInCard.bind(this);
    this.toggletask = this.toggletask.bind(this);
    this.filterLesson = this.filterLesson.bind(this);
    this.getTeachers = this.getTeachers.bind(this);
    this.initQuestions = this.initQuestions.bind(this);
    this.changeLessionType = this.changeLessionType.bind(this);
    this.sortLessonsByName = this.sortLessonsByName.bind(this);
    this.sortLessionsByDate = this.sortLessionsByDate.bind(this);
    this.getTasks = this.getTasks.bind(this);
    this.state = {
      searchCollapse: true,
      filterCollapse: true,
      selectedDisciplines: null,
      selectedTeachers: null,
      selectedStatus: null,
      selectedTags: null,
      lessions: [],
      filteredLessons: [],
      searchText: "",
      isTaskOpen: false,
      selectedLesson: {},
      lessionTask: [],
      teacherOption: [],
      dateAcc: true,
      nameAcc: true
    };
  }
  componentDidMount() {
    this.getLessons();
    this.getTeachers();
  }
  getLessons() {
    getAllLessons()
      .then(res => res.json())
      .then(resJson => {
        console.log({ resJson });
        const { status, Lessons } = resJson;
        if (status) {
          this.setState(
            {
              lessions: Lessons
            },
            () => {
              this.filterLesson();
            }
          );
        }
      });
  }
  getTasks(title) {
    getTaskByTitleApi(title)
      .then(res => res.json())
      .then(resJson => {
        console.log({ resJson, title });
        if (resJson.status) {
          if (resJson.user) {
            let content = resJson.user.content.map(el => {
              return { ...el, selectedOption: null };
            });
            // Array.from(...resJson.user.content, ques => {
            //   return {...ques, selectedOption : null}
            // })
            this.setState({
              lessionTask: [...content]
            });
          } else {
            this.setState({
              lessionTask: []
            });
          }
        } else {
          this.setState({
            lessionTask: []
          });
        }
      });
  }
  handleCheckBoxChange(e, index) {
    console.log(e.target.value);
    let lessionTask = this.state.lessionTask;
    lessionTask[index].selectedOption = e.target.value;
    this.setState({
      lessionTask
    });
  }
  selectCard(key) {
    const { selectedLesson } = this.state;
    if (selectedLesson._id === key._id) {
      this.setState({
        selectedLesson: {}
      });
      return;
    }
    this.setState(
      {
        selectedLesson: key
      },
      () => {
        this.initQuestions(key.title);
      }
    );
  }
  initQuestions(title) {
    this.getTasks(title);
    // const tasks = [
    //   {
    //     question: `What tumblr dolore next level flannel enamel pin hammock listicle disrupt master cleanse swag gentrify?`,
    //     options: ["Anagar", "Duliban", "Anagar", "Duliban"]
    //   },
    //   {
    //     question: `What tumblr dolore next level flannel enamel pin hammock listicle disrupt master cleanse swag gentrify?`,
    //     options: ["Anagar", "Duliban", "Anagar", "Duliban"]
    //   },
    //   {
    //     question: `What tumblr dolore next level flannel enamel pin hammock listicle disrupt master cleanse swag gentrify?`,
    //     options: ["Anagar", "Duliban", "Anagar", "Duliban"]
    //   }
    // ];
    // let state = [];
    // tasks.map((el, index) => {
    //   state.push(el);
    //   state[index].selectedOption = null;
    // });
    // this.setState({
    //   lessionTask: state
    // });
  }
  arrayToLowerCase(arr) {
    return Array.from(arr, e => e.toLowerCase());
  }
  filterFromSelected(arr, selectedArr, key) {
    let newArr = [...arr];
    if (selectedArr) {
      if (selectedArr.length > 0) {
        // console.log(selectedTeachers, users)
        newArr = arr.filter(el => {
          // console.log({el})
          return selectedArr.some(selectedEl =>
            this.arrayToLowerCase(el[key]).includes(
              selectedEl.label.toLowerCase()
            )
          );
        });
      }
    }

    return newArr;
  }
  filterFromSelectedStr(arr, selectedArr, key) {
    let newArr = [...arr];
    if (selectedArr) {
      if (selectedArr.length > 0) {
        // console.log(selectedTeachers, users)
        newArr = arr.filter(el => {
          // console.log({el})
          return selectedArr.some(
            selectedEl =>
              selectedEl.label.toLowerCase() === el[key].toLowerCase()
          );
        });
      }
    }

    return newArr;
  }
  filterLesson() {
    const {
      lessions,
      searchText: query,
      selectedDisciplines,
      selectedTeachers,
      selectedTags,
      selectedStatus
    } = this.state;
    let users = []; //= adminList
    lessions.map(el => {
      let item = el;
      const { title } = el;
      item.searchableString = `${title} `;
      users.push(item);
      return null;
    });
    users = this.filterFromSelectedStr(users, selectedTeachers, "teacher");
    users = this.filterFromSelected(users, selectedDisciplines, "discipline");
    users = this.filterFromSelected(users, selectedTags, "tag");
    users = this.filterFromSelectedStr(users, selectedStatus, "type");

    users = users.filter(function(user) {
      return (
        user.searchableString.toLowerCase().indexOf(query.toLowerCase()) !== -1
      ); // returns true or false
    });

    // this.setState({ adminListDisplay: users });

    this.setState({ filteredLessons: users });
  }
  toggleSearchCollapse() {
    this.setState(prevState => ({
      searchCollapse: !prevState.searchCollapse
    }));
  }
  toggletask() {
    this.setState(prevState => ({
      isTaskOpen: !prevState.isTaskOpen
    }));
  }
  toggleFilterCollapse() {
    this.setState(prevState => ({
      filterCollapse: !prevState.filterCollapse
    }));
  }
  changeSearchText = e => {
    this.setState({ searchText: e.target.value }, () => {
      this.filterLesson();
    });
  };
  disciplinesChange = selectedDisciplines => {
    this.setState({ selectedDisciplines }, () => {
      this.filterLesson();
    });
  };
  teacherChange = selectedTeachers => {
    this.setState({ selectedTeachers }, () => {
      this.filterLesson();
    });
  };
  statusChange = selectedStatus => {
    this.setState({ selectedStatus }, () => {
      this.filterLesson();
    });
  };
  tagChange = selectedTags => {
    this.setState({ selectedTags }, () => {
      this.filterLesson();
    });
  };

  getTeachers() {
    getAllTeachersApi()
      .then(res => res.json())
      .then(resJson => {
        console.log(resJson);
        const { status, Unverified, verified } = resJson;
        let teacherOption = [];
        if (status) {
          // varifiedTeacher = verified;
          // unvarifiedTeacher = Unverified;
          if (verified.constructor === Array) {
            teacherOption = verified.map(el => {
              const { firstName, lastName, email } = el;
              if (
                !(validator.isAlpha(firstName) && validator.isAlpha(lastName))
              )
                return { value: email, label: email };

              return { value: email, label: `${firstName} ${lastName}` };
            });
            this.setState(
              {
                teacherOption
              }
              // this.filterList
            );
          }
          // if (Unverified.constructor === Array) {
          //   this.setState(
          //     {
          //       unapprovedTeacherList: Unverified
          //     },
          //     () => {
          //       console.log(Unverified);
          //       this.unApproveFilterList(false);
          //     }
          //   );
          // }
        }
      })
      .catch(err => console.log(err));
  }
  changeLessionType(title, type) {
    changeLessonTypeApi(title, type)
      .then(res => res.json())
      .then(resjson => {
        const { status } = resjson;
        // if(status){

        // }
        this.setState(
          {
            selectedLesson: {}
          },
          () => {
            this.getLessons();
            this.initQuestions();
          }
        );
      });
  }
  renderLessonsInCard(arr) {
    return arr.map((el, index) => {
      const {
        title,
        teacher,
        tag,
        programName,
        language,
        imgdesc,
        img,
        discipline,
        created,
        content,
        type,
        author,
        _id
      } = el;
      const { selectedLesson } = this.state;
      const btnsetting = (name, role, selectedLessonKey) => {
        let selectedThis = false;
        if (selectedLesson !== null) {
          selectedThis = selectedLesson._id === selectedLessonKey;
        }
        return {
          "btn-secondary":
            role.toLowerCase() === name.toLowerCase() && !selectedThis,
          "btn-light":
            role.toLowerCase() === name.toLowerCase() && selectedThis,
          "btn-outline-secondary":
            role.toLowerCase() !== name.toLowerCase() && !selectedThis,
          "btn-outline-light":
            role.toLowerCase() !== name.toLowerCase() && selectedThis
        };
      };
      return (
        <div
          key={index}
          className={classNames("user-card  font-ar", {
            "text-white bg-secondary": selectedLesson._id === _id,
            "text-secondary": selectedLesson._id !== _id,
            "bg-success":
              type.toLowerCase() === "hidden" && selectedLesson._id !== _id
          })}
          data-type={type}
          onClick={() => {
            this.selectCard(el);
            // console.log({el})
          }}
        >
          <div className="user-card-info">
            <div className="user-card-name">
              <p className="h5 font-weight-bold">{title}</p>
              <p className="small-info font-tin font-italic">
                {discipline.map(el => el)}
              </p>
            </div>
            <div className="user-card-email font-weight-bold">
              <p>
                <span>Author:</span>
                {author}
              </p>
              <p>
                <span>Reviewer:</span>
                {author}
              </p>
            </div>
          </div>
          <div className="user-card-role">
            <span
              onClick={e => {
                e.stopPropagation();
                this.changeLessionType(title, "public");
              }}
              className={classNames(
                "btn small btn-small-1 ",
                btnsetting("public", type, _id)
              )}
            >
              PUBLIC
            </span>
            <span
              onClick={e => {
                e.stopPropagation();
                this.changeLessionType(title, "hidden");
              }}
              className={classNames(
                "btn small btn-small-1 ",
                btnsetting("hidden", type, _id)
              )}
            >
              HIDDEN
            </span>
            <span
              onClick={e => {
                e.stopPropagation();
                this.changeLessionType(title, "archived");
              }}
              className={classNames(
                "btn small btn-small-1 ",
                btnsetting("archived", type, _id)
              )}
            >
              ARCHIVED
            </span>
          </div>
        </div>
      );
    });
  }
  renderFilterOptions() {
    const {
      selectedDisciplines,
      selectedTeachers,
      selectedStatus,
      selectedTags,
      teacherOption
    } = this.state;
    const disciplinesOptions = [
      { value: "Math", label: "Math" },
      { value: "Art_graphics", label: "Art graphics" },
      { value: "Arts", label: "Arts" },
      { value: "History_of_Ukraine", label: "History of Ukraine" },
      { value: "Astronomy", label: "Astronomy" }
    ];
    // const teacherOption = [
    //   { value: "teacher01", label: "teacher 01" },
    //   { value: "teacher02", label: "teacher 02" },
    //   { value: "teacher03", label: "teacher 03" },
    //   { value: "teacher04", label: "teacher 04" }
    // ];
    const statusOptions = [
      { value: "public", label: "Public" },
      { value: "hidden", label: "Hidden" },
      { value: "archived", label: "Archived" }
    ];

    const tagOptions = [
      { value: "beginner", label: "Beginner" },
      { value: "advance", label: "Advance" },
      { value: "expert", label: "Expert" }
    ];
    return (
      <>
        <SelectMulti
          className={"mb-2"}
          placeholder={"Enter discipline here..."}
          id={"selectedDisciplines"}
          styles={selectStyleInput}
          value={selectedDisciplines}
          isMulti={true}
          onChange={this.disciplinesChange}
          options={disciplinesOptions}
        />
        <SelectMulti
          className={"mb-2"}
          placeholder={"Enter teacher here..."}
          id={"selectedDisciplines"}
          styles={selectStyleInput}
          value={selectedTeachers}
          isMulti={true}
          onChange={this.teacherChange}
          options={teacherOption}
        />
        <SelectMulti
          className={"mb-2"}
          placeholder={"Enter status here..."}
          id={"selectedDisciplines"}
          styles={selectStyleInput}
          value={selectedStatus}
          isMulti={true}
          onChange={this.statusChange}
          options={statusOptions}
        />
        <SelectMulti
          className={"mb-2"}
          placeholder={"Enter tag here..."}
          id={"selectedDisciplines"}
          styles={selectStyleInput}
          value={selectedTags}
          isMulti={true}
          onChange={this.tagChange}
          options={tagOptions}
        />
      </>
    );
  }
  renderLessonDetail(el) {
    const {
      author,
      content,
      created,
      discipline,
      img,
      imgdesc,
      language,
      programName,
      tag,
      teacher,
      title,
      type,
      _id
    } = el;
    return (
      <div>
        <h3 className="lession-title font-weight-bold">{title}</h3>
        <p className="lession-auther-name">{author}</p>
        {[""].map((el, index) => {
          return (
            <p key={index} className="lession-content">
              {content}
            </p>
          );
        })}
        {img && (
          <div className="lession-image-wrap">
            <p className="lession-image-desc">{imgdesc}</p>
            <div className="lession-image-inner">
              <img
                src={img ? img : "http://via.placeholder.com/700x500"}
                className="img-fluid"
                alt="image"
              />
            </div>
          </div>
        )}
      </div>
    );
  }
  renderTasks(lession) {
    const { lessionTask, selectedLesson } = this.state;

    return (
      <div className="h100 overflow-hidden">
        <div className="scroller-wrapper lessions-scroller">
          <div className="scroller-inner">
            <h2>TASK</h2>
            {/* <h3>Lesson 1. Art genious and their legacy.</h3> */}
            <h3>{selectedLesson && selectedLesson.title}</h3>
            {/* <h6>Leonardo da Vinci</h6> */}
            <h6>{selectedLesson && selectedLesson.author}</h6>
            {lessionTask.map((el, index) => {
              return (
                <div key={index} className={"task"}>
                  <h5>
                    {index + 1}. {el.question}
                  </h5>
                  <div>
                    {this.returnQuestionRadio(el, "question" + index, index)}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
  sortArr(arr, key, acc = true) {
    let sorterEl = acc ? -1 : 1;
    return arr.sort((a, b) => {
      if (a[key].toLocaleLowerCase() < b[key].toLocaleLowerCase())
        return sorterEl;
      if (a[key].toLocaleLowerCase() > b[key].toLocaleLowerCase())
        return sorterEl * -1;
      return 0;
    });
  }
  sortLessonsByName() {
    // let lessions = this.sortArr(this.state.lessions, "title", false)
    this.setState(
      prevState => ({
        lessions: this.sortArr(prevState.lessions, "title", prevState.nameAcc),
        nameAcc: !prevState.nameAcc
      }),
      () => {
        this.filterLesson();
      }
    );
  }
  sortLessionsByDate() {
    this.setState(
      prevState => ({
        lessions: this.sortArr(
          prevState.lessions,
          "created",
          prevState.dateAcc
        ),
        dateAcc: !prevState.dateAcc
      }),
      this.filterLesson
    );
  }
  returnQuestionRadio(task, id, arrIndex) {
    const { options, selectedOption } = task;
    return options.map((el, index) => {
      return (
        <div
          key={index}
          className={classNames("inputs agree-input", {
            // "has-errors": agree_tf_isValid
          })}
        >
          <input
            className="input-checkbox"
            id={"option" + id + index}
            name={id}
            value={el + index}
            type="checkbox"
            checked={selectedOption === el + index}
            onChange={e => {
              this.handleCheckBoxChange(e, arrIndex);
            }}
          />
          <span className="checkbox-span" />
          <label
            className="label checkbox-label"
            htmlFor={"option" + id + index}
          >
            {el}
          </label>
          {/* {agree_tf_isValid && (
          <span className="error-msg">{agree_tf_errMsg}</span>
        )} */}
        </div>
      );
    });
  }
  render() {
    const {
      searchCollapse,
      filterCollapse,
      searchText,
      filteredLessons,
      selectedLesson,
      isTaskOpen,
      nameAcc,
      dateAcc
    } = this.state;
    return (
      <div className="container-fluid h100">
        <div className="row h100">
          <div className="col-lg-4 pt-2 pt-lg-0 pb-2 h100 pb-lg-0">
            <Card
              title="Content"
              sorter={[
                {
                  title: "Name",
                  onClick: this.sortLessonsByName,
                  assinding: nameAcc
                },
                {
                  title: "Date",
                  onClick: this.sortLessionsByDate,
                  assinding: dateAcc
                }
              ]}
              className="h100"
            >
              <div className={"manage-card-inner-body h100"}>
                <div className="lessions-scroller scroller-wrapper">
                  <div className="top-fix">
                    <div className={"inputs"}>
                      <label className="label has-icon full d-flex justify-content-between">
                        Search
                        <span className="filter-icon">
                          <Icon
                            onClick={this.toggleSearchCollapse}
                            icon={
                              searchCollapse ? ic_expand_less : ic_expand_more
                            }
                            size={24}
                          />
                        </span>
                      </label>
                      <Collapse isOpen={searchCollapse}>
                        <input
                          type="text"
                          id="contentSearch"
                          className={"input"}
                          placeholder="Enter name here..."
                          value={searchText}
                          onChange={this.changeSearchText}
                        />
                      </Collapse>
                    </div>
                    <div className={"inputs pb-0"}>
                      <label className="label has-icon full d-flex justify-content-between">
                        Filters
                        <span className="filter-icon">
                          <Icon
                            onClick={this.toggleFilterCollapse}
                            icon={
                              filterCollapse ? ic_expand_less : ic_expand_more
                            }
                            size={24}
                          />
                        </span>
                      </label>
                      <Collapse isOpen={filterCollapse}>
                        {this.renderFilterOptions()}
                      </Collapse>
                    </div>
                  </div>
                  <div className="scroller-inner">
                    {this.renderLessonsInCard(filteredLessons)}
                  </div>
                </div>
              </div>
            </Card>
          </div>
          {selectedLesson._id && (
            <div className="col-lg-8 pt-2 pt-lg-0 pb-2 h100 pb-lg-0">
              <div className="h100 card-toggler text-secondary">
                <Card
                  noHeader={true}
                  title="Content"
                  onClick={() => {
                    if (isTaskOpen) {
                      this.toggletask();
                    }
                  }}
                  className={classNames("h100 noheader", {
                    closed: isTaskOpen,
                    opened: !isTaskOpen
                  })}
                >
                  {!isTaskOpen && this.renderLessonDetail(selectedLesson)}
                  {isTaskOpen && (
                    <div className="card-opener left">
                      <Icon icon={ic_expand_less} size={24} />
                      <p className="h4">Lessons</p>
                    </div>
                  )}
                </Card>
                <Card
                  noHeader={true}
                  title="Content"
                  onClick={() => {
                    if (!isTaskOpen) {
                      this.toggletask();
                    }
                  }}
                  className={classNames("h100 noheader", {
                    closed: !isTaskOpen,
                    opened: isTaskOpen
                  })}
                >
                  {!isTaskOpen && (
                    <div className="card-opener right">
                      <Icon icon={ic_expand_less} size={24} />
                      <p className="h4">Tasks</p>
                    </div>
                  )}
                  {isTaskOpen && this.renderTasks()}
                </Card>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}
