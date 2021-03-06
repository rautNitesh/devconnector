import { ADD_POST, GET_POSTS, DELETE_POST } from "../action/types";

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
    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter((post) => post._id != action.payload),
      };
    default:
      return state;
  }
};
