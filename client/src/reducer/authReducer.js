import { SET_CURRENT_USER } from "../action/types";
import isMatch from "../validation/isMatch";

const initialState = {
  isAuthenticated: false,
  users: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isMatch(action.payload),
        users: action.payload,
      };
    default:
      return state;
  }
};
