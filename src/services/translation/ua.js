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
    logo: require("../../assets/logo/SVG/logo(ua).svg")
  },
  banner: {
    USDE: "YШДO",
    Biggest_online_school: "Найбільша онлайн школа для дистанційної освіти.",
    REGISTER_NOW: "РЕЄСТРАЦІЯ ЗАРАЗ",
    logo: require("../../assets/logo/SVG/logo-full(ua).svg")
  },
  discipline: {
    more_than: "Більше 100 + дисциплін",
    our_service:
      "Наш сервіс надає Вам розширену шкільну програму для всіх класів і має багато додаткових матеріалів."
  },
  dashboardMenus: [
    {
      name: "Панель приладів",
      key: "Dashboard",
      link: "/Dashboard",
      icon: Dashboard_icon //"http://via.placeholder.com/50x50"
    },
    {
      name: "Управління користувачами",
      key: "User_management",
      link: "/Dashboard/User_management",
      icon: UserManage_icon //"http://via.placeholder.com/50x50"
    },
    {
      name: "Управління контентом",
      key: "Content_management",
      link: "/Dashboard/Content_management",
      icon: Content_icon //"http://via.placeholder.com/50x50"
    },
    {
      name: "Управління навчальною програмою",
      key: "Study_program_management",
      link: "/Dashboard/Study_program_management",
      icon: ProgramManage_icon //"http://via.placeholder.com/50x50"
    },
    {
      name: "Керування класом",
      key: "Class_management",
      link: "/Dashboard/Class_management",
      icon: ClassManage_icon //"http://via.placeholder.com/50x50"
    },
    {
      name: "Вирішення проблем",
      key: "Problem_solving",
      link: "/Dashboard/Problem_solving",
      icon: "http://via.placeholder.com/50x50"
    },
    {
      name: "Зміст замовника",
      key: "Content_constructor",
      link: "/Dashboard/Content_constructor",
      icon: ContentConstruct_icon //"http://via.placeholder.com/50x50"
    },
    {
      name: "Програма навчання учня",
      key: "Study_program_constructor",
      link: "/Dashboard/Study_program_constructor",
      icon: ProgramConstruct_icon //"http://via.placeholder.com/50x50"
    },
    {
      name: "Клас витратолаг",
      key: "Class_constructor",
      link: "/Dashboard/Class_constructor",
      icon: ClassConstruct_icon //"http://via.placeholder.com/50x50"
    },
    {
      name: "Analytics",
      key: "Analitics",
      link: "/Dashboard/Analitics",
      icon: Analitics_icon //"http://via.placeholder.com/50x50"
    }
  ],
  labels: {
    admin: "Адміністратор",
    teacher: "Вчитель",
    teachers: "Вчителі",
    parent: "Батько",
    parents: "Батьки",
    students: "Студенти",
    createAdmin: "Створити адміністратора",
    editAdmin: "Редагувати адміністратора",
    newteachers: "Нові вчителі",
    createteacher: "Створити вчителя",
    editteacher: "Редагувати вчителя",
    createparent: "Створити батьківську",
    editparent: "Редагувати батьків",
    createstudent: "Створити студента",
    editstudent: "Редагувати студента",
    approve: "ЗАТВЕРДИТИ",
    decline: "ДЕРЖАТИ",
    chat: "Чат",
    searchuser: "Поиск пользователя",
    email: "електронна пошта",
    password: "Пароль",
    save: "Зберегти",
    searchconversation: "Пошук розмови",
    hello: "Здрастуйте",
    opencalendar: "ВІДКРИТИЙ КАЛЕНДАР",
    progress: "Прогрес",
    todolist: "Список справ",
    todo: "Зробити",
    login: "Вхід",
    forgotpassword: "Забули пароль",
    completed: "Завершено",
    tasks: "завдання",
    enterNameHere: "Введіть назву тут"
  }
};
