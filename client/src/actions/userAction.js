// userActions.js
import axios from "axios";
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  CLEAR_ERRORS,
} from "../contants/userConstants"; // Correct the path to 'contants'
const API_URL = `http://localhost:4000`;

// Login user
export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: LOGIN_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(
      `${API_URL}/api/v1/login`,
      { email, password },config
    );

    dispatch({
      type: LOGIN_SUCCESS,
      payload: data.user ,
    });
  } catch (error) {
    dispatch({
      type: LOGIN_FAILED,
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
