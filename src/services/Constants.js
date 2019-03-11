import FlagEn from "../assets/icons/flag(en).svg";
import FlagRu from "../assets/icons/flag(ru).svg";
import FlagUa from "../assets/icons/flag(ua).svg";
// import dashboardIcon from '../assets/icon/dashboard.svg';
// import usermanageIcon from '../assets/icon/user_manage.svg';
// import content_manageIcon from '../assets/icon/content_manage.svg';
// import class_manageIcon from '../assets/icon/class_manage.svg';
// import sutdyManageIcon from '../assets/icon/plan_manage.svg';
// import classContentIcon from '../assets/icon/plan_edit.svg';
export const baseUrl = process.env.REACT_APP_SERVER_URL;
export const Regex = {
  // email: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{2,21}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,21}[a-zA-Z0-9])?)*$/
  email: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]{2,21}\.)+[a-zA-Z]{2,21}))$/
};
export const getUserByIdfromList = (list = [], id = "") => {
  return list.find(el => {
    return el._id === id;
  });
};
export const dashboardMenus = [
  {
    name: "Dashboard",
    key: "Dashboard",
    link: "/Dashboard",
    icon: "http://via.placeholder.com/50x50"
  },
  {
    name: "User management",
    key: "User_management",
    link: "/Dashboard/User_management",
    icon: "http://via.placeholder.com/50x50"
  },
  {
    name: "Content management",
    key: "Content_management",
    link: "/Dashboard/Content_management",
    icon: "http://via.placeholder.com/50x50"
  },
  {
    name: "Study program management",
    key: "Study_program_management",
    link: "/Dashboard/Study_program_management",
    icon: "http://via.placeholder.com/50x50"
  },
  {
    name: "Class management",
    key: "Class_management",
    link: "/Dashboard/Class_management",
    icon: "http://via.placeholder.com/50x50"
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
    icon: "http://via.placeholder.com/50x50"
  },
  {
    name: "Study program constructor",
    key: "Study_program_constructor",
    link: "/Dashboard/Study_program_constructor",
    icon: "http://via.placeholder.com/50x50"
  },
  {
    name: "Class constructor",
    key: "Class_constructor",
    link: "/Dashboard/Class_constructor",
    icon: "http://via.placeholder.com/50x50"
  },
  {
    name: "Analitics",
    key: "Analitics",
    link: "/Dashboard/Analitics",
    icon: "http://via.placeholder.com/50x50"
  }
];
export const colors = {
  primary: "#4133b7",
  secondary: "#160c69",
  info: "#c5c0f0"
};
export const fonts = {
  mainfont: '"Arsenal", sans-sarif',
  subfont: '"Tinos", sans-sarif'
};
export const languageArray = [
  {
    code: "en",
    img: FlagEn, //"http://via.placeholder.com/30x15",
    name: "English"
  },
  {
    code: "ru",
    img: FlagRu, //"http://via.placeholder.com/30x15",
    name: "Russian"
  },
  {
    code: "ua",
    img: FlagUa, //"http://via.placeholder.com/30x15",
    name: "Ukrainian"
  }
];

export const selectStyle = {
  valueContainer: styles => ({
    ...styles,
    backgroundColor: "transparant",
    padding: 0
  }),
  control: (styles, { isFocused, isSelected }) => ({
    ...styles,
    minHeight: "50px",
    border: `2px solid ${colors.primary}`,
    borderRadius: "10px",
    paddingLeft: "0.8889rem ",
    boxShadow: isFocused ? 0 : 0,
    "&:hover": {
      border: `2px solid ${colors.primary}`
    }
  }),
  input: styles => ({
    ...styles,
    fontSize: "0.7778rem",
    "&:placeholder": {
      color: "rgba(65, 51, 183, 0.5)"
    }
  }),
  option: (styles, { data, isDisabled, isFocused, isSelected }) => {
    return {
      ...styles,
      fontFamily: fonts.mainfont,
      fontSize: "0.7778rem",
      color: colors.primary,
      backgroundColor: "transparent",
      cursor: "pointer",
      "&:hover": {
        backgroundColor: "rgba(197, 192, 240, 0.25)"
      }
    };
  },
  singleValue: styles => ({
    ...styles,
    fontFamily: "Arsenal",
    fontSize: "1rem",
    color: colors.primary,
    fontWeight: "bold"
  }),
  menu: styles => ({
    ...styles,
    borderRadius: "10px",
    border: `2px solid ${colors.primary}`,
    marginTop: 0,
    zIndex: 100
  }),
  multiValueLabel: styles => ({
    ...styles,
    fontFamily: "Arsenal",
    fontSize: "0.7778rem",
    color: colors.primary
  }),
  multiValue: styles => ({
    ...styles,
    border: `2px solid ${colors.primary}`,
    borderRadius: "10px",
    backgroundColor: "rgba(197, 192, 240, 0.25)",
    fontFamily: fonts.mainfont,
    fontSize: "0.7778rem",
    color: colors.primary
  }),
  multiValueRemove: styles => ({
    ...styles,
    cursor: "pointer",
    backgroundColor: "transparent",
    "&:hover": {
      backgroundColor: "transparent",
      color: colors.primary
    }
  })
};

export const selectStyleInput = {
  valueContainer: styles => ({
    ...styles,
    backgroundColor: "transparant",
    padding: 0
  }),
  control: (styles, { isFocused, isSelected }) => ({
    ...styles,
    minHeight: "50px",
    border: `2px solid ${colors.primary}`,
    borderRadius: "10px",
    paddingLeft: "0.8889rem ",
    boxShadow: isFocused ? 0 : 0,
    "&:hover": {
      border: `2px solid ${colors.primary}`
    }
  }),
  input: styles => ({
    ...styles,
    fontSize: "0.7778rem",
    "&:placeholder": {
      color: "rgba(65, 51, 183, 0.5)"
    }
  }),
  option: (styles, { data, isDisabled, isFocused, isSelected }) => {
    return {
      ...styles,
      fontFamily: fonts.mainfont,
      fontSize: "0.7778rem",
      color: colors.primary,
      backgroundColor: "transparent",
      cursor: "pointer",
      "&:hover": {
        backgroundColor: "rgba(197, 192, 240, 0.25)"
      }
    };
  },
  singleValue: styles => ({
    ...styles,
    fontFamily: "Arsenal",
    fontSize: "1rem",
    color: colors.primary,
    fontWeight: "bold"
  }),
  menu: styles => ({
    ...styles,
    borderRadius: "10px",
    border: `2px solid ${colors.primary}`,
    marginTop: 0,
    zIndex: 100
  }),
  multiValueLabel: styles => ({
    ...styles,
    fontFamily: "Arsenal",
    fontSize: "0.7778rem",
    color: colors.primary
  }),
  multiValue: styles => ({
    ...styles,
    border: `2px solid ${colors.primary}`,
    borderRadius: "7px",
    backgroundColor: "rgba(197, 192, 240, 0.25)",
    fontFamily: fonts.mainfont,
    fontSize: "0.7778rem",
    color: colors.primary
  }),
  placeholder: styles => ({
    ...styles,
    fontFamily: fonts.mainfont,
    fontSize: "0.7778rem",
    color: colors.primary
  }),
  dropdownIndicator: styles => ({
    ...styles,
    display: "none"
  }),
  multiValueRemove: styles => ({
    ...styles,
    cursor: "pointer",
    backgroundColor: "transparent",
    "&:hover": {
      backgroundColor: "transparent",
      color: colors.primary
    }
  })
};
