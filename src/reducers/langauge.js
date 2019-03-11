import { SET_LANGAUGE } from "../actions/type";

const initialState = "en";

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_LANGAUGE:
      return action.payload;
      break;

    default:
      return state;
      break;
  }
};
