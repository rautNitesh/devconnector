import {
  GET_PROFILE,
  PROFILE_LOADING,
  CLEAR_CURRENT_USER,
  GET_ERRORS,
  SET_CURRENT_USER,
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
export const deleteProfile = () => (dispatch) => {
  if (window.confirm("Are You Sure To Delete Your Profile Permanantly")) {
    axios
      .delete("/api/profile")
      .then((res) => {
        dispatch({
          type: SET_CURRENT_USER,
          payload: {},
        });
      })
      .catch((err) => {
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data,
        });
      });
  }
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

export const addExperience = (userData, history) => (dispatch) => {
  axios
    .post("/api/profile/experience", userData)
    .then((res) => history.push("/dashboard"))
    .catch((err) => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      });
    });
};

export const addEducation = (userData, history) => (dispatch) => {
  axios
    .post("/api/profile/education", userData)
    .then((res) => history.push("/dashboard"))
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
