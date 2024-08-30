// userActions.js
import axios from "axios";
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAILED,
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAILED,
  CLEAR_ERRORS,
} from "../contants/userConstants"; // Correct the path to 'contants'
const API_URL = `http://localhost:4000`;

// Login user
export const login = (email, password) => async (dispatch) => {
  try {
    console.log(`Dispatching LOGIN_REQUEST`);
    dispatch({ type: LOGIN_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };

    const { data } = await axios.post(
      // `${API_URL}/api/v1/login`,
      `http://localhost:4000/api/v1/login`,
      { email, password },
      config
    );

    console.log(`Dispatching LOGIN_SUCCESS`);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: data.user,
    });
  } catch (error) {
    console.log(`Dispatching LOGIN_FAILED`);
    dispatch({
      type: LOGIN_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message, // Handle cases where error.response may be undefined
    });
  }
};

//  register user
export const register = (userData) => async (dispatch) => {
  try {
    dispatch({ type: REGISTER_USER_REQUEST });

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    const { data } = await axios.post(
      `${API_URL}/api/v1/register`,
      userData,
      config
    );

    dispatch({
      type: REGISTER_USER_SUCCESS,
      payload: data.user,
    });
  } catch (error) {
    dispatch({
      type: REGISTER_USER_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message, // Handle cases where error.response may be undefined
    });
  }
};

export const loadUser = () => async (dispatch) => {
  try {
    dispatch({ type: LOAD_USER_REQUEST });

    const token = localStorage.getItem("token");

    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };

    const { data } = await axios.get(`${API_URL}/api/v1/me`, config);

    dispatch({
      type: LOAD_USER_SUCCESS,
      payload: data.user,
    });
  } catch (error) {
    dispatch({
      type: LOAD_USER_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message, // Handle cases where error.response may be undefined
    });
  }
};

// Clear errors
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
