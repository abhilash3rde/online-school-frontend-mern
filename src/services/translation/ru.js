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
    logo: require("../../assets/logo/SVG/logo(ru).svg")
  },
  banner: {
    USDE: "YШДO",
    Biggest_online_school: "Крупнейшая онлайн-школа дистанционного обучения.",
    REGISTER_NOW: "ЗАРЕГИСТРИРОВАТЬСЯ",
    logo: require("../../assets/logo/SVG/logo-full(ru).svg")
  },
  discipline: {
    more_than: "Более 100+ дисциплин",
    our_service:
      "Наш сервис предоставляет вам расширенную школьную программу для всех классов и имеет множество дополнительных материалов."
  },
  dashboardMenus: [
    {
      name: "Приборная доска",
      key: "Dashboard",
      link: "/Dashboard",
      icon: Dashboard_icon //"http://via.placeholder.com/50x50"
    },
    {
      name: "Управление пользователями",
      key: "User_management",
      link: "/Dashboard/User_management",
      icon: UserManage_icon //"http://via.placeholder.com/50x50"
    },
    {
      name: "Управление содержанием",
      key: "Content_management",
      link: "/Dashboard/Content_management",
      icon: Content_icon //"http://via.placeholder.com/50x50"
    },
    {
      name: "Управление учебной программой",
      key: "Study_program_management",
      link: "/Dashboard/Study_program_management",
      icon: ProgramManage_icon //"http://via.placeholder.com/50x50"
    },
    {
      name: "Управление классом",
      key: "Class_management",
      link: "/Dashboard/Class_management",
      icon: "http://via.placeholder.com/50x50"
    },
    {
      name: "Решение проблем",
      key: "Problem_solving",
      link: "/Dashboard/Problem_solving",
      icon: ClassManage_icon //"http://via.placeholder.com/50x50"
    },
    {
      name: "Контент-конструктор",
      key: "Content_constructor",
      link: "/Dashboard/Content_constructor",
      icon: ContentConstruct_icon //"http://via.placeholder.com/50x50"
    },
    {
      name: "Учебная программа-конструктор",
      key: "Study_program_constructor",
      link: "/Dashboard/Study_program_constructor",
      icon: ProgramConstruct_icon //"http://via.placeholder.com/50x50"
    },
    {
      name: "Класс конструктор",
      key: "Class_constructor",
      link: "/Dashboard/Class_constructor",
      icon: ClassConstruct_icon //"http://via.placeholder.com/50x50"
    },
    {
      name: "аналитика",
      key: "Analitics",
      link: "/Dashboard/Analitics",
      icon: Analitics_icon //"http://via.placeholder.com/50x50"
    }
  ],
  labels: {
    admin: "Администратор",
    teacher: "учитель",
    teachers: "Учителя",
    parent: "родитель",
    parents: "Родители",
    students: "Ученики",
    createAdmin: "Создать админа",
    editAdmin: "Изменить администратора",
    newteachers: "Новые учителя",
    createteacher: "СОЗДАТЬ УЧИТЕЛЯ",
    editteacher: "РЕДАКТИРОВАТЬ УЧИТЕЛЯ",
    createparent: "Создать Родителя",
    editparent: "Редактировать Родителя",
    createstudent: "Создать ученика",
    editstudent: "Редактировать студента",
    approve: "УТВЕРДИТЬ",
    decline: "СНИЖЕНИЕ",
    chat: "Chat",
    searchuser: "Поиск пользователя",
    email: "е-мейл",
    password: "пароль",
    save: "Сохранить",
    searchconversation: "Поиск разговора",
    hello: "Привет",
    opencalendar: "ОТКРЫТЫЙ КАЛЕНДАРЬ",
    progress: "Прогресс",
    todolist: "Список дел",
    todo: "Сделать",
    login: "Авторизоваться",
    completed: "Завершенный",
    forgotpassword: "Забыли пароль",
    tasks: "задачи",
    enterNameHere: "Введите имя здесь"
  }
};
