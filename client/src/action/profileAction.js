import {
  GET_PROFILE,
  PROFILE_LOADING,
  CLEAR_CURRENT_USER,
  GET_ERRORS,
} from "./types";
import axios from "axios";

export const getCurrentProfile = () => (dispatch) => {
  dispatch(setProfileLoading());
  axios
    .get("/api/profile")
    .then((res) => {
      dispatch({
        type: GET_PROFILE,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: GET_PROFILE,
        payload: {},
      });
    });
};
export const createProfile = (userData, history) => (dispatch) => {
  axios
    .post("/api/profile", userData)
    .then((res) => {
      history.push("/dashboard");
    })
    .catch((err) => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      });
    });
};

export const setProfileLoading = () => {
  return {
    type: PROFILE_LOADING,
  };
};
export const clearCurrentUser = () => {
  return {
    type: CLEAR_CURRENT_USER,
  };
};
