import axios from "axios";
import { ADD_POST, GET_ERRORS, GET_POST, GET_POSTS } from "./types";

export const addPost = (postData) => (dispatch) => {
  axios
    .post("/api/posts", postData)
    .then((res) =>
      dispatch({
        type: ADD_POST,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

export const getPosts = () => (dispatch) => {
  axios
    .get("/api/posts")
    .then((res) =>
      dispatch({
        type: GET_POSTS,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch({
        type: GET_POSTS,
        payload: {},
      })
    );
};
