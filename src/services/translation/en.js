import Dashboard_icon from "../../assets/icons/dashboard.svg";
import Content_icon from "../../assets/icons/content_manage.svg";
import UserManage_icon from "../../assets/icons/user_manage.svg";
import ProgramManage_icon from "../../assets/icons/user_manage.svg";
import ClassManage_icon from "../../assets/icons/class_manage.svg";
import ContentConstruct_icon from "../../assets/icons/content_edit.svg";
import ProgramConstruct_icon from "../../assets/icons/plan_edit.svg";
import ClassConstruct_icon from "../../assets/icons/class_edit.svg";
import Analitics_icon from "../../assets/icons/analitics.svg";
export default {
  header: {
    logo: require("../../assets/logo/SVG/logo(en).svg")
  },
  banner: {
    USDE: "USDE",
    Biggest_online_school: "Biggest online school for distance education.",
    REGISTER_NOW: "REGISTER NOW",
    logo: require("../../assets/logo/SVG/logo-full(en).svg")
  },
  discipline: {
    more_than: "More than 100+ disciplines",
    our_service:
      "Our service provide you with extended school program for all grades and has a lot of additional materials."
  },
  dashboardMenus: [
    {
      name: "Dashboard",
      key: "Dashboard",
      link: "/Dashboard",
      icon: Dashboard_icon //|| "http://via.placeholder.com/50x50"
    },
    {
      name: "User management",
      key: "User_management",
      link: "/Dashboard/User_management",
      icon: UserManage_icon //"http://via.placeholder.com/50x50"
    },
    {
      name: "Content management",
      key: "Content_management",
      link: "/Dashboard/Content_management",
      icon: Content_icon //"http://via.placeholder.com/50x50"
    },
    {
      name: "Study program management",
      key: "Study_program_management",
      link: "/Dashboard/Study_program_management",
      icon: ProgramManage_icon //"http://via.placeholder.com/50x50"
    },
    {
      name: "Class management",
      key: "Class_management",
      link: "/Dashboard/Class_management",
      icon: ClassManage_icon //"http://via.placeholder.com/50x50"
    },
    {
      name: "Problem solving",
      key: "Problem_solving",
      link: "/Dashboard/Problem_solving",
      icon: "http://via.placeholder.com/50x50"
    },
    {
      name: "Content constructor",
      key: "Content_constructor",
      link: "/Dashboard/Content_constructor",
      icon: ContentConstruct_icon //"http://via.placeholder.com/50x50"
    },
    {
      name: "Study program constructor",
      key: "Study_program_constructor",
      link: "/Dashboard/Study_program_constructor",
      icon: ProgramConstruct_icon //"http://via.placeholder.com/50x50"
    },
    {
      name: "Class constructor",
      key: "Class_constructor",
      link: "/Dashboard/Class_constructor",
      icon: ClassConstruct_icon //"http://via.placeholder.com/50x50"
    },
    {
      name: "Analitics",
      key: "Analitics",
      link: "/Dashboard/Analitics",
      icon: Analitics_icon //"http://via.placeholder.com/50x50"
    }
  ],
  labels: {
    admin: "Admin",
    teacher: "Teacher",
    teachers: "Teachers",
    parent: "Parent",
    parents: "Parents",
    students: "Students",
    createAdmin: "Create Admin",
    editAdmin: "Edit Admin",
    newteachers: "New Teachers",
    createteacher: "Create Teacher",
    editteacher: "Edit Teacher",
    createparent: "Create Parent",
    editparent: "Edit Parent",
    createstudent: "Create Student",
    editstudent: "Edit Student",
    approve: "APPROVE",
    decline: "DECLINE",
    chat: "Chat",
    searchuser: "Search user",
    email: "Email",
    password: "Password",
    save: "Save",
    searchconversation: "Search conversation",
    hello: "Hello",
    opencalendar: "OPEN CALENDAR",
    progress: "Progress",
    todolist: "To do list",
    todo: "To do",
    completed: "Completed",
    tasks: "tasks",
    login: "Login",
    forgotpassword: "Forgot Password",
    enterNameHere: "Enter name here"
  }
};
