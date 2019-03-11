import React, { Component } from "react";
import classNames from "classnames";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { PieChart, Legend } from "react-easy-chart";
import { colors } from "../services/Constants";
import { getTranslations } from "../services";
class DashboardStatusArea extends Component {
  constructor(props) {
    super(props);
    this.setChartData = this.setChartData.bind(this);
    this.state = {
      task: [
        {
          name: "Dashboard",
          key: "Dashboard",
          taskCount: 4,
          completed: true,
          visible: false,
          link: "/Dashboard"
        },
        {
          name: "User management",
          key: "User_management",
          taskCount: 4,
          completed: true,
          visible: true,
          link: "/Dashboard/User_management"
        },
        {
          name: "Content management",
          key: "Content_management",
          taskCount: 4,
          completed: false,
          visible: true,
          link: "/Dashboard/Content_management"
        },
        {
          name: "Study program management",
          key: "Study_program_management",
          taskCount: 4,
          completed: false,
          visible: true,
          link: "/Dashboard/Study_program_management"
        },
        {
          name: "Class management",
          key: "Class_management",
          taskCount: 4,
          completed: false,
          visible: true,
          link: "/Dashboard/Class_management"
        },
        {
          name: "Problem solving",
          key: "Problem_solving",
          taskCount: 4,
          completed: false,
          visible: true,
          link: "/Dashboard/Problem_solving"
        },
        {
          name: "Content constructor",
          key: "Content_constructor",
          taskCount: 4,
          completed: false,
          visible: false,
          link: "/Dashboard/Content_constructor"
        },
        {
          name: "Study program constructor",
          key: "Study_program_constructor",
          taskCount: 4,
          completed: false,
          visible: false,
          link: "/Dashboard/Study_program_constructor"
        },
        {
          name: "Class constructor",
          key: "Class_constructor",
          taskCount: 4,
          completed: false,
          visible: false,
          link: "/Dashboard/Class_constructor"
        },
        {
          name: "Analitics",
          key: "Analitics",
          taskCount: 4,
          completed: false,
          visible: false,
          link: "/Dashboard/Analitics"
        }
      ],

      chartData: [
        {
          key: getTranslations(this.props.langauge, "labels").todo || "To do",
          value: 35,
          color: colors.info
        },
        {
          key:
            getTranslations(this.props.langauge, "labels").completed ||
            "Completed",
          value: 65,
          color: colors.primary
        }
      ],
      chartDataPrgress: [{ key: "Completed", value: `${65}%` }],
      legendConfig: [{ color: colors.info }, { color: colors.primary }]
    };
  }
  componentDidMount() {
    // window.addEventListener('load', this.setChartData)
    // if(true){
    //   setTimeout(() => {
    //     this.setState({
    //       chartData: [
    //         { key: 'To do', value: 35, color: colors.info },
    //         { key: 'Completed', value: 65, color: colors.primary },
    //       ]
    //     })
    //   }, 400);
    // }
  }
  componentWillUnmount() {
    // window.removeEventListener('load', this.setChartData)
  }
  setChartData() {
    const langData = getTranslations(this.props.langauge, "labels");
    // setTimeout(() => {
    this.setState({
      chartData: [
        { key: langData && langData.todo, value: 35, color: colors.info },
        {
          key: langData && langData.completed,
          value: 65,
          color: colors.primary
        }
      ],
      chartDataPrgress: [{ key: "Completed", value: 65 }]
    });
    // }, 400);
  }
  renderTask = arr => {
    const langData = getTranslations(this.props.langauge, "dashboardMenus");
    const langLabel = getTranslations(this.props.langauge, "labels");
    return (
      <div className="todo-list-wrapper">
        {arr.map((el, index) => {
          if (!el.visible) return null;
          // console.log({el})

          return (
            <Link to={el.link} key={index}>
              <div
                className={classNames("todo-list", {
                  completed: el.completed
                })}
                onClick={() => {
                  // this.props.setActiveDashboard(el.key)
                }}
              >
                <div className="align-items-center justify-content-between d-flex">
                  <div className="todo-list-title">
                    <p className="font-ar">{langData[index].name}</p>
                  </div>
                  <div className="todo-list-count">
                    <p className="font-ar">
                      {el.completed ? (
                        <span />
                      ) : (
                        el.taskCount + " " + langLabel.tasks
                      )}
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    );
  };
  // scale = value => {
  //     // some color selection
  //     return ['black', 'red'];
  // };
  render() {
    const langData = getTranslations(this.props.langauge, "labels");
    const { chartData, legendConfig, chartDataPrgress } = this.state;
    const cusLegStyle = {
      ".legend li": {
        paddingLeft: "0"
      },
      ".legend .icon": {
        width: "20px",
        height: "20px",
        borderRadius: "0px",
        marginRight: "20px",
        position: "static",
        display: "inline-block",
        verticalAlign: "middle"
      }
    };
    return (
      <div className="dashboard-status-area">
        <div className="container-fluid">
          <div className="row justify-content-between ">
            <div className="col-md-6 ">
              <h4 className="text-secondary font-weight-bold font-ar">
                {langData && langData.todolist} :
              </h4>
              {this.renderTask(this.state.task)}
            </div>
            <div className="col-md-6">
              <h4 className="text-secondary font-weight-bold font-ar">
                {langData && langData.progress}
              </h4>
              <div className="chart-wrapper offset-lg-2">
                <div className="chart-container">
                  <PieChart data={chartData} size={260} innerHoleSize={200} />
                  <Legend
                    data={chartDataPrgress}
                    config={[{ color: "transparent" }]}
                    dataId={"value"}
                  />
                </div>
                <Legend
                  data={chartData}
                  styles={cusLegStyle}
                  config={legendConfig}
                  dataId={"key"}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
// export { DashboardStatusArea };
const mapStateToProps = state => {
  return state;
};
export default connect(mapStateToProps)(DashboardStatusArea);
