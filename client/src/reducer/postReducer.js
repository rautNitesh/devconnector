import { ADD_POST, GET_POSTS } from "../action/types";

const initialState = {
  post: {},
  posts: [],
  loading: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_POSTS:
      return {
        ...state,
        posts: action.payload,
      };
    case ADD_POST:
      return {
        ...state,
        posts: [action.payload, ...state.posts],
      };
    default:
      return state;
  }
};
