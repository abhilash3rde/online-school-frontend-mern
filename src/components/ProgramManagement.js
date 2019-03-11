import React, { Component } from "react";
import classNames from "classnames";
import { Collapse } from "reactstrap";
import SelectMulti from "react-select";
import moment from "moment";
import { Card, Calander } from "./";
import { selectStyleInput } from "../services/Constants";
import {
  getAllTeachersApi,
  getAllProgramsApi,
  getLessonsByProgramApi,
  changeLessonTypeApi,
  changeProgramTypeApi
} from "../services/api";
import Icon from "react-icons-kit";
import validator from "validator";
import {
  ic_expand_less,
  ic_chevron_left,
  ic_expand_more
} from "react-icons-kit/md";

export class ProgramManagement extends Component {
  constructor(props) {
    super(props);
    this.getLessonsListFromState = this.getLessonsListFromState.bind(this);
    this.getLessonsList = this.getLessonsList.bind(this);
    this.getPrograms = this.getPrograms.bind(this);
    this.selectLesson = this.selectLesson.bind(this);
    this.selectProgram = this.selectProgram.bind(this);
    this.filterPrograms = this.filterPrograms.bind(this);
    this.toggleFilterCollapse = this.toggleFilterCollapse.bind(this);
    this.toggleProgramFilterCollapse = this.toggleProgramFilterCollapse.bind(
      this
    );
    this.toggleProgramSearchCollapse = this.toggleProgramSearchCollapse.bind(
      this
    );
    this.toggleSearchCollapse = this.toggleSearchCollapse.bind(this);
    this.changeLessionType = this.changeLessionType.bind(this);
    this.changeProgramType = this.changeProgramType.bind(this);
    this.getTeachers = this.getTeachers.bind(this);
    this.sortLessonsByName = this.sortLessonsByName.bind(this);
    this.sortLessonsByDate = this.sortLessonsByDate.bind(this);
    this.sortProgramsByName = this.sortProgramsByName.bind(this);
    this.sortProgramsByDate = this.sortProgramsByDate.bind(this);
    this.state = {
      programSearchCollapse: false,
      programFilterCollapse: false,
      programSearchText: "",
      searchCollapse: false,
      filterCollapse: false,
      searchText: "",

      selectedProgramDisciplines: null,
      selectedProgramTeachers: null,
      selectedProgramStatus: null,
      selectedProgramTags: null,

      selectedDisciplines: null,
      selectedTeachers: null,
      selectedStatus: null,
      selectedTags: null,

      lessons: [],
      programs: [],
      filteredLessons: [],
      filteredPrograms: [],
      selectedProgram: {},
      selectedLesson: {},
      lessonTask: [],
      teacherOption: [],
      showCalander: false,
      nameAcc: true,
      nameAccP: true,
      dateAcc: true,
      dateAccP: true
    };
  }
  componentWillMount() {
    this.getPrograms();
    this.getTeachers();
  }

