// src/Reducers/userReducers.js

import {
  LOGIN_SUCCESS,
  LOGIN_REQUEST,
  LOGIN_FAILED,
  CLEAR_ERRORS,
} from "../contants/userConstants";

export const authReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        loading: true,
        isAuthenticated: false,
        // user: {},
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        user: action.payload,
      };
    case LOGIN_FAILED:
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        user: null,
        error: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};