  getPrograms() {
    getAllProgramsApi()
      .then(res => res.json())
      .then(resJson => {
        console.log({ resJson });
        // const { status, lessons } = resJson;
        // if (status) {
        this.setState(
          {
            programs: resJson //[0].lessons
          },
          () => {
            // console.log({progra : this.state.programs})
            this.filterPrograms();
          }
        );
        // }
      });
  }
  filterLesson() {
    const {
      lessons,
      searchText: query,
      selectedDisciplines,
      selectedTeachers,
      selectedTags,
      selectedStatus
    } = this.state;
    let users = []; //= adminList
    lessons.map(el => {
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
  filterPrograms() {
    const {
      programs,
      programSearchText: query,
      selectedProgramDisciplines,
      selectedProgramTeachers,
      selectedProgramStatus,
      selectedProgramTags
    } = this.state;
    let users = []; //= adminList
    programs.map(el => {
      let item = el;
      const { title } = el;
      item.searchableString = `${title} `;
      users.push(item);
      return null;
    });

    users = this.filterFromSelectedStr(
      users,
      selectedProgramTeachers,
      "teacher"
    );
    users = this.filterFromSelected(
      users,
      selectedProgramDisciplines,
      "discipline"
    );
    users = this.filterFromSelected(users, selectedProgramTags, "tag");
    users = this.filterFromSelectedStr(users, selectedProgramStatus, "type");

    users = users.filter(function(user) {
      return (
        user.searchableString.toLowerCase().indexOf(query.toLowerCase()) !== -1
      ); // returns true or false
    });
    // console.log({users, programs})
    this.setState({ filteredPrograms: users });
  }
  toggleSearchCollapse() {
    this.setState(prevState => ({
      searchCollapse: !prevState.searchCollapse
    }));
  }
  toggleProgramSearchCollapse() {
    this.setState(prevState => ({
      programSearchCollapse: !prevState.programSearchCollapse
    }));
  }
  toggleFilterCollapse() {
    this.setState(prevState => ({
      filterCollapse: !prevState.filterCollapse
    }));
  }
  toggleProgramFilterCollapse() {
    this.setState(prevState => ({
      programFilterCollapse: !prevState.programFilterCollapse
    }));
  }
  changeSearchText = e => {
    this.setState({ searchText: e.target.value }, () => {
      this.filterLesson();
    });
  };
  changeProgramSearchText = e => {
    this.setState({ programSearchText: e.target.value }, () => {
      this.filterPrograms();
    });
  };
  disciplinesChange = selectedDisciplines => {
    this.setState({ selectedDisciplines }, this.filterLesson);
  };
  programDisciplinesChange = selectedProgramDisciplines => {
    this.setState({ selectedProgramDisciplines }, this.filterPrograms);
  };
  teacherChange = selectedTeachers => {
    this.setState({ selectedTeachers }, this.filterLesson);
  };
  programTeacherChange = selectedProgramTeachers => {
    this.setState({ selectedProgramTeachers }, this.filterPrograms);
  };
  statusChange = selectedStatus => {
    this.setState({ selectedStatus }, this.filterLesson);
  };
  programStatusChange = selectedProgramStatus => {
    this.setState({ selectedProgramStatus }, this.filterPrograms);
  };
  tagChange = selectedTags => {
    this.setState({ selectedTags }, this.filterLesson);
  };
  programTagChange = selectedProgramTags => {
    this.setState({ selectedProgramTags }, this.filterPrograms);
  };

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
          return selectedArr.some(selectedEl => {
            if (el[key]) {
              return selectedEl.label.toLowerCase() === el[key].toLowerCase();
            }
          });
        });
      }
    }

    return newArr;
  }
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
  renderProgramFilterOptions() {
    const {
      selectedProgramDisciplines,
      selectedProgramTeachers,
      selectedProgramStatus,
      selectedProgramTags,
      teacherOption
    } = this.state;
    const disciplinesOptions = [
      { value: "Math", label: "Math" },
      { value: "Arts", label: "Arts" },
      { value: "Art_graphics", label: "Art graphics" },
      { value: "History_of_Ukraine", label: "History of Ukraine" },
      { value: "Astronomy", label: "Astronomy" }
    ];
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
          value={selectedProgramDisciplines}
          isMulti={true}
          onChange={this.programDisciplinesChange}
          options={disciplinesOptions}
        />
        <SelectMulti
          className={"mb-2"}
          placeholder={"Enter teacher here..."}
          id={"selectedDisciplines"}
          styles={selectStyleInput}
          value={selectedProgramTeachers}
          isMulti={true}
          onChange={this.programTeacherChange}
          options={teacherOption}
        />
        <SelectMulti
          className={"mb-2"}
          placeholder={"Enter status here..."}
          id={"selectedDisciplines"}
          styles={selectStyleInput}
          value={selectedProgramStatus}
          isMulti={true}
          onChange={this.programStatusChange}
          options={statusOptions}
        />
        <SelectMulti
          className={"mb-2"}
          placeholder={"Enter tag here..."}
          id={"selectedDisciplines"}
          styles={selectStyleInput}
          value={selectedProgramTags}
          isMulti={true}
          onChange={this.programTagChange}
          options={tagOptions}
        />
      </>
    );
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
      { value: "Arts", label: "Arts" },
      { value: "Art_graphics", label: "Art graphics" },
      { value: "History_of_Ukraine", label: "History of Ukraine" },
      { value: "Astronomy", label: "Astronomy" }
    ];
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

  // selectCard(key) {
  //   const { selectedLesson } = this.state;
  //   if (selectedLesson._id === key._id) {
  //     this.setState({
  //       selectedLesson: {}
  //     });
  //     return;
  //   }
  //   this.setState(
  //     {
  //       selectedLesson: key
  //     },
  //     () => {
  //       this.initQuestions();
  //     }
  //   );
  // }
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
    // let lessons = this.sortArr(this.state.lessons, "title", false)
    this.setState(
      prevState => ({
        lessons: this.sortArr(prevState.lessons, "title", prevState.nameAcc),
        nameAcc: !prevState.nameAcc
      }),
      () => {
        this.filterLesson();
      }
    );
  }
  sortLessonsByDate() {
    this.setState(
      prevState => ({
        lessons: this.sortArr(prevState.lessons, "created", prevState.dateAcc),
        dateAcc: !prevState.dateAcc
      }),
      this.filterLesson
    );
  }
  sortProgramsByName() {
    // let lessons = this.sortArr(this.state.lessons, "title", false)
    this.setState(
      prevState => ({
        programs: this.sortArr(prevState.programs, "title", prevState.nameAccP),
        nameAccP: !prevState.nameAccP
      }),
      () => {
        this.filterPrograms();
      }
    );
  }
  sortProgramsByDate() {
    this.setState(
      prevState => ({
        programs: this.sortArr(
          prevState.programs,
          "created",
          prevState.dateAccP
        ),
        dateAccP: !prevState.dateAccP
      }),
      this.filterPrograms
    );
  }
  getLessonsList(title) {
    getLessonsByProgramApi(title)
      .then(res => res.json())
      .then(resJson => {
        console.log({ resJson });
        const {
          status,
          user: { lessons }
        } = resJson;
        if (status) {
          this.setState(
            {
              lessons: lessons
            },
            () => {
              this.filterLesson();
            }
          );
        }
      });
  }
  getLessonsListFromState(arr) {
    this.setState(
      {
        lessons: arr
      },
      () => {
        this.filterLesson();
      }
    );
  }
  selectProgram(key) {
    console.log(key);
    const { selectedProgram } = this.state;
    if (selectedProgram._id === key._id) {
      this.setState(
        {
          selectedProgram: {},
          lessons: []
        },
        () => {
          this.filterLesson();
        }
      );
      return;
    }
    this.setState(
      {
        selectedProgram: key
      },
      () => {
        // this.initQuestions();
        this.getLessonsListFromState(key.lessons);
        // this.getLessonsList(key.title)
      }
    );
  }
  selectLesson(key) {
    const { selectedLesson } = this.state;
    if (selectedLesson._id === key._id) {
      this.setState(
        {
          selectedLesson: {}
        },
        () => {
          this.filterLesson();
        }
      );
      return;
    }
    this.setState(
      {
        selectedLesson: key
      },
      () => {
        // this.initQuestions();
        // this.getLessonsList(key.title)
      }
    );
  }

  changeLessionType(title, type) {
    changeLessonTypeApi(title, type)
      .then(res => res.json())
      .then(resjson => {
        const { status } = resjson;
        const {
          selectedProgram: { title }
        } = this.state;
        // if(status){

        // }
        this.setState(
          {
            selectedLesson: {}
          },
          () => {
            console.log(this.state.selectedProgram);
            this.getLessonsList(title);
            // this.initQuestions()
          }
        );
      });
  }
  changeProgramType(title, type) {
    changeProgramTypeApi(title, type)
      .then(res => res.json())
      .then(resjson => {
        const { status } = resjson;
        const {
          selectedProgram: { title }
        } = this.state;
        // if(status){

        // }
        this.setState(
          {
            selectProgram: {}
          },
          () => {
            // console.log(this.state.selectedProgram)
            this.getPrograms();
            // this.initQuestions()
          }
        );
      });
  }
  renderCardInfo(program) {
    const { title, author, lessons, createdOn } = program;
    return (
      <div className="card-shadow text-secondary progam-info-wrapper font-ar text-left">
        <h3 className="font-weight-bold mb-0">{title}</h3>
        <p className="font-weight-bold">{author}</p>
        <div className="progam-info font-tin">
          <h5>Lessons: {lessons.length}</h5>
          <h5>Live Lessons: {5}</h5>
          <h5>Exams: {5}</h5>
          <h5>From: {moment(createdOn).format("DD.MM.YYYY")}</h5>
          <h5>To: {`09.05.2019`}</h5>
        </div>
      </div>
    );
  }
  renderLessonsInCard(arr, isProgram = false) {
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
      const { selectedLesson, selectedProgram } = this.state;
      let selectedCard = isProgram ? selectedProgram : selectedLesson;
      let cardTitle = isProgram ? programName : title;
      const btnsetting = (name, role, selectedLessonKey) => {
        let selectedThis = false;
        if (selectedCard !== null) {
          selectedThis = selectedCard._id === selectedLessonKey;
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
            "text-white bg-secondary": selectedCard._id === _id,
            "text-secondary": selectedCard._id !== _id,
            "bg-success":
              type.toLowerCase() === "hidden" && selectedCard._id !== _id
          })}
          onClick={() => {
            if (isProgram) {
              this.selectProgram(el);
            } else {
              this.selectLesson(el);
            }
          }}
        >
          <div className="user-card-info">
            <div className="user-card-name">
              <p className="h5 font-weight-bold">{title}</p>
              <p className="small-info font-tin font-italic">
                {!isProgram && discipline.map(el => el)}
                {isProgram && discipline}
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
                if (!isProgram) this.changeLessionType(title, "public");
                else this.changeProgramType(title, "public");
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
                if (!isProgram) this.changeLessionType(title, "hidden");
                else this.changeProgramType(title, "hidden");
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
                if (!isProgram) this.changeLessionType(title, "archived");
                else this.changeProgramType(title, "archived");
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
  render() {
    const {
      programSearchCollapse,
      programFilterCollapse,
      programSearchText,
      filteredPrograms,
      filteredLessons,
      searchCollapse,
      filterCollapse,
      searchText,
      selectedProgram,
      showCalander,
      nameAcc,
      nameAccP,
      dateAcc,
      dateAccP
    } = this.state;
    if (showCalander) {
      return (
        <div className="container-fluid h100">
          <div className="row h100">
            <div className=" col-lg-2 d-flex justify-content-center card-toggler">
              <Card
                noHeader={true}
                title="Programs"
                onClick={e => {
                  e.preventDefault();
                  this.setState({
                    showCalander: false
                  });
                }}
                className={classNames("h100 noheader closed", {
                  // closed: !isTaskOpen,
                  // opened: isTaskOpen
                })}
              >
                <div className="card-opener left text-secondary">
                  <Icon icon={ic_expand_less} size={24} />
                  <p className="h4">Programs</p>
                </div>
                {/* {isTaskOpen && this.renderTasks()} */}
              </Card>
            </div>
            <div className="col-lg-10">
              <Calander />
            </div>
          </div>
        </div>
      );
    }
    return (
      <div className="container-fluid h100">
        <div className="row h100">
          <div className="col-lg-4 pt-2 pt-lg-0 pb-2 h100 pb-lg-0">
            <Card
              title="Programs"
              sorter={[
                {
                  title: "Name",
                  onClick: this.sortProgramsByName,
                  assinding: nameAccP
                },
                {
                  title: "Date",
                  onClick: this.sortProgramsByDate,
                  assinding: dateAccP
                }
              ]}
              className="h100"
            >
              <div className={"manage-card-inner-body h100"}>
                <div className="lessons-scroller scroller-wrapper">
                  <div className="top-fix">
                    <div className={"inputs"}>
                      <label
                        className="label has-icon full d-flex justify-content-between"
                        // onClick={this.toggleProgramSearchCollapse}
                      >
                        Search
                        <span className="filter-icon">
                          <Icon
                            onClick={this.toggleProgramSearchCollapse}
                            icon={
                              programSearchCollapse
                                ? ic_expand_less
                                : ic_expand_more
                            }
                            size={24}
                          />
                        </span>
                      </label>
                      <Collapse isOpen={programSearchCollapse}>
                        <input
                          type="text"
                          id="contentSearch"
                          className={"input"}
                          placeholder="Enter name here..."
                          value={programSearchText}
                          onChange={this.changeProgramSearchText}
                        />
                      </Collapse>
                    </div>
                    <div className={"inputs pb-0"}>
                      <label
                        className="label has-icon full d-flex justify-content-between"
                        // onClick={this.toggleProgramFilterCollapse}
                      >
                        Filters
                        <span className="filter-icon">
                          <Icon
                            onClick={this.toggleProgramFilterCollapse}
                            icon={
                              programFilterCollapse
                                ? ic_expand_less
                                : ic_expand_more
                            }
                            size={24}
                          />
                        </span>
                      </label>
                      <Collapse isOpen={programFilterCollapse}>
                        {this.renderProgramFilterOptions()}
                      </Collapse>
                    </div>
                  </div>
                  <div className="scroller-inner">
                    {this.renderLessonsInCard(filteredPrograms, true)}
                  </div>
                </div>
              </div>
            </Card>
          </div>
          <div className="col-lg-4 pt-2 pt-lg-0 pb-2 h100 pb-lg-0">
            <Card
              title="Lessons"
              sorter={[
                {
                  title: "Name",
                  onClick: this.sortLessonsByName,
                  assinding: nameAcc
                },
                {
                  title: "Date",
                  onClick: this.sortLessonsByDate,
                  assinding: dateAcc
                }
              ]}
              className="h100"
            >
              <div className={"manage-card-inner-body h100"}>
                <div className="lessons-scroller scroller-wrapper">
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
          <div className="col-lg-4 pt-2 pt-lg-0 pb-2 h100 pb-lg-0">
            <div className="vetical-card-wrapper">
              {selectedProgram._id && this.renderCardInfo(selectedProgram)}
              {selectedProgram._id && (
                <div
                  onClick={e => {
                    e.preventDefault();
                    this.setState({
                      showCalander: true
                    });
                  }}
                  className="card-shadow program-switcher text-secondary font-ar text-center"
                >
                  <Icon icon={ic_chevron_left} size={50} />
                  <h3 className="font-weight-bold">IN CALENDAR</h3>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
